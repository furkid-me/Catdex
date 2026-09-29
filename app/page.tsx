'use client';

import { useMemo, useState } from 'react';
import { Camera, Cat, Globe2, Home, RefreshCw, Sparkles, Sticker, UserRound } from 'lucide-react';

const breeds = [
  ['Bengal','孟加拉貓','🐆'],['British Shorthair','英國短毛貓','🩶'],['Maine Coon','緬因貓','🦁'],
  ['Ragdoll','布偶貓','🤍'],['Siamese','暹羅貓','💎'],['Abyssinian','阿比西尼亞貓','🧡'],
  ['Russian Blue','俄羅斯藍貓','🌫️'],['Sphynx','斯芬克斯貓','🌸'],['Norwegian Forest','挪威森林貓','🌲'],
  ['Scottish Fold','蘇格蘭摺耳貓','🍪'],['Persian','波斯貓','☁️'],['Domestic Shorthair','米克斯／家貓','🌈']
];

const incoming = [
  {name:'Mochi', breed:'British Shorthair', place:'Tokyo, Japan', emoji:'🐱', tag:'SLEEPY'},
  {name:'Nori', breed:'Maine Coon', place:'Helsinki, Finland', emoji:'😺', tag:'FLOOF'},
  {name:'豆花', breed:'Domestic Shorthair', place:'Kaohsiung, Taiwan', emoji:'😽', tag:'BLEP'}
];

type Tab = 'home'|'dex'|'snap'|'collection'|'profile';

export default function Page(){
  const [tab,setTab]=useState<Tab>('home');
  const [swapped,setSwapped]=useState(false);
  const [match,setMatch]=useState(0);
  const discovered=useMemo(()=>new Set(['Bengal','British Shorthair','Maine Coon','Domestic Shorthair']),[]);
  const today=incoming[match];

  return <main className="app">
    <header><div className="brand"><span className="brandMark">C</span><b>CatDex</b></div><div className="streak">🔥 7</div></header>

    {tab==='home' && <section className="screen">
      <div className="hello"><div><span className="eyebrow">GOOD MORNING</span><h1>今天要遇見哪隻貓？</h1><p>每天一張真實貓咪貼紙，和世界上的陌生貓友交換。</p></div><div className="avatar">🐆</div></div>
      <button className="daily" onClick={()=>setTab('snap')}><div className="camera"><Camera size={28}/></div><div><b>Today's Cat</b><span>拍下今天的 Lucy</span></div><span className="arrow">›</span></button>
      <div className="sectionTitle"><h2>World CatDex</h2><button onClick={()=>setTab('dex')}>查看全部</button></div>
      <div className="progressCard"><div className="ring"><b>4</b><span>/ 73+</span></div><div><b>世界品種圖鑑</b><p>再發現 1 個新品種，解鎖下一枚徽章</p><div className="bar"><i/></div></div></div>
      <div className="sectionTitle"><h2>最近遇見</h2><span>4 cats</span></div>
      <div className="catRow">{incoming.map((c,i)=><div className="miniCard" key={c.name}><div className={'catPhoto p'+i}>{c.emoji}</div><b>{c.name}</b><small>{c.place.split(',')[0]}</small></div>)}</div>
    </section>}

    {tab==='snap' && <section className="screen snapScreen">
      {!swapped ? <><span className="eyebrow">DAILY STICKER · 01</span><h1>今天的 Lucy</h1><p className="lead">一天只能送出一張。今天這一刻，會旅行到世界某個人的圖鑑。</p>
      <div className="stickerCard"><div className="tape">TODAY</div><div className="bigCat">🐆</div><div className="stickerInfo"><div><span>#BENGAL</span><h2>Lucy</h2><p>Taiwan 🇹🇼 · Sep 29</p></div><Sparkles/></div><div className="rare">● COMMON · SUNNY CAT</div></div>
      <button className="primary" onClick={()=>setSwapped(true)}><RefreshCw size={20}/>送出去，交換一隻貓</button><small className="hint">交換後今日貼紙就會鎖定，明天再來。</small></>
      : <><span className="eyebrow">SWAP COMPLETE ✦</span><h1>有一隻貓來找你了！</h1><div className="stickerCard received"><div className="tape">NEW!</div><div className="bigCat">{today.emoji}</div><div className="stickerInfo"><div><span>#{today.breed.toUpperCase()}</span><h2>{today.name}</h2><p>{today.place}</p></div><Sparkles/></div><div className="rare">●● SPECIAL · {today.tag}</div></div><button className="primary" onClick={()=>setTab('collection')}><Sticker size={20}/>收進我的圖鑑</button><button className="textBtn" onClick={()=>{setSwapped(false);setMatch((match+1)%incoming.length)}}>Demo：換下一個配對</button></>}
    </section>}

    {tab==='dex' && <section className="screen"><span className="eyebrow">WORLD CATDEX</span><h1>世界貓咪圖鑑</h1><p className="lead">不同協會對品種分類略有差異。CatDex 以 Breed + Variant 保存，不把世界的貓硬塞進單一標準。</p><div className="dexGrid">{breeds.map(([en,zh,em],i)=><article className={discovered.has(en)?'found':''} key={en}><div>{discovered.has(en)?em:'?'}</div><span>#{String(i+1).padStart(3,'0')}</span><b>{zh}</b><small>{en}</small>{discovered.has(en)&&<i>DISCOVERED</i>}</article>)}</div></section>}

    {tab==='collection' && <section className="screen"><span className="eyebrow">MY COLLECTION</span><h1>我遇見過的貓</h1><div className="stats"><div><b>4</b><span>Breeds</span></div><div><b>7</b><span>Stickers</span></div><div><b>3</b><span>Countries</span></div></div><div className="collection">{[...incoming,{name:'Lucy',breed:'Bengal',place:'Taiwan',emoji:'🐆',tag:'SUNNY'}].map((c,i)=><div className="polaroid" key={c.name}><div className={'catPhoto p'+(i%3)}>{c.emoji}</div><b>{c.name}</b><span>{c.breed}</span><small>{c.place}</small></div>)}</div></section>}

    {tab==='profile' && <section className="screen"><span className="eyebrow">MY CATS</span><h1>我的貓</h1><div className="myCat"><div>🐆</div><section><h2>Lucy</h2><p>Bengal · Female</p><span>Taiwan 🇹🇼</span></section><button>編輯</button></div><div className="notice"><Cat/><div><b>米克斯也有自己的圖鑑位置</b><p>不需要猜血統。每一隻獨一無二的家貓，都可以交換、收藏與被世界看見。</p></div></div></section>}

    <nav>{[
      ['home',Home,'首頁'],['dex',Globe2,'圖鑑'],['snap',Camera,'拍照'],['collection',Sticker,'收藏'],['profile',UserRound,'我的']
    ].map(([id,Icon,label])=><button key={id as string} className={tab===id?'active':''} onClick={()=>setTab(id as Tab)}><Icon size={id==='snap'?25:21}/><span>{label as string}</span></button>)}</nav>
  </main>
}