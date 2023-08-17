import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    require: [true, "Name field is required"],
    type: Schema.Types.String,
  },
  email: {
    require: [true, "Email field is required"],
    type: Schema.Types.String,
    unque: true,
    trim: true,
  },
  password: {
    require: [true, "Password field is required"],
    type: Schema.Types.String,
  },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
