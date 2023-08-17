import mongoose from "mongoose";
// Actualizar a nueva forma de codigo try-catch
export function connect() {
  mongoose
    .connect(process.env.MONGO_URL!, {
      tls: true,
    })
    .then(() => console.log("Database connection established"))
    .catch((err) => console.log("Hey there is some error", err));
}
