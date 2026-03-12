'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { ArrowLeft, X, Upload, ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field'
import type { Post, PostFormData } from '@/lib/types'
import { PREDEFINED_TAGS } from '@/lib/types'

interface PostEditorProps {
  post?: Post
  onSave: (data: PostFormData) => void
  onCancel: () => void
}

export function PostEditor({ post, onSave, onCancel }: PostEditorProps) {
  const [formData, setFormData] = useState<PostFormData>({
    title: post?.title || '',
    slug: post?.slug || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    coverImage: post?.coverImage || '',
    tags: post?.tags || [],
    author: post?.author || '量化研究员',
  })

  const [tagInput, setTagInput] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // 验证文件类型
    if (!file.type.startsWith('image/')) {
      alert('请选择图片文件')
      return
    }

    // 验证文件大小 (最大 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('图片大小不能超过 5MB')
      return
    }

    setIsUploading(true)

    try {
      // 创建本地预览 URL 并生成唯一文件名
      const timestamp = Date.now()
      const fileName = `cover-${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      
      // 将文件转换为 base64 存储到 localStorage 作为临时方案
      // 实际生产环境应该上传到服务器或云存储
      const reader = new FileReader()
      reader.onload = () => {
        const base64 = reader.result as string
        // 存储到 localStorage
        localStorage.setItem(`image_${fileName}`, base64)
        setFormData((prev) => ({ ...prev, coverImage: `data:local:${fileName}` }))
        setIsUploading(false)
      }
      reader.onerror = () => {
        alert('图片读取失败')
        setIsUploading(false)
      }
      reader.readAsDataURL(file)
    } catch {
      alert('图片上传失败')
      setIsUploading(false)
    }

    // 清空 input 以便重复选择同一文件
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const getImagePreviewUrl = (coverImage: string): string => {
    if (!coverImage) return ''
    if (coverImage.startsWith('data:local:')) {
      const fileName = coverImage.replace('data:local:', '')
      return localStorage.getItem(`image_${fileName}`) || ''
    }
    return coverImage
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
    }))
  }

  const addTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tag],
      }))
    }
    setTagInput('')
  }

  const removeTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <Button type="button" variant="ghost" onClick={onCancel}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回列表
        </Button>
        <Button type="submit">
          {post ? '保存修改' : '发布文章'}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>文章内容</CardTitle>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="title">标题 *</FieldLabel>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="输入文章标题"
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="slug">URL Slug *</FieldLabel>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, slug: e.target.value }))
                    }
                    placeholder="article-url-slug"
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="excerpt">摘要</FieldLabel>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, excerpt: e.target.value }))
                    }
                    placeholder="简短描述文章内容..."
                    rows={3}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="content">正文内容 *</FieldLabel>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, content: e.target.value }))
                    }
                    placeholder="支持 Markdown 格式..."
                    rows={16}
                    className="font-mono text-sm"
                    required
                  />
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>文章设置</CardTitle>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="author">作者</FieldLabel>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, author: e.target.value }))
                    }
                    placeholder="作者名称"
                  />
                </Field>

                <Field>
                  <FieldLabel>封面图片</FieldLabel>
                  
                  {/* 图片预览 */}
                  {formData.coverImage && (
                    <div className="relative aspect-video mb-3 rounded-lg overflow-hidden border border-gold/40 bg-gold-light">
                      <Image
                        src={getImagePreviewUrl(formData.coverImage)}
                        alt="封面预览"
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, coverImage: '' }))}
                        className="absolute top-2 right-2 p-1 rounded-full bg-background/80 hover:bg-background text-foreground transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}

                  {/* 上传按钮 */}
                  <div className="flex gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="cover-upload"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="flex-1 border-gold/60 hover:border-gold hover:bg-gold-light"
                    >
                      {isUploading ? (
                        <>上传中...</>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          选择图片
                        </>
                      )}
                    </Button>
                  </div>

                  {/* URL 输入 */}
                  <div className="mt-3">
                    <p className="text-xs text-muted-foreground mb-1.5">或输入图片 URL</p>
                    <Input
                      id="coverImage"
                      value={formData.coverImage.startsWith('data:local:') ? '' : formData.coverImage}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, coverImage: e.target.value }))
                      }
                      placeholder="/images/cover.jpg"
                      className="border-gold/60 focus:border-gold"
                    />
                  </div>

                  {!formData.coverImage && (
                    <div className="mt-3 aspect-video rounded-lg border-2 border-dashed border-gold/40 flex flex-col items-center justify-center text-muted-foreground bg-gold-light/30">
                      <ImageIcon className="h-8 w-8 mb-2 opacity-50" />
                      <p className="text-xs">暂无封面图片</p>
                    </div>
                  )}
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>标签</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-sm rounded-full bg-secondary text-secondary-foreground"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        addTag(tagInput)
                      }
                    }}
                    placeholder="输入标签后回车"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => addTag(tagInput)}
                  >
                    添加
                  </Button>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-2">常用标签</p>
                  <div className="flex flex-wrap gap-1">
                    {PREDEFINED_TAGS.filter(
                      (tag) => !formData.tags.includes(tag)
                    ).map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => addTag(tag)}
                        className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors"
                      >
                        + {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  )
}
