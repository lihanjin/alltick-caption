'use client'

import { cn } from '@/lib/utils'

interface TagFilterProps {
  tags: { tag: string; count: number }[]
  selectedTag: string | null
  onSelectTag: (tag: string | null) => void
}

export function TagFilter({ tags, selectedTag, onSelectTag }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelectTag(null)}
        className={cn(
          'px-3 py-1.5 text-sm rounded-full border transition-colors',
          selectedTag === null
            ? 'bg-gold text-foreground border-gold'
            : 'bg-gold-light text-gold-dark border-gold/40 hover:bg-gold/20'
        )}
      >
        全部
      </button>
      {tags.map(({ tag, count }) => (
        <button
          key={tag}
          onClick={() => onSelectTag(tag)}
          className={cn(
            'px-3 py-1.5 text-sm rounded-full border transition-colors',
            selectedTag === tag
              ? 'bg-gold text-foreground border-gold'
              : 'bg-gold-light text-gold-dark border-gold/40 hover:bg-gold/20'
          )}
        >
          {tag}
          <span className="ml-1.5 text-xs opacity-70">({count})</span>
        </button>
      ))}
    </div>
  )
}
