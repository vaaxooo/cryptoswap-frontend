<template>
	<div class="content">
		<section class="hero" id="about">
			<div class="container hero__container">
				<h1 class="title hero__title wow animate__fadeInUp" style="visibility: visible; animation-name: fadeInUp;">
					New modern cryptocurrency exchange platform — <span>CryptoSwap</span>
				</h1>

				<h2 class="subtitle hero__subtitle wow animate__fadeInUp" data-wow-delay=".25s" style="visibility: visible; animation-delay: 0.25s; animation-name: fadeInUp;">
					We are happy to present you new biggest service to exchange your cryptocurrency. You can easily
					exchange every coin listed on Binance with lowest fee!
				</h2>

				<img class="hero__img wow animate__fadeInUp" data-wow-delay=".5s" src="images/ctypto.png" alt="crypto" style="visibility: visible; animation-delay: 0.5s; animation-name: fadeInUp;">

				<div class="hero__text wow animate__fadeInUp" data-wow-delay=".75s" style="visibility: visible; animation-delay: 0.75s; animation-name: fadeInUp;">
					And many other coins are available!
				</div>

				<a class="hero__btn wow animate__fadeInUp" data-wow-delay="1s" href="#exchange" style="visibility: visible; animation-delay: 1s; animation-name: fadeInUp;">Exchange</a>
			</div>
		</section>

		<section class="exchange" id="exchange">
			<div class="container exchange__container">
				<div class="exchange__text wow animate__fadeInUp" data-wow-delay=".25s" style="visibility: visible; animation-delay: 0.25s; animation-name: fadeInUp;">
					START THE EXCHANGE IN JUST FEW CLICKS!
				</div>

				<h3 class="title exchange__title wow animate__fadeInUp" data-wow-delay=".5s" style="visibility: visible; animation-delay: 0.5s; animation-name: fadeInUp;">
					CHOOSE THE PAIR TO EXCHANGE
				</h3>

				<div class="exchange__wrapper wow animate__fadeInUp" data-wow-delay=".75s" style="visibility: visible; animation-delay: 0.75s; animation-name: fadeInUp;">
					<div class="exchange__block exchange__block_big">
						<div class="exchange__block-title">
							YOU SEND
						</div>

						<ul class="exchange__block-list exchange__block-list-send">
							<li class="exchange__block-item exchange__block-item-send text-white" v-for="coin in coins" :key="coin.id" :class="{'exchange__block-item_active': coin.symbol === coinOne.symbol}" @click="coinOne = coin">
								<img :src="'/coins/' + coin.symbol + '.png'" :alt="(coin.symbol).toUpperCase()" height="48px" class="p-2"> {{ (coin.name).toUpperCase() }}
							</li>
						</ul>
					</div>

					<div class="exchange__block exchange__block_big">
						<div class="exchange__block-title">
							YOU RECEIVE
						</div>

						<ul class="exchange__block-list exchange__block-list-receive">
							<li class="exchange__block-item exchange__block-item-send text-white" v-for="coin in coins" :key="coin.id" :class="{'exchange__block-item_active': coin.symbol === coinTwo.symbol}" @click="coinTwo = coin">
								<img :src="'/coins/' + coin.symbol + '.png'" :alt="(coin.symbol).toUpperCase()" height="48px" class="p-2"> {{ (coin.name).toUpperCase() }}
							</li>
						</ul>
					</div>

					<div class="exchange__block exchange__block_small">
						<div class="exchange__block-title">
							FILL THE FIELDS
						</div>

						<div class="exchange__block-form">
							<div class="exchange__block-wrapper">
								<div class="exchange__block-text exchange__block-text-send">
									You send
								</div>
								<div class="exchange__block-header exchange__block-header-send">
									{{ coinOne.name }} ({{ coinOne.symbol }})
								</div>
								<input class="exchange__block-input exchange__block-input-val exchange__block-input-send" type="number" step="any" required="" v-model="amountFrom">
							</div>

							<div class="exchange__block-wrapper">
								<div class="exchange__block-text exchange__block-text-receive">
									You receive
								</div>
								<div class="exchange__block-header exchange__block-header-receive">
									{{ coinTwo.name }} ({{ coinTwo.symbol }})
								</div>
								<input class="exchange__block-input exchange__block-input-val exchange__block-input-receive disabled" type="number" step="any" required="" v-model="amountTo" disabled>
							</div>

							<div class="exchange__block-wrapper">
								<div class="exchange__block-text">
									Receive address
								</div>
								<input class="exchange__block-input exchange__block-input-receive-address" type="text" placeholder="Your address" required="" v-model="wallet">
							</div>

							<div class="exchange__block-wrapper">
								<div class="exchange__block-text">
									E-mail
								</div>
								<input class="exchange__block-input exchange__block-input-email" type="email" placeholder="E-mail" required="" v-model="email">
							</div>

							<div class="exchange__block-wrapper">
								<div class="exchange__block-text">
									Referral code
								</div>
								<input class="exchange__block-input" type="text" id="referral_code" placeholder="Referral code" value="" v-model="ref">
							</div>

							<button class="exchange__block-btn" @click="exchange">Continue</button>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section class="how-exchange" id="how-exchange">
			<div class="container how-exchange__container">
				<div class="how-exchange__wrapper">
					<div class="how-exchange__start wow animate__fadeInLeft" data-wow-delay=".25s" style="visibility: visible; animation-delay: 0.25s; animation-name: fadeInLeft;">
						<div class="how-exchange__text">
							HOW TO EXCHANGE YOUR CRYPTO?
						</div>

						<h3 class="title how-exchange__title">
							FOLLOW THESE SIMPLE STEPS:
						</h3>

						<img class="how-exchange__steps" src="images/steps.png" alt="steps">
					</div>

					<div class="how-exchange__end wow animate__fadeInRight" data-wow-delay=".25s" style="visibility: visible; animation-delay: 0.25s; animation-name: fadeInRight;">
						<img class="how-exchange__steps-2" src="images/steps2.png" alt="steps">
					</div>
				</div>

				<div class="how-exchange__blocks wow animate__fadeInUp" data-wow-delay=".5s" style="visibility: visible; animation-delay: 0.5s; animation-name: fadeInUp;">
					<div class="how-exchange__block">
						<div class="how-exchange__block-step">
							Step #1
						</div>
						<h4 class="how-exchange__block-title">
							Check your wallet for 15% bonus!
						</h4>

						<div class="how-exchange__block-text">
							Enter your address to receive bonus!
						</div>

						<input class="how-exchange__block-input" type="text" placeholder="Any coin address" v-model="bonus_wallet">

						<button class="how-exchange__block-btn" v-if="bonus_status === ''" @click="checkBonus">Check wallet for bonus</button>
						<button class="how-exchange__block-btn" style="background: background: rgb(0, 255, 163); color: rgb(255, 255, 255);" v-if="bonus_status === 'success'">Confirmed!</button>
						<button class="how-exchange__block-btn" style="background: rgb(255, 0, 0); color: rgb(255, 255, 255);" v-if="bonus_status === 'error'">Denied!</button>
					</div>

					<div class="how-exchange__block">
						<div class="how-exchange__block-step">
							Step #2
						</div>
						<h4 class="how-exchange__block-title">
							Choose the pair of cryptocurrency
						</h4>
						<div class="how-exchange__block-text">
							For example Fatnom --&gt; Avalanche.
						</div>
						<img src="images/1.png" alt="">
					</div>

					<div class="how-exchange__block">
						<div class="how-exchange__block-step">
							Step #3
						</div>
						<h4 class="how-exchange__block-title">
							Pay the request after filling the information fields
						</h4>
						<div class="how-exchange__block-text">
							After that — wait for the confirmation!
						</div>
						<img class="how-exchange__block-img" src="images/2.png" alt="">
					</div>
				</div>
			</div>
		</section>


		<section class="support" id="support">
			<div class="container support__container">
				<div class="support__logo">
					CryptoSwap.cz
				</div>
				<h3 class="support__title">
					Answering your questions 24/7
				</h3>
				<div class="support__text">
					Send message to our support!
				</div>
				<a class="support__btn" href="https://telegram.me/CzSwapSupport">
					<img src="images/tg.svg" alt="tg">
					Open chat
				</a>
			</div>
		</section>

		<layouts-footer />
	</div>
