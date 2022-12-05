<template>
	<div class="row">
		<div class="col-md-2 px-0 scroll">
			<div class="list-title">Что желаете обменять?</div>
			<div class="crypto-list">
				<Coins v-for="(coin, index) in coins" :key="index" :coin="coin" type="first" :choosed="coinOne.id === coin.id ? true : false" />
			</div>
		</div>

		<div class="col-md-2 px-0 scroll">
			<div class="list-title">Что желаете получить?</div>
			<div class="crypto-list">
				<Coins v-for="(coin, index) in coins" :key="index" :coin="coin" type="second" :choosed="coinTwo.id === coin.id ? true : false" />
			</div>
		</div>

		<div class="col-md-8 fixed-content">

			<div class="row">


				<div class="logo">CryptoSwap.cz</div>
				<div class="description">
					<p>CryptoSwap.cz - это надежный сервис, который своевременно и в полном объеме выполнит взятые на себя обязательства по конвертации ваших средств. На нашем ресурсе вы можете обменять биткойны и другие цифровые валюты по максимально выгодному курсу.</p>
					<p>Для начала обмена выберите валюту, которую хотите обменять, и валюту, которую хотите получить.</p>
				</div>

				<div class="centered">
					<div class="exchange-form">
						<div class="row">
							<div class="column">
								<div class="coin-one col-md-6">
									<div class="coin-one__title">Вы обмениваете</div>
									<div class="exchange-item" v-if="coinOne && Object.keys(coinOne).length > 0">
										<div class="crypto-list-item-name">
											<div class="crypto-list-item-logo">
												<img :src="coinOne.image" :alt="coinOne.name">
											</div>
											<div class="crypto-list-item-description">
												<span class="crypto-name">{{ coinOne.name }}</span>
												<span class="crypto-price">{{ coinOne.current_price }} $</span>
											</div>
										</div>
									</div>
									<div class="exchange-item text-muted" v-else>
										Не выбрано
									</div>
								</div>
								<div class="coin-two col-md-6">
									<div class="coin-two__title">Вы получаете</div>
									<div class="exchange-item" v-if="coinTwo && Object.keys(coinTwo).length > 0">
										<div class="crypto-list-item-name">
											<div class="crypto-list-item-logo">
												<img :src="coinTwo.image" :alt="coinTwo.name">
											</div>
											<div class="crypto-list-item-description">
												<span class="crypto-name">{{ coinTwo.name }}</span>
												<span class="crypto-price">{{ coinTwo.current_price }} $</span>
											</div>
										</div>
									</div>
									<div class="exchange-item text-muted" v-else>
										Не выбрано
									</div>
								</div>
							</div>
						</div>

						<div class="row">
							<div class="col-md-4">
								<div class="form-group">
									<label for="amount">Сумма</label>
									<input type="number" class="form-control input" id="amount" placeholder="Введите сумму" v-model="amountFrom">
								</div>
							</div>


							<div class="col-md-8">
								<div class="form-group">
									<label for="email">E-mail</label>
									<input type="email" class="form-control input" id="email" placeholder="Укажите вашу почту" v-model="email">
								</div>
							</div>
						</div>

						<div class="col-md-12">
							<div class="form-group">
								<label for="wallet">Кошелек</label>
								<input type="text" class="form-control input" id="wallet" placeholder="Укажите кошелек получателя" v-model="wallet">
							</div>
						</div>

						<div class="form-group my-0" v-if="coinOne && coinTwo && amountFrom">
							<div class="exchange-info">
								<div class="exchange-info__title">Вы получите:</div>
								<div class="exchange-info__value">{{ amountTo }} {{ coinTwo.symbol ? (coinTwo.symbol).toUpperCase() : '' }}</div>
							</div>
						</div>

						<div class="form-group my-0">
							<div class="exchange-button" v-if="Object.keys(coinOne).length === 0 || Object.keys(coinTwo).length === 0 || !amountFrom || !amountTo || !email || !wallet">
								<button type="button" class="btn btn-exchange disabled" disabled>Обменять</button>
							</div>
							<div class="exchange-button" v-else>
								<button type="button" class="btn btn-exchange" @click="exchange">Обменять</button>
							</div>
						</div>
					</div>
				</div>


				<div class="footer">
					<div class="footer__description">
						<p>По всем вопросам вы можете связаться с нами в <a href="https://t.me/vaaxooo" class="footer__link">Telegram</a></p>
					</div>
					<div class="d-flex">
						<div class="copyright">CryptoSwap.cz &copy; 2019-2022 All rights reserved</div>
						<a href="/terms" class="footer__link mx-5">Пользовательское соглашение</a>
					</div>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
export default {
  	name: 'IndexPage',
  	layout: 'default',
  	data() {
		return {
			coins: [],

			coinOne: {},
			coinTwo: {},

			amountFrom: 0,
			amountTo: 0,

			email: '',
			wallet: ''
		}
  	},
	watch: {
		coinOne() {
				let price = +this.amountFrom * +this.coinOne.current_price / +this.coinTwo.current_price
				this.amountTo = price ? price.toFixed(8) : 0
		},
		coinTwo() {
				let price = +this.amountFrom * +this.coinOne.current_price / +this.coinTwo.current_price
				this.amountTo = price ? price.toFixed(8) : 0
		},
		amountFrom() {
			if(this.coinOne && this.coinTwo) {
				let price = +this.amountFrom * +this.coinOne.current_price / +this.coinTwo.current_price
				this.amountTo = price ? price.toFixed(8) : 0
			}
		}
	},

	async mounted() {
		if (this.$mobileDetect.mobile()) {
			this.$router.push('/mobile')
		}
	},

	async created() {

		if(this.$route.query.r) {
			localStorage.setItem('ref', this.$route.query.r)
		}

		this.$nuxt.$off('chooseCoin')
		this.$nuxt.$on('chooseCoin', (data) => {
			if(data.type === 'first') {
				this.coinOne = data.coin
			} else {
				this.coinTwo = data.coin
			}
		})
	},
	async fetch() {
		await this.fetchCoins()
	},
	methods: {
		async fetchCoins() {
			const response = (await this.$axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')).data

			for (let i = 0; i < response.length; i++) {
				const coin = response[i]

				if(coin.name === "BNB") {
					coin.current_price = +coin.current_price + 10
				}
			}

			this.coins = response
		},

		async exchange() {
			const response = (await this.$axios.post('/transactions', {
				coinFrom: this.coinOne.id,
				coinTo: this.coinTwo.id,
				amountFrom: +this.amountFrom,
				amountTo: +this.amountTo,
				email: this.email,
				wallet: this.wallet,
				ref: localStorage.getItem('ref') || null
			})).data
			if(response.status === 'success') {
				this.$router.push('/pay/' + response.data.hash)
			} else {
				console.log('error')
			}
		}
	}
}
</script>

<style scoped>


.scroll {
    overflow-y: scroll;
    height: calc(100vh);
}


/* width */

::-webkit-scrollbar {
    width: 1px;
}


/* Track */

::-webkit-scrollbar-track {
    background: #f1f1f1;
}


/* Handle */

::-webkit-scrollbar-thumb {
    background: #888;
}


/* Handle on hover */

::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>
