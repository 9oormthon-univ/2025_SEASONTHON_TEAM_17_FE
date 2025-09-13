import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  build: {
    sourcemap: false,
    minify: 'esbuild',
    cssMinify: true,
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('scheduler')) return 'vendor-react';
            if (id.includes('@tanstack/')) return 'vendor-query';
            if (id.includes('react-router')) return 'vendor-router';
            if (/jotai|zustand/.test(id)) return 'vendor-state';
            if (id.includes('dayjs')) return 'vendor-dayjs';
            return 'vendor';
          }
          const m = id.match(/[/\\]src[/\\]pages[/\\]([^/\\]+)/);
          return m ? `page-${m[1]}` : undefined;
        },
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/shared/assets/icons')],
      symbolId: 'icon-[name]',
    }),
    svgr({
      include: ['src/**/*.svg'],
      exclude: ['**/shared/assets/icons/**', 'public/**'],
    }),
    VitePWA({
      strategies: 'generateSW',
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      devOptions: { enabled: true },
      manifest: {
        name: '마음:ON',
        short_name: '마음ON',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ff4a93',
        icons: [
          { src: '/logo-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/logo-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{html,css,ico,svg,webp,avif,woff2}'],
        globIgnores: [
          '**/image.png',
          '**/assets/divider-*.js',
          '**/assets/diary-mammon-card-*.js',
          '**/assets/emotion-like-store-*.js',
        ],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'script',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'js-runtime',
              expiration: { maxEntries: 60, maxAgeSeconds: 7 * 24 * 3600 },
            },
          },
          {
            urlPattern: /\.(png|jpg|jpeg|gif|webp|avif)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'assets',
              expiration: { maxEntries: 120, maxAgeSeconds: 30 * 24 * 3600 },
            },
          },
          {
            urlPattern: /\.(woff2?|ttf|otf)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'fonts',
              expiration: { maxEntries: 30, maxAgeSeconds: 365 * 24 * 3600 },
            },
          },
        ],
        clientsClaim: true,
        skipWaiting: true,
      },
    }),
  ],
});
