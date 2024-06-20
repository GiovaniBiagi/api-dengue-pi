import axios from "axios";
import express from "express";
import cors from "cors";

const app = express();

const searchParams = new URLSearchParams({
  geocode: "3520509",
  disease: "dengue",
  format: "json",
  ew_start: "1",
  ew_end: "25",
  ey_start: "2023",
  ey_end: "2024",
});

app.use(cors());
app.use(express.json());

app.get("/", async (request, response) => {
  try {
    const fetchResponse = await axios.get(
      `https://info.dengue.mat.br/api/alertcity?${searchParams}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    response.json(fetchResponse.data);
  } catch (error) {
    response.status(500).json({ error });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
