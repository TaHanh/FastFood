import mongoose, { Schema } from 'mongoose'

const uploadSchema = new Schema({
  file: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

uploadSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      file: this.file,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Upload', uploadSchema)

export const schema = model.schema
export default model
