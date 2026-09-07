import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import fs from 'fs';

export default defineConfig(() => {
  return {
    plugins: [
      react(), 
      tailwindcss(),
      {
        name: 'save-data-plugin',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url === '/api/save' && req.method === 'POST') {
              let body = '';
              req.on('data', chunk => body += chunk);
              req.on('end', () => {
                const filePath = path.resolve(__dirname, 'src/saved_data.json');
                const currentContent = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf-8') : '';
                if (currentContent !== body) {
                  fs.writeFileSync(filePath, body);
                }
                res.end('ok');
              });
              return;
            }
            if (req.url === '/api/data' && req.method === 'GET') {
              const filePath = path.resolve(__dirname, 'src/saved_data.json');
              res.setHeader('Content-Type', 'application/json');
              if (fs.existsSync(filePath)) {
                res.end(fs.readFileSync(filePath, 'utf-8'));
              } else {
                res.end('{}');
              }
              return;
            }
            next();
          });
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâ€”file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {
        ignored: ['**/src/saved_data.json']
      },
    },
  };
});
