/// <reference lib="webworker" />
// service-worker.js

const CACHE_NAME = 'craftdle-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/imgs/logos/craftdle_icon_small.png',
    '/imgs/logos/craftdle_icon.png',
    '/imgs/screenshots/MenuMobile.png',
    '/imgs/screenshots/GamemodesMobile.png',
    '/imgs/screenshots/TutorialMobile.png',
    '/imgs/screenshots/CollectionMobile.png',
    '/imgs/screenshots/MenuPC.png',
    '/imgs/screenshots/GamemodesPC.png',
    '/imgs/screenshots/TutorialPC.png',
    '/imgs/screenshots/CollectionPC.png',
    '/style.css',  // Ha van saját stílus fájlod, tedd ide!
    '/app.js',     // Ha van saját JS fájlod, tedd ide!
    // Bármely egyéb fájl, amit szeretnél cache-elni
];

// Install event - cache assets
(self as unknown as ServiceWorkerGlobalScope).addEventListener('install', (event: ExtendableEvent) => {
    console.log('Service Worker: Installing...');

    // Cache the specified files
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

// Activate event - clear old caches
(self as unknown as ServiceWorkerGlobalScope).addEventListener('activate', (event: ExtendableEvent) => {
    console.log('Service Worker: Activating...');

    const cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch event - serve cached assets
(self as unknown as ServiceWorkerGlobalScope).addEventListener('fetch', (event: FetchEvent) => {
    console.log('Service Worker: Fetching', event.request.url);

    // Try to fetch from network, fallback to cache if unavailable
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                return cachedResponse || fetch(event.request);
            })
    );
});
