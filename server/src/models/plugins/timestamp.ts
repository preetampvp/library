import mongoose, { HookNextFunction } from "mongoose";

// ! NOT USED - Just for reference
const timestamp = (schema: mongoose.Schema) => {
  schema.add({
    createdAt: Date,
    updatedAt: Date,
  });

  schema.pre("save", (next) => {
    const now = Date.now();
    // @ts-ignore
    this.updatedAt = now;

    // @ts-ignore
    if (this.isNew) {
      // @ts-ignore
      this.createdAt = now;
    }

    // @ts-ignore
    next();
  });
};

export default timestamp;
