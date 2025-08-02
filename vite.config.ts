import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from 'vite-plugin-pwa';
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp}'],
        cleanupOutdatedCaches: true,
        skipWaiting: true
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'lovable-uploads/*.png'],
      manifest: {
        name: 'Austyn Eguale - Voice AI Visionary',
        short_name: 'ODIA',
        description: 'Builder of Nigeria\'s Voice AI Infrastructure',
        theme_color: '#3b82f6',
        background_color: '#0a0f1c',
        display: 'standalone',
        icons: [
          {
            src: '/lovable-uploads/5c695c83-888a-4e31-9d9c-32989ffb3962.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/lovable-uploads/5c695c83-888a-4e31-9d9c-32989ffb3962.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    }),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
