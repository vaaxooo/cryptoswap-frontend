<template>
    <div class="layout layout-nav-side">
		<layouts-menu v-if="$auth.user" />
        <div class="main-container">
            <div class="container">
                <div class="row justify-content-center">
					<Nuxt />
				</div>
			</div>
		</div>
	</div>
</template>


<script>
export default {
	auth: true,
	head() {
		return {
			title: 'Админ-панель',
			link: [
				{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
				{ rel: 'stylesheet', type: 'text/css', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css' },
				{ rel: 'stylesheet', type: 'text/css', href: '/theme.css' },
				{ rel: 'stylesheet', type: 'text/css', href: '/style.css' },
				{ rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap' },
				{ rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap' },
				{ rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
				{ rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined' },
			]
		}
	}
}
</script>