import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
type Props = {
	content: string;
};

function MarkdownViewer({ content }: Props) {
	return (
		<div
			className="markdown-content"
			style={{
				fontFamily: "var(--font-rubik)",
				fontSize: "1.2rem", // equivalent to text-2xl
			}}
		>
			<Markdown rehypePlugins={[rehypeRaw]}>{content}</Markdown>
		</div>
	);
}

export default MarkdownViewer;
