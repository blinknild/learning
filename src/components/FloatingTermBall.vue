<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'

const bubbleOpen = ref(false)

type TermItem = { title: string; text: string; example?: string }

type TermGroup = { heading: string; items: TermItem[] }

/** 按「词类 → 活用 → 其他」整理；正文为精要版，详细可对照文末表 */
const TERM_GROUPS: TermGroup[] = [
  {
    heading: '一、词类（品词）',
    items: [
      {
        title: '体言（たいげん）',
        text: '无活用的独立词：名词、代词、数词等。可接助词作主语・宾语・补语等，也可接だ・です作谓语。',
        example: '例：本が　彼と　三冊　学生だ',
      },
      {
        title: '用言（ようげん）',
        text: '有活用的独立词：动词、イ形容词、ナ形容词。可单独作谓语，通过变形表时・态・语气；可修饰体言（连体形）或用言（连用形等）。',
        example: '例：書く　暑い　静かだ',
      },
      {
        title: '其他词类（简述）',
        text: '连体词（この・その）、副词（とても）、接续词（しかし）、感叹词；助词无活用（が・の・に）；助动词有活用（ます・ない・れる等）。',
        example: '连体词只能直接修饰体言；助动词接在用言后表时态・语态・语气。',
      },
    ],
  },
  {
    heading: '二、活用形（用言）',
    items: [
      {
        title: '辞書形（基本形）',
        text: '词典记载形；简体里表非过去、肯定谓语。可后续と（引用）、こと・もの（名词化）等。',
        example: '書く・食べる・来る・する／高い／静かだ（ナ词典常写作静かだ）',
      },
      {
        title: '連体形',
        text: '修饰体言的形态。现代日语里动词・イ形多同辞书形；ナ形连体形用「な」（终止形用「だ」）。',
        example: '書く本　高い山　静かな部屋',
      },
      {
        title: '連用形',
        text: '修饰用言、接ます、中顿、构成复合词等。五段：う段→い段；一段：去る；カ来・サス各有规则。',
        example: '書きます　雨が降り、風が吹く　読み終わる',
      },
      {
        title: '未然形',
        text: '表「尚未发生」或接否定・推量・使役・被动等。五段：う→あ段＋ない等；一段未然与连用同形，后续助动词不同。',
        example: '書かない　書こう　書かれる　食べさせる',
      },
      {
        title: '仮定形（条件）',
        text: '表假定条件。五段う→え段＋ば；一段去る＋れば（口语）；イ形く＋れば；ナ词干＋なら。',
        example: '書けば　食べれば　高ければ　静かなら',
      },
      {
        title: '命令形',
        text: '表命令。五段う→え段；一段去る＋ろ／よ；来る→来い；する→しろ・せよ。',
        example: '書け　食べろ　来い　しろ',
      },
    ],
  },
  {
    heading: '三、其他重要术语',
    items: [
      {
        title: '終止形',
        text: '用于终结句子的形态。现代多同连体形；ナ形终止用「だ」、连体用「な」。',
        example: '简体句末：行く。　静かだ。',
      },
      {
        title: '推量形',
        text: '传统语法常与未然形合并；严格说是未然的一种，后续う・よう表推量。',
        example: '書こう　食べよう',
      },
      {
        title: '音便（おんびん）',
        text: '连用形接て・た时发生的音变：イ音便（書いて）、促音便（買って）、撥音便（死んで）等。',
        example: '書く→書いて　買う→買って　死ぬ→死んで',
      },
      {
        title: 'て形・ない形・ます形',
        text: 'て形：音便后的连用＋て，表并列・顺序・原因等。ない形：未然＋ない。ます形：连用＋ます（敬体）。',
        example: '書いて　書かない　書きます',
      },
      {
        title: 'ている・てある',
        text: '补助动词：ている多表进行或状态；てある多表事先准备后的存续状态。',
        example: '読んでいる　窓が開けてある',
      },
      {
        title: '可能・受身・使役',
        text: '可能：五段え段＋る等。受身：未然＋れる・られる。使役：未然＋せる・させる。',
        example: '書ける　書かれる　書かせる',
      },
      {
        title: '自他动词',
        text: '自动词：主体自发、常不带を（ドアが開く）。他动词：对对象施加动作、常带を（ドアを開ける）。',
        example: '自動：消える　他動：消す',
      },
      {
        title: '补助动词',
        text: '附在他动词连用后，失去独立义而表语法义：ている、てしまう、ておく、てみる等。',
        example: 'てみる（尝试）　ておく（事先）',
      },
      {
        title: '形式名词',
        text: 'こと、もの、の、ところ、わけ、はず、つもり等：把前面内容名词化，本身语义很虚。',
        example: '読むこと　知ったはず',
      },
    ],
  },
]

