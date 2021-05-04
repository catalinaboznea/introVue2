var app = new Vue({
	el: '#app',
	data: {
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
		}
	}
});
