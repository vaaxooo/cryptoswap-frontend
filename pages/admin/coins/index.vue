<template>
	<div class="row justify-content-center">
		<div class="header-content">
			<h1>Криптовалюта</h1>
		</div>

		<div class="col-12">

			<div class="card">
				<div class="card-body">

					<div class="form-group mb-4">
						<a href="/admin/coins/create" class="btn btn-success">
							<span class="material-symbols-outlined">add</span> Добавить
						</a>
					</div>

					<div class="table-responsive">
						<table class="table table-hover">
							<thead>
								<tr>
									<th scope="col">ID</th>
									<th scope="col">Название</th>
									<th scope="col">Кошелёк</th>
									<th scope="col">Атрибут</th>
									<th scope="col">Процент</th>
									<th scope="col"></th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="coin in coins" :key="coin.id">
									<th scope="row">{{ coin.id }}</th>
									<td class="transaction-info-block__item-value">
										<img :src="'/coins/' + (coin.symbol).toLowerCase() + '.png'" alt="btc" class="transaction-info-block__item-value-icon"> {{ coin.name }}
									</td>
									<td>{{ coin.wallet }}</td>
									<td>{{ coin.symbol }}</td>
									<td>{{ coin.percent }}</td>
									<td>
										<a :href="'/admin/coins/' + coin.id" class="btn btn-light btn-sm btn-icon">
											<span class="material-icons">edit</span>
										</a>
										<a href="#" class="btn btn-danger btn-sm btn-icon" @click="deleteCoin(coin.id)">
											<span class="material-icons">delete</span>
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
export default {
	layout: "admin",
	auth: true,
	data() {
		return {
			coins: [],
		};
	},
	async fetch() {
		await this.fetchCoins();
	},
	methods: {
		async fetchCoins() {
			const response = (await this.$axios.get("/admin/coins")).data;
			this.coins = response.data;
		},

		async deleteCoin(coin_id) {
			const response = (await this.$axios.delete("/admin/coins/" + coin_id)).data;
			if (response.status) {
				this.$toast.success(response.message);
				this.coins = this.coins.filter(coin => coin.id !== coin_id);
			} else {
				this.$toast.error(response.message);
			}
		}
	},
}
</script>
