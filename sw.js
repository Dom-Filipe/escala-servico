// Service worker: guarda as páginas para abrir rápido e funcionar sem internet.
// Rede primeiro (sempre a versão nova quando online); sem rede, usa a cópia guardada.
// Os dados do Appwrite nunca são guardados aqui.
const CACHE = 'escala-v12';
const ARQUIVOS = ['./', './index.html', './previsao.html', './config.js', './dados-planilha.js',
  './manifest.json', './manifest-previsao.json', './icons/app-192.png', './icons/prev-192.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARQUIVOS)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return; // Appwrite, fontes e CDN: direto na rede
  e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(CACHE).then(k => k.put(e.request, c)); return r; })
    .catch(() => caches.match(e.request).then(r => r || caches.match('./index.html'))));
});
