import axios from "axios";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sendEmail } from "./services.js";

dotenv.config();

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

app.get("/newsletter", async (request, response) => {
  const { email } = request.query;

  try {
    await sendEmail({
      from: '"Portal da dengue 🦟" <giovani.alves121@gmail.com>', // sender address
      to: `${email}`, // list of receivers
      subject: "Atualizações - Portal da dengue", // Subject line
      text: "Atualização sobre o avanço dos casos na cidade de Indaiatuba", // plain text body
    });

    response.status(200).json({ message: "Email enviado com sucesso" });
  } catch (error) {
    response.status(500).json({ error });
  }
});

app.listen(process.env.PORT || 3333, () => {
  console.log("Server is running on port 3333");
});
