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
				fontSize: "1.2rem",
			}}
		>
			<Markdown rehypePlugins={[rehypeRaw]}>{content}</Markdown>
		</div>
	);
}

export default MarkdownViewer;
