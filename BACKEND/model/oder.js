import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
    {
        orderID: {
            type: String,
            required: true,
            unique: true,
        },
        items: {
            type : [
                {
                    productID: {
                        type: String,
                        required: true,
                        },
                    quantity: {
                        type: Number,
                        required: true,
                    },
                    name: {
                        type: String,
                        required: true,
                    },
                    price: {
                        type: Number,   
                        required: true,
                    },
                    image: {
                        type: String,
                        required: true,
                    },
             }
         ]
        },
        coustomerName: {
            type: String,
            required: true, 
        },
        coustomerEmail: {
            type: String,
            required: true,
        },
        coustomerPhone: {
            type: String,
            required: true,
        },
        coustomeraddress: {
            type: String,
            required: true,
        },
        totalAmount: {
            type: Number,
            required: true,
        },
        orderStatus: {
            type: String,
            required: true,
            default: "Pending",
        },
        data: {
            type: Date,
            default: Date.now,
        },
    },
    
)
const Order = mongoose.model("Order", orderSchema);
export default Order;