import React from 'react';

interface MdxContentProps {
  content: string;
}

const MdxContent: React.FC<MdxContentProps> = ({ content }) => {
  return (
    <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto">
      <pre className="whitespace-pre-wrap break-words">{content}</pre>
    </div>
  );
};

export default MdxContent;
