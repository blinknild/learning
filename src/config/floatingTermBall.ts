/**
 * 悬浮术语球（FloatingTermBall）可调参数。
 * 修改此处即可调整间隔、概率、动效时长、台词文案等，无需改组件内逻辑。
 */
export const floatingTermBallConfig = {
  /** 小动物台词气泡 */
  speech: {
    /** 每隔多少毫秒检查一次是否展示台词 */
    tickMs: 5_000,
    /**
     * 展示门槛：在 [0,1) 上取随机数，仅当 random > showThreshold 时出现台词。
     * 例如 0.7 表示约 30% 概率出现。
     */
    showThreshold: 0.7,
    /** 气泡从出现到完全消失的总时长（毫秒），应与 CSS 动效总时长一致 */
    showMs: 4200,
    /** 系统「减少动态效果」时气泡淡出时长（毫秒） */
    reducedMotionShowMs: 3000,
    /** 随机展示的台词列表（学习向、简短）；请至少保留一条 */
    lines: [
      '今天也要加油哦～',
      '看不懂术语？点下面问号',
      '长按我可以回顶部哦',
      '辞書形就是基本形呀',
      '活用形慢慢来，不着急',
      '记得抽空复习一下',
      'が・を・に，加油记',
      '今日の一句：頑張って！',
      '学语法，一步一步来',
      '累了就休息一下眼睛',
      '我在陪着你学习呢',
      '连体形用来修饰名词',
      '有问题随时点我查',
      '坚持就是胜利！',
      'ナ形容词要加「な」哦',
    ],
  },

  /** 悬浮球交互与火箭回顶 */
  fab: {
    /** 长按多少毫秒触发回顶 */
    longPressMs: 550,
    /** 火箭发射阶段时长（毫秒），需与 CSS 动画 ftb-rocket-launch 一致 */
    rocketLaunchMs: 780,
    /** 落回原位阶段时长（毫秒），需与 CSS 动画 ftb-rocket-land 一致 */
    rocketLandMs: 480,
  },

  /** 按日期轮换的小动物图（animal_01.svg …） */
  animal: {
    /**
     * 参与轮换的图片张数（取排序后的前 N 个文件）。
     * - 为 1：每天都是同一张（第一张）。
     * - 为 2：在两张之间按「日期」轮换：1 日、3 日…用第 1 张，2 日、4 日…用第 2 张。
     *   因此在单月奇数日，与 imageCount=1 时同为第一张，属正常，不是 bug。
     * 勿大于 assets 里 animal_*.svg 的实际数量；超出部分会被忽略。
     */
    imageCount: 15,
  },
} as const

export type FloatingTermBallConfig = typeof floatingTermBallConfig
