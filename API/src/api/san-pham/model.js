import mongoose, { Schema } from 'mongoose';

const sanPhamSchema = new Schema(
  {
    name: {
      type: String
    },
    hot: {
      type: Number,
      default: 1
    },
    image: {
      type: []
    },
    price: {
      type: Number
    },
    status: {
      type: Number,
      default: 0
    },
    description: {
      type: String
    },
    type: {
      type: String
    },
    size: {
      type: [
        {
          type: String
        }
      ]
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

sanPhamSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      hot: this.hot,
      image: this.image,
      price: this.price,
      status: this.status,
      description: this.description,
      type: this.type,
      size: this.size,
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

const model = mongoose.model('SanPham', sanPhamSchema);

export const schema = model.schema;
export default model;
