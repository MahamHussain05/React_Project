import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port:8080,  // change this to any port for example 3000 , 8080 
    open:true,
  },
})
