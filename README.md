# Adorsys keycloak Theme

This plugin develops a small plugin for adorsys GIS. It's meant to be integrated with Keycloak. It features:
- TailwindCSS v4
- Webpack
- DaisyUI v5
- Bash Scripting 🤣

## Overview

This repository contains a Keycloak login theme. The build pipeline compiles assets from `src/` and writes them to `data/common/resources/` which Keycloak serves when the theme is enabled.
## Todo 

## What changed
- Tailwind v3 → v4, daisyUI v4 → v5.
- PostCSS pipeline now uses `@tailwindcss/postcss`.
- Fixed webpack CSS loader order: `css-loader` → `postcss-loader` → `sass-loader`.
- Updated build script to register `ts-node` so [webpack.config.ts](cci:7://file:///home/nafisatou/tickets/adorsys-theme-json-update/adorsys-gis-theme/webpack.config.ts:0:0-0:0) runs with `yarn build`.
- Adjusted styles to meet Tailwind v4’s stricter `@apply` rules.

## Why
- Stay current with Tailwind v4/DaisyUI v5 and their CSS-first pipeline.
- Improve build reliability and keep tooling consistent (Yarn 4 + PostCSS).
- Avoid invalid `@apply` patterns and reduce build-time issues.

## How to build
```bash
corepack enable
corepack prepare yarn@4.5.3 --activate
yarn install
yarn build

