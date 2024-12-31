import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['images/apple-touch-icon.png'],
      manifest: {
        name: 'React PWA Sample',
        short_name: 'PWA',
        description: 'PWAサンプル',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'images/192_noa.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'images/512_noa.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })],
})