</template>

<script>
export default {
  	name: 'IndexPage',
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

			coinOne: {},
			coinTwo: {},

			amountFrom: 0,
			amountTo: 0,

			email: '',
			wallet: '',
			ref: '',
			bonus_wallet: '',
			bonus_status: '',

			errors: []
		}
  	},
	computed: {
		availableLocales () {
			return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
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
		},
		// amountTo() {
		// 	if(this.coinOne && this.coinTwo) {
		// 		let price = +this.amountTo * +this.coinTwo.current_price / +this.coinOne.current_price
		// 		this.amountFrom = price ? price.toFixed(8) : 0
		// 	}
		// }
	},

	async created() {

		if(localStorage.getItem('ref') && !this.$route.query.r) {
			this.ref = localStorage.getItem('ref')
		}

		if(this.$route.query.r) {
			localStorage.setItem('ref', this.$route.query.r)
			this.ref = this.$route.query.r
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
			const { data: response } = (await this.$axios.get('/coins')).data

			this.coinOne = response[0]
			this.coinTwo = response[1]

			for (let i = 0; i < response.length; i++) {
				const coin = response[i]

				if(coin.name === "BNB") {
					coin.current_price = +coin.current_price - 10
				}

				if(coin.name === "Solana") {
					coin.current_price = +coin.current_price - 0.99
					coin.current_price = +coin.current_price.toFixed(2)
				}

				if(coin.name === "Avalanche") {
					coin.current_price = +coin.current_price - 0.70
					coin.current_price = +coin.current_price.toFixed(2)
				}
			}

			this.coins = response
		},

		async exchange() {

			if(!this.coinOne || !this.coinTwo) {
				this.$toast.error('Choose coins')
				return
			}

			if(!this.amountFrom) {
				this.$toast.error('Enter amount')
				return
			}

			if(!this.email) {
				this.$toast.error('Enter email')
				return
			}

			if(!this.wallet) {
				this.$toast.error('Enter wallet')
				return
			}

			if(this.amountFrom < 0.01) {
				this.$toast.error('Minimum amount is 0.01')
				return
			}

			const response = (await this.$axios.post('/transactions', {
				coinFrom: this.coinOne.id,
				coinTo: this.coinTwo.id,
				amountFrom: +this.amountFrom,
				amountTo: +this.amountTo,
				email: this.email,
				wallet: this.wallet,
				ref: this.ref || ''
			})).data
			if(response.status) {
				let path = '/pay/' + response.data.hash
				if(this.$i18n.locale !== 'ru') {
					path = `/${this.$i18n.locale}${path}`
				}
				this.$router.push(path)
			} else {
				console.log('error')
			}
		},

		async checkBonus() {
			if(this.bonus_wallet === '') {
				this.bonus_status = 'error'
			} else {
				this.bonus_status = 'success'
			}
		}
	}
}
</script>