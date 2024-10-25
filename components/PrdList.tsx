import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Prd {
  id: string
  title: string
  created_at: string
  updated_at: string
}

interface PrdListProps {
  onSelectPrd: (prdId: string) => void
}

export default function PrdList({ onSelectPrd }: PrdListProps) {
  const [prds, setPrds] = useState<Prd[]>([])

  useEffect(() => {
    fetchPrds()
  }, [])

  const fetchPrds = async () => {
    const { data, error } = await supabase
      .from('prds')
      .select('*')
      .order('updated_at', { ascending: false })

    if (error) {
      console.error('Error fetching PRDs:', error)
    } else {
      setPrds(data as Prd[])
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-primary">PRD 列表</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {prds.map((prd) => (
          <Card key={prd.id} className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{prd.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-muted-foreground">
                  创建时间: {new Date(prd.created_at).toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  更新时间: {new Date(prd.updated_at).toLocaleString()}
                </p>
              </div>
              <Button onClick={() => onSelectPrd(prd.id)} className="w-full">
                查看详情
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}