import mongoose from 'mongoose'
import URLSlugs from 'mongoose-url-slugs'

const learningSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    download: { type: Number, default: 0 },
    path: String,
  },
  { timestamps: true },
)

learningSchema.plugin(URLSlugs('title', { field: 'slug' }))
const Learning = mongoose.model('learninghub', learningSchema)

export default Learning
