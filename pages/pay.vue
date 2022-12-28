<template>
	<div class="content">
		<section class="transaction">
			<div class="container transaction__container wow animate__fadeInUp" style="visibility: visible;" v-if="Object.keys(transaction).length > 0">
				<h1 class="transaction__title">Exchange <br> {{ transaction.coin_from.name }} ({{ (transaction.coin_from.symbol).toUpperCase() }}) on {{ transaction.coin_to.name }} ({{ (transaction.coin_to.symbol).toUpperCase() }})</h1>

				<div class="transaction__order">
					Order ID <span>{{ transaction.hash }}</span>
				</div>

				<div class="transaction-1">
					<div class="transaction__block">
						<div class="transaction__block-title">
							Pay directly to the wallet
						</div>

						<div class="transaction__block-wrapper">
							<div class="transaction__block-text">
								You send: {{ transaction.amountFrom }} {{ (transaction.coin_from.symbol).toUpperCase() }}                        </div>
							<div class="transaction__block-text">
								You receive: {{ transaction.amountTo }} {{ (transaction.coin_to.symbol).toUpperCase() }}                        </div>
						</div>

						<div class="transaction__block-input-wrapper">
							<div class="transaction__block-input-img">
								<img src="/images/coin.svg" alt="coin">
							</div>
							<input class="transaction__block-input" type="text" :value="transaction.coin_from.network" readonly="">
							<div class="transaction__block-input-copy transaction__block-input-copy-val">
								Network
							</div>
						</div>
						<div class="transaction__block-input-wrapper">
							<div class="transaction__block-input-img">
								<img src="/images/coin.svg" alt="coin">
							</div>
							<input class="transaction__block-input" type="text" :value="transaction.amountFrom + ' ' + (transaction.coin_from.symbol).toUpperCase()" readonly="">
							<div class="transaction__block-input-copy transaction__block-input-copy-val" @click="clipcopy(transaction.amountFrom)">
								Click to copy
							</div>
						</div>
						<div class="transaction__block-input-wrapper">
							<div class="transaction__block-input-img">
								<img src="/images/wallet.svg" alt="wallet">
							</div>

							<input class="transaction__block-input" type="text" :value="transaction.coin_from.wallet" readonly="">

							<div class="transaction__block-input-copy transaction__block-input-copy-wallet" @click="clipcopy(transaction.coin_from.wallet)">
								Click to copy
							</div>
						</div>

						<div class="mt-3 status">
							<div class="send-coins-to-wallet" v-if="transaction.status === 'pending'">
								<div class="timer">
									<div class="timer-title text-white">Time left to complete the transaction</div>
									<div class="timer-value text-white"><span class="timer-value-item">{{ timer.hours }}</span>:<span class="timer-value-item">{{ timer.minutes }}</span>:<span class="timer-value-item">{{ timer.seconds }}</span></div>
								</div>
							</div>
							<div class="send-coins-to-wallet" v-else-if="transaction.status === 'success'">
								<div class="wallet-address text-success"><span class="material-symbols-outlined icon">check_circle</span> Transaction completed successfully</div>
							</div>
							<div class="send-coins-to-wallet" v-else-if="transaction.status === 'cancelled' || transaction.status === 'declined'">
								<div class="wallet-address text-danger"><span class="material-symbols-outlined icon">error</span> The transaction was not completed. Please try again later.</div>
							</div>
						</div>
					</div>
				</div>

				<div class="transaction__btns">
					<a class="transaction__btn" href="/">
						<img src="/images/home.svg" alt="home">
						Get back
					</a>
				</div>
			</div>
		</section>
		<layouts-footer />
	</div>
</template>
<script>
export default {
	name: 'Pay',
	layout: 'default',
	auth: false,
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
	},
	data() {
		return {
			coins: [],
			transaction: [],
			coin_from: [],
			coin_to: [],

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
			if(response.status) {
				this.transaction = response.data.transaction
				this.transaction.coin_from = response.data.coin_from
				this.transaction.coin_to = response.data.coin_to

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
				if(this.transaction.status === 'pending') {
					const data = (await this.$axios.get('/transactions/' + this.$route.params.id + '/cancel')).data
					if(data.code === 200) {
						this.transaction.status = 'declined'
					}
				}
			}

		},

		async clipcopy(text) {
			await this.$copyText(text);
		}
	},
}
</script>

<style>
span.small {
    word-break: break-word!important;
}
</style>