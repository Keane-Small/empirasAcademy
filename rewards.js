/* ======== Minimal reward system ========
 - Tasks: complete to earn tokens
 - Store: gifts requiring tokens; locks/unlocks automatically
 - Persistence: localStorage
 - Simple level: increases every X tokens
*/

// data models (in a real app these would come from the database o
const TASKS = [
  {id:'t1', title:'Complete lesson: Algebra 1', desc:'Watch the lesson and pass quick quiz', reward:10},
  {id:'t2', title:'Submit assignment', desc:'Upload your homework', reward:20},
  {id:'t3', title:'Attend live session', desc:'Join and participate for 30m', reward:15},
  {id:'t4', title:'Peer review', desc:'Give feedback on a classmate\'s work', reward:8}
];

const GIFTS = [
  {id:'g1', name:'Custom Avatar Sticker', desc:'A downloadable avatar sticker pack.', cost:15},
  {id:'g2', name:'Mcdonalds Voucher', desc:'Free cone', cost:40},
  {id:'g3', name:'Movie Voucher', desc:'to selected Ster-Kinekor', cost:70},
  {id:'g4', name:'Stationary Box',desc:'a basic stationary pack for exams',cost:150},
  {id:'g5',name:'Xbox Game Pass',desc:'ultimate game pass',cost:150}

];

// persistence keys
const KEY = 'student_rewards_v1';

// initial state
let state = {
  tokens: 0,
  completed: {}, // taskId:true
  redemptions: []
};

// load state
function load(){
  try{
    const raw = localStorage.getItem(KEY);
    if(raw) state = JSON.parse(raw);
  }catch(e){console.error('load failed',e)}
}

function save(){
  localStorage.setItem(KEY, JSON.stringify(state));
}

// UI references
const tokenCount = document.getElementById('token-count');
const taskList = document.getElementById('task-list');
const storeEl = document.getElementById('store');
const progressBar = document.getElementById('progress-bar');
const levelChip = document.getElementById('level-chip');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const modalConfirm = document.getElementById('modal-confirm');
const modalCancel = document.getElementById('modal-cancel');
const quickEarn = document.getElementById('quick-earn');
const avatar = document.getElementById('avatar');

// configuration for leveling
const TOKENS_PER_LEVEL = 100; // each 100 tokens level up

// utility: render token count and progress
function renderBalance(){
  tokenCount.textContent = state.tokens;
  const level = Math.floor(state.tokens / TOKENS_PER_LEVEL) + 1;
  levelChip.textContent = 'Lv ' + level;
  const progress = (state.tokens % TOKENS_PER_LEVEL) / TOKENS_PER_LEVEL * 100;
  progressBar.style.width = progress + '%';
}

// generate tasks UI
function renderTasks(){
  taskList.innerHTML = '';
  TASKS.forEach(t =>{
    const done = !!state.completed[t.id];
    const div = document.createElement('div');
    div.className = 'task' + (done ? ' locked' : '');
    div.innerHTML = `<div class="meta"><h4>${t.title}</h4><p>${t.desc}</p></div><div style=\"text-align:right\"> <div class=\"muted\">+${t.reward} tokens</div> <div style=\"margin-top:8px\"> <button ${done? 'disabled' : ''} data-id=\"${t.id}\" class=\"btn-primary\">${done? 'Completed' : 'Complete'}</button></div></div>`;
    taskList.appendChild(div);
  });
}

// generate store UI
function renderStore(sortBy='popular'){
  let gifts = [...GIFTS];
  if(sortBy === 'cheap') gifts.sort((a,b)=>a.cost-b.cost);
  if(sortBy === 'expensive') gifts.sort((a,b)=>b.cost-a.cost);
  // popular keeps original order
  storeEl.innerHTML = '';
  gifts.forEach(g =>{
    const unlocked = state.tokens >= g.cost;
    const card = document.createElement('div');
    card.className = 'gift' + (unlocked? '' : ' locked');
    card.innerHTML = `<h3>${g.name}</h3><p class="muted">${g.desc}</p><div class=\"cost\"><div class=\"muted\">Cost: ${g.cost} ✦</div><div><button data-id=\"${g.id}\" ${unlocked? '' : 'disabled'} class=\"btn-primary\">Redeem</button></div></div>`;
    storeEl.appendChild(card);
  });
}

// handle task completion
function completeTask(id){
  const t = TASKS.find(x=>x.id===id);
  if(!t) return;
  if(state.completed[id]) return;
  state.tokens += t.reward;
  state.completed[id] = {when:Date.now(), reward:t.reward, title:t.title};
  state.redemptions = state.redemptions || [];
  save(); renderAll();
  flash(`+${t.reward} tokens!`);
}

// handle redemption
let pendingGift = null;
function askRedeem(gid){
  const g = GIFTS.find(x=>x.id===gid);
  if(!g) return;
  pendingGift = g;
  modalTitle.textContent = `Redeem: ${g.name}`;
  modalBody.textContent = `Cost: ${g.cost} tokens\n\n${g.desc}`;
  modal.style.display = 'flex';
}

function confirmRedeem(){
  if(!pendingGift) return closeModal();
  if(state.tokens < pendingGift.cost){
    alert('Not enough tokens.'); closeModal(); return;
  }
  state.tokens -= pendingGift.cost;
  state.redemptions.push({id:pendingGift.id, name:pendingGift.name, when:Date.now()});
  save(); renderAll();
  closeModal();
  flash(`Redeemed ${pendingGift.name}`);
}
function closeModal(){ pendingGift=null; modal.style.display='none'; }

// little toast-like flash
function flash(msg){
  const el = document.createElement('div');
  el.textContent = msg; el.style.position='fixed'; el.style.bottom='22px'; el.style.left='50%'; el.style.transform='translateX(-50%)'; el.style.background='linear-gradient(90deg,var(--accent),var(--accent-2))'; el.style.padding='10px 14px'; el.style.borderRadius='999px'; el.style.fontWeight=700; el.style.boxShadow='0 8px 24px rgba(2,6,23,0.6)'; el.style.zIndex=9999; document.body.appendChild(el);
  setTimeout(()=>{ el.style.transition='opacity 400ms'; el.style.opacity=0; setTimeout(()=>el.remove(),450)},1800);
}

// render everything
function renderAll(){ renderBalance(); renderTasks(); renderStore(document.getElementById('sort').value); updateAvatar(); }

function updateAvatar(){
  const name = document.getElementById('profile-title').textContent || 'A';
  avatar.textContent = name.trim().split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase();
}

// events
window.addEventListener('click', e=>{
  const btn = e.target.closest('button');
  if(!btn) return;
  if(btn.dataset.id && btn.textContent.trim().toLowerCase()==='complete'){
    completeTask(btn.dataset.id);
  }
  if(btn.dataset.id && btn.textContent.trim().toLowerCase()==='redeem'){
    askRedeem(btn.dataset.id);
  }
});

modalConfirm.addEventListener('click', confirmRedeem);
modalCancel.addEventListener('click', closeModal);
modal.addEventListener('click', (e)=>{ if(e.target===modal) closeModal(); });

quickEarn.addEventListener('click', ()=>{ state.tokens += 5; save(); renderAll(); flash('+5 tokens'); });

// sort
document.getElementById('sort').addEventListener('change', ()=>renderStore(document.getElementById('sort').value));

// initialization
load(); renderAll();

// expose state for debugging in console (remove in production)
window.__REWARDS = {state, TASKS, GIFTS};
