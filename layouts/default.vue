<template>
	  <div class="container-fluid">
			<Nuxt />
	  </div>
</template>

<script>

export default {
	head() {
		return {
			script: [
				{ src: "//code.jivosite.com/widget/zMXkGx4Vhm", async: true }
			],
		}
	}
}