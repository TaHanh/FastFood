import mongoose, { Schema } from 'mongoose'

const customerSchema = new Schema(
  {
    name: {
      type: String,
      text: true
    },
    avatar: {
      type: String
    },
    phone: {
      type: String,
      text: true
    },
    email: {
      type: String,
      text: true
    },
    type: {
      type: String
    },
    role: {
      type: String,
      text: true
    },
    address: {
      type: String,
      text: true
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
customerSchema.plugin(require('mongoose-keywords'), {
  paths: ['name', 'phone', 'email', 'role', 'address']
})
export const schema = model.schema
export default model
