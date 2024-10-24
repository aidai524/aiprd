"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PrdForm from '@/components/PrdForm';
import { supabase } from '@/lib/supabase';
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
// import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser({ id: user.id, email: user.email ?? '' });
      } else {
        router.push('/login');
      }
    };
    checkUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <NavigationMenu className="w-full">
        <NavigationMenuList className="w-full justify-between px-4 py-2">
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-xl font-bold">PRD 生成器</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink asChild>
                <div className="w-[200px] p-4">
                  <p className="text-sm text-gray-500 mb-4">
                    使用此工具生成详细的产品需求文档 (PRD)。
                  </p>
                </div>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">欢迎, {user.email}</span>
              <Button onClick={handleLogout} variant="outline" size="sm">
                退出
              </Button>
            </div>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <PrdForm />
    </main>
  );
}
