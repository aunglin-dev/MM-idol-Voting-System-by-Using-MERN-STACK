import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    DateOFBirth: {
      type: String,
      required: true,
    },
    NRC: {
      type: String,
      required: true,
    },
    PhNo: {
      type: String,
      required: true,
    },
    Address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", AdminSchema);

export default Admin;
