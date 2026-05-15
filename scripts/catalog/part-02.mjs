/** 假定（续）+ 原因 + 判断（前半） */
export default [
  {
    tag: '立场',
    pattern: '～にしたら／～にすれば',
    meaning: '从……立场来看',
    usages: [
      {
        continuation: '名词／代词 + にしたら／にすれば',
        examples: [
          {
            jaHtml:
              '<ruby>子供<rt>こども</rt></ruby>にしたら、<ruby>親<rt>おや</rt></ruby>の<ruby>言<rt>い</rt></ruby>うことは<ruby>窮屈<rt>きゅうくつ</rt></ruby>だろう。',
            zh: '从孩子的角度看，父母的话或许很束缚人。',
          },
        ],
      },
    ],
  },
  {
    tag: '假定',
    pattern: '～ものなら',
    meaning: '若能……的话（多接难以实现之事）',
    usages: [
      {
        continuation: '动词可能形 + ものなら',
        examples: [
          {
            jaHtml:
              '<ruby>戻<rt>もど</rt></ruby>れるものなら、あの<ruby>頃<rt>ころ</rt></ruby>に<ruby>戻<rt>もど</rt></ruby>りたい。',
            zh: '若能回去，真想回到那时。',
          },
        ],
      },
    ],
  },
  {
    tag: '假定',
    pattern: '～ようものなら',
    meaning: '若胆敢……则……（严重后果）',
    usages: [
      {
        continuation: '动词意向形 + ものなら',
        examples: [
          {
            jaHtml:
              'そんなことを<ruby>言<rt>い</rt></ruby>おうものなら、<ruby>烈火<rt>れっか</rt></ruby>のごとく<ruby>怒<rt>おこ</rt></ruby>られるだろう。',
            zh: '若敢说那种话，会被暴怒斥责吧。',
          },
        ],
      },
    ],
  },
  {
    tag: '假定',
    pattern: '～ないことには',
    meaning: '若不先……则……（无法后项）',
    usages: [
      {
        continuation: '动词ない形 + ことには',
        examples: [
          {
            jaHtml:
              '<ruby>本人<rt>ほんにん</rt></ruby>が<ruby>承諾<rt>しょうだく</rt></ruby>しないことには、<ruby>話<rt>はなし</rt></ruby>は<ruby>進<rt>すす</rt></ruby>まない。',
            zh: '若本人不同意，事情就无法推进。',
          },
        ],
      },
    ],
  },
  {
    tag: '假定',
    pattern: '～（よ）うが～まいが',
    meaning: '无论是否……都……',
    usages: [
      {
        continuation: '动词意向形 + が + 动词辞书形 + まいが',
        examples: [
          {
            jaHtml:
              '<ruby>雨<rt>あめ</rt></ruby>が<ruby>降<rt>ふ</rt></ruby>ろうが<ruby>降<rt>ふ</rt></ruby>るまいが、<ruby>試合<rt>しあい</rt></ruby>は<ruby>行<rt>おこな</rt></ruby>います。',
            zh: '无论下不下雨，比赛都举行。',
          },
        ],
      },
    ],
  },
  {
    tag: '假定',
    pattern: '～にも～ない',
    meaning: '想……也……不了（无力）',
    usages: [
      {
        continuation: '动词连用形 + にも + 同一动词可能形的未然形 + ない',
        examples: [
          {
            jaHtml:
              '<ruby>食<rt>た</rt></ruby>べるにも<ruby>食<rt>た</rt></ruby>べられない。',
            zh: '想吃也吃不下。',
          },
        ],
      },
    ],
  },
  {
    tag: '原因',
    pattern: '～ゆえに／～ゆえの',
    meaning: '因为……；由于……（书面）',
    usages: [
      {
        continuation: '用言连体形／名词 +（である）+ ゆえに／ゆえの',
        examples: [
          {
            jaHtml:
              '<ruby>若<rt>わか</rt></ruby>さゆえの<ruby>過<rt>あやま</rt></ruby>ちだった。',
            zh: '是年轻所犯的错。',
          },
          {
            jaHtml:
              '<ruby>病気<rt>びょうき</rt></ruby>ゆえに、<ruby>仕事<rt>しごと</rt></ruby>を<ruby>続<rt>つづ</rt></ruby>けることができない。',
            zh: '因病无法继续工作。',
          },
        ],
      },
    ],
  },
  {
    tag: '原因',
    pattern: '～にあって',
    meaning: '处于……状况下',
    usages: [
      {
        continuation: '名词 + にあって',
        examples: [
          {
            jaHtml:
              '<ruby>非常時<rt>ひじょうじ</rt></ruby>にあって、<ruby>冷静<rt>れいせい</rt></ruby>な<ruby>判断<rt>はんだん</rt></ruby>が<ruby>必要<rt>ひつよう</rt></ruby>だ。',
            zh: '在紧急状况下，需要冷静判断。',
          },
        ],
      },
    ],
  },
  {
    tag: '原因',
    pattern: '～とあっては',
    meaning: '若是……则……（特殊身份、场合下的必然）',
    usages: [
      {
        continuation: '动词／形容词连体形／名词 + とあっては',
        examples: [
          {
            jaHtml:
              '<ruby>上司<rt>じょうし</rt></ruby>の<ruby>命令<rt>めいれい</rt></ruby>とあっては、<ruby>従<rt>したが</rt></ruby>うしかない。',
            zh: '若是上司的命令，只能服从。',
          },
        ],
      },
    ],
  },
  {
    tag: '原因',
    pattern: '～ではあるまいし',
    meaning: '又不是……（反驳）',
    usages: [
      {
        continuation: '名词 + ではあるまいし',
        examples: [
          {
            jaHtml:
              '<ruby>子供<rt>こども</rt></ruby>ではあるまいし、そんな<ruby>簡単<rt>かんたん</rt></ruby>なこともわからないのか。',
            zh: '又不是小孩，连那么简单的事都不懂吗？',
          },
        ],
      },
    ],
  },
  {
    tag: '原因',
    pattern: '～てのことだ',
    meaning: '正因为……；是由于……才……',
    usages: [
      {
        continuation: '动词て形 + のことだ',
        examples: [
          {
            jaHtml:
              'かれが<ruby>成功<rt>せいこう</rt></ruby>したのは、<ruby>努力<rt>どりょく</rt></ruby>してのことだ。',
            zh: '他成功是因为努力。',
          },
        ],
      },
    ],
  },
  {
    tag: '立场',
    pattern: '～からすると／～からすれば',
    meaning: '从……角度来看',
    usages: [
      {
        continuation: '名词 + からすると／からすれば',
        examples: [
          {
            jaHtml:
              'わたしからすると、かれの<ruby>意見<rt>いけん</rt></ruby>は<ruby>間違<rt>まちが</rt></ruby>っていると<ruby>思<rt>おも</rt></ruby>う。',
            zh: '从我的角度看，我认为他的意见是错的。',
          },
        ],
      },
    ],
  },
  {
    tag: '立场',
    pattern: '～からいうと／～からいえば／～からいって',
    meaning: '从……来说',
    usages: [
      {
        continuation: '名词 + からいうと／からいえば／からいって',
        examples: [
          {
            jaHtml:
              '<ruby>品質<rt>ひんしつ</rt></ruby>からいうと、この<ruby>製品<rt>せいひん</rt></ruby>がいちばん<ruby>優<rt>すぐ</rt></ruby>れている。',
            zh: '从质量来说，这个产品最出色。',
          },
        ],
      },
    ],
  },
  {
    tag: '立场',
    pattern: '～上（じょう）',
    meaning: '在……上；从……方面看',
    usages: [
      {
        continuation: '名词 + 上（じょう）',
        examples: [
          {
            jaHtml:
              'このアパートは<ruby>便利<rt>べんり</rt></ruby>な<ruby>場所<rt>ばしょ</rt></ruby>にある<ruby>上<rt>じょう</rt></ruby>、<ruby>家賃<rt>やちん</rt></ruby>もやすい。',
            zh: '这间公寓地段方便，房租也便宜。',
          },
        ],
      },
    ],
  },
  {
    tag: '立场',
    pattern: '～といったら',
    meaning: '说到……；提起……',
    usages: [
      {
        continuation: '名词 + といったら',
        examples: [
          {
            jaHtml:
              '<ruby>富士山<rt>ふじさん</rt></ruby>といったら、やはり<ruby>冬<rt>ふゆ</rt></ruby>がいちばん<ruby>美<rt>うつく</rt></ruby>しい。',
            zh: '说到富士山，还是冬天最美。',
          },
        ],
      },
    ],
  },
  {
    tag: '评价',
    pattern: '～ならでは',
    meaning: '只有……才有的（特色）',
    usages: [
      {
        continuation: '名词 + ならでは',
        examples: [
          {
            jaHtml:
              'プロならではの<ruby>技<rt>わざ</rt></ruby>を<ruby>見<rt>み</rt></ruby>せてもらった。',
            zh: '见识了只有专业人士才有的技艺。',
          },
          {
            jaHtml:
              'この<ruby>味<rt>あじ</rt></ruby>は、この<ruby>店<rt>みせ</rt></ruby>ならではのものだ。',
            zh: '这个味道是这家店独有的。',
          },
        ],
      },
    ],
  },
  {
    tag: '立场',
    pattern: '～ともなると／～ともなれば',
    meaning: '一旦到了……地步；一到……程度就……',
    usages: [
      {
        continuation: '动词辞书形／名词 + ともなると／ともなれば',
        examples: [
          {
            jaHtml:
              'いちりゅうの<ruby>演奏家<rt>えんそうか</rt></ruby>ともなると、<ruby>練習量<rt>れんしゅうりょう</rt></ruby>が<ruby>桁違<rt>けたちが</rt></ruby>いだ。',
            zh: '一旦成为一流演奏家，练习量就不是一个级别。',
          },
        ],
      },
    ],
  },
  {
    tag: '立场',
    pattern: '～に至って（は）',
    meaning: '到了……地步；至于……',
    usages: [
      {
        continuation: '动词辞书形／名词 + に至って（は）',
        examples: [
          {
            jaHtml:
              '<ruby>事<rt>こと</rt></ruby>ここに<ruby>至<rt>いた</rt></ruby>っては、もう<ruby>後戻<rt>あともど</rt></ruby>りできない。',
            zh: '事已至此，无法回头。',
          },
        ],
      },
    ],
  },
  {
    tag: '立场',
    pattern: '～に至るまで',
    meaning: '直到……；连……都',
    usages: [
      {
        continuation: '名词 + に至るまで',
        examples: [
          {
            jaHtml:
              '<ruby>細<rt>こま</rt></ruby>かいところに<ruby>至<rt>いた</rt></ruby>るまで、<ruby>完璧<rt>かんぺき</rt></ruby>に<ruby>準備<rt>じゅんび</rt></ruby>された。',
            zh: '连细微之处都准备得完美无缺。',
          },
        ],
      },
    ],
  },
  {
    tag: '评价',
    pattern: '～と言っても過言ではない',
    meaning: '说……也不为过',
    usages: [
      {
        continuation: '用言连体形／名词 + と言っても過言ではない',
        examples: [
          {
            jaHtml:
              'かれの<ruby>貢献<rt>こうけん</rt></ruby>は<ruby>計<rt>はか</rt></ruby>り<ruby>知<rt>し</rt></ruby>れないと<ruby>言<rt>い</rt></ruby>っても<ruby>過言<rt>かごん</rt></ruby>ではない。',
            zh: '说他的贡献不可估量也不为过。',
          },
        ],
      },
    ],
  },
  {
    tag: '评价',
    pattern: '～までもない／～までもなく',
    meaning: '不必……；无须……',
    usages: [
      {
        continuation: '动词辞书形 + までもない／までもなく',
        examples: [
          {
            jaHtml:
              '<ruby>簡単<rt>かんたん</rt></ruby>なことだから、<ruby>説明<rt>せつめい</rt></ruby>するまでもない。',
            zh: '很简单，不必说明。',
          },
        ],
      },
    ],
  },
]
