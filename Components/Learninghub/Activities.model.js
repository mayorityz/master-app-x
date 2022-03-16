import mongoose from 'mongoose'
import URLSlugs from 'mongoose-url-slugs'

const activitiesSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

// learningSchema.plugin(URLSlugs('title', { field: 'slug' }))
const Learning = mongoose.model('activity', activitiesSchema)

export default Learning
