<template>               
	<div class="row justify-content-center">

		<div class="header-content">
			<h1>Транзакции</h1>
		</div>

		<div class="col-12">

			<div class="card">
				<div class="card-body">
					<div class="table-responsive">
						<table class="table table-hover">
							<thead>
								<tr>
									<th scope="col">ID</th>
									<th scope="col">Пользователь</th>
									<th scope="col">Криптовалюта</th>
									<th scope="col">Количество</th>
									<th scope="col">Реферал</th>
									<th scope="col">Статус</th>
									<th scope="col">Дата</th>
									<th scope="col"></th>
								</tr>
							</thead>
							<tbody v-if="Object.keys(transactions).length > 0">
								<tr v-for="transaction in transactions" :key="transaction">
									<th scope="row">{{ transaction.id }}</th>
									<td>{{ transaction.email }}</td>
									<td>{{ transaction.coinFrom }}</td>
									<td>{{ transaction.amountFrom }}</td>

									<td v-if="transaction.ref !== null">{{ transaction.ref }}</td>
									<td v-else>-</td>

									<td class="text-success fw-bold" v-if="transaction.status === 'success'">Успешно</td>
									<td class="text-danger fw-bold" v-if="transaction.status === 'declined'">Заблокировано</td>
									<td class="text-warning fw-bold" v-if="transaction.status === 'pending'">Ожидание оплаты</td>
									<td class="text-secondary fw-bold" v-if="transaction.status === 'processing'">В обработке</td>
									<td class="text-danger fw-bold" v-if="transaction.status === 'cancelled'">Неоплачено</td>
									<td class="text-success fw-bold" v-if="transaction.status === 'paid'">Успешно</td>

									<td>{{ formatDate(transaction.created_at) }}</td>
									<td>
										<a :href="'/admin/transactions/' + transaction.id" class="btn btn-light btn-sm btn-icon">
											<span class="material-icons">edit</span>
										</a>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>
<script>
import formatDate from "@/plugins/formatDate";

export default {
	layout: "admin",
	auth: true,
	data() {
		return {
			transactions: [],

			formatDate
		};
	},
	async fetch() {
		await this.fetchTransactions();
	},
	methods: {
		async fetchTransactions() {
			const response = (await this.$axios.get("/admin/transactions")).data;
			this.transactions = response.data;
		},
	},
}

</script>