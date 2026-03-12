import type { Metadata } from 'next'
import { Noto_Sans_SC } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/components/auth-provider'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import './globals.css'

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    default: '量化笔记 - 量化交易研究与实践',
    template: '%s | 量化笔记',
  },
  description: '专注于量化交易策略研究、因子投资分析、机器学习应用的技术博客。探索从理论到实盘的完整量化投资经验。',
  keywords: ['量化交易', '量化投资', '因子投资', '机器学习', '量化策略', '回测系统', 'Python', '金融科技'],
  authors: [{ name: '量化研究员' }],
  creator: '量化笔记',
  publisher: '量化笔记',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://quant-blog.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://quant-blog.vercel.app',
    title: '量化笔记 - 量化交易研究与实践',
    description: '专注于量化交易策略研究、因子投资分析、机器学习应用的技术博客',
    siteName: '量化笔记',
  },
  twitter: {
    card: 'summary_large_image',
    title: '量化笔记 - 量化交易研究与实践',
    description: '专注于量化交易策略研究、因子投资分析、机器学习应用的技术博客',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${notoSansSC.variable} font-sans antialiased`}>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
