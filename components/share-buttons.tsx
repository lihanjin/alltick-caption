'use client'

import { useState } from 'react'
import { Share2, Twitter, Link2, Check, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ShareButtonsProps {
  title: string
  url: string
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
    window.open(twitterUrl, '_blank', 'noopener,noreferrer')
  }

  const shareToWeibo = () => {
    const weiboUrl = `https://service.weibo.com/share/share.php?title=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
    window.open(weiboUrl, '_blank', 'noopener,noreferrer')
  }

  const shareToWechat = () => {
    // 微信分享通常需要生成二维码，这里简单复制链接提示用户
    copyToClipboard()
    alert('链接已复制，请在微信中粘贴分享')
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = url
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        })
      } catch {
        // User cancelled or error
      }
    } else {
      copyToClipboard()
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground mr-1">分享</span>
      
      {/* Native Share (Mobile) */}
      <Button
        variant="outline"
        size="sm"
        onClick={nativeShare}
        className="border-gold/60 hover:border-gold hover:bg-gold-light sm:hidden"
        title="分享"
      >
        <Share2 className="h-4 w-4" />
      </Button>

      {/* Twitter/X */}
      <Button
        variant="outline"
        size="sm"
        onClick={shareToTwitter}
        className="hidden sm:flex border-gold/60 hover:border-gold hover:bg-gold-light"
        title="分享到 Twitter"
      >
        <Twitter className="h-4 w-4" />
      </Button>

      {/* Weibo */}
      <Button
        variant="outline"
        size="sm"
        onClick={shareToWeibo}
        className="hidden sm:flex border-gold/60 hover:border-gold hover:bg-gold-light"
        title="分享到微博"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10.098 20.323c-3.977.391-7.414-1.406-7.672-4.02-.259-2.609 2.759-5.047 6.74-5.441 3.979-.394 7.413 1.404 7.671 4.018.259 2.6-2.759 5.049-6.739 5.443zm8.088-9.233c-.333-.104-.563-.178-.388-.639.377-.995.416-1.85.003-2.462-.775-1.147-2.897-1.086-5.32-.31 0 0-.762.332-.567-.271.371-1.214.315-2.23-.263-2.82-1.311-1.342-4.79-.06-7.772 2.855-2.228 2.179-3.521 4.497-3.521 6.478 0 3.789 4.86 6.093 9.613 6.093 6.232 0 10.379-3.621 10.379-6.498 0-1.74-1.469-2.727-2.164-2.426z" />
        </svg>
      </Button>

      {/* WeChat */}
      <Button
        variant="outline"
        size="sm"
        onClick={shareToWechat}
        className="hidden sm:flex border-gold/60 hover:border-gold hover:bg-gold-light"
        title="分享到微信"
      >
        <MessageCircle className="h-4 w-4" />
      </Button>

      {/* Copy Link */}
      <Button
        variant="outline"
        size="sm"
        onClick={copyToClipboard}
        className="hidden sm:flex border-gold/60 hover:border-gold hover:bg-gold-light"
        title={copied ? '已复制' : '复制链接'}
      >
        {copied ? <Check className="h-4 w-4 text-green-600" /> : <Link2 className="h-4 w-4" />}
      </Button>
    </div>
  )
}
