import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	base: '/o/clarity-custom-element-distributor-details',
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
