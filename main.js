Vue.component('product', {
	props: {
		premium: {
			type: Boolean,
			required: true
		}
	},
	template: `
	<div class="product">
				<div class="product-image">
					<img :src="image" :alt="altText" />
				</div>

				<div class="product-info">
					<h1>{{ title }}</h1>
					<p v-show="inStock">In Stock</p>
					<p v-show="!inStock" :class="{stock: !inStock}">Out of Stock</p>
					<span>{{ sale }}</span>
					<p>{{ description }}</p>
					<a :href="link">Link</a>
					<p>Shipping: {{ shipping }}</p>

					<detail :details="details"></detail>

					<div
						v-for="(variant, index) in variants"
						:key="variant.variantId"
						class="color-box"
						:style="{backgroundColor: variant.variantColor}"
						@mouseover="updateProduct(index)"
					></div>

					<div v-for="size in sizes" :key="size.sizeId">
						<p>{{ size.sizeName }}</p>
					</div>

					<button v-on:click="addToCart" :disabled="!inStock" :class="{disabledButton: !inStock}">
						Add to Cart
					</button>
					<button @click="removeFromCart">Remove 1 from Cart</button>

					<div class="cart">
						<p>Cart({{ cart }})</p>
					</div>
				</div>
			</div>
	`,
	data() {
		return {
			brand: 'Vue Mastery',
			product: 'Socks',
			description: 'A pair of warm, fuzzy socks.',
			selectedVariant: 0,
			altText: 'A pari of socks',
			link: 'https://en.wikipedia.org/wiki/Sock',
			onSale: true,
			details: ['80% cotton', '20% polyester', 'Gender-neutral'],
			variants: [
				{
					variantId: 2234,
					variantColor: 'green',
					variantImage: './assets/vmSocks-green-onWhite.jpg',
					variantQuantity: 10
				},
				{
					variantId: 2235,
					variantColor: 'blue',
					variantImage: './assets/vmSocks-blue-onWhite.jpg',
					variantQuantity: 0
				}
			],
			sizes: [
				{
					sizeId: 123,
					sizeName: '35-38'
				},
				{
					sizeId: 124,
					sizeName: '39-41'
				},
				{
					sizeId: 125,
					sizeName: '41-43'
				}
			],
			cart: 0
		};
	},
	methods: {
		addToCart() {
			this.cart += 1;
		},
		updateProduct(index) {
			this.selectedVariant = index;
			console.log(index);
		},
		removeFromCart() {
			this.cart = this.cart > 0 ? this.cart - 1 : this.cart;
		}
	},
	computed: {
		title() {
			return this.brand + ' ' + this.product;
		},
		image() {
			return this.variants[this.selectedVariant].variantImage;
		},
		inStock() {
			return this.variants[this.selectedVariant].variantQuantity;
		},
		sale() {
			return this.brand.concat(' ', this.product, this.onSale ? '' : ' not', ' on sale!');
		},
		shipping() {
			if (this.premium) {
				return 'Free';
			}
			return 2.99;
		}
	}
});

Vue.component('detail', {
	props: {
		details: {
			type: Array,
			required: true
		}
	},
	template: `<ul>
	<li v-for="detail in details">{{ detail }}</li>
</ul>`
});

var app = new Vue({
	el: '#app',
	data: {
		premium: false
	}
});
