(() => {
'use strict';
const T=LogicTask,app=document.getElementById('app'),DELAY=1200;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let session=null,stage='intro',task=null,order=[],events=[],results=[],clock=null,pending=null,token=0;
let queue=[],trained=[],testQueue=[],testKind=null,round=0,selectedClue=null,conversation=[],attempts=[],aiReady=false,waitMs=0;
const now=()=>performance.now();
function event(type,data={}){events.push({type,timeMs:Math.round(now()),stage,taskId:task?.id||null,...data});}
function visibleMs(){return clock?clock.active+(document.hidden?0:now()-clock.segment):0;}
function touch(type,data={}){if(clock&&clock.firstAction===null)clock.firstAction=now()-clock.start;event(type,data);}
function cancelReply(reason){if(!pending)return;clearTimeout(pending.timer);const elapsed=now()-pending.start;waitMs+=elapsed;event('ai_reply_cancelled',{reason,replyType:pending.kind,actualDelayMs:Math.round(elapsed)});pending=null;}
function invalidate(reason){cancelReply(reason);token++;clock=null;}
function scheduleReply(kind,deliver){
 const generation=token,start=now(),job={kind,start,timer:null};pending=job;
 event('ai_reply_requested',{replyType:kind,scheduledDelayMs:DELAY});
 job.timer=setTimeout(()=>{if(generation!==token||stage!=='training'||pending!==job)return;
  const elapsed=now()-start;waitMs+=elapsed;pending=null;event('ai_reply_displayed',{replyType:kind,actualDelayMs:Math.round(elapsed),scheduledDelayMs:DELAY});deliver();renderAssistant();
 },DELAY);renderAssistant();
}
function startClock(){const generation=token;requestAnimationFrame(()=>{if(generation!==token)return;const t=now();clock={start:t,segment:t,active:0,firstAction:null};event('trial_visible',{aiPanelVisible:stage==='training',onset:'same-render'});if(stage==='training')scheduleReply('initial',()=>{aiReady=true;});});}
document.addEventListener('visibilitychange',()=>{if(!clock)return;const t=now();if(document.hidden)clock.active+=t-clock.segment;else clock.segment=t;event('visibility',{hidden:document.hidden});});
window.addEventListener('beforeunload',e=>{if(session&&session.status==='in-progress'){e.preventDefault();e.returnValue='';}});
function intro(){
 window.scrollTo(0,0);
 app.innerHTML=`<section class="panel full welcome"><span class="badge">参与说明</span><h1>一起完成几道<br>逻辑排序题</h1><p>你将根据线索，把字母放到正确的位置。先完成一道操作练习，再进行四轮 AI 协作，最后独立完成四道题。</p><ol class="intro-list"><li>没有倒计时，可以按自己的节奏作答。</li><li>协作阶段请使用页面内提供的助手；独立作答阶段请自行完成。全程请勿使用其他 AI、搜索或截图保存答案。</li><li>协作阶段答对后进入下一轮；独立作答每题只提交一次。</li><li>参与完全自愿，可以随时结束。</li></ol><p class="small muted">本版本不会上传数据。作答记录仅暂存在当前页面，刷新或关闭后会丢失；结束时可下载记录交给研究者。请使用电脑，并尽量保持页面在前台。</p><label class="consent"><input id="consent" type="checkbox"> 我已阅读以上说明，愿意开始。</label><div class="actions"><button id="begin" disabled>开始操作练习 →</button></div></section>`;
 document.getElementById('consent').onchange=e=>{document.getElementById('begin').disabled=!e.target.checked;};
 document.getElementById('begin').onclick=()=>{if(document.getElementById('consent').checked)begin();};
}
function begin(){
 const requested=new URLSearchParams(location.search).get('condition');
 const mode=['delegated','assisted'].includes(requested)?requested:(crypto.getRandomValues(new Uint32Array(1))[0]%2?'assisted':'delegated');
 session={id:crypto.randomUUID(),version:'participant-01',bankVersion:T.BANK_VERSION,mode,assignment:requested===mode?'researcher-link':'client-random',startedAt:new Date().toISOString(),status:'in-progress',consent:true,contentSource:'scripted simulated AI; no runtime LLM',replyDelayMs:DELAY,trainingGate:'correct-only',questionnaireIncluded:false,trainingOrder:[],testOrder:[]};
 events=[];results=[];trained=[];round=0;event('session_start');document.getElementById('restart').hidden=false;startTrial(T.practice,'practice');
}
function transition(title,body,label,action){window.scrollTo(0,0);invalidate('transition');stage='transition';task=null;app.innerHTML=`<section class="panel full"><span class="badge">下一阶段</span><h1>${title}</h1>${body}<div class="actions"><button id="continue">${label}</button></div></section>`;document.getElementById('continue').onclick=action;}
function trainingIntro(){transition('操作练习已完成',`<p>接下来有四轮协作任务，每轮有六个对象。AI 助手会与题目同时出现，短暂等待后给出回复。</p><p>${session.mode==='assisted'?'需要帮助时，请先选择一条线索，再选择想问的问题。你可以围绕不同线索继续提问，将得到的信息整合到左侧排列中。':'助手会提供一份完整排列。请在左侧填写、检查后提交。'}</p><p>每轮答对后继续；答错可以修改。没有倒计时。</p>`,'开始第一轮协作 →',()=>{queue=T.shuffle(T.training);session.trainingOrder=queue.map(t=>t.id);event('training_order',{order:session.trainingOrder});round=1;startTrial(queue.shift(),'training');});}
function testIntro(){transition('协作阶段已完成','<p>接下来请独立完成四道题，页面不再提供 AI 帮助。请根据当前线索，自行排列字母。</p><p>每题只能提交一次；提交后不能返回修改。作答过程中不反馈对错。不确定时可以选择「本题暂未完成」。</p>','开始独立作答 →',()=>{testQueue=T.makeTestQueue(trained);session.testOrder=testQueue.map(x=>({id:x.task.id,kind:x.kind}));event('test_order',{order:session.testOrder});round=1;const next=testQueue.shift();testKind=next.kind;startTrial(next.task,'test');});}
function startTrial(next,kind){
 window.scrollTo(0,0);
 invalidate('trial_changed');task=next;stage=kind;order=Array(task.objects.length).fill('');selectedClue=null;conversation=[];attempts=[];waitMs=0;aiReady=false;
 event('trial_start',{round,kind,bankVersion:task.bankVersion,testKind:kind==='test'?testKind:null});renderTrial();startClock();
}
function board(){return `<div class="board" style="--slots:${order.length}">${order.map((x,i)=>`<label class="slot"><span>位置 ${i+1}</span><select aria-label="位置 ${i+1}" data-slot="${i}"><option value="">—</option>${task.objects.map(o=>`<option value="${o}" ${x===o?'selected':''}>${o}</option>`).join('')}</select></label>`).join('')}</div>`;}
function renderTrial(){
 const training=stage==='training',practice=stage==='practice',dialogue=training&&session.mode==='assisted';
 const heading=practice?'操作练习':training?`AI 协作 · 第 ${round} / 4 轮`:`独立作答 · 第 ${round} / 4 题`;
 app.innerHTML=`<div class="stagebar"><span class="badge">${heading}</span><span class="muted">${training?'题目与助手同时呈现':practice?'先熟悉操作方式':'请自行完成'}</span></div><div class="layout"><section class="panel"><h2>把${practice?'四':'六'}个对象放到正确位置</h2><p class="rules">每个对象只用一次，全部线索须同时成立。「前面／后面」不要求紧邻。位置从左到右编号。</p>${dialogue?'<p class="small muted">选择一条线索，再到助手区域选择想问的问题。</p>':''}<ol class="clues">${task.clues.map((x,i)=>`<li>${dialogue?`<button class="clue-choice" data-clue="${i}" aria-pressed="false">${esc(x)}</button>`:esc(x)}</li>`).join('')}</ol>${board()}<div id="boardError" class="error-text" role="status"></div><div class="actions"><button id="submit">${practice?'提交练习':'提交本轮排列'}</button><button id="incomplete" class="quiet">${practice||training?'结束作答':'本题暂未完成'}</button></div><p class="small muted">${practice||training?'答对后进入下一轮；答错可继续修改。':'本题只提交一次，提交后无法修改。'}</p></section>${training?'<aside id="assistant" class="panel ai"></aside>':`<aside class="panel"><span class="badge">${practice?'操作提示':'独立完成'}</span><h2 style="margin-top:18px">${practice?'点击空位，选择字母':'按自己的方法作答'}</h2><p class="muted">${practice?'每个位置下方都有一个选择框。根据线索依次选择字母，全部填完后点击提交。若要修改，重新选择即可。':'本阶段没有 AI 帮助，也不会逐题显示正确答案。请根据线索完成排列。'}</p></aside>`}</div>`;
 app.querySelectorAll('[data-slot]').forEach(s=>s.onchange=()=>{order[+s.dataset.slot]=s.value;touch('board_edit',{slot:+s.dataset.slot,value:s.value,order:order.slice()});document.getElementById('boardError').textContent='';const notice=document.getElementById('boardNotice');if(notice)notice.textContent='排列已更新。已有检查回复对应提问时的排列；需要时可再次请求检查。';});
 app.querySelectorAll('[data-clue]').forEach(b=>b.onclick=()=>selectClue(+b.dataset.clue));document.getElementById('submit').onclick=()=>submit(false);
 document.getElementById('incomplete').onclick=()=>stage==='test'?submit(true):exit();if(training)renderAssistant();
}
function selectClue(index){if(stage!=='training'||session.mode!=='assisted'||!Number.isInteger(index)||index<0||index>=task.clues.length)return;selectedClue=index;touch('clue_selected',{index,clue:task.clues[index]});app.querySelectorAll('[data-clue]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.clue===index)));renderAssistant();}
function requestHelp(kind){
 if(stage!=='training'||session.mode!=='assisted'||selectedClue===null||!aiReady||pending)return;
 const labels={meaning:'这条线索能确定什么？',combine:'它可以和哪些线索结合？',check:'请检查我当前的排列。'};if(!labels[kind])return;
 const snapshot=order.slice(),reply=T.localHelp(task,selectedClue,kind,snapshot),entry={clueIndex:selectedClue,clue:task.clues[selectedClue],kind,question:labels[kind],boardSnapshot:snapshot,status:'pending',reply:null};
 conversation.push(entry);touch('help_requested',{...entry});scheduleReply('help',()=>{entry.reply=reply;entry.status='displayed';event('help_exchange',{...entry});});
}
const thinking=()=>'<div class="thinking" role="status"><span class="thinking-dots" aria-hidden="true">● ● ●</span> AI 正在回复…</div>';
function renderAssistant(){
 const box=document.getElementById('assistant');if(!box)return;
 const head='<div class="ai-head"><span class="orb">AI</span><div><h2>AI 助手</h2><small>本轮协作已开始</small></div></div>';
 if(!aiReady){box.innerHTML=head+thinking();return;}
 if(session.mode==='delegated'){box.innerHTML=head+`<p>根据全部线索，完整排列为：</p><div class="answer">${task.answer.join(' → ')}</div><p class="small muted">请在左侧填写、检查并提交排列。</p>`;return;}
 box.innerHTML=head+`<p>你想先解决哪条线索？选择左侧线索，再告诉我当前想问的问题。我会回答这个局部问题，由你整合为完整排列。</p><div class="selected-clue">${selectedClue===null?'尚未选择线索':esc(task.clues[selectedClue])}</div><div class="ask-options">${[['meaning','这条线索能确定什么？'],['combine','它可以和哪些线索结合？'],['check','请检查我当前的排列']].map(([kind,label])=>`<button class="quiet" data-ask="${kind}" ${selectedClue===null||pending?'disabled':''}>${label}</button>`).join('')}</div><div class="dialogue-log" aria-live="polite">${conversation.map(e=>`<div class="chat-pair"><div class="chat-user"><span class="small muted">你 · ${esc(e.clue)}</span><p>${esc(e.question)}</p>${e.kind==='check'?`<small>提问时的排列：${e.boardSnapshot.map(x=>esc(x||'—')).join(' · ')}</small>`:''}</div><div class="chat-ai"><span class="small muted">AI 助手</span>${e.status==='pending'?thinking():`<p>${esc(e.reply)}</p>`}</div></div>`).join('')}</div><p id="boardNotice" class="small muted">可以更换线索继续提问，或在左侧完成排列。对话不会自动填写答案。</p>`;
 box.querySelectorAll('[data-ask]').forEach(b=>b.onclick=()=>requestHelp(b.dataset.ask));const log=box.querySelector('.dialogue-log');if(log)log.scrollTop=log.scrollHeight;
}
function result(incomplete){return {phase:stage,round,taskId:task.id,bankVersion:task.bankVersion,provenance:task.provenance,template:task.anchorSide||'practice',testKind:stage==='test'?testKind:null,order:order.slice(),incomplete,correct:!incomplete&&T.validFormat(order,task)&&T.positionsCorrect(order,task)===order.length,positionsCorrect:T.positionsCorrect(order,task),elapsedMs:clock?Math.round(now()-clock.start):0,visibleMs:Math.round(visibleMs()),aiWaitMs:Math.round(waitMs),firstActionMs:clock?.firstAction===null?null:clock?Math.round(clock.firstAction):null,attempts:attempts.map(a=>({...a,order:a.order.slice()})),firstAttemptCorrect:attempts[0]?.correct??null,firstAttemptElapsedMs:attempts[0]?.elapsedMs??null,helpRequests:conversation.length,helpReplies:conversation.filter(e=>e.status==='displayed').length,conversation:conversation.map(e=>({...e,boardSnapshot:e.boardSnapshot.slice()}))};}
function submit(incomplete){
 if(!clock||!['practice','training','test'].includes(stage))return;
 if(!incomplete&&!T.validFormat(order,task)){document.getElementById('boardError').textContent=`请将${order.length===4?'四':'六'}个对象各放入一次，检查空位或重复。`;touch('format_error',{order:order.slice()});return;}
 const correct=!incomplete&&T.positionsCorrect(order,task)===order.length;
 const attempt={number:attempts.length+1,order:order.slice(),correct,incomplete,elapsedMs:Math.round(now()-clock.start),visibleMs:Math.round(visibleMs())};attempts.push(attempt);touch('answer_attempt',attempt);
 if(stage!=='test'&&!correct&&!incomplete){document.getElementById('boardError').textContent=stage==='practice'?'尚未满足全部线索。试着把三条先后关系连起来，再检查排列。':'排列尚未满足全部线索。请检查并修改，答对后才能继续。';event('training_gate_blocked',{attempt:attempt.number});return;}
 cancelReply('trial_submitted');const r=result(incomplete);results.push(r);event('trial_submit',r);const previous=stage;invalidate('trial_end');
 if(previous==='practice'){trainingIntro();return;}
 if(previous==='training'){trained.push(task);if(queue.length){round++;startTrial(queue.shift(),'training');}else testIntro();return;}
 if(testQueue.length){round++;const next=testQueue.shift();testKind=next.kind;startTrial(next.task,'test');}else finish(false);
}
function download(){const payload={session,results,events,materials:[T.practice,...T.training,...T.novel]};const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}),u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download=`logic-session-${session.id}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);}
function finish(withdrawn){
 window.scrollTo(0,0);
 invalidate('session_end');event(withdrawn?'session_withdrawn':'session_complete');session.status=withdrawn?'withdrawn':'completed';session.endedAt=new Date().toISOString();stage='done';task=null;document.getElementById('restart').hidden=true;
 app.innerHTML=`<section class="panel full"><span class="badge">${withdrawn?'作答已结束':'全部完成'}</span><h1>${withdrawn?'已结束本次作答':'感谢你的参与'}</h1><p>${withdrawn?'已保留当前页面中的已有记录。':'你已完成本次排序任务。请下载作答记录，并按研究者的安排提交。'}</p><p class="small muted">记录只保存在当前页面，刷新或关闭后会丢失。文件名使用随机编号，不需要填写姓名。</p><div class="actions"><button id="export">下载作答记录</button></div><details class="debrief" open><summary>关于本任务中的 AI 助手</summary><p>本任务研究不同人机分工方式下的任务体验。为使不同参与者接收的信息保持一致，助手使用预设的标准化回复，并未实时调用大语言模型。短暂等待也是统一设置的呈现方式。</p><p>这不是个人智力或能力诊断，单次作答不能用来评价你的总体能力。为避免影响其他参与者，请先不要向尚未参与的人透露题目和助手设置。</p></details><p class="small muted">本次记录编号：${esc(session.id)}</p></section>`;
 document.getElementById('export').onclick=download;
}
function exit(){if(!session||session.status!=='in-progress')return;if(!confirm('确定结束本次作答吗？你可以在结束页面下载已有记录。'))return;
 if(task&&['practice','training','test'].includes(stage)){cancelReply('withdrawn');const r=result(true);results.push(r);event('trial_abandoned',r);}finish(true);
}
document.getElementById('restart').onclick=exit;intro();
})();
