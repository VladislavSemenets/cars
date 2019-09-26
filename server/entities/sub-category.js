const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubCategory = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        parentId: { type: Schema.Types.ObjectId, ref: 'Categories' },
        type: {
            type: Object,
        },
        fields: [],
        created: {
            type: Date,
            default: Date.now
        },
    }
);

module.exports = mongoose.model('sub_categories', SubCategory);
