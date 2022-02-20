import mongoose from 'mongoose'

const requestSchema = new mongoose.Schema(
  {
    to: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    uid: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'pending',
    },
    fullname: String,
  },
  { timestamps: true },
)
const chvaReqs = mongoose.model('chvareq', requestSchema)

export default chvaReqs
