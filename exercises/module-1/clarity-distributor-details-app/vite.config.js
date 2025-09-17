import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	base: '/o/clarity-distributor-details-custom-element',
	plugins: [react({
		jsxRuntime: 'classic',
	})],
	build: {
		sourcemap: true,
		outDir: 'build/vite',
		rollupOptions: {
			external: [
				'react',
				'react-dom'
			],
		}
	},

	server: {
		sourcemapIgnoreList: false // Shows correct file paths in dev tools
	}
})
