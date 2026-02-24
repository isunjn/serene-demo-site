function enableThemeToggle() {
  const themeToggle = document.querySelector('#theme-toggle');
  if (!themeToggle) return;
  const hlLink = document.querySelector('link#hl');
  const preferDark = window.matchMedia("(prefers-color-scheme: dark)");
  function toggleTheme(theme) {
    if (theme == "dark") document.body.classList.add('dark'); else document.body.classList.remove('dark');
    if (hlLink) hlLink.href = `/hl-${theme}.css`;
    sessionStorage.setItem("theme", theme);
    toggleGiscusTheme(theme);
  }
  function toggleGiscusTheme(theme) {
    const iframe = document.querySelector('iframe.giscus-frame');
    if (iframe) iframe.contentWindow.postMessage({ giscus: { setConfig: { theme: `${location.origin}/giscus_${theme}.css` } } }, 'https://giscus.app');
  }
  function initGiscusTheme(evt) {
    if (evt.origin !== 'https://giscus.app') return;
    if (!(typeof evt.data === 'object' && evt.data.giscus)) return;
    toggleGiscusTheme(sessionStorage.getItem("theme") || "light");
    window.removeEventListener('message', initGiscusTheme);
  }
  window.addEventListener('message', initGiscusTheme);
  themeToggle.addEventListener('click', () => toggleTheme(sessionStorage.getItem("theme") == "dark" ? "light" : "dark"));
  // Light mode is default - only switch to dark if explicitly chosen
  if (sessionStorage.getItem("theme") == "dark") toggleTheme("dark");
}

function enablePrerender() {
  const prerender = (a) => {
    if (!a.classList.contains('instant')) return;
    const script = document.createElement('script');
    script.type = 'speculationrules';
    script.textContent = JSON.stringify({ prerender: [{ source: 'list', urls: [a.href] }] });
    document.body.append(script);
    a.classList.remove('instant');
  }
  const prefetch = (a) => {
    if (!a.classList.contains('instant')) return;
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = a.href;
    document.head.append(link);
    a.classList.remove('instant');
  }
  const support = HTMLScriptElement.supports && HTMLScriptElement.supports('speculationrules');
  const handle = support ? prerender : prefetch;
  document.querySelectorAll('a.instant').forEach(a => {
    if (a.href.endsWith(window.location.pathname)) return;
    let timer;
    a.addEventListener('mouseenter', () => {
      timer = setTimeout(() => handle(a), 50);
    });
    a.addEventListener('mouseleave', () => clearTimeout(timer));
    a.addEventListener('touchstart', () => handle(a), { passive: true });
  });
}

function enableRssMask() {
  const rssBtn = document.querySelector('#rss-btn');
  const mask = document.querySelector('#rss-mask');
  const copyBtn = document.querySelector('#rss-mask button');
  if (!rssBtn || !mask) return;
  rssBtn.addEventListener('click', (e) => {
    e.preventDefault();
    mask.showModal();
  });
  const close = (e) => {
    if (e.target == mask) mask.close();
  };
  mask.addEventListener('click', close);
  const copy = () => {
    navigator.clipboard.writeText(copyBtn.dataset.link).then(() => {
      copyBtn.innerHTML = copyBtn.dataset.checkIcon;
      copyBtn.classList.add('copied');
      copyBtn.removeEventListener('click', copy);
      setTimeout(() => {
        mask.close();
        copyBtn.innerHTML = copyBtn.dataset.copyIcon;
        copyBtn.classList.remove('copied');
        copyBtn.addEventListener('click', copy);
      }, 400);
    });
  }
  copyBtn.addEventListener('click', copy);
}

function enableOutdateAlert() {
  const alert = document.querySelector('#outdate_alert');
  if (!alert) return;
  const publish = document.querySelector('#publish');
  const updated = document.querySelector('#updated');
  const updateDate = new Date(updated ? updated.textContent : publish.textContent);
  const intervalDays = Math.floor((Date.now() - updateDate.getTime()) / (24 * 60 * 60 * 1000));
  const alertDays = parseInt(alert.dataset.days);
  if (intervalDays >= alertDays) {
    const msg = alert.dataset.alertTextBefore + intervalDays + alert.dataset.alertTextAfter;
    alert.querySelector('.content').textContent = msg;
    alert.classList.remove('hidden');
  }
}

function enableTocTooltip() {
  const anchors = document.querySelectorAll('aside nav a');
  if (anchors.length == 0) return;
  const toggleTooltip = () => {
    anchors.forEach(anchor => {
      if (anchor.offsetWidth < anchor.scrollWidth) {
        anchor.setAttribute('title', anchor.textContent);
      } else {
        anchor.removeAttribute('title');
      }
    });
  };
  window.addEventListener('resize', toggleTooltip);
  toggleTooltip();
}

