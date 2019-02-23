import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema(
  {
    name: {
      type: String
    },
    type: {
      type: []
    },
    image: {
      type: []
    },
    price: {
      type: String
    },
    status: {
      type: Number,
      default: 0
    },
    description: {
      type: String
    },
    category: {
      type: String
    },
    highlight: {
      type: Number,
      default: 1
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

productSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      type: this.type,
      image: this.image,
      price: this.price,
      status: this.status,
      description: this.description,
      category: this.category,
      highlight: this.highlight,
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

const model = mongoose.model('Product', productSchema);

export const schema = model.schema;
export default model;
