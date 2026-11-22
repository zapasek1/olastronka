// Menu mobilne, łagodne pojawianie się sekcji, przełącznik wariantów kolorystyki.

export function initUi() {
  const btn = document.querySelector<HTMLButtonElement>('.menu-btn');
  const nav = document.querySelector<HTMLElement>('#menu');
  if (btn && nav) {
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') !== 'true';
      btn.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
    });
    nav.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        btn.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
      }),
    );
  }

  const top = document.querySelector('.top');
  const onScroll = () => top?.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const items = document.querySelectorAll<HTMLElement>('[data-reveal]');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    items.forEach((el) => io.observe(el));
  }

  const root = document.documentElement;
  const vbtns = document.querySelectorAll<HTMLButtonElement>('.variants button');
  const mark = () => vbtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.w === root.dataset.wariant)));
  vbtns.forEach((b) =>
    b.addEventListener('click', () => {
      root.dataset.wariant = b.dataset.w!;
      try { sessionStorage.setItem('wariant', b.dataset.w!); } catch {}
      mark();
    }),
  );
  mark();
}
