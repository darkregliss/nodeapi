const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
	price: {
		type: Number,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	category: {
        type:Schema.Types.ObjectId, ref:'Category'
    }
})

module.exports = mongoose.model('Product', productSchema);