/** 与文末说明一致的对照表（以「書く」为主例） */
const SUMMARY_ROWS: { term: string; mean: string; ex: string }[] = [
  { term: '辞書形', mean: '词典原始形', ex: '書く' },
  { term: '連体形', mean: '修饰体言', ex: '書く本' },
  { term: '連用形', mean: '接ます・中顿等', ex: '書き' },
  { term: '未然形', mean: '接ない・う・せる等', ex: '書か' },
  { term: '仮定形', mean: '接ば表假设', ex: '書け' },
  { term: '命令形', mean: '命令', ex: '書け' },
  { term: '体言', mean: '名・代・数（无活用）', ex: '本、私、一' },
  { term: '用言', mean: '动・イ・ナ（有活用）', ex: '書く、高い、静かだ' },
]

const LONG_MS = 550
let pressTimer: ReturnType<typeof setTimeout> | null = null
/** 长按后浏览器仍会派发 click，用此标志吞掉下一次 click，避免误开关气泡 */
let suppressNextClick = false

function clearPressTimer() {
  if (pressTimer != null) {
    clearTimeout(pressTimer)
    pressTimer = null
  }
}

function scrollPageTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function onFabPointerDown(e: PointerEvent) {
  if (!e.isPrimary) return
  if (e.pointerType === 'mouse' && e.button !== 0) return
  const el = e.currentTarget
  if (el instanceof HTMLElement) {
    try {
      el.setPointerCapture(e.pointerId)
    } catch {
      /* ignore */
    }
  }
  suppressNextClick = false
  clearPressTimer()
  pressTimer = setTimeout(() => {
    pressTimer = null
    suppressNextClick = true
    bubbleOpen.value = false
    scrollPageTop()
    try {
      navigator.vibrate?.(12)
    } catch {
      /* ignore */
    }
  }, LONG_MS)
}

function onFabPointerUp(e: PointerEvent) {
  clearPressTimer()
  const el = e.currentTarget
  if (el instanceof HTMLElement && el.releasePointerCapture) {
    try {
      if (el.hasPointerCapture?.(e.pointerId)) el.releasePointerCapture(e.pointerId)
    } catch {
      /* ignore */
    }
  }
}

function onFabClick(e: MouseEvent) {
  if (suppressNextClick) {
    suppressNextClick = false
    e.preventDefault()
    return
  }
  bubbleOpen.value = !bubbleOpen.value
}

function onFabPointerCancel(e: PointerEvent) {
  clearPressTimer()
  const el = e.currentTarget
  if (el instanceof HTMLElement && el.releasePointerCapture) {
    try {
      if (el.hasPointerCapture?.(e.pointerId)) el.releasePointerCapture(e.pointerId)
    } catch {
      /* ignore */
    }
  }
}

function onBackdropClick() {
  bubbleOpen.value = false
}

function onPanelPointerDown(e: PointerEvent) {
  e.stopPropagation()
}

/** 气泡打开时禁止背后页面滚动，避免划气泡时误滑整页 */
const scrollLockSnapshot = {
  htmlOverflow: '',
  bodyOverflow: '',
  htmlOverscroll: '',
  bodyOverscroll: '',
}

function setBubbleScrollLock(locked: boolean) {
  const root = document.documentElement
  const body = document.body
  if (locked) {
    scrollLockSnapshot.htmlOverflow = root.style.overflow
    scrollLockSnapshot.bodyOverflow = body.style.overflow
    scrollLockSnapshot.htmlOverscroll = root.style.overscrollBehavior
    scrollLockSnapshot.bodyOverscroll = body.style.overscrollBehavior
    root.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    root.style.overscrollBehavior = 'none'
    body.style.overscrollBehavior = 'none'
  } else {
    root.style.overflow = scrollLockSnapshot.htmlOverflow
    body.style.overflow = scrollLockSnapshot.bodyOverflow
    root.style.overscrollBehavior = scrollLockSnapshot.htmlOverscroll
    body.style.overscrollBehavior = scrollLockSnapshot.bodyOverscroll
  }
}

