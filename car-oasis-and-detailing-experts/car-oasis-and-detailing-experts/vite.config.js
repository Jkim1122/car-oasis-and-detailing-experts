import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/static/',
  // build: {
  //   outDir : "../back-end/car_oasis_and_detailing_experts_proj/static/",
  //   emptyOutDir : true,
  //   sourcemap: true,
  // },
  plugins: [react()],
})
