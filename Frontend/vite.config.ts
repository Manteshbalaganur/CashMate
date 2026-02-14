import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})

// // vite.config.ts (or .js if not using TS)
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 5173,
//     proxy: {
//       // Proxy /api calls to Flask backend → no CORS needed
//       '/api': {
//         target: 'http://127.0.0.1:5000',
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
//   css: {
//     // Optional: suppress empty file warnings (if still annoying)
//     postcss: {
//       plugins: [],
//     },
//   },
// })