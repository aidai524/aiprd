"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import PrdForm from '@/components/PrdForm'
import PrdList from '@/components/PrdList'
import { supabase } from '@/lib/supabase'
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"

interface User {
  id: string
  email: string
}

export default function Component() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [selectedPrdId, setSelectedPrdId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [showList, setShowList] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser({ id: user.id, email: user.email ?? '' })
      } else {
        router.push('/login')
      }
    }
    checkUser()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const handleSelectPrd = (prdId: string) => {
    setSelectedPrdId(prdId)
    setShowForm(true)
    setShowList(false)
  }

  const handleNewPrd = () => {
    setSelectedPrdId(null)
    setShowForm(true)
    setShowList(false)
  }

  const handleShowList = () => {
    setShowList(true)
    setShowForm(false)
  }

  if (!user) {
    return null // Or show a loading indicator
  }

  return (
    <main className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <NavigationMenu>
          <NavigationMenuList className="space-x-4">
            <NavigationMenuItem>
              <NavigationMenuLink className="text-2xl font-bold text-primary">
                PRD 生成器
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button onClick={handleShowList} variant="ghost" className="text-lg font-semibold">
                PRD 列表
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button onClick={handleNewPrd} variant="ghost" className="text-lg font-semibold">
                新建 PRD
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">欢迎, {user.email}</span>
          <Button onClick={handleLogout} variant="outline" size="sm">
            退出
          </Button>
        </div>
      </div>

      {showList && <PrdList onSelectPrd={handleSelectPrd} />}
      {showForm && <PrdForm prdId={selectedPrdId ?? undefined} />}
    </main>
  )
}