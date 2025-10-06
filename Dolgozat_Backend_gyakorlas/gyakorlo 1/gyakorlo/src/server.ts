import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./routes";

const app = express();

app.use(cors());
app.use(bodyParser.json());

// CRUD endpointok
app.use("/api", router);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}/api/products`);
});
export default app;