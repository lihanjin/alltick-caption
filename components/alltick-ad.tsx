import Link from 'next/link'
import { TrendingUp, Zap, Globe, ArrowRight } from 'lucide-react'

export function AllTickAd() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-gold bg-gradient-to-br from-background via-gold-light/50 to-gold-light p-6 shadow-sm">
      {/* 装饰背景 */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-gold/20 blur-2xl" />
      <div className="absolute bottom-0 left-0 -mb-4 -ml-4 h-20 w-20 rounded-full bg-gold/30 blur-xl" />

      <div className="relative">
        {/* 标签 */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gold/20 text-gold-dark text-xs font-medium mb-4">
          <Zap className="h-3 w-3" />
          数据源合作伙伴
        </div>

        {/* 标题 */}
        <h3 className="text-xl font-bold mb-2 text-foreground">
          AllTick 实时行情
        </h3>

        {/* 描述 */}
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          专业级金融数据API，为量化交易提供稳定、低延迟的全球市场实时行情服务
        </p>

        {/* 特性列表 */}
        <ul className="space-y-2 mb-5">
          <li className="flex items-center gap-2 text-sm text-foreground">
            <Globe className="h-4 w-4 text-gold-dark flex-shrink-0" />
            覆盖全球股票、外汇、加密货币
          </li>
          <li className="flex items-center gap-2 text-sm text-foreground">
            <TrendingUp className="h-4 w-4 text-gold-dark flex-shrink-0" />
            毫秒级实时数据推送
          </li>
          <li className="flex items-center gap-2 text-sm text-foreground">
            <Zap className="h-4 w-4 text-gold-dark flex-shrink-0" />
            简洁易用的 REST & WebSocket API
          </li>
        </ul>

        {/* CTA 按钮 */}
        <Link
          href="https://alltick.co"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-gold hover:bg-gold-dark text-foreground font-medium text-sm transition-colors"
        >
          免费试用
          <ArrowRight className="h-4 w-4" />
        </Link>

        {/* 底部小字 */}
        <p className="text-xs text-muted-foreground text-center mt-3">
          新用户专享免费额度
        </p>
      </div>
    </div>
  )
}
