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
  pattern: string
  meaning: string
  usages: GrammarUsage[]
}

export interface GrammarData {
  version: number
  items: GrammarItem[]
}
