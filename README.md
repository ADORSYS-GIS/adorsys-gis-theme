# Adorsys keycloak Theme

This plugin develops a small plugin for adorsys GIS. It's meant to be integrated with Keycloak. It features:
- TailwindCSS v4
- Webpack
- DaisyUI v5
- Bash Scripting 🤣

## Overview

This repository contains a Keycloak login theme. The build pipeline compiles assets from `src/` and writes them to `data/common/resources/` which Keycloak serves when the theme is enabled.

Theme assets referenced by `data/login/theme.properties`:
- CSS: `css/main.css`
- JS: `js/runtime.js js/main.js`

## Prerequisites

- Node.js (Corepack/Yarn 4)
- Docker + Docker Compose (to preview the theme in a local Keycloak)

## Install dependencies

From `adorsys-gis-theme/`:

```bash
corepack enable
corepack prepare yarn@4.5.3 --activate
yarn install
```

## Build assets

This project uses a TypeScript webpack config. To build without changing scripts, preload `ts-node`:

```bash
# Run from adorsys-gis-theme/
TS_NODE_SKIP_PROJECT=1 \
TS_NODE_COMPILER_OPTIONS='{"module":"commonjs","esModuleInterop":true,"target":"ES2020"}' \
NODE_OPTIONS="--require ts-node/register/transpile-only" \
yarn webpack --config webpack.config.ts
```

Outputs:
- `data/common/resources/css/main.css`
- `data/common/resources/js/main.js`

## Preview in Keycloak (Docker Compose)

`compose.yml` defines a Keycloak service that mounts this theme:

```yaml
services:
  keycloak:
    image: quay.io/keycloak/keycloak:${KC_VERSION}
    command:
      - "start-dev"
      - "--import-realm"
      - "--spi-theme-static-max-age=-1"
      - "--spi-theme-cache-themes=false"
      - "--spi-theme-cache-templates=false"
    ports:
      - ${KC_PORT}:8080
    volumes:
      - ./.docker/keycloak-config/:/opt/keycloak/data/import/:ro
      - ./data:/opt/keycloak/themes/adorsys-tm-01:ro
```

1) Create a `.env` in `adorsys-gis-theme/` (or export env vars):

```env
KC_VERSION=26.0.7
KC_LOG_LEVEL=INFO
# KC_REALM_NAME=adorsys   # optional: set your target realm name
KEYCLOAK_ADMIN=admin
KEYCLOAK_ADMIN_PASSWORD=keycloak
KC_PORT=8081
```

2) Start Keycloak:

```bash
docker compose up --wait
```

3) Open http://localhost:8081 and login to admin with `admin/admin`.

4) In Realm Settings → Themes, set the Login theme to `adorsys-tm-01`.

5) Open the realm’s login page (e.g. from an incognito window) to verify the theme UI.

## Notes on Tailwind CSS v4 / DaisyUI v5

- Tailwind v4 uses `@tailwindcss/postcss` and CSS-first directives. See `postcss.config.js`.
- Some `@apply` patterns from v3 are no longer allowed in v4 (e.g. `sm:` variants inside `@apply`).
- In `src/css/global.scss`, responsive `@apply` was replaced by media queries where needed, and a few utilities (e.g. spacing, a DaisyUI utility) were expressed as raw CSS to satisfy v4.

## Alternative: JS webpack config

If you prefer running `yarn build` without environment flags, convert `webpack.config.ts` to `webpack.config.js` and remove the `ts-node` preload. Functionality is unchanged.

## Upgrade Summary (what changed and why)

__Versions updated__

- `tailwindcss`: `^4.0.0`
- `daisyui`: `^5.0.0`

__Files changed__

- `adorsys-gis-theme/package.json`
  - Upgraded TailwindCSS and DaisyUI versions
  - Added dev dependencies: `@tailwindcss/postcss`, `ts-node`, `@types/node`
- `adorsys-gis-theme/postcss.config.js`
  - Switched to Tailwind v4 plugin: `@tailwindcss/postcss`
- `adorsys-gis-theme/src/css/global.scss`
  - Added Tailwind v4 CSS directives: `@reference "tailwindcss";` and `@plugin "daisyui";`
  - Wrapped custom styles in `@layer components { ... }` to allow `@apply` where valid in v4
  - Replaced disallowed `@apply` variant usage (e.g. `sm:` in `@apply`) with media queries
  - Replaced a few utilities that v4 rejects in `@apply` (e.g. spacing, `label-text`) with equivalent raw CSS

__Why these changes__

- Tailwind v4 moved to a CSS-first, plugin-based setup and tightened `@apply` rules
- DaisyUI v5 is compatible with Tailwind v4 but some component utilities must be applied differently in author CSS

__How to verify the upgrade__

- Check `package.json` devDependencies contain the updated versions
- Optionally, confirm via Yarn:

```bash
cd adorsys-gis-theme
node -p "require('./package.json').devDependencies.tailwindcss"
node -p "require('./package.json').devDependencies.daisyui"
```
