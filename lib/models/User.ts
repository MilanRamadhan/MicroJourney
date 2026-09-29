import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: 'student' | 'teacher' | 'superadmin';
  school?: string;
  phoneNumber?: string;
  className?: string;
  createdBy?: mongoose.Types.ObjectId;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    role: { type: String, enum: ['student', 'teacher', 'superadmin'], required: true },
    school: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    className: { type: String, required: false },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: false },
  },
  { timestamps: true }
);

// Mencegah OverwriteModelError saat hot-reload di Next.js
export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
