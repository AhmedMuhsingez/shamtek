/**
 * Client-side persistence for the no-backend demo.
 *
 * User "actions" (favoriting a product, viewing a product) are saved to
 * localStorage instead of a backend. Changes broadcast a CustomEvent so any
 * mounted UI (the heart buttons, the collections widget) can react live.
 */

export const FAVORITES_KEY = "shamtek:favorites";
export const RECENTLY_VIEWED_KEY = "shamtek:recently-viewed";
export const FAVORITES_EVENT = "shamtek:favorites-changed";
export const RECENTLY_VIEWED_EVENT = "shamtek:recently-viewed-changed";

const RECENTLY_VIEWED_LIMIT = 8;

const hasWindow = () => typeof window !== "undefined";

function read(key: string): string[] {
	if (!hasWindow()) return [];
	try {
		const raw = globalThis.localStorage.getItem(key);
		const parsed = raw ? JSON.parse(raw) : [];
		return Array.isArray(parsed) ? parsed.map(String) : [];
	} catch {
		return [];
	}
}

function write(key: string, value: string[], eventName: string) {
	if (!hasWindow()) return;
	try {
		globalThis.localStorage.setItem(key, JSON.stringify(value));
		globalThis.dispatchEvent(new CustomEvent(eventName, { detail: value }));
	} catch {
		/* localStorage unavailable (private mode / quota) — fail silently in the demo */
	}
}

// --- Favorites ------------------------------------------------------------
export function getFavorites(): string[] {
	return read(FAVORITES_KEY);
}

export function isFavorite(id: string): boolean {
	return getFavorites().includes(id);
}

/** Toggles a product's favorite state. Returns the new state (true = favorited). */
export function toggleFavorite(id: string): boolean {
	const current = getFavorites();
	const exists = current.includes(id);
	const next = exists ? current.filter((x) => x !== id) : [id, ...current];
	write(FAVORITES_KEY, next, FAVORITES_EVENT);
	return !exists;
}

export function removeFavorite(id: string) {
	write(
		FAVORITES_KEY,
		getFavorites().filter((x) => x !== id),
		FAVORITES_EVENT,
	);
}

// --- Recently viewed ------------------------------------------------------
export function getRecentlyViewed(): string[] {
	return read(RECENTLY_VIEWED_KEY);
}

/** Records a product as recently viewed (most-recent-first, de-duplicated, capped). */
export function addRecentlyViewed(id: string) {
	const next = [id, ...getRecentlyViewed().filter((x) => x !== id)].slice(
		0,
		RECENTLY_VIEWED_LIMIT,
	);
	write(RECENTLY_VIEWED_KEY, next, RECENTLY_VIEWED_EVENT);
}
