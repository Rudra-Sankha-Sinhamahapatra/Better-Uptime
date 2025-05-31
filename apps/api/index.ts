import express from "express";

const app = express();

app.get("/website", (req, res) => {
  
});

app.get("/website/:websiteId", (req, res) => {

});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});