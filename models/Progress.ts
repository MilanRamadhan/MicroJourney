import mongoose, { Schema, Document } from 'mongoose';

export interface IProgress extends Document {
  studentId: string;
  completedStages: number[];
  currentStage: number;
  xp: number;
  quizAnswers: Record<number, boolean>;
  updatedAt: Date;
}

const ProgressSchema = new Schema<IProgress>({
  studentId: { type: String, required: true, unique: true },
  completedStages: { type: [Number], default: [] },
  currentStage: { type: Number, default: 1 },
  xp: { type: Number, default: 0 },
  quizAnswers: { type: Map, of: Boolean, default: {} },
}, { timestamps: true });

export default mongoose.models.Progress || mongoose.model<IProgress>('Progress', ProgressSchema);
