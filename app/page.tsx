import Image from 'next/image'
import { Brain, TrendingUp, Award } from 'lucide-react'
import { getAllPosts, getAllTags } from '@/lib/posts'
import { PostList } from '@/components/post-list'
import { AllTickAd } from '@/components/alltick-ad'

export default function HomePage() {
  const posts = getAllPosts()
  const tags = getAllTags()

  return (
    <main className="min-h-screen">
      {/* Hero Section with Background */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* 背景图片 */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.jpg"
            alt=""
            fill
            className="object-cover opacity-15"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
            {/* 左侧标题区域 */}
            <div className="flex-1 max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
                老船长
                <br />
                <span className="text-muted-foreground">量化交易专题站</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                探索量化投资的核心策略、因子模型构建、机器学习应用，分享从理论到实盘的完整经验。
              </p>
            </div>

            {/* 右侧广告位 */}
            <div className="lg:w-80 xl:w-96 flex-shrink-0">
              <AllTickAd />
            </div>
          </div>
        </div>
      </section>

      {/* Captain Introduction Section */}
      <section className="py-16 bg-gold-light/30 border-y border-gold/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* 头像区域 */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-gold/50 shadow-lg overflow-hidden">
                  <Image
                    src="/images/captain-avatar.jpg"
                    alt="老船长"
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* 简介内容 */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">关于老船长</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  华尔街资深量化基金经理，拥有超过15年的量化投资从业经验。专注于神经网络、深度学习与人工智能在金融市场中的应用研究，曾主导多个机器学习驱动的量化策略开发项目。致力于将前沿的AI技术与传统金融理论相结合，在量化交易的汪洋大海中探索财富密码。
                </p>

                {/* 关键词标签 */}
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background border border-gold/50 text-sm">
                    <TrendingUp className="h-4 w-4 text-gold-dark" />
                    <span>华尔街经验</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background border border-gold/50 text-sm">
                    <Brain className="h-4 w-4 text-gold-dark" />
                    <span>神经网络 & AI</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background border border-gold/50 text-sm">
                    <Award className="h-4 w-4 text-gold-dark" />
                    <span>15年从业</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">最新文章</h2>
            <p className="text-muted-foreground">
              共 {posts.length} 篇文章
            </p>
          </div>
          <PostList posts={posts} tags={tags} />
        </div>
      </section>
    </main>
  )
}
