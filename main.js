var app = new Vue({
	el: '#app',
	data: {
		product: 'Socks',
		description: 'A pair of warm, fuzzy socks.',
		image: './assets/vmSocks-green-onWhite.jpg',
		altText: 'A pari of socks',
		link: 'https://en.wikipedia.org/wiki/Sock',
		inStock: true,
		onSale: true,
		details: ['80% cotton', '20% polyester', 'Gender-neutral'],
		variants: [
			{
				variantId: 2234,
				variantColor: 'green'
			},
			{
				variantId: 2235,
				variantColor: 'blue'
			}
		],
		sizes: [
			{
				sizeId: 123,
				sizeName: '35-38'
			},
			{
				sizeId: 123,
				sizeName: '39-41'
			},
			{
				sizeId: 123,
				sizeName: '41-43'
			}
		]
	}
});
