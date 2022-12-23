<template>
	  <div class="wrapper">
			<div class="preloader" style="display: none;">
				<div class="preloader__circle"></div>
			</div>
			<layouts-header />
			<main class="main">
				<Nuxt />
			</main>
	  </div>
</template>

<script>

export default {
	head() {
		return {
			script: [
				{ src: "//code.jivosite.com/widget/zMXkGx4Vhm", async: true }
			],
			link: [
				{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
				{ rel: 'stylesheet', type: 'text/css', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css' },
				{ rel: 'stylesheet', type: 'text/css', href: '/css/bootstrap-reboot.min.css' },
				{ rel: 'stylesheet', type: 'text/css', href: '/css/animate.min.css' },
				{ rel: 'stylesheet', type: 'text/css', href: '/css/fonts.css' },
				{ rel: 'stylesheet', type: 'text/css', href: '/css/style.min.css' },
				{ rel: 'stylesheet', type: 'text/css', href: '/css/main.css' },
				{ rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap' },
				{ rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap' },
				{ rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
				{ rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined' },
			]
		}
	}
}