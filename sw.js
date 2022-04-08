importScripts('js/sw-acces.js');

const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';
const APP_SHELL = [
    './',
    'index.html',
    'pages/home.html',
    'css/style.css',
    'images/avs/main.jpg',
    'images/avs/home.jpg',
    'js/app.js',
    'js/sw-acces.js'
];
const APP_SHELL_INMUTABLE = [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
    'https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@1,500&family=Ingrid+Darling&display=swap',
    'https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap',
    'js/libs/jquery.js'
];


self.addEventListener('install', event => {
    const cacheStatic = caches.open(STATIC_CACHE).then(cache => {
        cache.addAll(APP_SHELL);
    });
    const cacheInmutable = caches.open(INMUTABLE_CACHE).then(cache => {
        cache.addAll(APP_SHELL_INMUTABLE);
    });
    event.waitUntil(Promise.all([cacheStatic, cacheInmutable]));
});


self.addEventListener('activate', event => {
    const respuesta = caches.keys().then(keys => {
        keys.forEach(key => {
            if (key !== STATIC_CACHE && key.includes('static')) {
                return caches.delete(key);
            }
        });
    });
    event.waitUntil(respuesta);
});


self.addEventListener('fetch', event => {
    const respuesta = caches.match(event.request).then(res => {
        if (res) { return res; } else {
            return fetch(event.request).then(newRes => {
                return actualizaCacheDinamico(DYNAMIC_CACHE, event.request, newRes);
            });
        }
    });

    event.respondWith(respuesta);
});