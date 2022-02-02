import mongoose from 'mongoose'

const drugsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    entry: {
      type: String,
    },
  },
  { timestamps: true },
)
const Drugs = mongoose.model('drugs', drugsSchema)

export default Drugs
