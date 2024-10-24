import ReactMarkdown from 'react-markdown';

interface MdxContentProps {
  content: string;
}

const MdxContent: React.FC<MdxContentProps> = ({ content }) => {
  return (
    <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default MdxContent;
