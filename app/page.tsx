"use client"

import { useEffect, useState } from 'react'
import PrdForm from '@/components/PrdForm'
import PrdList from '@/components/PrdList'
import LandingPage from '@/components/LandingPage'
import Header from '@/components/Header'
import { supabase } from '@/lib/supabase'

interface User {
  id: string
  email: string
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [selectedPrdId, setSelectedPrdId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [showList, setShowList] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser({ id: user.id, email: user.email ?? '' })
      }
    }
    checkUser()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
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

  return (
    <div>
      <Header 
        user={user}
        onLogout={handleLogout}
        onShowList={handleShowList}
        onNewPrd={handleNewPrd}
        showList={showList}
        showForm={showForm}
        selectedPrdId={selectedPrdId}
      />

      <main className="container mx-auto p-4">
        {!user && <LandingPage />}
        {user && showList && <PrdList onSelectPrd={handleSelectPrd} />}
        {user && showForm && <PrdForm prdId={selectedPrdId ?? undefined} />}
      </main>
    </div>
  )
}
