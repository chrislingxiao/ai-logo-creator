import mongoose, { Model } from 'mongoose';
import { IUser, ILogo } from '@/app/_models/User';

const LogoSchema = new mongoose.Schema<ILogo>({
  image: { type: String, required: true },
  title: { type: String, required: true },
  desc: { type: String },
  id: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const UserSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  credits: { type: Number, default: 10 },
  logos: [LogoSchema],
});

// 检查模型是否已经存在，如果存在则使用现有模型
const User =
  (mongoose.models.User as Model<IUser>) ||
  mongoose.model<IUser>('User', UserSchema);
export default User;
