(() => {
  'use strict';

  const userAgent = navigator.userAgent || '';
  const isAndroid = /Android/i.test(userAgent);
  const isChrome = /Chrome\//i.test(userAgent);
  // Embedded browsers control app launches themselves; retain the HTTPS link there.
  const isEmbedded = /\bwv\b|Line\/|FBAN|FBAV|Instagram|MicroMessenger|Twitter/i.test(userAgent);
  if (!isAndroid || !isChrome || isEmbedded) return;

  // A real anchor preserves the user's tap. No popup, timer, or automatic redirect.
  // Pin the intent to LINE; if unavailable, Chrome opens the original HTTPS URL.
  document.querySelectorAll('a[data-line-launch]').forEach((link) => {
    const destination = new URL(link.href);
    if (destination.origin !== 'https://liff.line.me') return;
    link.href = `intent://${destination.host}${destination.pathname}${destination.search}`
      + '#Intent;scheme=https;package=jp.naver.line.android;'
      + `S.browser_fallback_url=${encodeURIComponent(destination.href)};end`;
  });
})();
