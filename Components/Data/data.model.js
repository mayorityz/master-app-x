import mongoose from 'mongoose'

const workDataSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    isComplete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)
const WorkData = mongoose.model('workdata', workDataSchema)

export default WorkData
