import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-zinc-900 py-8">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col items-center gap-4">
        <div>
          <div className="select-none flex items-center">
            <div className="mr-2">
              <Image src="/images/logo.svg" alt="PRD Generator Logo" width={30} height={30} />
            </div>
            <div className="text-xl">PRD Generator</div>
          </div>
        </div>
        <p className="text-base text-center text-zinc-500 mx-auto max-w-2xl">
          Create comprehensive Product Requirement Documents with AI assistance, version control, and collaborative editing.
        </p>
        <ul className="flex flex-1 min-w-0 justify-center items-center gap-8">
          <li><Link href="/" className="text-zinc-900 hover:text-blue-500">Home</Link></li>
          <li><Link href="/" className="text-zinc-900 hover:text-blue-500">Features</Link></li>
          <li><Link href="/" className="text-zinc-900 hover:text-blue-500">Pricing</Link></li>
          <li><Link href="/" className="text-zinc-900 hover:text-blue-500">About</Link></li>
          <li><Link href="/" className="text-zinc-900 hover:text-blue-500">Contact</Link></li>
        </ul>
        <div className="text-sm text-zinc-500 text-center">© {new Date().getFullYear()} PRD Generator. All Rights Reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
