import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['images/favicon.ico', 'images/apple-touch-icon-180x180.png'],
      injectRegister: 'auto',
      manifest: {
        name: 'React PWA Sample',
        short_name: 'PWA',
        description: 'PWAサンプル',
        theme_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'images/pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png'
          },
          {
            src: 'images/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'images/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'images/maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
       ]
      }
    })
    ],
})
