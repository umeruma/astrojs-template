import { defineConfig, passthroughImageService } from 'astro/config'
import react from '@astrojs/react'
import license from "rollup-plugin-license";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL('.', import.meta.url));

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
      license({
        sourcemap: true,
        thirdParty: {
          includePrivate: true,
          multipleVersions: true,
          output: {
            file: join(__dirname, "dist", "LICENSE.txt"),
            encoding: "utf-8",
          },
        },
      }),
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