function addCopyBtns() {
  const cfg = document.querySelector('#copy-cfg');
  if (!cfg) return;
  const copyIcon = cfg.dataset.copyIcon;
  const checkIcon = cfg.dataset.checkIcon;
  document.querySelectorAll('pre').forEach(block => {
    if (block.classList.contains('mermaid')) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'codeblock';
    const btn = document.createElement('button');
    btn.className = 'copy';
    btn.ariaLabel = 'copy';
    btn.innerHTML = copyIcon;
    const copy = () => {
      navigator.clipboard.writeText(block.textContent).then(() => {
        btn.innerHTML = checkIcon;
        btn.classList.add('copied');
        btn.removeEventListener('click', copy);
        setTimeout(() => {
          btn.innerHTML = copyIcon;
          btn.classList.remove('copied');
          btn.addEventListener('click', copy);
        }, 1500);
      });
    };
    btn.addEventListener('click', copy);
    wrapper.appendChild(block.cloneNode(true));
    wrapper.appendChild(btn);
    block.replaceWith(wrapper);
  });
}

function addBackToTopBtn() {
  const backBtn = document.querySelector('#back-to-top');
  if (!backBtn) return;
  const toTop = () => window.scrollTo({ top: 0 });
  const toggle = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop > 200 && !backBtn.classList.contains('shown')) {
      backBtn.classList.add('shown');
      backBtn.setAttribute('tabindex', 0);
      backBtn.addEventListener('click', toTop);
    } else if (scrollTop <= 200 && backBtn.classList.contains('shown')) {
      backBtn.classList.remove('shown');
      backBtn.setAttribute('tabindex', -1);
      backBtn.removeEventListener('click', toTop);
    }
  };
  window.addEventListener('scroll', toggle);
  toggle();
}

function addFootnoteBacklink() {
  const footnotes = document.querySelectorAll('.footnote-definition');
  footnotes.forEach(footnote => {
    const backlink = document.createElement('button');
    backlink.className = 'backlink';
    backlink.ariaLabel = 'backlink';
    backlink.innerHTML = '↩︎';
    backlink.addEventListener('click', () => window.scrollTo({
      top: document.querySelector(`.footnote-reference a[href="#${footnote.id}"]`).getBoundingClientRect().top + window.scrollY,
    }));
    const lastEl = footnote.lastElementChild || footnote;
    lastEl.appendChild(backlink);
  });
}

function convertMarkdownImages() {
  document.querySelectorAll('.prose img').forEach(img => {
    if (img.parentElement.tagName === 'FIGURE') return;
    
    const alt = img.getAttribute('alt');
    if (!alt) return;
    
    const figure = document.createElement('figure');
    const newImg = img.cloneNode(true);
    const figcaption = document.createElement('figcaption');
    figcaption.textContent = alt;
    
    figure.appendChild(newImg);
    figure.appendChild(figcaption);
    
    img.parentElement.replaceChild(figure, img);
  });
}

function enableImgLightense() {
  window.addEventListener("load", () => {
    // Lightense for raster images only — SVGs get a custom handler
    Lightense(".prose img:not(.no-lightense):not([src$='.svg'])", { background: 'rgba(43, 43, 43, 0.19)', padding: 40 });

    // Custom lightbox for SVGs: full viewport size with arrow key navigation
    const svgImages = Array.from(document.querySelectorAll('.prose img[src$=".svg"]'));
    let activeOverlay = null;
    let activeIndex = -1;

    function showSvgLightbox(index) {
      if (activeOverlay) activeOverlay.remove();

      activeIndex = index;
      const img = svgImages[index];
      const overlay = document.createElement('div');
      overlay.className = 'svg-lightbox-overlay';

      const clone = document.createElement('img');
      clone.src = img.src;
      overlay.append(clone);

      const figcaption = img.closest('figure')?.querySelector('figcaption');
      if (figcaption) {
        const caption = document.createElement('div');
        caption.className = 'svg-lightbox-caption';
        caption.textContent = figcaption.textContent;
        overlay.append(caption);
      }

      overlay.addEventListener('click', closeSvgLightbox);
      activeOverlay = overlay;
      document.body.append(overlay);
    }

    function closeSvgLightbox() {
      if (!activeOverlay) return;
      activeOverlay.remove();
      activeOverlay = null;
      activeIndex = -1;
    }

    function handleLightboxKeys(e) {
      if (!activeOverlay) return;
      if (e.key === 'ArrowRight' && activeIndex < svgImages.length - 1) {
        showSvgLightbox(activeIndex + 1);
      } else if (e.key === 'ArrowLeft' && activeIndex > 0) {
        showSvgLightbox(activeIndex - 1);
      } else if (e.key === 'Escape') {
        closeSvgLightbox();
      }
    }

    document.addEventListener('keydown', handleLightboxKeys);

    svgImages.forEach((img, i) => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => showSvgLightbox(i));
    });
  });
}

