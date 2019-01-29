import mongoose, { Schema } from 'mongoose';

const donHangSchema = new Schema(
  {
    name: {
      type: String
    },
    description: {
      type: String
    },
    statusOrder: {
      type: [
        {
          name: { type: String },
          status: { type: Number },
          time: { type: Date }
        }
      ]
    },
    statusShip: {
      type: [
        {
          name: { type: String },
          status: { type: Number },
          time: { type: Date }
        }
      ]
    },
    message: {
      type: String
    },
    products: {
      type: [
        {
          product: { type: Object },
          number: { type: Number }
        }
      ]
    },
    idUser: {
      type: String
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => {
        delete ret._id;
      }
    }
  }
);

donHangSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      description: this.description,
      statusOrder: this.statusOrder,
      statusShip: this.statusShip,
      message: this.message,
      products: this.products,
      idUser: this.idUser,
      idAdmin: this.idAdmin,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };

    return full
      ? {
          ...view
          // add properties for a full view
        }
      : view;
  }
};

const model = mongoose.model('DonHang', donHangSchema);

export const schema = model.schema;
export default model;
