<template>
	<div class="row justify-content-center">
		<div class="header-content">
			<h1>Транзакция #1</h1>
		</div>

		<div class="col-12">

			<div class="card">
				<div class="card-body">

					<div class="transaction-info-block" v-if="Object.keys(transaction).length > 0">

						<div class="row">
							<div class="col-md-4 col-6">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Номер транзакции</div>
									<div class="transaction-info-block__item-value">#{{ transaction.id }}</div>
								</div>
							</div>

							<div class="col-md-4 col-6">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Hash транзакции</div>
									<div class="transaction-info-block__item-value">{{ transaction.hash }}</div>
								</div>
							</div>

							<div class="col-md-4 col-6">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Получатель</div>
									<div class="transaction-info-block__item-value">
										{{ transaction.email }}
									</div>
								</div>
							</div>

							<div class="col-md-4 col-6">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">К получению</div>
									<div class="transaction-info-block__item-value">
										<img :src="'/coins/' + transaction.coin_from.symbol + '.png'" :alt="transaction.coin_from.symbol" class="transaction-info-block__item-value-icon"> {{ transaction.coin_from.name }}<br>
										<b>{{ transaction.amountFrom }}</b> {{ (transaction.coin_from.symbol).toUpperCase() }}
									</div>
								</div>
							</div>

							<div class="col-md-4 col-6">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">К отправлению</div>
									<div class="transaction-info-block__item-value">
										<img :src="'/coins/' + transaction.coin_to.symbol + '.png'" :alt="transaction.coin_to.symbol" class="transaction-info-block__item-value-icon"> {{ transaction.coin_to.name }}<br>
										<b>{{ transaction.amountTo }}</b> {{ (transaction.coin_to.symbol).toUpperCase() }}
									</div>
								</div>
							</div>

							<div class="col-md-4 col-6">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Статус транзакции</div>
									<div class="transaction-info-block__item-value">
										<span class="badge bg-success fw-bold" v-if="transaction.status === 'success'">Успешно</span>
										<span class="badge bg-danger fw-bold" v-if="transaction.status === 'declined'">Заблокировано</span>
										<span class="badge bg-warning fw-bold" v-if="transaction.status === 'pending'">Ожидание оплаты</span>
										<span class="badge bg-secondary fw-bold" v-if="transaction.status === 'processing'">В обработке</span>
										<span class="badge bg-danger fw-bold" v-if="transaction.status === 'cancelled'">Неоплачено</span>
										<span class="badge bg-success fw-bold" v-if="transaction.status === 'paid'">Успешно</span>
									</div>
								</div>
							</div>

							<div class="col-md-4 col-6">
								<div class="transaction-info-block__item">
									<div class="transaction-info-block__item-title">Дата создания транзакции</div>
									<div class="transaction-info-block__item-value">
										{{ formatDate(transaction.createdAt) }}
									</div>
								</div>
							</div>

						</div>

						<hr>

						<div class="status-actions mt-3">
							<span v-for="status in statuses" :key="status.value" class="badge badge-secondary setstatus mx-1" :class="status.value" @click="setStatus(status.value)">{{ status.name }}</span>
						</div>

					</div>

				</div>
			</div>

		</div>
	</div>
</template>
<script>
import formatDate from '~/plugins/formatDate.js'

export default {
	layout: "admin",
	auth: true,
	data() {
		return {
			transaction: [],
			comment: '',

			formatDate,

			statuses: [
				{
					name: 'Ожидание оплаты',
					value: 'pending'
				},
				{
					name: 'В обработке',
					value: 'exchange'
				},
				{
					name: 'Неоплачено',
					value: 'cancelled'
				},
				{
					name: 'Заблокировано',
					value: 'declined'
				},
				{
					name: 'Обработано',
					value: 'success'
				},
			],
		}
	},
	async fetch() {
		await this.fetchTransaction()
	},
	methods: {

		async fetchTransaction() {
			const response = (await this.$axios.get(`/admin/transactions/${this.$route.params.id}`)).data
			this.transaction = response.data.transaction
			this.transaction.coin_from = response.data.coin_from
			this.transaction.coin_to = response.data.coin_to
		},

		async setStatus(status) {
			const response = (await this.$axios.post(`/admin/transactions/${this.$route.params.id}/status`, {
				status,
				comment: this.comment
			})).data
			if(response.status) {
				//this.$toast.success(response.message)
				this.transaction.status = status
			} else {
				//this.$toast.error(response.message)
			}
		}
	}

}

</script>