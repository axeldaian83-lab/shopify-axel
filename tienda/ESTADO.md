# Estado del proyecto — s-t-9833

- Tienda: s-t-9833.myshopify.com
- Carpeta: /home/user/shopify-axel/tienda
- Tema base: Dawn (descargado 2026-07-25, vía git clone --depth 1)
- Tema instalado en la tienda: "Horizon" [live] — id #153936953535
- Entorno: Node v22.22.2, Shopify CLI 4.5.2 — OK
- Conexión Admin API: OK vía client credentials grant (app propia en Dev Dashboard,
  scopes write_products,write_files — el token vive fuera del repo, en el
  entorno de trabajo; se regenera con client_id/client_secret cuando caduque
  cada 24h, NO se guarda en el repositorio)
- Producto existente al conectar: NINGUNO (catálogo vacío) → rama "no hay producto"
- Última publicación: (pendiente)
- Tema de trabajo (NO publicado) en Shopify: "s-t-9833 (Claude)" — id #153953042623
  - Previsualizar: https://s-t-9833.myshopify.com?preview_theme_id=153953042623
  - Editor: https://s-t-9833.myshopify.com/admin/themes/153953042623/editor

## Fases completadas
- [x] 0 Entorno
- [x] 1 Conexión (tema + Admin API)
- [x] 2 Proyecto (Dawn descargado y subido como tema de trabajo)
- [ ] 3 Diseño
- [ ] 4 Construcción
- [ ] 5 Páginas
- [ ] 6 Publicación

## Decisiones de diseño
(se rellena en la fase 3, tras el mensaje 2 al usuario)

## Secciones creadas
(se rellena en la fase 4)

## Notas técnicas de esta sesión
- Este entorno es un contenedor remoto sin navegador local: `shopify theme list`
  funciona con el flujo de device-code (imprime enlace, se pasa al usuario).
- `shopify store auth` (OAuth con callback local) NO funciona aquí (requiere
  navegador y servidor en la misma máquina). Se resolvió creando una app
  personalizada desde Dev Dashboard (sistema 2026) y usando el flujo
  client_credentials directamente contra
  `https://s-t-9833.myshopify.com/admin/oauth/access_token` para obtener un
  `shpat_...` de 24h, usado luego como `X-Shopify-Access-Token` en llamadas
  GraphQL directas a `/admin/api/2024-10/graphql.json` (en vez de
  `shopify store execute`).
- Se creó un `/usr/local/bin/xdg-open` no-op para que el CLI no aborte al
  intentar abrir un navegador inexistente en este contenedor.
