# Estado del proyecto — S.T. (s-t-9833.myshopify.com)

- Tienda: s-t-9833.myshopify.com (nombre de marca en Shopify: "S.T.")
- Carpeta: /home/user/shopify-axel/tienda
- Tema base: Dawn (descargado 2026-07-25 vía git clone --depth 1)
- **Tema PUBLICADO (live) desde 2026-07-25**: "s-t-9833 (Claude)" — id
  #153953042623. El usuario lo publicó él mismo desde el panel. A partir de
  ahora, cualquier `shopify theme push` a este ID necesita `--allow-live` y es
  visible al instante para los visitantes reales.
  - Web pública: https://s-t-9833.myshopify.com
  - Editor: https://s-t-9833.myshopify.com/admin/themes/153953042623/editor
- "Horizon" (id #153936953535) quedó guardado como tema NO publicado, de
  respaldo por si el usuario quiere volver atrás.
- Entorno: Node v22.22.2, Shopify CLI 4.5.2 — OK
- Conexión Admin API: OK vía client credentials grant. La app (creada por el
  usuario en Dev Dashboard) tiene 5 scopes: write_products, write_files,
  write_markets, write_locales, write_translations (todos incluyen lectura).
  IMPORTANTE (aprendido esta sesión): en este sistema de Shopify, añadir
  scopes nuevos a una app YA instalada y "publicar una nueva versión" NO los
  aplica de forma fiable — hubo que **desinstalar y reinstalar** la app para
  que los scopes nuevos surtieran efecto. Si en el futuro hace falta un scope
  más, ese es el camino que funciona (no perder tiempo solo con "nueva
  versión"). El access token (shpat_...) vive solo en el entorno de trabajo,
  caduca a las 24h y se regenera con el mismo client_id/client_secret
  (tampoco guardados en el repo). Si una llamada futura da 401, repetir el
  intercambio client_credentials contra /admin/oauth/access_token.
- **Tienda multi-idioma y multi-mercado, funcionando de extremo a extremo**
  (2026-07-26): español (idioma principal, dominio raíz) + inglés (segundo
  idioma, publicado). 3 mercados con presencia web propia:
  - México → dominio raíz, sin sufijo, español, MXN (mercado por defecto).
  - Estados Unidos → `/en-us/`, inglés, USD — MarketWebPresence
    gid://shopify/MarketWebPresence/47662006463.
  - Canadá → `/en-ca/`, inglés, CAD — MarketWebPresence
    gid://shopify/MarketWebPresence/47661973695.
  Todo el contenido propio (9 secciones de portada, página de producto,
  footer) y el título/descripción del producto están escritos en español
  como idioma base y traducidos al inglés vía la Admin API
  (`translationsRegister`, resourceType `ONLINE_STORE_THEME` para el tema y
  `PRODUCT` para el catálogo). Verificado con curl en las 3 rutas: idioma,
  moneda y precio convertido correctos en cada una.
  - Pendiente menor: los `default` de los ajustes de cada sección (el texto
    que sale si el usuario añade un bloque nuevo desde cero en el editor)
    siguen en inglés — no afecta a nada de lo ya publicado, solo a bloques
    nuevos que el usuario cree manualmente. Se puede traducir si hace falta.
  - Si se edita CUALQUIER texto propio desde el editor de Shopify en el
    futuro, hay que recordar volver a registrar su traducción al inglés con
    `translationsRegister` (si no, ese texto en concreto se verá en español
    también en `/en-us/` y `/en-ca/` hasta que se traduzca).
- **Productos activos hoy** (título/descripción en español como base +
  traducción al inglés registrada, plantilla asignada, aparecen solos en la
  portada y en "También te puede interesar" — colección "all"). Estado al
  2026-07-27, después de borrar 2 productos de la primera tanda y añadir 2
  nuevos:
  1. **"Aspiradora Inalámbrica Portátil para Auto"** (EN: "Portable Wireless
     Car Vacuum Cleaner") — gid://shopify/Product/8520477933759,
     `templateSuffix: "mt"`. 9 fotos, 4 variantes de color
     (7903black/7903white/A black/A white). **Importante**: estos 4 valores
     en realidad son DOS diseños de aspiradora distintos que el proveedor
     metió como si fueran solo colores (7903black/white = $599, A black/white
     = $449). El selector ahora muestra foto + precio de cada uno para que se
     note la diferencia (ver "Actualización 2026-07-27 (3)"). La opción
     "style" solo tenía un valor ("Wireless") → oculta sola.
  2. **"Báscula Digital de Precisión en Forma de Cuchara"** (EN: "Precision
     Digital Spoon Scale") — gid://shopify/Product/8522958471359,
     `templateSuffix: "mt-bascula"`. 2 variantes de color (Light green $189 /
     White $199), cada una con su propia foto en el selector. Opción "style"
     con un solo valor ("500g 0.1g") → oculta sola. Pesa hasta 500g con 0.1g
     de precisión, usa pila CR-2032 (no se afirma que la pila venga incluida
     porque el proveedor no lo confirma en su lista de contenido).
  3. **"Mini Ventilador Portátil con Pinza"** (EN: "Mini Portable Clip Fan")
     — gid://shopify/Product/8523018436799, `templateSuffix: "mt-ventilador"`.
     4 variantes (Color Green/White × cantidad 1PCS/2PCS; $499 la unidad,
     $649 el par). Batería recargable 900mAh vía USB-C, hasta 5h de uso.
  Todos importados por el usuario con la app CJdropshipping. Regla general
  aplicada: cualquier opción de variante con un solo valor posible se oculta
  sola (patrón ya resuelto en el código, no hace falta tocarlo para futuros
  productos).
- **Una plantilla de producto por cada "familia" de producto** (no una sola
  compartida): `templates/product.mt.json` (aspiradora),
  `templates/product.mt-bascula.json` (báscula),
  `templates/product.mt-ventilador.json` (ventilador). Los tres usan las
  mismas secciones (`mt-producto`, `mt-faq`, `mt-recomendados`) pero cada uno
  con su propio texto de "Qué incluye" y características — **necesario**
  porque una sola plantilla compartida por varios productos mostraría el
  mismo texto en todos (por ejemplo, "incluye aspiradora" en la página de la
  báscula), lo cual sería información falsa. Para el próximo producto nuevo:
  copiar uno de estos 3 archivos, darle un nombre de sufijo nuevo (ej.
  `product.mt-<algo>.json`), ajustar el texto de "incluye" y las
  características, y asignar ese sufijo al producto con `productUpdate`.
- Moneda de la tienda: **MXN** (pesos mexicanos) como moneda base, con 3
  mercados ya configurados por el usuario mostrando moneda local (EE.UU. USD,
  Canadá CAD, México MXN) — confirmado funcionando en el selector del pie de
  página. Resuelto, ya no está pendiente.

## Actualización 2026-07-27 — limpieza de catálogo y de contenido
A petición explícita del usuario ("elimina todos los productos menos las
aspiradoras de carro... quites información falsa o que puesa parecer
engañosa"):
- **Catálogo reducido a 1 producto.** Se eliminaron de Shopify el "Gel
  Antibacterial de Bolsillo en Spray" y el "Vaso Termo Gigante de Acero
  Inoxidable 40oz" (`productDelete`). Solo queda la **Aspiradora Inalámbrica
  Portátil para Auto** (gid://shopify/Product/8520477933759).
- **Contenido potencialmente engañoso eliminado por completo**:
  - Sección `mt-cifras` (cifras de clientes/valoraciones inventadas) —
    borrada de `templates/index.json` y quitada del layout global.
  - Sección `mt-resenas` (reseñas de clientes ficticios) — borrada.
  - Sección `mt-social` (falso "as seen on" con logos de TikTok/Instagram/
    YouTube/Facebook que la tienda nunca reclamó de verdad) — borrada.
  - Afirmación no verificada "envío en 24 horas" — quitada de las
    características del producto (`product.mt.json` bloque `c2`, ahora dice
    solo "enviamos... con seguimiento incluido", sin plazo inventado).
  - Afirmación no verificada "incluye manual" en "Qué incluye" — el listado
    real del proveedor solo confirma la aspiradora, así que ahora dice
    únicamente "1x aspiradora inalámbrica".
  - Los tres bloques de características (`c1`/`c2`/`c3`) se reescribieron
    para describir solo lo que el producto real tiene (materiales, envío
    internacional, soporte), sin cifras ni promesas no verificadas.
  Nada de esto se "adivinó": solo se dejó lo que el propio listado del
  proveedor confirma.
- **Nueva sección "También te puede interesar" (`sections/mt-recomendados.liquid`)**,
  añadida a la página de producto (`templates/product.mt.json`). Muestra
  hasta 4 productos de la colección "all" que NO sean el que se está viendo.
  Con un solo producto en la tienda hoy, la sección **no se muestra en
  absoluto** (queda oculta automáticamente, sin hueco vacío ni error) —
  en cuanto el usuario añada un segundo producto a la colección "all",
  aparecerá sola mostrándolo, sin tocar código.
- **Corrección de enlaces internos**: los botones del hero y del CTA final de
  la portada (`templates/index.json`) usaban una ruta fija
  (`/products/...`) que rompía el idioma al hacer clic desde `/en-us/` o
  `/en-ca/` (mandaba de vuelta a la versión en español). Se cambiaron al
  esquema interno `shopify://products/...`, igual que ya se hacía con los
  enlaces a colecciones — verificado con curl que desde cada idioma el botón
  se queda en su propio idioma.
- **Traducción al inglés puesta al día**: se registraron 58 traducciones
  nuevas/actualizadas vía `translationsRegister` (tema
  `gid://shopify/OnlineStoreTheme/153953042623`) para que `/en-us/` y
  `/en-ca/` reflejen todo el contenido corregido (portada sin las 3
  secciones borradas, página de producto con el "incluye" y las
  características corregidas, textos de la nueva sección de recomendados).
  Verificado con curl en las 3 rutas (raíz, `/en-us/`, `/en-ca/`): idioma,
  precio convertido y enlaces correctos en cada una.
- **Dos bugs reportados por el usuario, corregidos** (antes de esta limpieza,
  durante la misma sesión de trabajo):
  1. El acordeón de preguntas frecuentes no respondía al primer clic — la
     causa era que `mt-scripts.js` se cargaba una vez por cada sección que lo
     necesitaba, duplicando los listeners de clic. Se dejó una sola carga
     global en `layout/theme.liquid`.
  2. El precio no cambiaba al elegir otro color/variante — el precio vivía
     fuera del `<form>` que buscaba el script. Se corrigió
     `assets/mt-producto.js` para buscar el precio dentro del bloque de
     compra completo, no solo dentro del formulario.

## Actualización 2026-07-27 (2) — vitrina de recomendados en el hero
A petición del usuario ("quites la parte de más vendido... y ahí pongas una
imagen de recomendados y poner los productos en tienda"):
- En `sections/mt-hero.liquid`, la insignia "Más vendida" sobre la foto del
  producto se quitó por completo (era una afirmación no verificable con un
  solo producto en la tienda). En su lugar, esa misma zona (la primera imagen
  que ve el visitante) ahora es una **pequeña vitrina de productos
  recomendados**: tarjetas reales con foto, nombre y precio, sacadas
  directamente de la colección "all" de la tienda (no inventadas). Hoy se ve
  la aspiradora; en cuanto haya más productos, aparecerán solos ahí también
  (hasta 3, configurable desde el editor).
  - Ajustes nuevos en el editor: "Texto pequeño sobre la vitrina" (por
    defecto "Recomendados"/"Recommended"), "Colección de la que mostrar
    productos" y "Número de productos a mostrar".
  - Se quitaron los ajustes viejos `badge_text` e `imagen` (ya no se usan) y
    su CSS asociado (`mt-hero__badge`, `mt-hero__media-frame`) en
    `assets/mt-styles.css`, sustituido por `mt-hero__showcase*`.
  - Traducción al inglés del nuevo texto ("Recomendados" → "Recommended")
    registrada vía `translationsRegister`. Verificado con curl en español y
    en `/en-us/`: la tarjeta de producto, el idioma y el precio convertido
    salen correctos en ambos.
  - **Nota técnica para el futuro**: al subir en la MISMA tanda un cambio de
    esquema de sección (nuevos ajustes) y la plantilla JSON que usa esos
    ajustes, Shopify puede validar el JSON contra una versión cacheada
    todavía vieja del esquema y descartar en silencio los campos nuevos (sin
    dar ningún error). La forma fiable de evitarlo: subir primero el archivo
    `.liquid` de la sección (con su nuevo `{% schema %}`) en un `theme push`
    aparte, esperar a que termine, y DESPUÉS subir el `templates/*.json` que
    usa esos ajustes nuevos en un segundo `theme push`. Conviene además
    verificar con `shopify theme pull --only <archivo>` que los ajustes
    nuevos quedaron guardados de verdad antes de dar el cambio por bueno.
- **Revisado si había productos nuevos por importar**: se consultó el listado
  completo de productos de la tienda (cualquier estado) y solo sigue
  existiendo la aspiradora — no ha llegado ningún producto nuevo todavía. Si
  el usuario ya inició una importación desde su app de dropshipping
  (CJdropshipping), probablemente falta completar el paso de "enviar/subir a
  la tienda" desde esa misma app; en cuanto el producto aparezca en Shopify,
  avisar para pulirlo y traducirlo igual que los anteriores.

## Actualización 2026-07-27 (3) — selector de variantes con foto y precio
Se descubrió que la aspiradora en realidad son **dos diseños físicos
distintos** metidos como si fueran solo "colores" de un mismo producto (así
venía del proveedor): "7903black/7903white" a $599 y "A black/A white" a
$449 — son aparatos con forma distinta, no el mismo aparato en otro color. El
selector de opciones antes solo mostraba el código del proveedor en texto
plano ("7903black", "A black"), sin foto ni precio, así que no se notaba la
diferencia. A petición del usuario ("sé más específico con qué aspiradora
cuesta menos, separando las fotos"):
- `sections/mt-producto.liquid`: cuando una opción tiene una foto propia por
  variante (como este caso), el selector ahora muestra una tarjeta con la
  **foto real de esa aspiradora + su precio**, no solo el nombre. Si un
  producto futuro no tiene fotos por variante, se sigue viendo como antes
  (texto simple) — no rompe nada de lo ya construido.
- `assets/mt-producto.js`: al elegir una opción, además de actualizar el
  precio (ya funcionaba), ahora **también cambia la foto grande y la
  miniatura activa** de la galería para que se vea exactamente el aparato
  que se está comprando. Comparación por nombre de archivo de imagen (no por
  ID interno, que no coincide entre la galería y las variantes en la API de
  Shopify).
- Probado con una simulación de clic real (no solo lectura de HTML):
  seleccionar "A black" cambia el precio a $449 y la foto grande a la
  aspiradora angular correcta.
- No se inventó ningún nombre de modelo ni característica nueva — se dejaron
  los mismos valores de opción que trae el proveedor ("7903black", "A
  black", etc.), solo se les añadió la foto y el precio para que se
  entiendan mejor.

## Actualización 2026-07-27 (4) — 2 productos nuevos importados
El usuario importó dos productos nuevos desde CJdropshipping (después de que
un primer intento fallara con "List Failed" en la app — resultó ser un
mensaje de esa app, no de Shopify; ambos productos sí llegaron bien a
Shopify). Para cada uno se hizo el mismo trabajo que con la aspiradora:
- **Báscula digital en forma de cuchara** y **mini ventilador con pinza**:
  título y descripción reescritos en español (solo con datos confirmados por
  el proveedor — ver el listado de productos activos más arriba), traducidos
  al inglés, plantilla propia creada y asignada
  (`product.mt-bascula.json` / `product.mt-ventilador.json`, ver nota sobre
  "una plantilla por familia" más arriba).
- Al asignar el selector de opciones con foto (la mejora de la actualización
  anterior), la báscula mostró sola su selector de color con foto y precio
  por variante sin tocar código — confirma que ese patrón quedó reutilizable.
- Con 3 productos en la tienda, la vitrina del hero y la sección "También te
  puede interesar" (antes vacías o con un solo elemento) ya muestran los
  otros productos de verdad. Nota: justo después de crear un producto nuevo,
  la colección automática "all" puede tardar unos ~30 segundos en
  "indexarlo" — si una sección que usa `coleccion: "all"` no muestra un
  producto recién creado, esperar medio minuto y volver a revisar antes de
  asumir que algo está roto.
- Verificado con curl: ambas páginas de producto cargan sin errores de
  Liquid, precio y "qué incluye" correctos en español e inglés, y la
  portada/recomendados muestran los 3 productos.

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
- Mercado: Estados Unidos, Canadá y México → **por idioma real de la tienda,
  español** (idioma principal de la tienda) **con inglés como segundo idioma
  para EE.UU./Canadá** (ver detalle de mercados e idiomas arriba). Decisión
  final tomada a petición explícita del usuario tras detectar que el idioma
  de Shopify (español) y el de las secciones (antes en inglés) no coincidían.
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
Actualizada 2026-07-27 — se quitaron `mt-cifras`, `mt-resenas` y `mt-social`
por contener cifras/reseñas/menciones no reales (ver sección de limpieza más
arriba). Estructura actual:
1. `mt-hero` — hero oscuro con claim, CTA y foto de producto (placeholder)
2. `mt-trust` — banda de confianza (envío 3 países, pago seguro, garantía, soporte)
3. `mt-tendencia` — grid de la colección "all" (muestra el/los productos reales)
4. `mt-pasos` — cómo funciona en 3 pasos
5. `mt-faq` — acordeón de preguntas frecuentes (envíos/devoluciones/pagos)
6. `mt-cta-final` — llamada final a la acción

### Estructura de la página de producto (templates/product.mt.json)
1. `principal` (`mt-producto`) — galería, precio, variantes, qué incluye,
   características
2. `faq` (`mt-faq`) — preguntas frecuentes específicas antes de comprar
3. `recomendados` (`mt-recomendados`, nueva 2026-07-27) — "También te puede
   interesar"; se oculta sola si no hay más productos que el actual

## Secciones creadas (todas con prefijo `mt-`, 100% editables desde el editor)
- `sections/mt-hero.liquid`
- `sections/mt-trust.liquid`
- `sections/mt-tendencia.liquid`
- `sections/mt-pasos.liquid`
- `sections/mt-faq.liquid`
- `sections/mt-cta-final.liquid`
- `sections/mt-producto.liquid` (página de producto completa: galería con
  miniaturas, precio dinámico, selector de variantes en JS, fila de confianza,
  "qué incluye", descripción, características)
- `sections/mt-recomendados.liquid` (2026-07-27, "También te puede interesar"
  en la página de producto; se oculta sola si no hay más productos)
- `sections/mt-cifras.liquid`, `sections/mt-resenas.liquid`,
  `sections/mt-social.liquid` — **archivos aún existen en el tema pero ya no
  se usan en ninguna plantilla** desde el 2026-07-27 (se quitaron de
  `templates/index.json` por contener cifras/reseñas/menciones no reales).
  Se pueden borrar del todo cuando el usuario lo confirme; se dejaron por si
  prefiere reciclarlos más adelante con datos reales.
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
5. Cuando cree un segundo producto (Productos → Añadir producto), avisar para
   asignarle automáticamente la plantilla `mt`, pulir sus textos y traducirlo
   — en cuanto exista, la sección "También te puede interesar" de la página
   de producto lo mostrará sola, sin tocar código.
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
