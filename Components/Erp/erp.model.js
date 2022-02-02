import mongoose from 'mongoose'

const erpSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
    },
    entryDate: {
      type: String,
      required: true,
    },
    drugs: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true },
)
const Erp = mongoose.model('Erps', erpSchema)

export default Erp
