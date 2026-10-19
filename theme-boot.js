/*
 * Web yonetim: ilk karenin zemin rengi (proje sahibinin karari 2026-10-19).
 *
 * Uygulama paketi yuklenip tema tercihi okunana kadar sayfa bos kalir; bu
 * betik o sirada zemini dogru temaya boyar (siyah / yanlis tema sicramasi
 * olmaz). CSP `script-src 'self'` satir ici betige izin vermedigi icin ayri
 * dosyadir; `index.html`'de `<head>` icinde senkron yuklenir.
 *
 * Kural uygulamayla AYNIDIR: kayitli secim (`state/themeDefault.ts`,
 * `THEME_MODE_KEY`) yoksa tarayicinin / isletim sisteminin temasi
 * (react-native-web `Appearance`: yalnizca "dark" eslesirse gece). Renkler
 * `config/theme.ts` paletlerinin `background` degerleridir; degisirse burasi
 * da guncellenir. Sonraki degisimleri `state/theme.tsx` uygular.
 */
(function () {
  let mode = null;
  try {
    mode = window.localStorage.getItem('chefanane.theme-mode');
  } catch {
    // Depolama kapali (gizli pencere, engelli site verisi): sistem temasi.
    mode = null;
  }
  if (mode !== 'light' && mode !== 'dark') {
    const dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    mode = dark ? 'dark' : 'light';
  }
  const root = document.documentElement;
  root.style.backgroundColor = mode === 'light' ? '#F3EFE6' : '#151210';
  root.style.colorScheme = mode;
})();
