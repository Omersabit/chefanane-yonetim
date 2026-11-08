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
 * (react-native-web `Appearance`: yalnizca "dark" eslesirse Espresso). Renkler
 * `config/theme.ts` paletlerinin `background` degerleridir; `legacy`
 * kaldirilmis tema anahtarlarinin karsiligidir (`LEGACY_THEME_MODES`). Ikisi
 * degisirse burasi da guncellenir; tema testi (`theme-modes.test.ts`)
 * karsilastirir. Sonraki degisimleri `state/theme.tsx` uygular.
 */
(function () {
  let mode = null;
  try {
    mode = window.localStorage.getItem('chefanane.theme-mode');
  } catch {
    // Depolama kapali (gizli pencere, engelli site verisi): sistem temasi.
    mode = null;
  }
  const backgrounds = {
    light: '#F3EFE6',
    dark: '#151210',
    night: '#111A2E',
    moonlight: '#0E1218',
  };
  // Kaldirilmis tema anahtari -> kalan tema (bugun bos; `LEGACY_THEME_MODES`).
  const legacy = {};
  if (mode !== null && Object.prototype.hasOwnProperty.call(legacy, mode)) {
    mode = legacy[mode];
  }
  if (!Object.prototype.hasOwnProperty.call(backgrounds, mode)) {
    const dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    mode = dark ? 'dark' : 'light';
  }
  const root = document.documentElement;
  root.style.backgroundColor = backgrounds[mode];
  // Tarayici yalnizca acik / koyu bilir: Gunduz disindakiler koyudur.
  root.style.colorScheme = mode === 'light' ? 'light' : 'dark';
})();
