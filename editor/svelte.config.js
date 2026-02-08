import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: '../static/edit',
			assets: '../static/edit',
			fallback: 'index.html'
		}),
		paths: {
			base: '/edit'
		}
	}
};

export default config;
