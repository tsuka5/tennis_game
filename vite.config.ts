import { defineConfig } from 'vite';

// host:true exposes the dev server on the LAN so a phone on the same Wi-Fi
// can open it (e.g. http://<PC-IP>:5173) for real-device testing (Phase 1).
// base './' keeps asset paths relative so the same build works on GitHub Pages
// (served under /<repo>/) and anywhere else.
export default defineConfig({
  base: './',
  server: {
    host: true,
    port: 5173,
  },
});
