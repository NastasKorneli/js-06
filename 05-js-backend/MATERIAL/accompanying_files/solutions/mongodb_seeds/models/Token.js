import { Schema, model } from 'mongoose';

const TokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600, //https://mongoosejs.com/docs/api.html#schema_Schema-index
  },
});

// module.exports = mongoose.model('Token', TokenSchema);
export default model('Token', TokenSchema);
