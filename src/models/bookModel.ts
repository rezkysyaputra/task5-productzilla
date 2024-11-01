import mongoose, { Document, Schema, Types } from 'mongoose';

interface IBook extends Document {
  user_id: Types.ObjectId;
  code: string;
  title: string;
  author: string;
  description: string;
}

const bookSchema = new Schema<IBook>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const BookModel = mongoose.model<IBook>('Book', bookSchema);
