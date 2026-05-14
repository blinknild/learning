/**
 * 从旧版 grammar-n2n3.json（顶层 examples）生成带 usages[].continuation 的新 JSON。
 * 运行：node scripts/build-grammar-usages.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const srcPath = path.join(root, 'src', 'data', 'grammar-n2n3.json')

const raw = JSON.parse(fs.readFileSync(srcPath, 'utf8'))

if (raw.version >= 2 && raw.items?.[0]?.usages) {
  console.log('Already has usages (version', raw.version, '), skip.')
  process.exit(0)
}

/** @param {{ jaHtml: string, zh: string }[]} ex */
function pick(ex, indices) {
  return indices.map((i) => {
    const e = ex[i]
    if (!e) throw new Error(`missing example index ${i}`)
    return { ...e }
  })
}

/** 接续方案：continuation + 取自旧 examples 的下标，或 inline 新例句 */
const plans = {
  1: [
    { continuation: '动词ます形去掉「ます」+ すぎる', indices: [0] },
    { continuation: 'イ形容词词干／ナ形容词词干 + すぎる', indices: [1] },
  ],
  2: [
    {
      continuation: 'サ变动词「する」→「し」+ やすい',
      examples: [
        {
          jaHtml:
            'このソフトはインストールしやすく、<ruby>操作<rt>そうさ</rt></ruby>もしやすい。',
          zh: '这款软件容易安装，操作也很简单。',
        },
      ],
    },
    {
      continuation: '一般动词ます形去掉「ます」+ やすい',
      examples: [
        {
          jaHtml: 'このペンは<ruby>書<rt>か</rt></ruby>きやすい。',
          zh: '这支笔很好写。',
        },
        {
          jaHtml: 'この<ruby>本<rt>ほん</rt></ruby>は<ruby>字<rt>じ</rt></ruby>が<ruby>大<rt>おお</rt></ruby>きくて<ruby>読<rt>よ</rt></ruby>みやすい。',
          zh: '这本书字大，容易读。',
        },
      ],
    },
  ],
  3: [
    {
      continuation: 'サ变动词「する」→「し」+ にくい',
      examples: [
        {
          jaHtml:
            'このフォームは<ruby>記入<rt>きにゅう</rt></ruby>しにくく、<ruby>間違<rt>まちが</rt></ruby>いやすい。',
          zh: '这张表不好填，还容易填错。',
        },
      ],
    },
    {
      continuation: '一般动词ます形去掉「ます」+ にくい',
      examples: [
        {
          jaHtml: 'この<ruby>靴<rt>くつ</rt></ruby>は<ruby>履<rt>は</rt></ruby>きにくい。',
          zh: '这双鞋不好穿。',
        },
        {
          jaHtml: '<ruby>彼<rt>かれ</rt></ruby>の<ruby>字<rt>じ</rt></ruby>は<ruby>読<rt>よ</rt></ruby>みにくい。',
          zh: '他的字很难认。',
        },
      ],
    },
  ],
  4: [
    { continuation: 'イ形容词词干（去掉い）+ そうだ（様態）', indices: [0] },
    { continuation: '动词ます形去掉「ます」+ そうだ（様態）', indices: [1] },
  ],
  5: [
    { continuation: '动词／イ形容词普通形 + そうだ（伝聞）', indices: [0] },
    {
      continuation: '名词／ナ形容词词干 + だ + そうだ（伝聞）',
      examples: [
        {
          jaHtml:
            'この<ruby>店<rt>みせ</rt></ruby>は<ruby>有名<rt>ゆうめい</rt></ruby>だそうだ。',
          zh: '听说这家店很有名。',
        },
      ],
    },
  ],
  6: [
    { continuation: '动词辞书形 + 途中で', indices: [0] },
    { continuation: '名词 + の途中で', indices: [1] },
  ],
  7: [{ continuation: '动词ます形 + ながら', indices: [0, 1] }],
  8: [
    { continuation: 'イ形容词词干 + く + て + しょうがない／仕方がない', indices: [0, 1] },
    {
      continuation: 'ナ形容词词干 + で + しょうがない／仕方がない',
      examples: [
        {
          jaHtml:
            'この<ruby>仕事<rt>しごと</rt></ruby>は<ruby>面倒<rt>めんどう</rt></ruby>でしょうがない。',
          zh: '这份工作麻烦透了。',
        },
      ],
    },
  ],
  9: [
    { continuation: '名词 + ばかりだ', indices: [0] },
    { continuation: '动词て形 + ばかり + いる', indices: [1] },
  ],
  10: [{ continuation: '动词辞书形 + 一方だ', indices: [0, 1] }],
  11: [
    { continuation: '动词辞书形 + ことにしている', indices: [0] },
    { continuation: '动词ない形 + ことにしている', indices: [1] },
  ],
  12: [
    { continuation: '动词辞书形／する + ことになる', indices: [0] },
    {
      continuation: '名词短语 + の／こと + になる（结果、规定）',
      examples: [
        {
          jaHtml:
            'このボタンを<ruby>押<rt>お</rt></ruby>すと、<ruby>予約<rt>よやく</rt></ruby>が<ruby>取<rt>と</rt></ruby>り<ruby>消<rt>け</rt></ruby>しになる。',
          zh: '一按这个按钮，预约就会被取消。',
        },
      ],
    },
  ],
  13: [
    { continuation: '动词辞书形／ない形 + ために（目的）', indices: [0] },
    { continuation: '名词 + の + ために（原因）', indices: [1] },
  ],
  14: [{ continuation: '名词 + のおかげで', indices: [0, 1] }],
  15: [
    { continuation: '名词 + のせいで', indices: [0] },
    { continuation: '名词 + のせいか（推测性原因）', indices: [1] },
  ],
  16: [
    { continuation: '动词辞书形 + ようにしている', indices: [0] },
    { continuation: '动词ない形 + ように（する）', indices: [1] },
  ],
  17: [
    { continuation: '名词 + のとおりに', indices: [0] },
    { continuation: '动词た形 + とおりに', indices: [1] },
  ],
  18: [
    { continuation: '动词辞书形 + ところだ（即将）', indices: [0] },
    { continuation: '动词ている形 + ところだ（正在进行）', indices: [1] },
  ],
  19: [
    { continuation: '动词假定形（ば）+ …', indices: [0] },
    {
      continuation: '动词／イ形容词过去（た）+ ら…',
      examples: [
        {
          jaHtml:
            '<ruby>春<rt>はる</rt></ruby>になったら、<ruby>花見<rt>はなみ</rt></ruby>に<ruby>行<rt>い</rt></ruby>きましょう。',
          zh: '到了春天的话，去看樱花吧。',
        },
      ],
    },
    {
      continuation: '名词／动词基本形 + なら…',
      examples: [
        {
          jaHtml:
            '<ruby>東京<rt>とうきょう</rt></ruby>に<ruby>行<rt>い</rt></ruby>くなら、<ruby>夏<rt>なつ</rt></ruby>がおすすめだ。',
          zh: '要去东京的话，推荐夏天。',
        },
      ],
    },
  ],
  20: [
    { continuation: '动词た形 + のに', indices: [0, 1] },
    {
      continuation: '动词辞书形／イ形容词基本形 + のに',
      examples: [
        {
          jaHtml:
            '<ruby>行<rt>い</rt></ruby>くのに、<ruby>地図<rt>ちず</rt></ruby>を<ruby>持<rt>も</rt></ruby>って<ruby>来<rt>こ</rt></ruby>なかった。',
          zh: '明明要去，却没带地图来。',
        },
      ],
    },
  ],
  21: [
    { continuation: '用言普通形（常体）+ わけではない', indices: [0, 1] },
  ],
  22: [{ continuation: '用言普通形 + わけがない', indices: [0, 1] }],
  23: [{ continuation: '动词辞书形 + わけにはいかない', indices: [0, 1] }],
  24: [
    { continuation: '动词可能形的ない形 + ことはない', indices: [0] },
    { continuation: '动词ない形 + ことはない', indices: [1] },
  ],
  25: [
    {
      continuation: 'サ变动词「する」未然形「せ」+ ざるを得ない',
      examples: [
        {
          jaHtml:
            '<ruby>上司<rt>じょうし</rt></ruby>の<ruby>命令<rt>めいれい</rt></ruby>なので、<ruby>報告<rt>ほうこく</rt></ruby>せざるを得ない。',
          zh: '因为是上司的命令，不得不（向上）报告。',
        },
      ],
    },
    {
      continuation: '一般动词未然形 + ざるを得ない',
      examples: [
        {
          jaHtml:
            '<ruby>体調<rt>たいちょう</rt></ruby>が<ruby>悪<rt>わる</rt></ruby>いので、<ruby>休<rt>やす</rt></ruby>まざるを得なかった。',
          zh: '因为身体不好，不得不休息。',
        },
      ],
    },
  ],
  26: [
    { continuation: '动词ます形去掉「ます」+ 得る／得ない', indices: [1] },
    {
      continuation: 'ある／あり + 得ない（固定）',
      examples: [
        {
          jaHtml: 'そんなミスはあり<ruby>得<rt>え</rt></ruby>ない。',
          zh: '不可能出现那种失误。',
        },
      ],
    },
  ],
  27: [{ continuation: '名词 + をめぐって', indices: [0, 1] }],
  28: [{ continuation: '名词 + に際して', indices: [0, 1] }],
  29: [{ continuation: '名词 + をきっかけに（して）', indices: [0, 1] }],
  30: [
    { continuation: '名词 + に伴って', indices: [0] },
    { continuation: '名词 + の + 名词 + に伴い', indices: [1] },
  ],
  31: [{ continuation: '动词ます形去掉「ます」+ かねない', indices: [0, 1] }],
  32: [{ continuation: '动词ます形去掉「ます」+ かねる', indices: [0, 1] }],
  33: [{ continuation: '名词 + を問わず', indices: [0, 1] }],
  34: [{ continuation: '名词 + に応じて', indices: [0, 1] }],
  35: [{ continuation: '名词 + に基づいて', indices: [0, 1] }],
  36: [{ continuation: '名词 + をもとに（して）', indices: [0, 1] }],
  37: [
    { continuation: '用言普通形／名词 + くらい／ぐらい（轻视、程度之低）', indices: [0] },
    { continuation: '数量词 + くらい／ぐらい + で（大约）', indices: [1] },
  ],
  38: [
    { continuation: '动词・イ形容词常体 + くせに', indices: [0] },
    { continuation: '名词 + のくせに', indices: [1] },
  ],
  39: [{ continuation: '用言普通形 + ものだ（感慨）', indices: [0, 1] }],
  40: [
    {
      continuation: '用言普通形 + ものだ（常理、必然）',
      indices: [0],
    },
    {
      continuation: '名词谓语句（常体）+ ものだ（评价）',
      examples: [
        {
          jaHtml:
            '<ruby>子供<rt>こども</rt></ruby>は<ruby>元気<rt>げんき</rt></ruby>なものだ。',
          zh: '小孩子本来就是有活力的。',
        },
      ],
    },
  ],
}

function buildUsages(oldItem) {
  const plan = plans[oldItem.id]
  if (!plan) throw new Error(`missing plan for id ${oldItem.id}`)
  const ex = oldItem.examples
  return plan.map((p) => {
    if (p.examples) {
      return { continuation: p.continuation, examples: p.examples }
    }
    return { continuation: p.continuation, examples: pick(ex, p.indices) }
  })
}

const items = raw.items.map((item) => {
  const { examples: _e, ...rest } = item
  return { ...rest, usages: buildUsages(item) }
})

const out = { version: 2, items }
fs.writeFileSync(srcPath, JSON.stringify(out, null, 2), 'utf8')
console.log('Wrote', srcPath, 'items:', items.length)
