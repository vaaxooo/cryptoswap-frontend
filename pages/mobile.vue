<template>
		<div class="row">
			<div class="col-md-12">

				<div class="logo">CryptoSwap.cz</div>
				<div class="logo-text">
					<p>CryptoSwap.cz {{ $t('description_text_one') }}</p>
					<p>{{ $t('description_text_two') }}</p>
				</div>

				<div class="mobile-crypto-item">

					<div class="row">

						<div class="col-6">
							<div class="mobile-crypto-item__title">{{ $t('you_are_exchanging') }}</div>
							<div class="crypto-item" @click="openCoinsModal('first')" v-if="Object.keys(coinOne).length > 0">
								<div class="crypto-item__logo">
									<img :src="coinOne.image" :alt="coinOne.name">
								</div>
								<div class="crypto-item__description">
									<div class="crypto-item__name">{{ coinOne.name }}</div>
									<div class="crypto-item__price">{{ coinOne.current_price }} $</div>
								</div>
							</div>
							<div class="crypto-item" @click="openCoinsModal('first')" v-else>
								{{ $t('not_selected') }}
							</div>
						</div>

						<div class="col-6">
							<div class="mobile-crypto-item__title">{{ $t('you_get') }}</div>
							<div class="crypto-item" @click="openCoinsModal('second')" v-if="Object.keys(coinTwo).length > 0">
								<div class="crypto-item__logo">
									<img :src="coinTwo.image" :alt="coinTwo.name">
								</div>
								<div class="crypto-item__description">
									<div class="crypto-item__name">{{ coinTwo.name }}</div>
									<div class="crypto-item__price">{{ coinTwo.current_price }} $</div>
								</div>
							</div>
							<div class="crypto-item" @click="openCoinsModal('second')" v-else>
								{{ $t('not_selected') }}
							</div>
						</div>
					</div>

					
					<div class="exchange-form mt-3">
						<div class="exchange-form__title my-0">{{ $t('exchange') }}</div>

						<div class="exchange-form__item">
							<div class="exchange-form__input">
								<label>{{ $t('label_exchange_three') }}</label>
								<input type="number" placeholder="0.00000000" class="form-control input" v-model="amountFrom">
							</div>
						</div>

						<div class="exchange-form__item">
							<div class="exchange-form__input">
								<label>{{ $t('label_email') }}</label>
								<input type="email" :placeholder="$t('label_email_placeholder')" class="form-control input" v-model="email">
							</div>
						</div>

						<div class="exchange-form__item">
							<div class="exchange-form__input">
								<label>{{ $t('label_wallet_address') }}</label>
								<input type="text" :placeholder="$t('label_wallet_address_placeholder')" class="form-control input" v-model="wallet">
							</div>
						</div>

						<div class="exchange-form__item" v-if="Object.keys(coinOne).length > 0 && Object.keys(coinTwo).length > 0 && amountFrom">
							<div class="exchange-form__input">
								<label>{{ $t('you_get') }}:</label>
								<div class="coin-price">{{ amountTo }} {{ coinTwo.symbol ? (coinTwo.symbol).toUpperCase() : '' }}</div>
							</div>
						</div>

						<div class="exchange-form__item">
							<div class="exchange-button" v-if="Object.keys(coinOne).length === 0 || Object.keys(coinTwo).length === 0 || !amountFrom || !amountTo || !email || !wallet">
								<button type="button" class="btn btn-exchange disabled" disabled>{{ $t('btn_exchange') }}</button>
							</div>
							<div class="exchange-button" v-else>
								<button type="button" class="btn btn-exchange" @click="exchange">{{ $t('btn_exchange') }}</button>
							</div>
						</div>
					</div>


				</div>

				<div class="footer">
					<div class="footer_links">
						<a href="https://t.me/vaaxooo">Telegram</a>
						<a href="/terms">{{ $t('user_agreement') }}</a>
					</div>

					<div class="footer__languages mt-5 mb-5">
						<nuxt-link class="language" v-for="locale in availableLocales" :key="locale.code" :to="switchLocalePath(locale.code)">
							{{ locale.name }}
						</nuxt-link>
					</div>

					<div class="footer_text">
						<p>CryptoSwap.cz © 2019-2022 {{ $t('all_rights_reserved') }}</p>
					</div>
				</div>


			</div>


			<div class="modal" v-if="coinsModal">
				<div class="modal__content">
					<div class="modal__header">
						<div class="modal__title">{{ coinsModalType === 'first' ? $t('title_exchange_one') : $t('title_exchange_two') }}</div>
						<div class="modal__close" @click="closeCoinsModal">
							<span class="material-symbols-outlined">close</span>
						</div>
					</div>
					<div class="modal__body">
						<div class="modal__search">
							<input type="text" :placeholder="$t('search')" class="form-control input" v-model="search">
						</div>
						<div class="modal__coins">

							<div class="crypto-list" v-if="coinsModalType === 'first'">
								<Coins v-for="(coin, index) in coins" :key="index" :coin="coin" :type="coinsModalType" :choosed="coinOne.id === coin.id ? true : false" />
							</div>
							<div class="crypto-list" v-else>
								<Coins v-for="(coin, index) in coins" :key="index" :coin="coin" :type="coinsModalType" :choosed="coinTwo.id === coin.id ? true : false" />
							</div>

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
	head() {
		return {
			script: [
				{ src: "//code.jivosite.com/widget/zMXkGx4Vhm", async: true }
			],
		}
	},
	head() {
		return {
			link: [
				{
					rel: 'stylesheet',
					href: '/mobile.css'
				}
			]
		}
	},
  	data() {
		return {
			temp_coins: [],
			coins: [],

			coinOne: {},
			coinTwo: {},

			amountFrom: 0,
			amountTo: 0,

			email: '',
			wallet: '',

			coinsModal: false,
			coinsModalType: '',

			search: ''
		}
  	},
	computed: {
		availableLocales () {
			return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
		}
	},
	async mounted() {
		if (!this.$mobileDetect.mobile()) {
			let path = '/'
			if(this.$i18n.locale !== 'ru') {
				path = `/${this.$i18n.locale}${path}`
			}
			this.$router.push(path)
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
		search(oldValue, newValue) {

			if(this.search.length > 0) {
				this.coins = this.temp_coins.filter(coin => {
					return coin.name.toLowerCase().includes(this.search.toLowerCase()) || coin.symbol.toLowerCase().includes(this.search.toLowerCase())
				})
			} else {
				this.coins = this.temp_coins
			}
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
			this.closeCoinsModal()
			this.coinsModalType = ''
			this.coins = this.temp_coins
			this.search = ''

			this.amountTo = this.amountFrom * this.coinOne.current_price / this.coinTwo.current_price
		})
	},
	async fetch() {
		await this.fetchCoins()
	},
	methods: {
		async fetchCoins() {
			const response = (await this.$axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')).data

			for (let i = 0; i < response.length; i++) {
				let coin = response[i]

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

			this.temp_coins = response
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
				let path = '/pay/' + response.data.hash
				if(this.$i18n.locale !== 'ru') {
					path = `/${this.$i18n.locale}${path}`
				}
				this.$router.push(path)
			} else {
				console.log('error')
			}
		},

		openCoinsModal(type) {
			this.coinsModalType = type
			this.coinsModal = true
		},

		closeCoinsModal() {
			this.coinsModal = false
			this.coinsModalType = ''
		}
	}
}
</script>