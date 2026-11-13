/* Service worker del envoltorio de Portus Lab Experience.
   Guarda en el celular SOLO los archivos de esta carpeta (la página del envoltorio, el manifiesto y los íconos).
   Nunca guarda ni responde por nada que venga de Google (script.google.com, googleusercontent.com…): esas
   peticiones no pasan por aquí y se cargan siempre en línea.
   Cuando cambies algo de esta carpeta, sube VERSION para que los celulares descarten la copia anterior. */
var VERSION = 'portus-envoltorio-2026-11-13g';
var ARCHIVOS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './iconos/icono-192.png?v=2',
  './iconos/icono-512.png?v=2',
  './iconos/icono-maskable-512.png?v=2',
  './iconos/apple-touch-icon.png?v=2',
  './iconos/favicon-32.png?v=2',
  './iconos/favicon.ico?v=2',
  './iconos/logo-cargador.png?v=2'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(VERSION)
      .then(function (c) {
        /* cache: 'reload' = pedir los archivos a GitHub, no a la copia del navegador. */
        return c.addAll(ARCHIVOS.map(function (u) { return new Request(u, { cache: 'reload' }); }));
      })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (claves) {
        return Promise.all(claves.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  /* Lo que no es de esta carpeta (Google, CDN…) no se toca: el navegador lo pide en línea como siempre. */
  if (url.origin !== self.location.origin) return;

  var esPagina = req.mode === 'navigate';
  var clave = esPagina ? new Request('./index.html') : req;

  var deLaRed = fetch(esPagina ? new Request('./index.html', { cache: 'no-cache' }) : req)
    .then(function (resp) {
      if (resp && resp.ok && resp.type === 'basic') {
        var copia = resp.clone();
        return caches.open(VERSION).then(function (c) { return c.put(clave, copia); }).then(function () { return resp; });
      }
      return resp;
    });

  /* Primero la copia guardada (abre al instante); por detrás se trae la versión nueva para la próxima vez.
     Sin copia, se espera a la red. Sin red y sin copia, el navegador muestra su propio aviso. */
  e.respondWith(
    caches.match(clave, { ignoreSearch: true }).then(function (guardada) {
      if (guardada) {
        e.waitUntil(deLaRed.catch(function () { }));
        return guardada;
      }
      return deLaRed;
    })
  );
});