watch(bubbleOpen, (open) => {
  setBubbleScrollLock(open)
})

onBeforeUnmount(() => {
  clearPressTimer()
  setBubbleScrollLock(false)
})
</script>

<template>
  <Teleport to="body">
    <div class="ftb-root">
      <Transition name="ftb-fade">
        <div
          v-show="bubbleOpen"
          class="ftb-backdrop"
          aria-hidden="true"
          @click="onBackdropClick"
        />
      </Transition>

      <Transition name="ftb-pop">
        <aside
          id="ftb-panel-content"
          v-show="bubbleOpen"
          class="ftb-panel"
          role="region"
          aria-label="语法术语：词类、活用与对照表"
          @pointerdown="onPanelPointerDown"
        >
          <h2 class="ftb-panel__title">常用术语</h2>
          <p class="ftb-panel__lead">
            词类、活用与其他概念精要；变形请结合五段・一段・カ変・サ変与イ・ナ一起记。
          </p>
          <section
            v-for="(grp, gi) in TERM_GROUPS"
            :key="gi"
            class="ftb-sec"
          >
            <h3 class="ftb-sec__h">{{ grp.heading }}</h3>
            <ul class="ftb-list">
              <li
                v-for="(item, ii) in grp.items"
                :key="`${gi}-${ii}`"
                class="ftb-card"
              >
                <h4 class="ftb-card__t">{{ item.title }}</h4>
                <p class="ftb-card__p">{{ item.text }}</p>
                <p v-if="item.example" class="ftb-card__ex">{{ item.example }}</p>
              </li>
            </ul>
          </section>

          <h3 class="ftb-sec__h ftb-sec__h--table">四、对照表（以書く为主）</h3>
          <div class="ftb-table-wrap">
            <table class="ftb-table">
              <thead>
                <tr>
                  <th scope="col">术语</th>
                  <th scope="col">简述</th>
                  <th scope="col">例</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, ri) in SUMMARY_ROWS" :key="ri">
                  <td>{{ row.term }}</td>
                  <td>{{ row.mean }}</td>
                  <td class="ftb-table__ex">{{ row.ex }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </aside>
      </Transition>

      <button
        type="button"
        class="ftb-fab"
        :aria-expanded="bubbleOpen"
        aria-controls="ftb-panel-content"
        aria-label="语法术语速查，长按回到页面顶部"
        @pointerdown="onFabPointerDown"
        @pointerup="onFabPointerUp"
        @pointercancel="onFabPointerCancel"
        @click="onFabClick"
        @contextmenu.prevent
      >
        <span class="ftb-fab__icon" aria-hidden="true">?</span>
      </button>
    </div>
  </Teleport>
</template>

<style scoped>
.ftb-root {
  position: fixed;
  z-index: 5000;
  right: max(2rem, env(safe-area-inset-right, 0px));
  bottom: max(5rem, env(safe-area-inset-bottom, 0px));
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.55rem;
}

.ftb-backdrop {
  position: fixed;
  inset: 0;
  z-index: 0;
  background: rgba(0, 0, 0, 0.12);
}

.ftb-fade-enter-active,
.ftb-fade-leave-active {
  transition: opacity 0.18s ease;
}

.ftb-fade-enter-from,
.ftb-fade-leave-to {
  opacity: 0;
}

.ftb-panel {
  position: relative;
  z-index: 1;
  width: min(calc(100vw - 2rem), 19.5rem);
  max-height: min(70vh, 28rem);
  overflow: auto;
  padding: 0.85rem 0.95rem 0.95rem;
  border-radius: 14px;
  text-align: left;
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 10px 36px rgba(0, 0, 0, 0.14);
  -webkit-overflow-scrolling: touch;
}

.ftb-pop-enter-active,
.ftb-pop-leave-active {
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}

.ftb-pop-enter-from,
.ftb-pop-leave-to {
  opacity: 0;
  transform: translateY(6px) scale(0.98);
}

.ftb-panel__title {
  margin: 0 0 0.35rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: #1b4332;
}

.ftb-panel__lead {
  margin: 0 0 0.65rem;
  font-size: 0.76rem;
  line-height: 1.45;
  opacity: 0.88;
  color: #444;
}

.ftb-sec {
  margin-bottom: 0.65rem;
}

.ftb-sec:last-of-type {
  margin-bottom: 0.5rem;
}

.ftb-sec__h {
  margin: 0 0 0.4rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: #2d6a4f;
  letter-spacing: 0.02em;
}

.ftb-sec__h--table {
  margin-top: 0.35rem;
  margin-bottom: 0.4rem;
}

.ftb-sec .ftb-list {
  gap: 0.45rem;
}

.ftb-table-wrap {
  margin: 0 0 0.15rem;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.ftb-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.68rem;
  line-height: 1.35;
}

.ftb-table th,
.ftb-table td {
  border: 1px solid rgba(0, 0, 0, 0.12);
  padding: 0.3rem 0.35rem;
  text-align: left;
  vertical-align: top;
}

.ftb-table th {
  background: rgba(45, 106, 79, 0.1);
  font-weight: 600;
  color: #1b4332;
  white-space: nowrap;
}

.ftb-table__ex {
  font-variant-numeric: tabular-nums;
  word-break: break-all;
}

.ftb-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.ftb-card {
  margin: 0;
  padding: 0.55rem 0.65rem;
  border-radius: 10px;
  background: rgba(45, 106, 79, 0.06);
  border: 1px solid rgba(45, 106, 79, 0.12);
}

.ftb-card__t {
  margin: 0 0 0.25rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: #1d3557;
}

.ftb-card__p {
  margin: 0 0 0.3rem;
  font-size: 0.8rem;
  line-height: 1.45;
  color: #333;
}

.ftb-card__ex {
  margin: 0;
  font-size: 0.74rem;
  line-height: 1.4;
  opacity: 0.82;
  color: #444;
}

.ftb-fab {
  position: relative;
  z-index: 2;
  width: 3rem;
  height: 3rem;
  padding: 0;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  background: linear-gradient(145deg, #2d6a4f, #1b4332);
  color: #fff;
  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1;
  box-shadow: 0 4px 14px rgba(27, 67, 50, 0.45);
  transition: transform 0.12s ease, box-shadow 0.12s ease;
}

.ftb-fab:hover {
  transform: scale(1.04);
  box-shadow: 0 6px 18px rgba(27, 67, 50, 0.5);
}

.ftb-fab:active {
  transform: scale(0.96);
}

.ftb-fab:focus {
  outline: none;
}

.ftb-fab:focus-visible {
  outline: 2px solid rgba(45, 106, 79, 0.55);
  outline-offset: 3px;
}

.ftb-fab__icon {
  display: block;
  transform: translateY(1px);
}

@media (prefers-color-scheme: dark) {
  .ftb-backdrop {
    background: rgba(0, 0, 0, 0.35);
  }

  .ftb-panel {
    background: rgba(32, 34, 38, 0.96);
    border-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.45);
  }

  .ftb-panel__title {
    color: #95d5b2;
  }

  .ftb-panel__lead {
    color: rgba(255, 255, 255, 0.75);
  }

  .ftb-sec__h {
    color: #95d5b2;
  }

  .ftb-table th,
  .ftb-table td {
    border-color: rgba(255, 255, 255, 0.14);
  }

  .ftb-table th {
    background: rgba(149, 213, 178, 0.12);
    color: #b8e0c8;
  }

  .ftb-card {
    background: rgba(149, 213, 178, 0.08);
    border-color: rgba(149, 213, 178, 0.15);
  }

  .ftb-card__t {
    color: #b8e0c8;
  }

  .ftb-card__p {
    color: rgba(255, 255, 255, 0.88);
  }

  .ftb-card__ex {
    color: rgba(255, 255, 255, 0.72);
  }

  .ftb-fab:focus-visible {
    outline-color: rgba(149, 213, 178, 0.65);
  }
}
</style>
