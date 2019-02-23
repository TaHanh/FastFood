import mongoose, { Schema } from 'mongoose';

const orderSchema = new Schema(
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
          time: { type: String }
        }
      ]
    },
    statusShip: {
      type: [
        {
          name: { type: String },
          status: { type: Number },
          time: { type: String }
        }
      ]
    },
    message: {
      type: String
    },
    products: {
      type: [
        {
          type: Object
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

orderSchema.methods = {
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

const model = mongoose.model('Order', orderSchema);

export const schema = model.schema;
export default model;
