import type { Post, PostFormData } from './types'

// 模拟数据存储 - 实际项目中可以替换为数据库
let posts: Post[] = [
  {
    id: '1',
    title: '均值回归策略：从理论到实践',
    slug: 'mean-reversion-strategy',
    excerpt: '本文深入探讨均值回归策略的数学原理、实现方法及在A股市场的应用效果，包含完整的Python代码实现。',
    content: `# 均值回归策略：从理论到实践

均值回归是量化交易中最经典的策略之一，其核心假设是价格会围绕某一均值波动，当偏离过大时会回归。

## 理论基础

均值回归策略基于统计学中的回归现象。在金融市场中，当资产价格偏离其历史均值过大时，存在回归的趋势。

### 数学模型

设价格序列为 $P_t$，移动平均为 $MA_t$，则偏离度可定义为：

$$D_t = \\frac{P_t - MA_t}{MA_t}$$

当 $D_t > threshold$ 时做空，当 $D_t < -threshold$ 时做多。

## Python实现

\`\`\`python
import numpy as np
import pandas as pd

def mean_reversion_signal(prices, window=20, threshold=2):
    ma = prices.rolling(window).mean()
    std = prices.rolling(window).std()
    z_score = (prices - ma) / std
    
    signals = np.where(z_score > threshold, -1, 
              np.where(z_score < -threshold, 1, 0))
    return signals
\`\`\`

## 回测结果

在沪深300成分股上的回测显示，该策略年化收益率达到15.2%，夏普比率1.8。`,
    coverImage: '/images/mean-reversion.jpg',
    tags: ['量化策略', '回测系统', 'Python'],
    author: '量化研究员',
    publishedAt: '2024-03-01T08:00:00Z',
    updatedAt: '2024-03-01T08:00:00Z',
    readingTime: 8,
  },
  {
    id: '2',
    title: '机器学习在量化投资中的应用',
    slug: 'machine-learning-in-quant',
    excerpt: '探索如何将机器学习算法应用于量化投资，包括特征工程、模型选择和过拟合防范。',
    content: `# 机器学习在量化投资中的应用

随着计算能力的提升，机器学习在量化投资领域的应用越来越广泛。

## 特征工程`,
    coverImage: '/images/machine-learning.jpg',
    tags: ['机器学习', '因子投资', '数据分析'],
    author: '量化研究员',
    publishedAt: '2024-02-15T10:00:00Z',
    updatedAt: '2024-02-20T14:00:00Z',
    readingTime: 12,
  },
  {
    id: '3',
    title: '多因子模型构建指南',
    slug: 'multi-factor-model-guide',
    excerpt: '从零开始构建多因子选股模型，涵盖因子挖掘、测试、合成及组合优化的完整流程。',
    content: `# 多因子模型构建指南

多因子模型是量化投资的基石，本文将详细介绍构建流程。

## 因子挖掘

### 价值因子

- 市盈率倒数 (EP)
- 市净率倒数 (BP)
- 股息率 (DP)

### 动量因子

- 过去12个月收益率（剔除最近1个月）
- 52周高点比率

### 质量因子

- ROE
- 毛利率
- 资产周转率

## 因子测试

使用IC分析和分层回测验证因子有效性：

\`\`\`python
def calc_ic(factor, returns):
    return factor.corr(returns, method='spearman')
\`\`\`

## 因子合成

采用IC加权或等权方式合成多个因子。

## 组合优化

使用均值方差优化或风险平价方法构建最终组合。`,
    coverImage: '/images/multi-factor.jpg',
    tags: ['因子投资', '量化策略', 'Python'],
    author: '量化研究员',
    publishedAt: '2024-01-20T09:00:00Z',
    updatedAt: '2024-01-25T16:00:00Z',
    readingTime: 15,
  },
  {
    id: '4',
    title: '统计套利策略详解',
    slug: 'statistical-arbitrage',
    excerpt: '深入分析统计套利策略的原理，包括配对交易、协整分析和实际案例研究。',
    content: `# 统计套利策略详解

统计套利是利用统计学方法发现价格偏离并从中获利的策略。

## 配对交易

### 选择配对股票

1. 同行业股票
2. 历史价格高度相关
3. 通过协整检验

### 协整检验

\`\`\`python
from statsmodels.tsa.stattools import coint

def test_cointegration(series1, series2):
    score, pvalue, _ = coint(series1, series2)
    return pvalue < 0.05
\`\`\`

## 交易信号

当价差偏离均值超过2个标准差时：
- 做多低估资产
- 做空高估资产

## 风险管理

- 设置止损线
- 控制单一配对仓位
- 分散化多个配对`,
    coverImage: '/images/statistical-arbitrage.jpg',
    tags: ['套利策略', '量化策略', '风险管理'],
    author: '量化研究员',
    publishedAt: '2024-01-10T11:00:00Z',
    updatedAt: '2024-01-10T11:00:00Z',
    readingTime: 10,
  },
  {
    id: '5',
    title: '高频交易系统架构设计',
    slug: 'hft-system-architecture',
    excerpt: '探讨高频交易系统的技术架构、延迟优化和关键组件设计要点。',
    content: `# 高频交易系统架构设计

高频交易对系统性能有极高要求，本文探讨关键设计要点。

## 系统架构

### 核心组件

1. **行情接收模块**：低延迟数据接收
2. **策略引擎**：实时信号计算
3. **订单管理系统**：智能路由和执行
4. **风控模块**：实时风险监控

## 延迟优化

### 网络层面

- 物理托管（Colocation）
- 网络直连
- 内核旁路（Kernel Bypass）

### 软件层面

- 无锁数据结构
- 内存预分配
- CPU绑定

## 关键指标

- Tick-to-Trade延迟 < 10微秒
- 吞吐量 > 100万消息/秒

## 注意事项

高频交易需要大量资金投入和专业团队支持。`,
    coverImage: '/images/hft-system.jpg',
    tags: ['高频交易', '量化策略', '风险管理'],
    author: '系统架构师',
    publishedAt: '2024-01-05T14:00:00Z',
    updatedAt: '2024-01-08T10:00:00Z',
    readingTime: 12,
  },
]

