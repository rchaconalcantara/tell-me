const assets = [
    '/tell-me/index.html',
    '/tell-me/pages/options.html',
    '/tell-me/pages/ups.html',
    '/tell-me/js/app.js',
    '/tell-me/js/main.js',
    '/tell-me/js/jquery.min.js',
    '/tell-me/css/style.css',
    '/tell-me/css/animate.css',
    '/tell-me/css/bootstrap.min.css',
    '/tell-me/img/logo.png',
    '/tell-me/img/people.svg',
    '/tell-me/img/post.svg',
    '/tell-me/songs/click.wav',
]


self.addEventListener('install', event => {
    const cacheProm = caches.open('started').then(cache => {
        return cache.addAll(assets)
    })
    event.waitUntil(cacheProm)
})

self.addEventListener('activate', event => {

});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cache => {
            return cache || fetch(event.request);
        }).catch(() => caches.match('/pages/ups.html'))
    )
})