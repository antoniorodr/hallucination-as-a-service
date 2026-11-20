import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import fs from "fs";

type Excuse = { en: string; no: string };
type Excuses = Record<string, Excuse[]>;
type Lang = keyof Excuse;

const app = express();
app.use(cors());
app.set("trust proxy", 1);

const PORT = process.env.PORT || 3000;

const excuses: Excuses = JSON.parse(fs.readFileSync("./excuses.json", "utf-8"));

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  limit: 10,
  message: { error: "Too many requests from this IP, please try again after a minute." },
});

app.use(limiter);

app.get("/hallucination", (req, res) => {
  const all = Object.values(excuses).flat();
  const isLang = (v: unknown): v is Lang => v === "en" || v === "no";
  const language = isLang(req.query.lang) ? req.query.lang : "en";
  const excuseType = req.query.type as string | undefined;
  const randomExcuse = all[Math.floor(Math.random() * all.length)];

  if (!isLang(language)) {
    return res.status(400).json({ error: "Invalid language. Use 'en' or 'no'." });
  }

  if (language && !excuseType) {
    return res.json({ excuse: randomExcuse[language] });
  }

  if (excuseType) {
    const filteredExcuses = excuses[excuseType];
    if (!filteredExcuses) {
      return res.status(400).json({ error: "Invalid excuse type." });
    }
    const randomFilteredExcuse = filteredExcuses[Math.floor(Math.random() * filteredExcuses.length)];
    return res.json({ excuse: randomFilteredExcuse[language] });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
