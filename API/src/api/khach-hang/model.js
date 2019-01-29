import mongoose, { Schema } from 'mongoose';

const khachHangSchema = new Schema(
  {
    name: {
      type: String
    },
    email: {
      type: String
    },
    phone: {
      type: Number
    },
    address: {
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

khachHangSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      address: this.address,
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

const model = mongoose.model('KhachHang', khachHangSchema);

export const schema = model.schema;
export default model;