function enableContextAwareBackButton() {
  const backLink = document.querySelector('#context-back-link');
  if (!backLink) return;
  
  const defaultPath = backLink.dataset.defaultPath;
  const currentPath = window.location.pathname;
  
  // Check if we came from home page or posts page
  const referrer = document.referrer;
  const referrerPath = referrer ? new URL(referrer).pathname : '';
  
  // If referrer is home page, go back to home
  if (referrerPath === '/' || referrerPath === '') {
    backLink.href = '/';
  }
  // If referrer is posts page, keep default behavior
  else if (referrerPath === '/posts/' || referrerPath === '/posts') {
    backLink.href = defaultPath;
  }
  // For direct access or other referrers, use default
  else {
    backLink.href = defaultPath;
  }
  
  // Add click handler for proper browser history navigation
  backLink.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Check if browser has history to go back to
    if (window.history.length > 1 && referrer && referrer.includes(window.location.origin)) {
      window.history.back();
    } else {
      // Fallback to the determined path
      window.location.href = backLink.href;
    }
  });
}

function enableReaction() {
  const container = document.querySelector('.reaction');
  if (!container) return;
  const endpoint = container.dataset.endpoint;
  const slug = location.pathname.split('/').filter(Boolean).pop();
  let state = { error: false, reaction: {} };
  const render = () => {
    const btns = Object.entries(state.reaction).map(([emoji, [count, reacted]])=> {
      const span = document.createElement('span');
      span.textContent = count;
      const btn = document.createElement('button');
      if (reacted) btn.classList.add('reacted');
      btn.append(emoji, span);
      btn.onclick = () => toggle(emoji);
      return btn;
    });
    if (state.error) {
      container.classList.add('error');
    } else {
      container.classList.remove('error');
    }
    container.replaceChildren(...btns);
  };
  const toggle = async (target) => {
    const [count, reacted] = state.reaction[target];
    state.reaction[target] = reacted ? [count - 1, false] : [count + 1, true];
    render();
    try {
      const resp = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slug, target, reacted: !reacted }),
      });
      if (resp.status === 200) {
        error = false;
      } else {
        throw new Error();
      }
    } catch (err) {
      state.error = true;
      state.reaction[target] = [count, reacted];
      render();
    }
  };
  const init = async () => {
    const resp = await fetch(`${endpoint}?slug=${slug}`);
    if (resp.status === 200) {
      state.reaction = await resp.json();
      render();
    }
  };
  init();
}

function enableFontSizeControls() {
  const decrease = document.querySelector('#font-decrease');
  const increase = document.querySelector('#font-increase');
  const toast = document.querySelector('#ftoast');
  if (!decrease || !increase || !toast) return;

  const STEP = 1;
  const MIN = 14;
  const MAX = 26;

  function getCurrentSize() {
    const stored = sessionStorage.getItem('fontSize');
    if (stored) return parseInt(stored, 10);
    return Math.round(parseFloat(getComputedStyle(document.body).getPropertyValue('--font-size')));
  }

  function changeFontSize(delta) {
    const size = Math.max(MIN, Math.min(MAX, getCurrentSize() + delta));
    document.body.style.setProperty('--font-size', size + 'px');
    sessionStorage.setItem('fontSize', size);
    toast.textContent = size + 'px';
    toast.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toast.classList.remove('show'), 1200);
  }

  // Restore saved font size
  const saved = sessionStorage.getItem('fontSize');
  if (saved) {
    document.body.style.setProperty('--font-size', saved + 'px');
  }

  decrease.addEventListener('click', () => changeFontSize(-STEP));
  increase.addEventListener('click', () => changeFontSize(STEP));
}

enableThemeToggle();
enablePrerender();
enableRssMask();
enableFontSizeControls();
enableContextAwareBackButton();
if (document.body.classList.contains('post')) {
  enableOutdateAlert();
  addBackToTopBtn();
  enableTocTooltip();
}
if (document.querySelector('.prose')) {
  convertMarkdownImages();
  addCopyBtns();
  addFootnoteBacklink();
  enableImgLightense();
  enableReaction();
}
