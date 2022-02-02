import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      default: 'SuperAdmin',
    },
    password: {
      type: String,
      required: true,
    },
    location: String,
    ward: String,
    lga: String,
    assignedDrugs: Array,
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
)
const Users = mongoose.model('users', userSchema)

export default Users
