import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	base: '/o/clarity-custom-element-distributor-map',
	plugins: [react()],
	build: {
		outDir: 'build/vite',
		rollupOptions: {
			external: [
				'react',
				'react-dom',
				'clarity-distributors-api'
			],
		}
	}

})
