import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
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
    mode === "development" && componentTagger()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'esnext', // Modern browsers for smaller bundles
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React core - loaded first
          if (id.includes('node_modules/react/') || 
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/scheduler/')) {
            return 'react-vendor';
          }
          // Router - needed for navigation
          if (id.includes('react-router')) {
            return 'router';
          }
          // UI components - can be deferred
          if (id.includes('lucide-react') || 
              id.includes('clsx') || 
              id.includes('tailwind-merge') ||
              id.includes('class-variance-authority')) {
            return 'ui-vendor';
          }
          // Radix UI - loaded on demand
          if (id.includes('@radix-ui')) {
            return 'radix-ui';
          }
          // Animation libraries - can be deferred
          if (id.includes('framer-motion')) {
            return 'motion';
          }
          // Heavy libraries - definitely lazy loaded
          if (id.includes('recharts') || id.includes('d3-')) {
            return 'charts';
          }
          // Form libraries
          if (id.includes('react-hook-form') || id.includes('@hookform') || id.includes('zod')) {
            return 'forms';
          }
        },
      },
    },
    minify: 'esbuild',
    chunkSizeWarningLimit: 1000,
    // Optimize asset handling
    assetsInlineLimit: 4096, // Inline small assets as base64
    // Enable source maps for debugging but keep them small
    sourcemap: false,
    // Reduce bundle size
    reportCompressedSize: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['@react-three/fiber', '@react-three/drei', 'three'],
  },
  // Enable esbuild optimizations
  esbuild: {
    drop: mode === 'production' ? ['console', 'debugger'] : [],
    legalComments: 'none',
  },
}));
