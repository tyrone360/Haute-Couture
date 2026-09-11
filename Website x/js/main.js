// Simple add-to-cart animation and border wave on cursor move

document.addEventListener('DOMContentLoaded', ()=>{
  const buttons = document.querySelectorAll('.add-to-cart');
  const cartCountEl = document.getElementById('cart-count');
  const cartBtn = document.getElementById('cart-btn');
  let cartCount = parseInt(localStorage.getItem('cartCount') || '0', 10) || 0;
  if(cartCountEl) cartCountEl.textContent = cartCount;
  buttons.forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      btn.animate([
        { transform: 'scale(1)' },
        { transform: 'scale(0.98)' },
        { transform: 'scale(1)' }
      ], { duration: 220 });
      // simple visual feedback: temporarily change text
      const original = btn.textContent;
      btn.textContent = 'Added ✓';
      // update cart count
      cartCount += 1;
      if(cartCountEl) cartCountEl.textContent = cartCount;
      localStorage.setItem('cartCount', String(cartCount));
      if(cartBtn) cartBtn.animate([{ transform: 'translateY(0)' },{ transform: 'translateY(-4px)' },{ transform: 'translateY(0)' }], { duration: 300 });
      setTimeout(()=> btn.textContent = original, 900);
    });
  });

  // Cursor-driven border wave: apply transform to nearest .card
  const cards = Array.from(document.querySelectorAll('.card'));
  window.addEventListener('mousemove', (e)=>{
    const x = e.clientX; const y = e.clientY;
    cards.forEach(card=>{
      const r = card.getBoundingClientRect();
      const cx = r.left + r.width/2; const cy = r.top + r.height/2;
      const dx = x - cx; const dy = y - cy;
      const dist = Math.hypot(dx,dy);
      const max = 400; // influence radius
      const t = Math.max(0, 1 - dist/max);
      // set CSS variable for intensity
      card.style.setProperty('--wave', (t*1.2).toFixed(3));
      card.style.setProperty('--dx', (dx/30).toFixed(2)+'px');
      card.style.setProperty('--dy', (dy/30).toFixed(2)+'px');
    });
  });
});
