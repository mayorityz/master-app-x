import mongoose from 'mongoose'

const requestSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    item: {
      type: String,
      required: true,
    },
    status: {
      type: String,
    },
    request: String,
    response: {
      date: String,
      drug: String,
      quantity: Number,
      comment: String,
    },
  },
  { timestamps: true },
)
const Requests = mongoose.model('Requests', requestSchema)

export default Requests
