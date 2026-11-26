// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//       maxlength: 140,
//     },
//     category: {
//       type: String,
//       required: true,
//       trim: true,
//       enum: ['T-Shirts', 'Tracksuits', 'Hoodies & Jackets', 'Activewear', 'Other'],
//       default: 'T-Shirts',
//     },
//     fabric: {
//       type: String,
//       trim: true,
//       maxlength: 100,
//       default: 'Cotton / Polyester',
//     },
//     gsm: {
//       type: String,
//       trim: true,
//       maxlength: 40,
//       default: '',
//     },
//     moq: {
//       type: Number,
//       required: true,
//       min: 1,
//       default: 50,
//     },
//     pricePerUnit: {
//       type: Number,
//       required: true,
//       min: 0,
//       default: 0,
//     },
//     imageUrl: {
//       type: String,
//       trim: true,
//       default: '',
//     },
//     secondaryImageUrl: {
//       type: String,
//       trim: true,
//       default: '',
//     },
//     images: {
//       type: [String],
//       default: [],
//     },
//     isActive: {
//       type: Boolean,
//       default: true,
//     },
//   },
//   { timestamps: true },
// );

// module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 140,
    },
    gender: {
      type: String,
      trim: true,
      enum: ['Men', 'Women', 'Unisex'],
      default: 'Men',
    },
    category: {
      type: String,
      required: true,
      trim: true,
      enum: [
        'T-Shirts',
        'Shirt',
        'Shirts',
        'Tracksuits',
        'Hoodies & Jackets',
        'Activewear',
        'Other',
      ],
      default: 'T-Shirts',
    },
    fabric: {
      type: String,
      trim: true,
      maxlength: 100,
      default: 'Cotton / Polyester',
    },
    gsm: {
      type: String,
      trim: true,
      maxlength: 40,
      default: '',
    },
    moq: {
      type: Number,
      min: 1,
      default: null,
    },
    pricePerUnit: {
      type: Number,
      min: 0,
      default: null,
    },
    imageUrl: {
      type: String,
      trim: true,
      default: '',
    },
    secondaryImageUrl: {
      type: String,
      trim: true,
      default: '',
    },
    images: {
      type: [String],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);