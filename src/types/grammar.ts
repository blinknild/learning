export type JlptLevel = 'N2' | 'N3'

export interface GrammarExample {
  /** 含 <ruby>…<rt>…</rt></ruby> 的日文 HTML，仅来自本地静态数据 */
  jaHtml: string
  zh: string
}

/** 一种接续及其专属例句 */
export interface GrammarUsage {
  /** 接续说明（如何接在词后） */
  continuation: string
  examples: GrammarExample[]
}

export interface GrammarItem {
  id: number
  level: JlptLevel
  /** 意义相近归类用的小标签（同类条目使用同一文案） */
  tag: string
  pattern: string
  meaning: string
  /** 官方已审核；为 true 时卡片显示审核标识 */
  verified?: boolean
  usages: GrammarUsage[]
}

export interface GrammarData {
  version: number
  items: GrammarItem[]
}
