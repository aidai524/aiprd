import React from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";

interface HeaderProps {
  user: { email: string } | null;
  onLogout: () => void;
  onShowList: () => void;
  onNewPrd: () => void;
  showList: boolean;
  showForm: boolean;
  selectedPrdId: string | null;
}

const Header: React.FC<HeaderProps> = ({
  user,
  onLogout,
  onShowList,
  onNewPrd,
  showList,
  showForm,
  selectedPrdId
}) => {
  return (
    <header className="bg-white text-zinc-900">
      <div className="max-w-screen-xl mx-auto px-4 flex items-center h-16">
        <div>
          <div className="select-none flex items-center">
            <div className="mr-2">
              <Image src="/images/logo.svg" alt="PRD Generator Logo" width={30} height={30} />
            </div>
            <div className="text-xl">PRD Generator</div>
          </div>
        </div>
        {user && (
          <>
            <ul className="hidden md:flex flex-1 min-w-0 justify-center items-center gap-4">
              <li>
                <a 
                  className={`text-zinc-500 font-normal data-[active=true]:text-blue-500 hover:text-blue-500 ${showList ? 'text-blue-500' : ''}`} 
                  href="#" 
                  onClick={onShowList}
                >
                  PRD 列表
                </a>
              </li>
              <li>
                <a 
                  className={`text-zinc-500 font-normal data-[active=true]:text-blue-500 hover:text-blue-500 ${showForm && !selectedPrdId ? 'text-blue-500' : ''}`} 
                  href="#" 
                  onClick={onNewPrd}
                >
                  新建 PRD
                </a>
              </li>
            </ul>
            <div className="grow md:hidden"></div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">欢迎, {user.email}</span>
              <Button 
                onClick={onLogout}
                variant="outline"
                size="sm"
              >
                退出
              </Button>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
