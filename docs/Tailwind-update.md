## Upgrade Summary

### Major Version Upgrades
- **Tailwind CSS**: Upgraded from v3.x to v4.1.0
- **DaisyUI**: Upgraded from v4.x to v5.5.8
- **PostCSS**: Updated configuration for Tailwind v4 compatibility
- **Webpack**: Updated to latest version (v5.97.1)

### Key Changes Made

#### 1. Package Updates
- Updated `tailwindcss` to v4.1.0
- Updated `daisyui` to v5.5.8
- Added `@tailwindcss/postcss` as a direct dependency
- Updated other dependencies to their latest stable versions

#### 2. Configuration Changes
- **PostCSS Configuration**:
  - Replaced `tailwindcss` and `autoprefixer` with `@tailwindcss/postcss`
  - Simplified the PostCSS config to use the new plugin format

- **Webpack Configuration**:
  - Updated to work with latest webpack v5
  - Optimized build process with better code splitting
  - Added proper CSS extraction and minification

#### 3. CSS and Styling Updates
- Updated all `@tailwind` directives to use the new v4 syntax
- Modified custom components to be compatible with DaisyUI v5
- Updated responsive design utilities to match Tailwind v4's new breakpoint system
- Maintained backward compatibility with existing class names

#### 4. Build Process
- Implemented modern JavaScript features with TypeScript
- Added proper type checking and module resolution
- Optimized build output with better chunking and caching

## Development

### Prerequisites
- Node.js (v18+ recommended)
- Yarn (v4.5.3 or later)

### Installation
```bash
# Install dependencies
npm install

# Build the theme
npm run build
```

### Build Output
The built theme will be available in the `data/common/resources` directory, which can be directly used with Keycloak.

## Customization

### Theme Colors
Customize the theme by modifying the DaisyUI configuration in your CSS file. The theme currently uses the default light theme with custom social button styling.

### Social Login Icons
The theme includes pre-configured social login buttons with the following providers:
- Google
- Facebook
- GitHub
- GitLab
- Microsoft
- Adorsys

## Notes

- The theme has been tested with Keycloak 21+
- Some deprecated utilities from Tailwind v3 have been replaced with their v4 equivalents
- Custom components have been updated to work with the latest version of DaisyUI

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##reference

https://stackoverflow.com/questions/79753222/import-tailwindcss-does-not-work-when-used-in-a-file-with-an-scss-exten

https://tailwindcss.com/docs/compatibility#sass-less-and-stylus







