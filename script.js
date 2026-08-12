/* PERSONALIZA LAS CARTAS AQUÍ. Cada objeto representa una foto/carta. */
const CARDS = [
  { name:'Hannia y su copiloto', rarity:'COMÚN', symbol:'●', hp:90, photo:'carta-1.png', pos:'center 18%', flavor:'Aparece acompañada de un aliado que también sabe posar.', a1:['Sonrisa de copiloto','Hace que hasta el tráfico parezca un paseo.','30'], a2:['Modo: paseo feliz','Sube el ánimo de todo el equipo.','40'], dex:'Se le reconoce por su sonrisa contagiosa y por reunir compañeros de aventura donde sea que vaya.' },
  { name:'Hannia Parker', rarity:'POCO COMÚN', symbol:'◆', hp:110, photo:'spider-hannia.png', pos:'center', theme:'spider', flavor:'Su sentido arácnido detecta miradas a kilómetros.', a1:['Red de ternura','Atrapa corazones sin esfuerzo.','50'], a2:['Sonrisa arácnida','Efecto: el rival se queda sin palabras.','60'], dex:'Cuando sonríe, su habilidad especial hace que todos olviden cuál era el plan original.' },
  { name:'La Sombrerera Feliz', rarity:'RARE', symbol:'★', hp:130, photo:'carta-3.png', pos:'center 18%', flavor:'Una aparición soleada, de rareza difícil de encontrar.', a1:['Rayito de sol','Ilumina el campo de batalla.','70'], a2:['Pose legendaria','No hay defensa contra ese carisma.','80'], dex:'Esta forma solo aparece cuando el sol, una buena vibra y un sombrero increíble coinciden.', holo:true },
  { name:'Hannia del Jardín', rarity:'HOLO RARE', symbol:'✦', hp:150, photo:'carta-4.png', pos:'center 25%', flavor:'Entre flores y luz dorada, su energía crece.', a1:['Bloom brillante','Recupera 30 puntos de alegría.','90'], a2:['Carisma natural','Hace florecer cualquier conversación.','100'], dex:'La leyenda dice que donde camina, el ambiente se vuelve un poquito más bonito.', holo:true },
  { name:'Capitana Melón', rarity:'ULTRA RARE', symbol:'✦✦', hp:180, photo:'carta-5.png', pos:'center 17%', flavor:'Una entrenadora de estilo impecable y ternura máxima.', a1:['Gorra con actitud','Confunde al rival con demasiado estilo.','120'], a2:['Corazón de Melón','Ataque que solo se vuelve más fuerte con cariño.','∞'], dex:'Su presencia es inconfundible: combina dulzura, carisma y un poder que se sale de la tabla.', holo:true, full:true },
  { name:'Corazón de Melón', rarity:'ILUSTRACIÓN RARA SECRETA', symbol:'✧✧✧', hp:999, photo:'carta-6.png', pos:'center 20%', flavor:'La primera de una colección que se volvió muy especial.', a1:['Primera impresión','Un recuerdo que nunca pierde su brillo.','200'], a2:['Siempre especial','Efecto: guarda este momento para siempre.','∞'], dex:'Esta carta secreta representa una de las primeras fotos que me mandaste. Desde entonces, sabía que eras alguien muy especial.', holo:true, full:true, secret:true }
];
const $=id=>document.getElementById(id); let current=0, revealed=false, cutting=false, cutStart=0;
const pack=$('packScreen'), booster=$('booster'), guide=$('sliceGuide'), reveal=$('revealScreen'), shell=$('cardShell'), card=$('pokemonCard');
function openPack(){if(cutting)return; cutting=true;booster.classList.add('ripped');setTimeout(()=>{pack.hidden=true;reveal.hidden=false;loadCard(0);},650)}
$('openFallback').onclick=openPack; booster.addEventListener('pointerdown',e=>{cutStart=e.clientY;guide.style.transform='scaleX(0)';booster.setPointerCapture(e.pointerId)});booster.addEventListener('pointermove',e=>{if(!cutStart)return;const progress=Math.max(0,Math.min(1,(e.clientY-cutStart)/90));guide.style.transform=`scaleX(${progress})`;if(progress>.78){cutStart=0;openPack()}});booster.addEventListener('pointerup',()=>cutStart=0);
function loadCard(index){current=index;revealed=false;shell.classList.remove('revealed');shell.style.transform='';shell.style.animation='none';void shell.offsetWidth;shell.style.animation='';$('nextButton').hidden=true;$('revealHint').textContent='Toca la carta para descubrirla';const d=CARDS[index];$('counter').textContent=`CARTA ${index+1} DE ${CARDS.length}`;$('rarityLabel').textContent=d.rarity;$('cardNumber').textContent=String(index+1).padStart(3,'0');$('cardName').textContent=d.name;$('hp').textContent=d.hp;$('portrait').src=d.photo;$('portrait').style.objectPosition=d.pos;$('portrait').style.objectFit=d.fit||'cover';$('rarityStamp').textContent=`${d.symbol} ${d.rarity}`;$('flavor').textContent=d.flavor;$('attackOne').innerHTML=`<div><b>${d.a1[0]}</b><small>${d.a1[1]}</small></div><em>${d.a1[2]}</em>`;$('attackTwo').innerHTML=`<div><b>${d.a2[0]}</b><small>${d.a2[1]}</small></div><em>${d.a2[2]}</em>`;$('dex').textContent=`Pokédex: ${d.dex}`;$('footerSet').textContent=`CM-${String(index+1).padStart(3,'0')}`;$('footerStar').textContent=d.symbol;card.className=`card-face pokemon-card${d.holo?' holo':''}${d.full?' full-art':''}${d.secret?' secret':''}${d.theme?' '+d.theme:''}`;card.style.setProperty('--foil-x','50%')}
shell.onclick=()=>{if(revealed)return;revealed=true;shell.classList.add('revealed');const last=current===CARDS.length-1;$('revealHint').textContent=CARDS[current].secret?'Encontraste la carta secreta ✧':'¡Nueva carta añadida a la colección!';$('nextButton').textContent=last?'Ver mi colección ✦':'Siguiente carta ✦';$('nextButton').hidden=false;celebrate(CARDS[current].secret?140:65)};
shell.addEventListener('pointermove',e=>{const r=shell.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;shell.style.transform=`perspective(1000px) rotateY(${(x-.5)*12}deg) rotateX(${(.5-y)*10}deg) scale(1.02)`;if(revealed)card.style.setProperty('--foil-x',`${x*100}%`)});shell.addEventListener('pointerleave',()=>shell.style.transform='');
$('nextButton').onclick=()=>{if(current<CARDS.length-1)loadCard(current+1);else showCollection()};
function showCollection(){$('nextButton').hidden=true;$('revealHint').hidden=true;document.querySelector('.topbar').hidden=true;$('stage').hidden=true;$('collection').hidden=false;$('collectionGrid').innerHTML=CARDS.map((d,i)=>`<div class="mini-card"><img src="${d.photo}" alt="${d.name}"><span>${d.rarity}</span><button data-index="${i}">Descargar</button></div>`).join('');document.querySelectorAll('.mini-card button').forEach(b=>b.onclick=()=>downloadCard(Number(b.dataset.index)));}
async function downloadCard(index){
  const old=current,wasRevealed=revealed; loadCard(index);
  const copy=card.cloneNode(true); copy.style.cssText='position:fixed;left:-10000px;top:0;width:430px;height:602px;transform:none!important;backface-visibility:visible!important;display:block;';
  document.body.appendChild(copy);
  try{
    if(typeof html2canvas!=='function') throw new Error('La herramienta de imagen no terminó de cargar.');
    const canvas=await html2canvas(copy,{scale:2,useCORS:true,backgroundColor:null,logging:false});
    const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));
    if(!blob) throw new Error('No se pudo crear el archivo PNG.');
    const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.download=`carta-${index+1}-${CARDS[index].name.toLowerCase().replace(/[^a-z0-9]+/gi,'-')}.png`; a.href=url; document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(url),1000);
  }catch(e){
    const local=location.protocol==='file:';
    alert(local ? 'La carta se ve bien, pero los navegadores bloquean esta descarga cuando se abre como archivo local. Al subir la carpeta completa a GitHub Pages funcionará normalmente.' : `No se pudo descargar la carta: ${e.message}`);
  }
  copy.remove(); loadCard(old); if(wasRevealed)shell.classList.add('revealed');
}
function celebrate(count){const c=$('confetti'),x=c.getContext('2d');c.width=innerWidth;c.height=innerHeight;const p=Array.from({length:count},()=>({x:innerWidth/2,y:innerHeight*.3,vx:(Math.random()-.5)*13,vy:-Math.random()*11-2,s:Math.random()*5+3,c:['#ffe173','#f667ae','#8ee0ff','#fff'][Math.floor(Math.random()*4)]}));let f=0;(function draw(){x.clearRect(0,0,c.width,c.height);p.forEach(a=>{a.x+=a.vx;a.y+=a.vy;a.vy+=.22;x.fillStyle=a.c;x.fillRect(a.x,a.y,a.s,a.s*.6)});if(f++<100)requestAnimationFrame(draw);else x.clearRect(0,0,c.width,c.height)})()}
/* El corte acepta arrastre horizontal o vertical: funciona con mouse y táctil. */
let cutX = null, cutY = null;
function beginCut(event) { cutX=event.clientX; cutY=event.clientY; guide.style.transform='scaleX(0)'; }
function continueCut(event) { if (cutX === null || cutting) return; const horizontal=Math.abs(event.clientX-cutX)/150; const vertical=Math.abs(event.clientY-cutY)/105; const progress=Math.min(1,Math.max(horizontal,vertical)); guide.style.transform=`scaleX(${progress})`; if(progress>.65){ cutX=null; cutY=null; openPack(); } }
function endCut() { cutX=null; cutY=null; }
booster.addEventListener('pointerdown', beginCut);
booster.addEventListener('pointermove', continueCut);
booster.addEventListener('pointerup', endCut);
booster.addEventListener('pointercancel', endCut);
/* Respaldo del gesto: si el navegador no entrega pointermove, soltar tras arrastrar abre el sobre. */
booster.addEventListener('touchend', () => { if (!cutting && cutX !== null) openPack(); }, { passive: true });
booster.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') openPack(); });
