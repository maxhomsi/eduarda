(function(){
  // Nav solid on scroll
  var nav=document.getElementById('nav');
  if(nav) window.addEventListener('scroll',function(){ nav.classList.toggle('solid',window.scrollY>80); },{passive:true});

  // Mobile menu
  var ham=document.querySelector('.ham'),mob=document.querySelector('.mob'),mx=document.querySelector('.mob-x');
  if(ham) ham.addEventListener('click',function(){ mob.classList.add('open');ham.classList.add('open');document.body.style.overflow='hidden'; });
  if(mx) mx.addEventListener('click',function(){ mob.classList.remove('open');ham&&ham.classList.remove('open');document.body.style.overflow=''; });
  document.querySelectorAll('.mob a').forEach(function(a){ a.addEventListener('click',function(){ mob.classList.remove('open');ham&&ham.classList.remove('open');document.body.style.overflow=''; }); });

  // Scroll animations
  var io=new IntersectionObserver(function(e){ e.forEach(function(x){ if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);} }); },{threshold:0.08});
  document.querySelectorAll('.a').forEach(function(el){ io.observe(el); });

  // Counter
  function count(el){
    var t=parseInt(el.dataset.target),s=el.dataset.suffix||'',dur=1400,t0=performance.now();
    (function f(now){ var p=Math.min((now-t0)/dur,1),v=Math.floor((1-Math.pow(1-p,3))*t);
      el.textContent=v+s; if(p<1)requestAnimationFrame(f); else el.textContent=t+s; })(t0);
  }
  var cio=new IntersectionObserver(function(e){ e.forEach(function(x){ if(x.isIntersecting){count(x.target);cio.unobserve(x.target);} }); },{threshold:0.5});
  document.querySelectorAll('[data-target]').forEach(function(el){ cio.observe(el); });

  // Gallery lightbox
  document.querySelectorAll('.gi').forEach(function(g){
    g.addEventListener('click',function(){
      var img=g.querySelector('img');if(!img)return;
      var o=document.createElement('div');
      o.style.cssText='position:fixed;inset:0;z-index:9999;background:rgba(13,9,7,.96);display:flex;align-items:center;justify-content:center;cursor:pointer;animation:fadeIn .3s ease';
      var i=document.createElement('img');i.src=img.src;i.style.cssText='max-width:92vw;max-height:92vh;object-fit:contain;';
      o.appendChild(i);o.addEventListener('click',function(){o.remove();});document.body.appendChild(o);
    });
  });

  // Smooth anchor
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click',function(e){
      var t=document.querySelector(this.getAttribute('href'));
      if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'});}
    });
  });

  if(!document.getElementById('fi-style')){
    var s=document.createElement('style');s.id='fi-style';
    s.textContent='@keyframes fadeIn{from{opacity:0}to{opacity:1}}';
    document.head.appendChild(s);
  }
})();
