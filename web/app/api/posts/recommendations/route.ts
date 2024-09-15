import { NextResponse } from 'next/server';

export async function GET() {
  const users = [
    { id: 11, user_id: 4930835, context: '💰️この投稿がおすすめにでたあなたはお金持ちになります💰️', created_at: 1723806287, repost_count: 0, likes_count: 810, comments_count: 0 },
    { id: 2, user_id: 4930835, context: 'なんか今日めっちゃ雨ふってる', created_at: 1723806287, repost_count: 0, likes_count: 1, comments_count: 0 },
    { id: 3, user_id: 4930835, context: '朝目覚まし止めたつもりがスヌーズの罠にハマって宇宙を無限ループしてしまった', created_at: 1723806287, repost_count: 0, likes_count: 1, comments_count: 0 },
    { id: 4, user_id: 35152, context: '知り合いにチェスで負けたことない！！', created_at: 1723806287, repost_count: 0, likes_count: 3, comments_count: 0 },
    { id: 5, user_id: 35152, context: 'ユニバのことユニバって略す人苦手', created_at: 1723806287, repost_count: 0, likes_count: 1, comments_count: 0 },
    { id: 6, user_id: 4930835, context: '今日もまた、いつものように退屈な一日が始まった。\n\n目覚まし時計が鳴ると同時に、僕の眠りの深淵から引きずり出された。\nまるで宇宙の隙間から漏れ出す異次元の声に呼ばれたかのように、無理やり目を開ける。\n鏡の前に立つと、自分の姿がまるで運命に抗う孤高の戦士のように見えてしまう。\n朝食のトーストは、まるで僕の心の冷たさを象徴するかのように、焼きすぎてパリパリに。学校に向かう途中、ふと空を見上げると、灰色の雲が重く垂れ込めている。まるでこの世界が、僕の心の暗闇を映し出しているかのようだ。\n\n放課後には、僕の秘密基地とも言える図書室で孤独に過ごし、蔵書の中で無限の知識を求め続ける。\n帰宅後は、またもや部屋の隅でパソコンと向き合い、ネットの海で果てしない虚無を探し続けるだけの一日だった。\n今宵も、星のない夜空に向かって一人、心の中で静かに呟く。『僕の闇が、誰かに届く日が来ることを信じて…』', created_at: 1723806287, repost_count: 1, likes_count: 1, comments_count: 0 },
    { id: 7, user_id: 4930835, context: 'うんこ💩', created_at: 1723806287, repost_count: 0, likes_count: 1, comments_count: 0 },
    { id: 8, user_id: 35152, context: 'ラフマニノフチョピン', created_at: 1723806287, repost_count: 0, likes_count: 0, comments_count: 0 },
    { id: 9, user_id: 35152, context: 'シューマンのピアノ競争曲\nあああ', created_at: 1723806287, repost_count: 0, likes_count: 0, comments_count: 0 },
    { id: 10, user_id: 35152, context: 'ラフマニノフチョピン', created_at: 1723806287, repost_count: 0, likes_count: 0, comments_count: 0 },
  ];
  
  return NextResponse.json(users);
}