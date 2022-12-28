<template>               
	<div class="row justify-content-center">

		<div class="header-content">
			<h1>Добавление новой монеты</h1>
		</div>

		<div class="col-12">

			<div class="card">
				<div class="card-body">

					<div class="transaction-info-block">

						<div class="row">

							<div class="col-md-4">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Название</div>
									<div class="transaction-info-block__item-value">
										<input type="text" class="form-control" placeholder="Bitcoin" v-model="coin.name"  :class="{'is-invalid': errors.name}">
										<span class="invalid-feedback" v-if="errors.name">
											<strong>{{ errors.name[0] }}</strong>
										</span>
									</div>
								</div>
							</div>

							<div class="col-md-4">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Атрибут</div>
									<div class="transaction-info-block__item-value">
										<input type="text" class="form-control" placeholder="BTC" v-model="coin.symbol"  :class="{'is-invalid': errors.symbol}">
										<span class="invalid-feedback" v-if="errors.symbol">
											<strong>{{ errors.symbol[0] }}</strong>
										</span>
									</div>
								</div>
							</div>

							<div class="col-md-4">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Процент</div>
									<div class="transaction-info-block__item-value">
										<input type="text" class="form-control" placeholder="1" v-model="coin.percent">
									</div>
								</div>
							</div>

							<div class="col-md-4">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Мин. сумма</div>
									<div class="transaction-info-block__item-value">
										<input type="text" class="form-control" placeholder="1" v-model="coin.min_amount">
									</div>
								</div>
							</div>

							<div class="col-md-4">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Сеть</div>
									<div class="transaction-info-block__item-value">
										<input type="text" class="form-control" placeholder="TRC-20" v-model="coin.network">
									</div>
								</div>
							</div>

							<div class="col-md-8">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Кошелёк для получения</div>
									<div class="transaction-info-block__item-value">
										<input type="text" class="form-control" placeholder="x0xxxxxxxxxxxxxxx" v-model="coin.wallet">
									</div>
								</div>
							</div>

						</div>

						<div class="form-group">
							<button type="submit" class="btn btn-dark" @click="createCoin">Добавить</button>
						</div>

					</div>

				</div>
			</div>

		</div>
	</div>
</template>
<script>

export default {
	layout: "admin",
	data() {
		return {
			coin: {
				name: "",
				symbol: "",
				percent: "",
				wallet: "",
				min_amount: "",
				network: ""
			},

			errors: []
		};
	},
	methods: {
		async createCoin() {
			const response = (await this.$axios.post('/admin/coins', this.coin)).data
			if(response.status) {
				//this.$toast.success(response.message)
				this.$router.push('/admin/coins')
			} else {
				if(response.hasOwnProperty('errors')) {
					this.errors = response.errors
				} else {
					this.$toast.error(response.message)
				}
			}
		}
	}
}

</script>