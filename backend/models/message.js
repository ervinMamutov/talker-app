import mongoose from 'mongoose';

const message = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    content: {
      type: String,
      trim: true
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat'
    }
  },
  {
    timestamp: true
  }
);

export default mongoose.model('Message', message);
