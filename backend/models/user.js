import mongoose, { model } from 'mongoose';

const user = mongoose.Schema(
  {
    name: {
      type: String,
      require: true
    },
    email: {
      type: String,
      require: true
    },
    password: {
      type: String,
      require: true
    },
    pic: {
      type: String,
      require: true,
      default:
        'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
    }
  },
  {
    timestamp: true
  }
);

export default mongoose.model('User', user);
