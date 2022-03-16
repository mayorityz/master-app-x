import mongoose from 'mongoose'
import URLSlugs from 'mongoose-url-slugs'

const commentsSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    postid: {
      type: String,
      required: true,
    },
    comment: String,
  },
  { timestamps: true },
)

// learningSchema.plugin(URLSlugs('title', { field: 'slug' }))
const CommentModel = mongoose.model('Comments', commentsSchema)

export default CommentModel
