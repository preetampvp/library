import mongoose from "mongoose";

export interface IBook extends mongoose.Document {
  title: string;
  description: string;
  isbn: string;
  categories: string[];
  authors: string[];
  createdAt: Date;
  updatedAt: Date;
}

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    isbn: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
    },
    authors: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

const model = mongoose.model<IBook>("Books", schema);
export default model;
