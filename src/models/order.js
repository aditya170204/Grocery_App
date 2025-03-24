import mongoose from "mongoose";
import Counter from "./counter";

const orderSchema = new mongoose.Schema({
  orderId: { type: String, unique: true },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  deliveryPartner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DeliveryPartner",
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
    required: true,
  },
  items: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        require: true,
      },
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        require: true,
      },
      count: {
        type: Number,
        require: true,
      },
    },
  ],
  deliveryLocation: {
    latitude: { type: Number, require: true },
    longitude: { type: Number, require: true },
    address: { type: String, require: true },
  },
  pickupLocation: {
    latitude: { type: Number, require: true },
    longitude: { type: Number, require: true },
    address: { type: String, require: true },
  },
  deliveryPersonLocation: {
    latitude: { type: Number, require: true },
    longitude: { type: Number, require: true },
    address: { type: String, require: true },
  },
  status: {
    type: String,
    enum: ["available", "confirmed", "arriving", "delivered", "cancelled"],
    default: "available",
  },
  totalPrice: { type: Number, require: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

async function getNextSequenceValue(sequenceName) {
  const sequenceDocument = await Counter.findOneAndUpdate(
    { name: sequenceName },
    { $inc: { sequence_value: 1 } },
    { new: true }
  );
  return sequenceDocument.sequence_value;
}

orderSchema.pre("save", async function (next) {
  if (this.isnew) {
    const sequenceValue = await getNextSequenceValue("orderId");
    this.orderId = `ORDR${sequenceValue.toString().padStart(5, "0")}`;
  }
  next();
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
