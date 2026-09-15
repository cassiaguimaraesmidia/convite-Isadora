const $ = (id) => document.getElementById(id);
const telas = {logo:$('tela-logo'), inicial:$('tela-inicial'), video:$('tela-video'), data:$('tela-data'), presentes:$('tela-presentes')};
const preview=$('video-preview');
const video=$('video-abertura');
const videoData=$('video-data');
const musica=new Audio('imagens/musica.mp3');
musica.loop=true; musica.preload='auto'; musica.volume=0.34;
let musicaAtiva=false, musicaTimer=null;

// O preview fica somente no trecho inicial: sem a aparição do pincel.
const LOOP_FIM_PREVIEW=2.55;
const ATRASO_MUSICA=1100;

function mostrar(nome){
  Object.entries(telas).forEach(([key,el])=>{const ativo=key===nome; el.classList.toggle('ativa',ativo); el.setAttribute('aria-hidden',String(!ativo));});
  if(nome==='inicial') iniciarPreview(); else pararPreview();
  if(nome==='data'){ iniciarVideoData(); iniciarMusicaComAtraso(ATRASO_MUSICA); } else { pararVideoData(); }
  if(nome==='presentes') iniciarMusicaComAtraso(450);
}
function iniciarPreview(){preview.currentTime=0; preview.muted=true; preview.play().catch(()=>{});}
function pararPreview(){preview.pause();}
function iniciarVideoData(){
  if(!videoData) return;
  videoData.currentTime=0;
  videoData.muted=true;
  videoData.play().catch(()=>{});
}
function pararVideoData(){
  if(!videoData) return;
  videoData.pause();
}
preview.addEventListener('timeupdate',()=>{if(preview.currentTime>=LOOP_FIM_PREVIEW){preview.currentTime=0; preview.play().catch(()=>{});}});

function iniciarMusicaComAtraso(ms=ATRASO_MUSICA){
  clearTimeout(musicaTimer);
  if(musicaAtiva){$('controle-musica').hidden=false; return;}
  musicaTimer=setTimeout(()=>{
    musicaAtiva=true;
    musica.play().catch(()=>{});
    $('controle-musica').hidden=false;
  },ms);
}
function pararMusica(){clearTimeout(musicaTimer); musica.pause(); musica.currentTime=0; musicaAtiva=false; $('controle-musica').hidden=true;}

function abrirVideo(){
  pararPreview();
  clearTimeout(musicaTimer);
  mostrar('video');
  video.currentTime=0; video.muted=false; video.volume=0.9;
  const p=video.play();
  if(p) p.catch(()=>{video.muted=true; video.play().catch(()=>{});});
}
setTimeout(()=>mostrar('inicial'),2300);
$('abrir-convite').addEventListener('click',abrirVideo);
$('pular-video').addEventListener('click',()=>{video.pause(); mostrar('data');});
video.addEventListener('ended',()=>mostrar('data'));

