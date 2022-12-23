<template>
	<header class="header wow animate__fadeInDown" style="visibility: visible; animation-name: fadeInDown;">
		<div class="container header__container">
			<div class="header__body">
				<a class="header__logo header__logo-hide" href="/">
					<img src="/images/Logo%20White.svg" alt="logo">
				</a>

				<div class="header__hide">
					<a class="header__logo" href="/">
						<img src="/images/Logo%20White.svg" alt="logo">
					</a>
					<nav class="header__nav">
						<ul class="header__list">
							<li class="header__item">
								<a class="header__link" href="#about" click="closeMenu">About</a>
							</li>
							<li class="header__item">
								<a class="header__link" href="#exchange" click="closeMenu">Exchange</a>
							</li>
							<li class="header__item">
								<a class="header__link" href="#how-exchange" click="closeMenu">How exchange</a>
							</li>
							<!-- <li class="header__item">
								<a class="header__link" href="#transactions" click="closeMenu">Transactions</a>
							</li>  -->
							<li class="header__item">
								<a class="header__link" href="#support" click="closeMenu">Support</a>
							</li>
						</ul>
					</nav>

					<div class="header__wrapper">
						<!-- <div class="header__lang">
							<div class="header__lang-lang">
								<a class="header__lang-wrapper" href="">
									<img src="/images/ua.svg" alt="ua">
									<div class="header__lang-text">
										Eng
									</div>
								</a>
								<a class="header__lang-wrapper header__lang-dropdown"
									href="#">
									<img src="/images/ru.svg" alt="ru">
									<div class="header__lang-text">
										Ru
									</div>
								</a>
							</div>
							<img class="header__lang-arrow" src="/images/arrow.svg" alt="arrow">
						</div> -->
						<a class="header__btn" href="#exchange" click="closeMenu">
							Exchange
						</a>
					</div>
				</div>
				<div class="header__burger" @click="menu">
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
			<div class="header__burger-content">
				<nav class="header__nav">
					<ul class="header__list">
						<li class="header__item">
							<a class="header__link" href="#about" click="closeMenu">About</a>
						</li>
						<li class="header__item">
							<a class="header__link" href="#exchange" click="closeMenu">Exchange</a>
						</li>
						<li class="header__item">
							<a class="header__link" href="#how-exchange" click="closeMenu">How exchange</a>
						</li>
						<!-- <li class="header__item">
							<a class="header__link" href="#transactions" click="closeMenu">Transactions</a>
						</li>
						<li class="header__item">
							<a class="header__link" href="#support" click="closeMenu">Support</a>
						</li> -->
					</ul>
				</nav>
				<div class="header__wrapper">
					<!-- <div class="header__lang">
						<div class="header__lang-lang">
							<a class="header__lang-wrapper" href="">
								<img src="/images/ua.svg" alt="ua">
								<div class="header__lang-text">
									Eng
								</div>
							</a>
							<a class="header__lang-wrapper header__lang-dropdown" href="#">
								<img src="/images/ru.svg" alt="ru">
								<div class="header__lang-text">
									Ru
								</div>
							</a>
						</div>
						<img class="header__lang-arrow" src="/images/arrow.svg" alt="arrow">
					</div> -->
					<a class="header__btn" href="#exchange" click="closeMenu">
						Exchange
					</a>
				</div>
			</div>
		</div>
	</header>
</template>

<script>
export default {
	name: 'Header',
	methods: {
		menu() {
			const burger = document.querySelector('.header__burger');
			const burgerContent = document.querySelector('.header__burger-content');
			burger.classList.toggle('active');
			burgerContent.classList.toggle('active');
		},

		closeMenu() {
			const burger = document.querySelector('.header__burger');
			const burgerContent = document.querySelector('.header__burger-content');
			burger.classList.remove('active');
			burgerContent.classList.remove('active');
		},
	},
};
</script>