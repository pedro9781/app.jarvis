const CACHE_NAME = 'jarvis-static-v1';

const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './sw.js',
    './fundo7.png'
];

self.addEventListener('install', (event) => {
    console.log('Service Worker instalado');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE)).then(() => {
            self.skipWaiting();
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(keys.map((key) => (key === CACHE_NAME ? null : caches.delete(key))));
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    const req = event.request;

    // Só tenta cache para GET
    if (req.method !== 'GET') return;

    event.respondWith(
        caches.match(req).then((cached) => {
            if (cached) return cached;

            // Busca na rede e armazena no cache quando possível
            return fetch(req)
                .then((res) => {
                    // Cacheia somente respostas OK
                    if (!res || !res.ok) return res;
                    const copy = res.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
                    return res;
                })
                .catch(() => {
                    // fallback simples: index.html para navegação
                    if (req.mode === 'navigate') return caches.match('./index.html');
                    return undefined;
                });
        })
    );
});