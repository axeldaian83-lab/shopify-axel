# Estado del proyecto — S.T. (s-t-9833.myshopify.com)

- Tienda: s-t-9833.myshopify.com (nombre de marca en Shopify: "S.T.")
- Carpeta: /home/user/shopify-axel/tienda
- Tema base: Dawn (descargado 2026-07-25 vía git clone --depth 1)
- Tema publicado actualmente en la tienda: "Horizon" [live] — id #153936953535 (sin tocar)
- Tema de trabajo (NO publicado, es el que llevamos todos los cambios):
  "s-t-9833 (Claude)" — id #153953042623
  - Previsualizar: https://s-t-9833.myshopify.com?preview_theme_id=153953042623
  - Editor: https://s-t-9833.myshopify.com/admin/themes/153953042623/editor
- Entorno: Node v22.22.2, Shopify CLI 4.5.2 — OK
- Conexión Admin API: OK vía client credentials grant (app propia creada por el
  usuario en Dev Dashboard, scopes write_products+write_files, que incluyen
  lectura). El access token (shpat_...) vive solo en el entorno de trabajo,
  caduca a las 24h y se regenera con el client_id/client_secret (tampoco
  guardados en el repo). Si una llamada futura da 401, repetir el intercambio
  client_credentials contra /admin/oauth/access_token.
- Producto en catálogo: NINGUNO todavía → construimos la página de producto y
  la dejamos lista para asignarse en cuanto el usuario cree su primer producto.
- Moneda de la tienda: **MXN** (pesos mexicanos) — el usuario pidió vender a
  EE.UU./Canadá/México; esto es un ajuste de Shopify (Configuración → General
  → Moneda de la tienda / mercados), no algo que se cambie desde el tema. Está
  pendiente de decisión del usuario, se le informa en el mensaje de cierre.

## Fases completadas
- [x] 0 Entorno
- [x] 1 Conexión (tema + Admin API) y sondeo de producto (no había ninguno)
- [x] 2 Proyecto (Dawn descargado y subido como tema de trabajo)
- [x] 3 Diseño (brief recogido, sin clave de imágenes IA → huecos editables)
- [x] 4 Construcción (9 secciones de portada + tokens de diseño + JS)
- [x] 5 Páginas (producto, header/footer, favicon provisional; legales pendientes de panel)
- [x] 6 Publicación como tema de trabajo (NO activo) + auto-revisión con curl/HTML

## Decisiones de diseño
- Nicho: tienda de gadgets/productos de tendencia (estilo "trending products"),
  sin producto propio subido todavía.
- Mercado: Estados Unidos, Canadá y México → **idioma de la tienda: inglés**
  (mercado principal EE.UU./Canadá; los ajustes del editor están en español
  para que el usuario los entienda, pero los textos que ve el cliente final
  están en inglés). Si el usuario prefiere español, se puede traducir todo.
