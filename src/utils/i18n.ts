import type { GetStaticPaths } from 'astro';

// Supported languages
export const languages = {
  ar: 'العربية',
  en: 'English',
  tr: 'Türkçe',
};

export const defaultLang = 'ar';
export const showDefaultLang = true;

// Language detection and utilities
export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as keyof typeof languages;
  return defaultLang;
}

export function useTranslatedPath(lang: keyof typeof languages) {
  return function translatePath(path: string, l: string = lang) {
    return `/${l}${path}`;
  };
}

// Translation loading
const ui = {
  ar: () => import('../i18n/ar.json').then(module => module.default),
  en: () => import('../i18n/en.json').then(module => module.default),
  tr: () => import('../i18n/tr.json').then(module => module.default),
} as const;

export async function getTranslations(lang: keyof typeof languages = defaultLang) {
  // Debug: Check if lang is valid
  if (!lang || !(lang in ui)) {
    console.warn(`Invalid language: ${lang}, falling back to ${defaultLang}`);
    lang = defaultLang;
  }
  
  // Debug: Check if ui[lang] is a function
  if (typeof ui[lang] !== 'function') {
    console.error(`ui[${lang}] is not a function:`, typeof ui[lang]);
    throw new Error(`Translation loader for language '${lang}' is not a function`);
  }
  
  return await ui[lang]();
}

// Translation function
export function useTranslations(lang: keyof typeof languages) {
  return async function t(key: string) {
    const translations = await getTranslations(lang);
    return key.split('.').reduce((obj, k) => obj && obj[k], translations as any) || key;
  };
}

// Static paths for i18n pages
export function getStaticPathsForI18n() {
  return Object.keys(languages).map((lang) => ({
    params: { lang },
  }));
}

// RTL language detection
export function isRTL(lang: keyof typeof languages) {
  return lang === 'ar';
}

// Get language direction
export function getDirection(lang: keyof typeof languages) {
  return isRTL(lang) ? 'rtl' : 'ltr';
}

// Get language flag
export function getLanguageFlag(lang: keyof typeof languages) {
  const flags = {
    ar: '/flags/sy.webp',
    en: '/flags/uk.webp',
    tr: '/flags/tr.webp',
  };
  return flags[lang];
}

// Browser language detection
export function getBrowserLanguage(): keyof typeof languages {
  if (typeof window === 'undefined') return defaultLang;
  
  const browserLang = navigator.language.split('-')[0];
  return (browserLang in languages) ? browserLang as keyof typeof languages : defaultLang;
}