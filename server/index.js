import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.get('/api/test', (req, res) => {
  res.json({ message: 'TEST TEST I LOVE REID!' });
});

app.listen(PORT, () => {``
  console.log(`Server running on http://localhost:${PORT}`);
});
