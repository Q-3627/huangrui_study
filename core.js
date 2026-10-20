(function(root){
'use strict';
const BANK_VERSION='logic-bank-01';
function makeTask(id,answer,anchorSide,clueOrder,source){
  const start=anchorSide==='start',anchor=answer[start?1:4],partner=answer[start?0:5],chain=start?answer.slice(2):answer.slice(0,4);
  const roles=[['before',chain[1],chain[2]],['before',...(start?[partner,anchor]:[anchor,partner])],['before',chain[2],chain[3]],['afterCount',anchor,start?4:1],['before',chain[0],chain[1]]];
  const constraints=clueOrder.map(i=>roles[i]);
  return {id,objects:['A','B','C','D','E','F'],answer,anchorSide,anchor,partner,chain,
    constraints,roles:clueOrder,
    clues:constraints.map(c=>c[0]==='before'?`${c[1]} 排在 ${c[2]} 前面。`:`${c[1]} 后面恰好有${c[2]===4?'四':'一'}个对象。`),
    bankVersion:BANK_VERSION,provenance:source||'自编结构匹配题：基于 Wu et al. (2026) Figure 2a 逻辑结构改编，未使用隐藏视觉标记；未经经验等难度检验。'};
}
const training=[
 makeTask('train-01',['A','D','B','F','E','C'],'start',[0,1,2,3,4],'Wu et al. (2026), Figure 2a 中文改写；先后关系统一正向措辞，交互为改编，无隐藏视觉标记。'),
 makeTask('train-02',['F','C','E','A','D','B'],'end',[4,3,0,2,1]),
 makeTask('train-03',['E','B','F','D','C','A'],'start',[2,4,3,1,0]),
 makeTask('train-04',['C','A','D','B','F','E'],'end',[1,0,4,3,2])
];
const novel=[
 makeTask('novel-01',['B','F','A','C','D','E'],'start',[3,2,1,4,0]),
 makeTask('novel-02',['D','E','C','F','B','A'],'end',[0,1,3,2,4])
];
const practice={id:'practice-01',objects:['A','B','C','D'],answer:['C','A','D','B'],clues:['C 排在 A 前面。','A 排在 D 前面。','D 排在 B 前面。'],constraints:[['before','C','A'],['before','A','D'],['before','D','B']],provenance:'自编四对象操作练习，不计正式指标。',bankVersion:BANK_VERSION};
function validFormat(order,t){return order.length===t.objects.length&&new Set(order).size===order.length&&order.every(x=>t.objects.includes(x));}
function fits(order,c){const p=x=>order.indexOf(x)+1;if(c[0]==='before')return p(c[1])<p(c[2]);if(c[0]==='afterCount')return order.length-p(c[1])===c[2];throw Error('Unknown constraint');}
function positionsCorrect(order,t){return t.answer.reduce((n,x,i)=>n+Number(order[i]===x),0);}
function permutations(xs){if(!xs.length)return [[]];return xs.flatMap((x,i)=>permutations(xs.filter((_,j)=>j!==i)).map(p=>[x,...p]));}
function solutions(t){return permutations(t.objects).filter(p=>t.constraints.every(c=>fits(p,c)));}
function shuffle(xs,rand=Math.random){const a=xs.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(rand()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function localHelp(t,index,kind,order){
 if(!Number.isInteger(index)||index<0||index>=t.clues.length)throw Error('Select a valid clue');
 const role=t.roles[index],a=t.anchor,p=t.partner,c=t.chain,start=t.anchorSide==='start';
 if(kind==='check'){
  const filled=order.filter(Boolean);
  if(new Set(filled).size!==filled.length)return '当前排列中有对象重复。每个对象只能使用一次，请检查后调整。';
  if(!validFormat(order,t))return '当前排列还有空位，尚不能检查完整答案。你可以继续填写，或针对线索询问含义与结合方法。';
  const bad=t.constraints.findIndex(x=>!fits(order,x));
  return bad<0?'你提问时的排列满足全部五条线索。请自行决定是否提交。':`你提问时的排列与「${t.clues[bad]}」不符。请重看这条线索，自行调整左侧排列。`;
 }
 if(kind==='meaning'){
  if(role===3)return `六个位置中，${a} 后面需要留下${start?'四':'一'}个位置。用 6 减去后方对象数，得到 ${a} 在第 ${start?2:5} 位。你可以将这个局部结论填入左侧。`;
  const rule=t.constraints[index];return `${rule[1]} 必须排在 ${rule[2]} 前面，但不要求相邻。单靠这条线索还不能确定具体位置；先保留这个先后关系，再结合涉及相同字母的线索。`;
 }
 if(kind!=='combine')throw Error('Unknown help request');
 if(role===1||role===3)return start?`数量线索确定 ${a} 在第 2 位；${p} 又必须在 ${a} 前面，因此 ${p} 只能在第 1 位。其余四个对象还需要你根据关系线索整合。`:`数量线索确定 ${a} 在第 5 位；${p} 又必须在 ${a} 后面，因此 ${p} 只能在第 6 位。其余四个对象还需要你根据关系线索整合。`;
 const triple=role===4?c.slice(0,3):c.slice(1);
 return `找到涉及相同字母的先后线索，可以合并为 ${triple.join(' → ')}。这是三个对象的相对顺序；继续寻找与链条端点有关的线索，再将结果放入剩余位置。`;
}
function makeTestQueue(done){
 const old=['start','end'].map(side=>shuffle(done.filter(t=>t.anchorSide===side))[0]);
 if(old.some(t=>!t))throw Error('Both structural families must be trained');
 return shuffle([...old.map(t=>({task:t,kind:'old'})),...novel.map(t=>({task:t,kind:'new'}))]);
}
const api={BANK_VERSION,training,novel,practice,validFormat,fits,positionsCorrect,permutations,solutions,shuffle,localHelp,makeTestQueue};
root.LogicTask=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window==='undefined'?globalThis:window);
