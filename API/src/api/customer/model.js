import mongoose, { Schema } from 'mongoose'

const customerSchema = new Schema(
  {
    name: {
      type: String
    },
    avatar: {
      type: String
    },
    phone: {
      type: String
    },
    email: {
      type: String
    },
    type: {
      type: String
    },
    role: {
      type: String
    },
    address: {
      type: String
    },
    userName: {
      type: String
    },
    password: {
      type: String
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => {
        delete ret._id
      }
    }
  }
)

customerSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      avatar: this.avatar,
      phone: this.phone,
      email: this.email,
      type: this.type,
      role: this.role,
      address: this.address,
      userName: this.userName,
      password: this.password,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full
      ? {
          ...view
          // add properties for a full view
        }
      : view
  }
}

const model = mongoose.model('Customer', customerSchema)

export const schema = model.schema
export default model
