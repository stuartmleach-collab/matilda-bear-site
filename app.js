/* Matilda Bear — shared behaviour: mobile menu + gentle scroll reveal */
(function(){
  // Mobile nav toggle
  var t = document.querySelector('.menu-toggle');
  var n = document.getElementById('primary-nav');
  if(t && n){
    t.addEventListener('click', function(){
      var open = n.classList.toggle('open');
      t.setAttribute('aria-expanded', open);
    });
  }

  // Gentle scroll reveal (respects reduced-motion)
  var reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var els = [].slice.call(document.querySelectorAll('.reveal'));
  if(reduce || !('IntersectionObserver' in window)){
    els.forEach(function(el){ el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, {threshold:0.12, rootMargin:'0px 0px -8% 0px'});
  els.forEach(function(el){ io.observe(el); });
})();
