import{a as m,S as f,i as n}from"./assets/vendor-DQvd0HNi.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const p="55080821-ae3987ed548899e0d87a95a06",h="https://pixabay.com/api/";function g(i){const r=new URLSearchParams({key:p,q:i,image_type:"photo",orientation:"horizontal",safesearch:"true"});return m.get(`${h}?${r}`).then(s=>s.data)}const c=document.querySelector(".gallery"),l=document.querySelector(".loader"),y=new f(".gallery a",{captionsData:"alt",captionDelay:250});function L(i){const r=i.map(({webformatURL:s,largeImageURL:a,tags:e,likes:t,views:o,comments:d,downloads:u})=>`
    <li class="gallery-item">
      <a class="gallery-link" href="${a}">
        <img class="gallery-image" src="${s}" alt="${e}" />
      </a>
      <div class="info">
        <div class="info-item"><b>Likes</b><span>${t}</span></div>
        <div class="info-item"><b>Views</b><span>${o}</span></div>
        <div class="info-item"><b>Comments</b><span>${d}</span></div>
        <div class="info-item"><b>Downloads</b><span>${u}</span></div>
      </div>
    </li>`).join("");c.innerHTML=r,y.refresh()}function b(){c.innerHTML=""}function v(){l.classList.remove("hidden")}function S(){l.classList.add("hidden")}const P=document.querySelector(".form");P.addEventListener("submit",w);function w(i){i.preventDefault();const r=i.currentTarget.elements["search-text"].value.trim();if(r===""){n.warning({message:"Please enter a search query!",position:"topRight"});return}b(),v(),g(r).then(s=>{if(s.hits.length===0){n.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}L(s.hits)}).catch(s=>{console.error(s),n.error({message:"Something went wrong. Please try again later.",position:"topRight"})}).finally(()=>{S(),i.target.reset()})}
//# sourceMappingURL=index.js.map
