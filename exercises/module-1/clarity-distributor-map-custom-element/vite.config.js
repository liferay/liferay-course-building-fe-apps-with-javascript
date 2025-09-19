import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	base: '/o/clarity-distributor-map-custom-element',
	plugins: [react({
		jsxRuntime: 'classic',
	})],
	build: {
		outDir: 'build/vite',
		rollupOptions: {
			external: [
				'react',
				'react-dom'
			],
		}
	}

})
