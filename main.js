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
				</div>

				<div>
				<h2>Reviews</h2>
				<p v-if="!reviews.length">There are no reviews yet.</p>
				<ul>
					<li v-for="review in reviews">
					<p>{{ review.name }}</p>
					<p>Rating: {{ review.rating }}</p>
					<p>{{ review.review }}</p>
					</li>
				</ul>
				</div>

				<product-review @review-submitted="addReview"></product-review>
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
			reviews: []
		};
	},
	methods: {
		addToCart() {
			this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
		},
		updateProduct(index) {
			this.selectedVariant = index;
			console.log(index);
		},
		removeFromCart() {
			this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId);
		},
		addReview(productReview) {
			this.reviews.push(productReview);
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

Vue.component('product-review', {
	template: `
	<form class="review-form" @submit.prevent="onSubmit">
		<p v-if="errors.length">
		<b>Please correct the following error(s):</b>
		<ul>
			<li v-for="error in errors">{{ error }}</li>
		</ul>
		</p>

		<p>
			<label for="name">Name:</label>
			<input id="name" v-model="name">
		</p>

		<p>
			<label for="review">Review:</label>
			<textarea id="review" v-model="review"></textarea>
		</p>

		<p>
			<label for="rating">Rating:</label>
			<select id="rating" v-model.number="rating">
				<option>5</option>
				<option>4</option>
				<option>3</option>
				<option>2</option>
				<option>1</option>
			</select>
		</p>

		<p>
			<label for="recommendation">Would you recomment this product?</label>
			<input type="radio" id="yes" value="yes" :style="{width: '15px', height: '15px'}" v-model.value="recommendation">
			<label for="yes">Yes</label>
			<input type="radio" id="no" value="no" :style="{width: '15px', height: '15px'}" v-model.value="recommendation">
  			<label for="no">No</label>
		</p>

		<p>
			<input type="submit" value="Submit">
		</p>
	</form>
	`,
	data() {
		return {
			name: null,
			review: null,
			rating: null,
			recommendation: null,
			errors: []
		};
	},
	methods: {
		onSubmit() {
			if (this.name && this.review && this.rating && this.recommendation) {
				let productReview = {
					name: this.name,
					review: this.review,
					rating: this.rating,
					recommendation: this.recommendation
				};
				this.$emit('review-submitted', productReview);
				this.name = null;
				this.review = null;
				this.rating = null;
				this.recommendation = null;
			} else {
				if (!this.name) this.errors.push('Name required.');
				if (!this.review) this.errors.push('Review required.');
				if (!this.rating) this.errors.push('Rating required.');
				if (!this.recommendation) this.errors.push('Recommendation required.');
			}
		}
	}
});

var app = new Vue({
	el: '#app',
	data: {
		premium: false,
		cart: []
	},
	methods: {
		updateCart(id) {
			this.cart.push(id);
		},
		removeFromCart(id) {
			const index = this.cart.indexOf(id);
			if (index > -1) {
				this.cart.splice(index, 1);
			}
		}
	}
});
