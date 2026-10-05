const cols=['#F7D6E0','#EFC4D2','#F3C9BC','#DFA3B7','#E9D3E3'];
const bd=document.getElementById('beads');let n=0;
'MUSIC TALENT YOU'.split('').forEach(ch=>{const s=document.createElement('span');
if(ch===' '){s.className='bead sp'}else{s.className='bead';s.textContent=ch;s.style.background=cols[n%5];s.style.animationDelay=(n*60)+'ms';n++}bd.appendChild(s)});

const words=[['talented', 'very good at something', 'Taylor is a talented singer.'],
['creative', 'able to make new ideas', 'Taylor is a creative songwriter.'],
['successful', 'doing very well', 'Taylor has a successful career.'],
['powerful', 'very strong', 'Her performance is powerful.'],
['emotional', 'showing strong feelings', 'This song is very emotional.'],
['inspiring', 'making people feel motivated', 'Her story is inspiring.'],
['performance', 'when an artist sings or plays for people', 'Her performance is amazing.'],
['audience', 'the people watching a show', 'The audience sings with Taylor.'],
['career', 'the work someone does for many years', 'Taylor has a long career.'],
['melody', 'the main musical sound in a song', 'I love the melody of this song.'],
['personality', 'the way a person thinks and behaves', 'Taylor has a creative personality.'],
['confidence', 'the feeling that you can do something well', 'She sings with confidence.'],
['passion', 'a strong feeling of love for something', 'Taylor has a passion for music.'],
['journey', 'a long experience or path in life', 'Her career is an amazing journey.']];
const kc=['var(--a)','var(--b)','var(--c)','var(--d)','var(--e)'];
const wg=document.getElementById('wordgrid');
words.forEach((w,i)=>{const b=document.createElement('button');b.className='flip';b.id='w-'+w[0];b.style.setProperty('--k',kc[i%5]);
b.setAttribute('aria-label','Word card: '+w[0]);
b.innerHTML='<span><i><em>💗</em>'+w[0].toUpperCase()+'</i><i><b>'+w[1]+'</b><br>“'+w[2]+'”</i></span>';
b.onclick=()=>b.classList.toggle('on');wg.appendChild(b)});

const dq=[['Do you think Taylor is talented?','Yes, I think she is talented. / No, I don\'t think so.'],
['Do you like emotional songs?','Yes, I do. / No, I don\'t like emotional songs.'],
['Do you enjoy powerful performances?','Yes, I do. I enjoy… / No, I don\'t.'],
['Do you like creative artists?','Yes, I do. My favorite creative artist is…'],
['Do you watch live performances?','Yes, I do. / No, I don\'t. I watch… on TV.'],
['Do you have a favorite singer?','Yes, I do. My favorite singer is… / No, I don\'t.'],
['Do you know a Taylor Swift song?','Yes, I do. It is called…'],
['Do you sing with confidence?','Yes, I do. / No, I don\'t. I sing when…'],
['Do you have a passion for something?','Yes, I do. I have a passion for…'],
['Do you want to go to a concert?','Yes, I do. I want to see…']];
const qs=document.getElementById('qs');
dq.forEach(q=>{const d=document.createElement('div');d.className='q';
d.innerHTML='<p>'+q[0]+'</p><p class="starts">Start like this: '+q[1]+'</p><textarea rows="2" aria-label="Your answer" placeholder="Write your answer here…"></textarea>';qs.appendChild(d)});

const quiz=[
['Where is Taylor Swift from?',['The United States','England','Brazil'],0],
['What instruments does Taylor play?',['The drums and the flute','The guitar and the piano','The violin only'],1],
['Taylor writes her own songs.',['True','False'],0],
['What are Taylor\'s fans called?',['Swifties','Singers','Swimmers'],0],
['What does “talented” mean?',['very good at something','very tired','very old'],0],
['The audience is…',['the people watching a show','a musical instrument','a type of song'],0],
['Her journey is inspiring. This means her story…',['makes people feel motivated','is very short','is not true'],0]];
let qi=0,score=0;
const $=id=>document.getElementById(id);
function show(){const q=quiz[qi];$('qt').textContent=(qi+1)+'. '+q[0];$('msg').textContent='';$('next').hidden=true;
$('bar').style.width=(qi/quiz.length*100)+'%';const o=$('opts');o.innerHTML='';
q[1].forEach((t,i)=>{const b=document.createElement('button');b.textContent=t;b.onclick=()=>{
[...o.children].forEach((x,j)=>{x.disabled=true;if(j===q[2])x.classList.add('ok')});
if(i===q[2]){score++;$('msg').textContent='✅ Correct! Great job!'}else{b.classList.add('no');$('msg').textContent='❌ Not this time. The green answer is correct.'}
$('next').hidden=false;$('next').textContent=qi===quiz.length-1?'See my score':'Next question'};o.appendChild(b)})}
$('next').onclick=()=>{qi++;if(qi<quiz.length){show()}else{$('bar').style.width='100%';
$('qt').textContent='You scored '+score+' out of '+quiz.length+'!';
$('opts').innerHTML='';$('msg').textContent=score>=5?'🌟 Amazing! You are a real Swiftie!':'💪 Good try! Read the story again and play again.';
$('next').textContent='Play again';$('next').onclick=()=>location.reload()}};
show();

function sent(){const s=$('o1').value.trim()||'…';
$('res').textContent='My favorite Taylor Swift song is “'+s+'”. I like it because it is '+$('o2').value+'. I think Taylor is '+$('o3').value+'.'}
['o1','o2','o3'].forEach(i=>$(i).addEventListener('input',sent));sent();

$('theme').onclick=()=>{const r=document.documentElement;r.dataset.theme=r.dataset.theme==='dark'?'light':'dark'};
const re=new RegExp('\\b('+words.map(w=>w[0]).join('|')+')(s)?\\b','gi');
document.querySelectorAll('.read p,.side li,.fact,.era p,.q>p:first-child').forEach(el=>{el.innerHTML=el.innerHTML.replace(re,(m,w)=>'<a href="#words" class="vw" data-w="'+w.toLowerCase()+'">'+m+'</a>')});
document.addEventListener('click',e=>{const a=e.target.closest('.vw');if(!a)return;e.preventDefault();const c=document.getElementById('w-'+a.dataset.w);if(!c)return;c.scrollIntoView({behavior:'smooth',block:'center'});c.classList.add('on');c.animate([{transform:'scale(1.07)'},{transform:'scale(1)'}],{duration:500})});

/* ---- Salva o progresso no navegador (localStorage) ---- */
const store={get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
document.querySelectorAll('#qs textarea').forEach((t,i)=>{const k='ts-ans-'+i;t.value=store.get(k)||'';t.addEventListener('input',()=>store.set(k,t.value))});
['o1','o2','o3'].forEach(id=>{const k='ts-'+id;const v=store.get(k);if(v!==null)$(id).value=v;$(id).addEventListener('input',()=>store.set(k,$(id).value))});
sent();
const th=store.get('ts-theme');if(th)document.documentElement.dataset.theme=th;
$('theme').addEventListener('click',()=>store.set('ts-theme',document.documentElement.dataset.theme));