- Color: naranja (#FF5C1A) como acento/CTA, sobre fondo blanco/negro
  (#0E0F13) alternando por sección para dar contraste y energía.
- Tipografía: Archivo Bold (`archivo_n7`) para títulos, Assistant para cuerpo
  (vía la librería de fuentes de Shopify, ligado a `settings.type_header_font`
  para que todo el tema —incluido carrito y buscador— use la misma fuente).
- Botones/tarjetas con esquinas muy redondeadas (pill), hover con elevación 3D
  (`animations_hover_elements: 3d-lift`).
- Logo: el usuario lo está creando — no forzado en ningún sitio; en cuanto lo
  tenga, se sube desde Configuración del tema → Logo (aparece solo en el header,
  sin tocar código). El favicon usa mientras tanto una "S" en un cuadrado negro
  con acento naranja (SVG generado en `layout/theme.liquid`), y se sustituye
  solo en cuanto suba un favicon real en Configuración del tema → Favicon.
- Fotos: el usuario NO dio clave de imágenes IA → todos los huecos de imagen
  (hero, producto, reseñas) muestran un placeholder con patrón naranja y texto
  guía, 100% sustituible desde el editor (image_picker) sin tocar código.

### Estructura de portada (templates/index.json)
1. `mt-hero` — hero oscuro con claim, 2 CTAs y foto de producto (placeholder)
2. `mt-trust` — banda de confianza (envío 3 países, pago seguro, garantía, soporte)
3. `mt-tendencia` — grid de la colección "all" (vacío hasta que haya productos)
4. `mt-cifras` — 4 cifras animadas al hacer scroll
5. `mt-pasos` — cómo funciona en 3 pasos
6. `mt-resenas` — carrusel de reseñas con navegación
7. `mt-social` — marquesina "As seen on" (TikTok/Instagram/YouTube/Facebook)
8. `mt-faq` — acordeón de preguntas frecuentes (envíos/devoluciones/pagos)
9. `mt-cta-final` — llamada final a la acción

## Secciones creadas (todas con prefijo `mt-`, 100% editables desde el editor)
- `sections/mt-hero.liquid`
- `sections/mt-trust.liquid`
- `sections/mt-tendencia.liquid`
- `sections/mt-cifras.liquid`
- `sections/mt-pasos.liquid`
- `sections/mt-resenas.liquid`
- `sections/mt-social.liquid`
- `sections/mt-faq.liquid`
- `sections/mt-cta-final.liquid`
- `sections/mt-producto.liquid` (página de producto completa: galería con
  miniaturas, precio dinámico, selector de variantes en JS, fila de confianza,
  "qué incluye", descripción, características)
- `sections/footer-group.json` reconfigurado (marca + enlaces + políticas +
  iconos de pago, sin newsletter)
- `layout/theme.liquid`: favicon provisional añadido (única edición fuera de
  `sections/`)
- `config/settings_data.json`: paleta de marca, fuente de títulos, radios de
  botones/tarjetas, tagline de marca

## Assets propios
- `assets/mt-styles.css` — tokens de diseño + estilos de todas las secciones
- `assets/mt-scripts.js` — reveals al scroll, cifras animadas, carrusel de
  reseñas, acordeón FAQ
- `assets/mt-producto.js` — galería de miniaturas + selector de variantes

## Plantilla de producto
- `templates/product.mt.json` (sufijo `mt`) — lista para asignarse al primer
  producto que el usuario cree.
- **Pendiente**: en cuanto el usuario cree un producto, hay que (a) asignarle
  `templateSuffix: "mt"` y (b) pulir título/descripción del catálogo, ambos
  vía Admin API (`actualizar-producto.graphql`, ver `references/09-admin-api.md`
  de la skill). Aún no se ha hecho porque no existe ningún producto.

## Pendiente del lado del usuario (no técnico, se le indica en el cierre)
1. Confirmar si la moneda de la tienda debe seguir en MXN o cambiar a USD
   (Configuración → General).
2. Rellenar las 4 políticas nativas desde plantilla: Configuración → Políticas
   (privacidad, términos, devoluciones, envíos) — los enlaces del footer ya
   apuntan ahí automáticamente (`show_policy: true`).
3. Aviso legal y política de cookies (no nativas de Shopify): textos base
   redactados y entregados en el cierre para pegar como páginas nuevas
   (Contenido → Páginas), avisando de que son una base y no asesoría legal.
4. Subir su logo cuando lo tenga (Configuración del tema → Logo/Favicon) —
   nada de código que tocar.
5. Crear su primer producto (Productos → Añadir producto) y avisar para que le
   asigne automáticamente la plantilla `mt` y le pula los textos del catálogo.
6. Si quiere un menú de pie de página con enlaces propios, crear un menú con
   handle "footer" en Contenido → Menús (el bloque ya está enganchado a ese
   handle; si no existe, simplemente no se muestra esa columna, no rompe nada).

## Notas técnicas de esta sesión (entorno remoto sin navegador local)
- `shopify theme list`/`theme push` usan el flujo de device-code (imprime
  enlace + código, se pasa al usuario, funciona bien en background con
  timeout largo).
- `shopify store auth` (OAuth con callback local) NO funciona en este
  contenedor remoto (necesita navegador y servidor en la misma máquina). Se
  resolvió pidiendo al usuario crear una app personalizada desde Dev
  Dashboard (sistema de Shopify vigente desde 2026) y usando el flujo
  `client_credentials` directamente contra
  `https://s-t-9833.myshopify.com/admin/oauth/access_token` con el
  `client_id`/`client_secret` de esa app, para obtener un `shpat_...` de 24h.
  Ese token se usa como `X-Shopify-Access-Token` en llamadas GraphQL directas
  a `/admin/api/2024-10/graphql.json` (en vez de `shopify store execute`,
  que internamente depende de la sesión de `store auth`).
- Se creó `/usr/local/bin/xdg-open` (no-op) para que el CLI no aborte al
  intentar abrir un navegador inexistente en este contenedor.
- No se pudo tomar una captura de pantalla real (Playwright/Chromium no logra
  atravesar el proxy saliente de este entorno — `ERR_CONNECTION_RESET`); la
  verificación se hizo leyendo el HTML servido por la URL de previsualización
  con curl, confirmando que las 9 secciones, el footer y el favicon se
  renderizan correctamente y sin texto en el idioma equivocado.
