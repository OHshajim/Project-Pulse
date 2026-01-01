import mongoose from "mongoose";
const connection = { isConnected: 0 };

export async function connectDB() {
    if (connection.isConnected) return;
    const db = await mongoose.connect(process.env.MONGODB_URI || "");
    connection.isConnected = db.connections[0].readyState;
}
