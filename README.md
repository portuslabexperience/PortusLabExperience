# Portus Lab Experience · envoltorio (GitHub Pages)

Esta carpeta se publica en GitHub Pages. No es un proyecto de Apps Script: muestra el simulador a pantalla
completa, permite instalarlo como app y guarda solo estos archivos para abrir rápido.

| Archivo | Para qué |
|---|---|
| `index.html` | El envoltorio. **Arriba está `URL_APP`** (la dirección /exec del simulador) y, en las etiquetas `og:`, `REEMPLAZAR_USUARIO` (tu usuario de GitHub). |
| `manifest.webmanifest` | Nombre, íconos y colores de la app instalada. |
| `sw.js` | Guarda solo los archivos de esta carpeta. Nunca guarda nada de Google. |
| `iconos/` | Íconos 192, 512, 512 maskable, 180 (iPhone), 32 (pestaña) y `vista-previa.jpg` (1200×630, la imagen que sale al compartir el enlace). |
| `.nojekyll` | Le dice a GitHub Pages que sirva los archivos tal cual. |

Pasos completos para publicarla: `DESPLIEGUE.md` (parte B), en el zip del proyecto de Apps Script.
