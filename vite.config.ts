import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';
import ui from '@nuxt/ui/vite';
import path from 'path';

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/js/app.ts'],
      ssr: 'resources/js/ssr.ts',
      refresh: true,
    }),
    tailwindcss(),
    wayfinder({
      formVariants: true,
    }),
    vue({
      template: {
        transformAssetUrls: {
          base: null,
          includeAbsolute: false,
        },
      },
    }),
    ui({
      inertia: true,
      components: {
        dirs: ['resources/js/components'],
      },
      ui: {
        colors: {
          primary: 'green',
          neutral: 'zinc'
        }
      },
      autoImport: {
        vueTemplate: true,
        dirs: ["resources/js/composables", "resources/js/utils"],
        imports: [
          "vue",
          "@vueuse/core",
          {
            "@inertiajs/vue3": ["router", "useForm", "usePage", "useRemember", "Head"],
          },
        ],

      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './resources/js'),
    },
  },
});
