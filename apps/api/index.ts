import express from "express";
import prisma from "@repo/db/client";

const app = express();
app.use(express.json());

app.get("/website", (req, res) => {
  
});

app.post("/website",async (req, res) => {
  const { name, url } = req.body; 
  if(!url || !name) {
  res.status(400).json({ error: "Name and url are required" });
  return;
  }  

  const website = await prisma.website.create({
    data: { 
        name,
        url,
        timeAdded: new Date(),
     },
  });
  res.json(website);
});

app.get("/website/:websiteId", (req, res) => {

});

app.listen(3001, () => {
  console.log("Server is running on port 3000");
});