/*
 * Web yonetim: baska bir sitenin cercevesi (iframe) icinde acilmayi engeller
 * (S-6, PA-03; proje sahibinin karari 2026-10-23, K-17: panel GitHub Pages'te
 * kalir, risk cerceve kiriciyla azaltilir).
 *
 * GitHub Pages HTTP basligi gonderemedigi icin `frame-ancestors` /
 * `X-Frame-Options` kullanilamaz (meta CSP'de `frame-ancestors` yok sayilir).
 * Cercevedeyse sayfa gizlenir ve ust pencere bu adrese tasinmaya calisilir;
 * tasima engellenirse (sandbox) sayfa gizli kalir. CSP `script-src 'self'`
 * satir ici betige izin vermedigi icin ayri dosyadir; `index.html`'de
 * `<head>` icinde ilk betik olarak senkron yuklenir.
 */
(function () {
  if (window.top === window.self) return;
  document.documentElement.style.display = 'none';
  try {
    window.top.location = window.self.location.href;
  } catch {
    // Ust pencereye erisilemedi: sayfa gizli kalir.
  }
})();
