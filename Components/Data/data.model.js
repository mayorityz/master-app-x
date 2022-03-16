import mongoose from 'mongoose'

const workDataSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    assignment: Object,
  },
  { timestamps: true },
)
const WorkData = mongoose.model('workdata', workDataSchema)

export default WorkData
