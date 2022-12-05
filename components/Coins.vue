<template>
	<div class="crypto-list-item" :class="{'active': choosed}" @click="chooseCoin(coin)">
		<div class="crypto-list-item-name">
			<div class="crypto-list-item-logo">
				<img :src="coin.image" :alt="coin.name">
			</div>
			<div class="crypto-list-item-description">
				<span class="crypto-name">{{ coin.name }}</span>
				<span class="crypto-price">{{ coin.current_price }} $</span>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'Coins',
	props: {
		coin: {
			type: Object,
			required: true
		},
		type: {
			type: String,
			required: true
		},
		choosed: {
			type: Boolean,
			required: true
		}
	},
	data() {
		return {
		}
	},
	methods: {
		chooseCoin(coin) {
			this.$nuxt.$emit('chooseCoin', {coin, type: this.type})
		}
	}
}

</script>

<style scoped>
.crypto-list-item.active {
    background: #35ca77!important;
    color: #fff!important;
}
</style>