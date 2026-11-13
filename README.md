# Portus Lab Experience · envoltorio (GitHub Pages)

Esta carpeta se publica en GitHub Pages. No es un proyecto de Apps Script: muestra el simulador a pantalla
completa, permite instalarlo como app y guarda solo estos archivos para abrir rápido.

| Archivo | Para qué |
|---|---|
| `index.html` | El envoltorio. **Arriba está `URL_APP`** (la dirección /exec del simulador) y, en las etiquetas `og:`, `REEMPLAZAR_USUARIO` (tu usuario de GitHub). |
| `manifest.webmanifest` | Nombre, íconos y colores de la app instalada. |
| `sw.js` | Guarda solo los archivos de esta carpeta. Nunca guarda nada de Google. |
| `iconos/` | `icono-192`/`icono-512` (mosaico blanco con esquinas redondeadas y transparentes: escritorio, accesos, pestaña), `icono-maskable-512` (cuadrado completo; Android lo recorta), `apple-touch-icon` (180, opaco; el iPhone lo redondea), `favicon.ico` (16/32/48) y `favicon-32` (solo el escudo, se lee a tamaño pequeño), `logo-cargador` (el del cargador) y `vista-previa.jpg` (1200×630, la imagen al compartir el enlace). En el HTML, el manifiesto y `sw.js` van con `?v=2`: si cambias un ícono, sube ese número en los tres. |
| `.nojekyll` | Le dice a GitHub Pages que sirva los archivos tal cual. |

Pasos completos para publicarla: `DESPLIEGUE.md` (parte B), en el zip del proyecto de Apps Script.

**Cargador:** todo lo que se mueve usa solo `transform` y `opacity`, así sigue fluido mientras Google carga. Los puntos en onda (crecen y se encogen) son los de la app de ejemplo y se animan siempre, también con «reducir movimiento». Se quita cuando
el simulador avisa `pgi-listo` (desde `Scripts_Common`, versión 15E) o, si no avisa, al terminar de cargar el marco; tope de 10 s.
