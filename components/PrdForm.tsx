"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { supabase } from '@/lib/supabase';
import MdxContent from './MdxContent';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PrdVersion {
  id: string;
  created_at: string;
  generated_prd: string;
  project_overview: string;
  core_functions: string;
  documentation: string;
  file_structure: string;
}

interface PrdFormProps {
  prdId?: string;
}

interface User {
  id: string;
  email: string;
}

const PrdForm: React.FC<PrdFormProps> = ({ prdId }) => {
  const [title, setTitle] = useState('');
  const [projectOverview, setProjectOverview] = useState('');
  const [coreFunctions, setCoreFunctions] = useState('');
  const [documentation, setDocumentation] = useState('');
  const [fileStructure, setFileStructure] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamedContent, setStreamedContent] = useState('');
  const [versions, setVersions] = useState<PrdVersion[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const contentRef = useRef('');
  const [activeTab, setActiveTab] = useState("projectOverview");

  useEffect(() => {
    checkUser();
    if (prdId) {
      fetchPrdData(prdId);
      fetchVersions(prdId);
    }
  }, [prdId]);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser({ id: user.id, email: user.email ?? '' });
    }
  };

  const fetchPrdData = async (id: string) => {
    const { data, error } = await supabase
      .from('prds')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching PRD:', error);
    } else if (data) {
      setTitle(data.title);
      // 加载最新版本的内容
      fetchLatestVersion(id);
    }
  };

  const fetchLatestVersion = async (prdId: string) => {
    const { data, error } = await supabase
      .from('prd_versions')
      .select('*')
      .eq('prd_id', prdId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error('Error fetching latest PRD version:', error);
    } else if (data) {
      setProjectOverview(data.project_overview);
      setCoreFunctions(data.core_functions);
      setDocumentation(data.documentation);
      setFileStructure(data.file_structure);
      setStreamedContent(data.generated_prd);
    }
  };

  const fetchVersions = async (prdId: string) => {
    const { data, error } = await supabase
      .from('prd_versions')
      .select('*')
      .eq('prd_id', prdId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching PRD versions:', error);
    } else {
      setVersions(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('请先登录');
      return;
    }
    setIsLoading(true);
    contentRef.current = '';
    setStreamedContent('');

    try {
      const response = await fetch('/api/generate-prd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectOverview,
          coreFunctions,
          documentation,
          fileStructure,
        }),
      });

      if (!response.body) {
        throw new Error('No response body');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        contentRef.current += chunk;
        setStreamedContent(contentRef.current);
      }

      // 保存或更新 PRD
      let savedPrdId = prdId;
      if (!savedPrdId) {
        const { data, error } = await supabase
          .from('prds')
          .insert({ title, user_id: user.id })
          .select()
          .single();

        if (error) {
          console.error('Error creating PRD:', error);
          return;
        }
        savedPrdId = data.id;
      } else {
        // 更新 PRD 标题
        await supabase
          .from('prds')
          .update({ title, updated_at: new Date().toISOString() })
          .eq('id', savedPrdId);
      }

      // 保存新版本
      const { error } = await supabase.from('prd_versions').insert({
        prd_id: savedPrdId,
        project_overview: projectOverview,
        core_functions: coreFunctions,
        documentation,
        file_structure: fileStructure,
        generated_prd: contentRef.current,
      });

      if (error) {
        console.error('Error saving PRD version:', error);
      } else if (savedPrdId) {
        fetchVersions(savedPrdId);
      }
    } catch (error) {
      console.error('Error generating PRD:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewVersion = (versionContent: string) => {
    setStreamedContent(versionContent);
  };

  const isTabDisabled = (tabName: string) => {
    switch (tabName) {
      case "coreFunctions":
        return projectOverview.trim() === '';
      case "documentation":
        return projectOverview.trim() === '' || coreFunctions.trim() === '';
      case "fileStructure":
        return projectOverview.trim() === '' || coreFunctions.trim() === '' || documentation.trim() === '';
      default:
        return false;
    }
  };

  const handleCopyContent = () => {
    navigator.clipboard.writeText(streamedContent).then(() => {
      alert('内容已复制到剪贴板');
    }, (err) => {
      console.error('无法复制内容: ', err);
    });
  };

  const handleDownloadContent = () => {
    const element = document.createElement("a");
    const file = new Blob([streamedContent], {type: 'text/markdown'});
    element.href = URL.createObjectURL(file);
    element.download = "instruction.md";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">PRD 生成器</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title">PRD 标题</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-4">
                <TabsTrigger value="projectOverview">项目概述</TabsTrigger>
                <TabsTrigger value="coreFunctions" disabled={isTabDisabled("coreFunctions")}>核心功能</TabsTrigger>
                <TabsTrigger value="documentation" disabled={isTabDisabled("documentation")}>文档</TabsTrigger>
                <TabsTrigger value="fileStructure" disabled={isTabDisabled("fileStructure")}>当前文件结构</TabsTrigger>
              </TabsList>
              <TabsContent value="projectOverview">
                <Label htmlFor="projectOverview" className="text-sm font-medium mb-2 block">项目概述</Label>
                <Textarea
                  id="projectOverview"
                  value={projectOverview}
                  onChange={(e) => setProjectOverview(e.target.value)}
                  className="min-h-[200px] w-full"
                  placeholder="提供项目的高层次描述，包括主要功能、逻辑和技术栈。"
                />
              </TabsContent>
              <TabsContent value="coreFunctions">
                <Label htmlFor="coreFunctions" className="text-sm font-medium mb-2 block">核心功能</Label>
                <Textarea
                  id="coreFunctions"
                  value={coreFunctions}
                  onChange={(e) => setCoreFunctions(e.target.value)}
                  className="min-h-[200px] w-full"
                  placeholder="详细描述网站的核心功能，分为主要功能模块和子功能。"
                />
              </TabsContent>
              <TabsContent value="documentation">
                <Label htmlFor="documentation" className="text-sm font-medium mb-2 block">文档</Label>
                <Textarea
                  id="documentation"
                  value={documentation}
                  onChange={(e) => setDocumentation(e.target.value)}
                  className="min-h-[200px] w-full"
                  placeholder="包含使用的第三方 API 或框架的描述和代码示例。"
                />
              </TabsContent>
              <TabsContent value="fileStructure">
                <Label htmlFor="fileStructure" className="text-sm font-medium mb-2 block">当前文件结构</Label>
                <Textarea
                  id="fileStructure"
                  value={fileStructure}
                  onChange={(e) => setFileStructure(e.target.value)}
                  className="min-h-[200px] w-full"
                  placeholder="概述当前项目的文件结构，括前端、后端和 API 详情。"
                />
              </TabsContent>
            </Tabs>
            <Button type="submit" disabled={isLoading || isTabDisabled("fileStructure")} className="w-full">
              {isLoading ? '生成中...' : '生成 PRD'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {streamedContent && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold">生成的 PRD：</h2>
            <div>
              <Button onClick={handleCopyContent} className="mr-2">复制内容</Button>
              <Button onClick={handleDownloadContent}>下载 Markdown</Button>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-md overflow-auto max-h-[600px]">
            <MdxContent content={streamedContent} />
          </div>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">版本历史</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {versions.map((version) => (
              <li key={version.id} className="border-b pb-4 last:border-b-0">
                <p className="text-sm text-gray-500 mb-2">创建时间: {new Date(version.created_at).toLocaleString()}</p>
                <Button onClick={() => handleViewVersion(version.generated_prd)} variant="outline" size="sm">
                  查看此版本
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrdForm;
