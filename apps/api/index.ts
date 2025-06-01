import express from "express";
import cors from "cors";
import { allWebsites, createWebsite, getWebsiteById } from "./controllers/website";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/website", allWebsites);

app.post("/website", createWebsite);

app.get("/website/:websiteId", getWebsiteById);

app.listen(3001, () => {
  console.log("Server is running on port 3000");
});