import { getAllPosts, getAllTags } from '@/lib/posts'
import { PostList } from '@/components/post-list'
import { AllTickAd } from '@/components/alltick-ad'

export default function HomePage() {
  const posts = getAllPosts()
  const tags = getAllTags()

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
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