export function getAllPosts(): Post[] {
  return [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug)
}

export function getPostById(id: string): Post | undefined {
  return posts.find((post) => post.id === id)
}

export function searchPosts(query: string): Post[] {
  const lowercaseQuery = query.toLowerCase()
  return getAllPosts().filter(
    (post) =>
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
  )
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((post) => post.tags.includes(tag))
}

export function getAllTags(): { tag: string; count: number }[] {
  const tagCount: Record<string, number> = {}
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCount[tag] = (tagCount[tag] || 0) + 1
    })
  })
  return Object.entries(tagCount)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
}

export function createPost(data: PostFormData): Post {
  const now = new Date().toISOString()
  const newPost: Post = {
    id: String(Date.now()),
    ...data,
    publishedAt: now,
    updatedAt: now,
    readingTime: Math.ceil(data.content.split(/\s+/).length / 200),
  }
  posts.unshift(newPost)
  return newPost
}

export function updatePost(id: string, data: Partial<PostFormData>): Post | null {
  const index = posts.findIndex((post) => post.id === id)
  if (index === -1) return null
  
  posts[index] = {
    ...posts[index],
    ...data,
    updatedAt: new Date().toISOString(),
    readingTime: data.content 
      ? Math.ceil(data.content.split(/\s+/).length / 200) 
      : posts[index].readingTime,
  }
  return posts[index]
}

export function deletePost(id: string): boolean {
  const index = posts.findIndex((post) => post.id === id)
  if (index === -1) return false
  posts.splice(index, 1)
  return true
}

export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }))
}
