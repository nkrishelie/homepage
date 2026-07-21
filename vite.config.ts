import path from 'path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function materialsManifestPlugin() {
  return {
    name: 'generate-materials-manifest',
    buildStart() {
      const scriptPath = path.resolve(__dirname, 'scripts/generate-materials-manifest.mjs');
      const result = spawnSync(process.execPath, [scriptPath], {
        cwd: __dirname,
        stdio: 'inherit',
        env: process.env,
      });
      if (result.error) throw result.error;
      if (result.status !== 0) {
        throw new Error(`generate-materials-manifest exited with ${result.status}`);
      }
    },
  };
}

export default defineConfig(() => {
    return {
      base: '/',
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react(), materialsManifestPlugin()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
