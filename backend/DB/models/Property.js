const mongoose = require('mongoose');

const PropertySchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    ref: {
        type: String,
        trim: true
    },
    moneda_id: {
        type: Number,
    },
    price: {
        type: Decimal128,
        trim: true
    },
    financiacion: {
        type: Boolean,
    },
    address: {
        type: String,
        trim: true
    },
    operationType: {
        type: String,
        trim: true
    },
    superficieTer: {
        type: Number,
        trim: true
    },
    superficieCons: {
        type: Number,
        trim: true
    },
    bedrooms: {
        type: Number,
    },
    toilets: {
        type: Number,
    },
    garage: {
        type: Number,
    },
    description: {
        type: String,
        trim: true
    },
    images: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    },
    published: {
        type: Boolean,
    },
    featured: {
        type: Boolean,
    },
    showPrice: {
        type: Boolean,
    },
    galeria: {
        type: String,
        trim: true
    },
    localidad_id: {
        type: Number,
    },
    tipo_id: {
        type: Number,
    }
});

const Property = mongoose.model('Property', PropertySchema);

module.exports = PropertySchema;