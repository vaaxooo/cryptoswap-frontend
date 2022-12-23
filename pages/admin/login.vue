<template>
	
	<div class="content mt-3">
		<div class="row justify-content-center">


			<div class="login-block">
				<div class="login-block__title">
					Вход
				</div>
				<div class="login-block__form">
					<div class="form">
						<div class="login-block__form__item">
							<label>Почта</label>
							<input type="email" class="form-control" name="email" placeholder="Почта" v-model="email" :class="{'is-invalid': errors.email}" >
						</div>
						<div class="login-block__form__item">
							<label>Пароль</label>
							<input type="password" class="form-control" name="password" placeholder="Пароль" v-model="password" :class="{'is-invalid': errors.password}" >
						</div>
						<div class="login-block__form__item">
							<button type="submit" class="btn btn-dark btn-block" @click="login">Войти</button>
						</div>
					</div>
				</div>
			</div>


		</div>
	</div>

</template>

<script>
export default {
	layout: 'admin',
	auth: false,
	data() {
		return {
			email: '',
			password: '',
			errors: [],
			loading: false
		}
	},
	methods: {
		async login() {
			this.message = '';
            this.errors = {};
            this.loading = true;

			const response = (await this.$axios.post('/auth/login', {
				email: this.email,
				password: this.password
			})).data;

            this.loading = false;
            if(!response.status) {
                if(response.errors) {
                    this.errors = response.errors
                } else {
					this.$toast.error(response.message)
                }
                return false;
            }
            await this.$auth.setUserToken(response.data.access_token);
            await this.$auth.setUser(response.data.user);
			//window.location = '/admin/';
		}
	}
}
</script>