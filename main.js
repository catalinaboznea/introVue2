var app = new Vue({
	el: '#app',
	data: {
		product: 'Socks',
		description: 'A pair of warm, fuzzy socks.',
		image: './assets/vmSocks-green-onWhite.jpg',
		altText: 'A pari of socks',
		link: 'https://en.wikipedia.org/wiki/Sock',
		inStock: false,
		onSale: true,
		details: ['80% cotton', '20% polyester', 'Gender-neutral'],
		variants: [
			{
				variantId: 2234,
				variantColor: 'green',
				variantImage: './assets/vmSocks-green-onWhite.jpg'
			},
			{
				variantId: 2235,
				variantColor: 'blue',
				variantImage: './assets/vmSocks-blue-onWhite.jpg'
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
		updateProduct(variantImage) {
			this.image = variantImage;
		},
		removeFromCart() {
			this.cart = this.cart > 0 ? this.cart - 1 : this.cart;
		}
	}
});
