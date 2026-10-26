(() => {
  'use strict';

  const isIOS = /iPad|iPhone|iPod/i.test(navigator.userAgent || '')
    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  if (!isIOS) return;

  // Restore the original iOS browsing context. Keep the working Android link
  // untouched. Navigation still happens only through the user's native link tap.
  document.querySelectorAll('a[data-line-entry]').forEach((link) => {
    link.target = '_blank';
    link.rel = 'noopener';
    link.setAttribute('aria-label', '開啟 LINE，體驗健康陪跑員（另開視窗）');
  });
})();
