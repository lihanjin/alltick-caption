import Link from 'next/link'
import { Compass } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-gold/40 bg-gold-light/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold border border-gold-dark/30">
                <Compass className="h-5 w-5 text-foreground" />
              </div>
              <span className="text-lg font-semibold">老船长量化交易</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              专注于量化交易策略研究、因子投资分析、机器学习应用的技术博客。
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  首页
                </Link>
              </li>
              <li>
                <Link href="/tags" className="hover:text-foreground transition-colors">
                  标签分类
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-foreground transition-colors">
                  文章管理
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">热门标签</h3>
            <div className="flex flex-wrap gap-2">
              {['量化策略', '机器学习', '因子投资', 'Python'].map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${encodeURIComponent(tag)}`}
                  className="text-xs px-2.5 py-1 rounded-full bg-gold-light text-gold-dark border border-gold/40 hover:bg-gold/20 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gold/30 text-center text-sm text-muted-foreground space-y-2">
          <p>
            数据源战略合作伙伴{' '}
            <a
              href="https://alltick.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-dark hover:text-foreground underline underline-offset-2 transition-colors"
            >
              AllTick.co
            </a>
          </p>
          <p>&copy; {new Date().getFullYear()} 老船长量化交易. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  )
}