const LINK_CONFIRMAR='https://docs.google.com/forms/d/e/1FAIpQLSetxCkuQS563eoby-LNiGRh7A2S8ALm2wLp9LdRiNbA2oNkvA/viewform';
$('btn-confirmar').addEventListener('click',()=>window.open(LINK_CONFIRMAR,'_blank','noopener'));
$('btn-presentes').addEventListener('click',()=>mostrar('presentes'));
$('voltar-data').addEventListener('click',()=>mostrar('data'));
const links={
 calcado:'https://www.google.com/search?q=t%C3%AAnis+infantil+26+feminino&sca_esv=8f75b58b20ab037a&rlz=1CDGOYI_enBR1163BR1163&hl=pt&sxsrf=APpeQntyuhvnO0miJHWWPBuwGpOOmT8qDg%3A1789421916660&ei=XGmoap3iJ9W05OUPxNbZiA4&biw=1280&bih=551&oq=cakdados+de+me+inas+26&gs_lp=Egxnd3Mtd2l6LXNlcnAiFmNha2RhZG9zIGRlIG1lIGluYXMgMjYqCggAGEcY1gQYsAMyChAAGEcY1gQYsAMyChAAGEcY1gQYsAMyChAAGEcY1gQYsAMyChAAGEcY1gQYsAMyChAAGEcY1gQYsAMyChAAGEcY1gQYsAMyChAAGEcY1gQYsAMyChAAGEcY1gQYsAMyFxAuGNwGGLgGGNoGGNgCGMgDGLAD2AEBMhcQLhjcBhi4BhjaBhjYAhjIAxiwA9gBATIXEC4Y3AYYuAYY2gYY2AIYyAMYsAPYAQFIwzZQAFgAcAF4AZABAJgBAKABAKoBALgBAcgBAJgCAaACC5gDAOIDBRIBMSBAiAYBkAYLugYECAEYGZIHATGgBwCyBwC4BwDCBwMzLTHIBwiACAE&sclient=gws-wiz-serp',
 roupas:'https://www.google.com/search?q=roupas+meninas+tamanho+6&sca_esv=848c9d4d3f0b36ed&rlz=1CDGOYI_enBR1163BR1163&hl=pt&biw=390&bih=669&sxsrf=APpeQnsazpBhhbzhJI1QvwAV8QPPfaGNzw%3A1788407897446&ei=WfCYaqGHGouG5OUP8tSWuQ4&oq=roupas+meninas+tamanho+6&gs_lp=EhNtb2JpbGUtZ3dzLXdpei1zZXJwIhhyb3VwYXMgbWVuaW5hcyB0YW1hbmhvIDYyBBAAGB4yCBAhGKABGMMEMgUQABjvBUi9ZVCgJVirWnAHeAGQAQCYAdQCoAH3E6oBBzAuOS4yLjK4AQPIAQD4AQGYAg-gAtEMwgIHECMYsAMYJ8ICChAAGEcY1gQYsAPCAgQQIxgnwgIFEAAYgATCAgYQABgHGB7CAgYQABgIGB7CAgYQABgeGA3CAggQABgIGB4YDcICChAhGAoYoAEYwwTCAggQABiABBiiBJgDAIgGAZAGCJIHBzcuNS4xLjKgB6ossgcHMC41LjEuMrgHugzCBwYwLjExLjTIByCACAE&sclient=mobile-gws-wiz-serp',
 livros:'https://www.google.com/search?q=livros+de+valores+cristao+infantil+menina+5anos&sca_esv=def51ffada9549d3&rlz=1CDGOYI_enBR1163BR1163&hl=pt&udm=2&biw=390&bih=669&sxsrf=APpeQnusWZw7YblLE6kalmGxsnZkkQNnFA%3A1788696153464&ei=WVadau_8G4uy5OUPwuCXwA4&oq=livros+de+valores+cristao+infantil+menina+5anos&gs_lp=EhJtb2JpbGUtZ3dzLXdpei1pbWciL2xpdnJvcyBkZSB2YWxvcmVzIGNyaXN0YW8gaW5mYW50aWwgbWVuaW5hIDVhbm9zMgQQIRgKMggQABiJBRiiBDIIEAAYgAQYogRImSZQjwhYzRxwAXgAkAEAmAGBAaABowaqAQMxLja4AQPIAQD4AQGYAgegAtYFwgIHECMYyQIYJ5gDAIgGAZIHAzEuNqAHvQ6yBwMwLja4B9MFwgcFMC42LjHIBwyACAE&sclient=mobile-gws-wiz-img',
 brinquedos:'https://www.google.com/search?tbnid=14JFID_vMOqcpM&tbnh=0&tbnw=0&hl=pt&rlz=1CDGOYI_enBR1163BR1163&sca_esv=def51ffada9549d3&cs=0&sxsrf=APpeQnvg7f-YqB0MsJwM6ndsfEgE5T6VkA:1788696405927&udm=2&tbs=rimg:CdeCRSA_17zDqYek79d92qUVM4AIA&q=brinquedos+educativos+5+anos+menina&sa=X&ved=2ahUKEwiZ24mv9dmWAxWWBrkGHSK1K5cQuIIBegQIdhAA&biw=390&bih=669&dpr=3#sbfbu=1&pi=brinquedos%20educativos%205%20anos%20menina'
};
Object.entries(links).forEach(([tipo,url])=>$('presente-'+tipo).addEventListener('click',()=>window.open(url,'_blank','noopener')));
$('controle-musica').addEventListener('click',()=>{if(musica.paused){musica.play().catch(()=>{});$('controle-musica').textContent='♫';$('controle-musica').setAttribute('aria-label','Pausar música');}else{musica.pause();$('controle-musica').textContent='×';$('controle-musica').setAttribute('aria-label','Tocar música');}});

const dataFesta=new Date('2026-10-12T14:00:00-03:00').getTime();
function atualizarContador(){
  const restante=Math.max(0,dataFesta-Date.now()); const s=Math.floor(restante/1000); const dias=Math.floor(s/86400); const horas=Math.floor((s%86400)/3600); const minutos=Math.floor((s%3600)/60); const segundos=s%60;
  $('dias').textContent=String(dias).padStart(2,'0'); $('horas').textContent=String(horas).padStart(2,'0'); $('minutos').textContent=String(minutos).padStart(2,'0'); $('segundos').textContent=String(segundos).padStart(2,'0');
  if(restante<=0) $('contador').querySelector('.contador-titulo').textContent='É HOJE!';
}
atualizarContador(); setInterval(atualizarContador,1000);
