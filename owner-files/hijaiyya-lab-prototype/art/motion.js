/* 2D schematic transitions, not a biomechanical rig. No recording/scoring. */
const active=new WeakSet();
export async function playMouth(svg){
 if(active.has(svg))return {mode:'busy',duration:0};active.add(svg);
 const tongue=svg.querySelector('[data-role="tongue-shape"],#tongue-shape'),spot=svg.querySelector('[data-role="sound-spot"],#sound-spot'),reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 try{
  if(reduced||!tongue?.dataset.rest||tongue.dataset.rest===tongue.dataset.target){await (spot||svg).animate([{opacity:.2},{opacity:1}],{duration:140}).finished;return {mode:'fade',duration:140};}
  const rest=tongue.dataset.rest,target=tongue.dataset.target,tap=tongue.dataset.mode==='tap';
  const sample=d=>{const p=document.createElementNS('http://www.w3.org/2000/svg','path');p.setAttribute('d',d);p.style.visibility='hidden';svg.append(p);const len=p.getTotalLength(),ps=Array.from({length:100},(_,i)=>{const q=p.getPointAtLength(len*i/100);return[q.x,q.y]});p.remove();return ps};
  const a=sample(rest),b=sample(target),start=performance.now();tongue.setAttribute('d',rest);
  await new Promise(resolve=>{function frame(now){const t=Math.min(1,(now-start)/650),f=tap?(t<.5?t*2:(1-t)*2):t,u=f*f*(3-2*f);tongue.setAttribute('d',a.map((v,i)=>`${i?'L':'M'}${(v[0]+(b[i][0]-v[0])*u).toFixed(2)} ${(v[1]+(b[i][1]-v[1])*u).toFixed(2)}`).join(' ')+'Z');if(t<1)requestAnimationFrame(frame);else{tongue.setAttribute('d',tap?rest:target);resolve()}}requestAnimationFrame(frame)});
  return {mode:tap?'single-tap':'tongue-morph',duration:650};
 }finally{active.delete(svg)}
}
// Prefix every local SVG ID/reference when mounting several instances.
export function prepareSVG(text,prefix){
 const doc=new DOMParser().parseFromString(text,'image/svg+xml');if(doc.querySelector('parsererror'))throw Error('Invalid SVG');const svg=doc.documentElement;
 for(const el of svg.querySelectorAll('[id]')){const id=el.id;if(['tongue-shape','sound-spot','lips'].includes(id))el.dataset.role=id;el.id=prefix+id;}
 for(const el of svg.querySelectorAll('*'))for(const a of [...el.attributes]){if(a.name==='id')continue;if(a.value.includes('url(#'))el.setAttribute(a.name,a.value.replace(/url\(#([^)]*)\)/g,(_,id)=>`url(#${prefix}${id})`));if((a.name==='href'||a.name==='xlink:href')&&a.value.startsWith('#'))el.setAttribute(a.name,'#'+prefix+a.value.slice(1));}
 return document.importNode(svg,true);
}
// Explicit lip-state crossfade for closed Ba/Mim versus rounded consonantal Waw.
// Both SVGs must have identical head geometry/canvas; only lips and contact are replaced.
export async function switchLipState(svg,nextSVG){
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,duration=reduced?140:300;
 for(const role of ['lips','sound-spot']){
  const old=svg.querySelector(`[data-role="${role}"],#${role}`),next=nextSVG.querySelector(`[data-role="${role}"],#${role}`);if(!old||!next)continue;
  await old.animate([{opacity:1},{opacity:0}],{duration:duration/2}).finished;const copy=next.cloneNode(true);copy.id=old.id;old.replaceWith(copy);await copy.animate([{opacity:0},{opacity:1}],{duration:duration/2}).finished;
 }const oldLabels=[...svg.children].filter(e=>['text','title'].includes(e.localName)),newLabels=[...nextSVG.children].filter(e=>['text','title'].includes(e.localName));oldLabels.forEach((e,i)=>{if(newLabels[i])e.textContent=newLabels[i].textContent});return {mode:'lip-crossfade',duration:duration*2};
}
