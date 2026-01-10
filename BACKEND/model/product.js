import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productID: {
    type: String,
    unique: true, 
    required: true,
  },

  // New field: title (can be used as display name)
  title: {
    type: String,
    required: false,
  },

  altanativeNames: {
    type: [String],
    default: [],
  },

  // New field: price (alias for productPrice, for frontend compatibility)
  price: {
    type: Number,
    required: false,
  },

  LabledPrice: {
    type: Number,
    
  },

  // New field: description (alias for productDescription)
  description: {
    type: String,
    required: false,
  },

  category: {
    type: String,
    required: true,
  },

  // New field: colors array
  colors: {
    type: [String],
    default: [],
    required: true,
  },

  // New field: sizes array
  sizes: {
    type: [String],
    default: [],
    required: true,
  },

  stock: {
    type: mongoose.Schema.Types.Mixed, // Supports both Number and Object { UK04: 10, UK06: 5 }
    required: false,
    default: 0,
  },

  productImage: {
    type: [String],
    default: [],
    required: true,
    default: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=2083&auto=format&fit=crop"],
  },

  // New field: fabric information
  fabric: {
    type: String,
    required: false,
  },

  // New field: care instructions
  care: {
    type: [String],
    default: ["please refer care label in the product"],
  },

  badge: {
    type: String,
    required: false,
  },
});
const product = mongoose.model("Product", productSchema);

export default product;

