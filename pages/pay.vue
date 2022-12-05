<template>
	<div class="row pay-mt-5">
		<div class="centered">
			<h2 class="container-title text-center mb-3">CryptoSwap.cz</h2>
			<div class="exchange-block-info" v-if="transaction && Object.keys(transaction).length > 0">
				<div class="row">
					<div class="col-md-12 d-flex">
						<div class="coin-info">
							<img :src="transaction.from.image" alt="" loading="lazy" class="coin-image">
							<div class="coin-info-desc">
								<div class="coin-info-name">{{ transaction.from.name }} <span class="small">{{ transaction.amountFrom }} {{ (transaction.from.symbol).toUpperCase() }}</span></div>
							</div>
						</div>
						<div class="exchange-block-info-arrow m-auto mt-0"><span class="material-symbols-outlined">arrow_forward</span></div>
						<div class="coin-info">
							<img :src="transaction.to.image" alt="" loading="lazy" class="coin-image">
							<div class="coin-info-desc">
								<div class="coin-info-name">{{ transaction.to.name }} <span class="small">{{ transaction.amountTo }} {{ (transaction.to.symbol).toUpperCase() }}</span></div>
							</div>
						</div>
					</div>
					<div class="col-md-12">
						<div class="wallet word-break">
							<div class="wallet-info"> E-mail: <span class="px-0">{{ transaction.email }}</span></div>
							<div class="wallet-info"> Recipient's wallet: <span class="px-0">{{ transaction.wallet }}</span></div>
							<div class="wallet-info"> Transaction ID: <span class="px-0">{{ transaction.hash }}</span></div>
						</div>
					</div>
				</div>
				<div class="swap-line"></div>
				<div class="send-coins-to-wallet">
					<div class="wallet-address"><span class="material-symbols-outlined icon">send</span> Transfer <b>{{ transaction.amountFrom }} {{ (transaction.from.symbol).toUpperCase() }}</b> to the wallet below
						<div class="wallet-to"><span class="wallet-address-value text-danger">0x595bDC55247003202C00ac2eCd5E9fc78BE65B8a</span></div>
					</div>
					<div class="timer">
						<div class="timer-title">Time left to complete the transaction</div>
						<div class="timer-value"><span class="timer-value-item">{{ timer.hours }}</span><span class="timer-value-item">{{ timer.minutes }}</span><span class="timer-value-item">{{ timer.seconds }}</span></div>
					</div>
				</div>
			</div>
			<div class="copy text-center mt-3">
				<div class="copy-links">
					<div class="copy-text"> CryptoSwap.cz © 2019-2022 All rights reserved.</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'Pay',
	data() {
		return {
			coins: [],
			transaction: [],

			timer: {
				hours: 0,
				minutes: 0,
				seconds: 0
			},
		}
	},
	async fetch() {
		await this.fetchCoins()
		await this.getTransaction()
	},
	methods: {
		async fetchCoins() {
			const response = (await this.$axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')).data
			for (let i = 0; i < response.length; i++) {
				const coin = response[i]
				if(coin.name === "BNB") {
					coin.current_price = +coin.current_price - 10
				}
			}
			this.coins = response
		},
		
		async getTransaction() {
			const response = (await this.$axios.get('/transactions/' + this.$route.params.id)).data
			if(response.status == 'success') {
				this.transaction = response.data

				this.coins.forEach(coin => {
					if(coin.id === this.transaction.coinFrom) {
						this.transaction.from = coin
					}
					if(coin.id === this.transaction.coinTo) {
						this.transaction.to = coin
					}
				})

				setInterval(() => {
					this.timerTrack()
				}, 1000)
			}
		},


		async timerTrack() {
			const now = new Date()
			const end = new Date(this.transaction.createdAt)
			end.setMinutes(end.getMinutes() + 60)
			const diff = end - now
			const seconds = Math.floor((diff / 1000) % 60)
			const minutes = Math.floor((diff / 1000 / 60) % 60)
			const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
			this.timer.hours = hours
			this.timer.minutes = minutes
			this.timer.seconds = seconds

			if(diff <= 0) {
				this.timer.hours = 0
				this.timer.minutes = 0
				this.timer.seconds = 0

				const data = (await this.$axios.get('/transactions/' + this.$route.params.id + '/cancel')).data
				if(data.code === 200) {
					this.transaction.status = 'declined'
				}
			}
		}
	},
}
</script>

<style>
span.small {
    word-break: break-word!important;
}
</style>