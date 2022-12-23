<template>               
	<div class="row justify-content-center">
		<div class="header-content">
			<h1>Редактирование "{{ coin.name }}"</h1>
		</div>

		<div class="col-12">

			<div class="card">
				<div class="card-body">

					<div class="transaction-info-block" v-if="Object.keys(coin).length > 0">

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

							<div class="col-md-8">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Кошелёк для получения</div>
									<div class="transaction-info-block__item-value">
										<input type="text" class="form-control" placeholder="x0xxxxxxxxxxxxxxx" v-model="coin.wallet">
									</div>
								</div>
							</div>

						</div>

						<div class="form-group mt-3">
							<button type="submit" class="btn btn-dark" @click="update">Сохранить</button>
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
	auth: true,
	data() {
		return {
			coin: [],

			errors: []
		}
	},
	async fetch() {
		await this.fetchCoin()
	},
	methods: {
		async fetchCoin() {
			const response = (await this.$axios.get(`/admin/coins/${this.$route.params.id}`)).data
			if(response.status) {
				this.coin = response.data
			} else {
				this.$router.push('/admin/coins')
			}
		},

		async update() {
			const response = (await this.$axios.patch(`/admin/coins/${this.$route.params.id}`, this.coin)).data
			if(response.status) {
				//this.$toast.success(response.message)
			} else {
				this.errors = response.errors
			}
		}
	}
}

</script>