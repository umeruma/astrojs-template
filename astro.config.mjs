import { defineConfig, passthroughImageService } from 'astro/config'
import react from '@astrojs/react'

const assetsBase = ''

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  image: {
    service: passthroughImageService()
  },
  trailingSlash: "always",
  outDir: './dist/',
  build: {
    format: 'directory',
  },
  server: {
    // open: '',
  },
  compressHTML: false,
  vite: {
    ssr: {
      noExternal: [
        'gsap'
      ]
    },
    plugins: [
    ],
    build: {
      rollupOptions: {
        output: {
          assetFileNames: assetInfo => {
            let extType = assetInfo.names[0].split('.').at(1);
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              extType = 'images';
            }
            if (/mp4|webm|wav/i.test(extType)) {
              extType = 'videos';
            }
            if (/woff/i.test(extType)) {
              extType = 'font';
            }
            return `${assetsBase}_assets/${extType}/[name]-[hash][extname]`;
          },
          chunkFileNames: `${assetsBase}_assets/js/[name]-[hash].js`,
          entryFileNames: `${assetsBase}_assets/js/[name]-[hash].js`,
        }
      }
    }
  }
});