
import express from 'express';
import cors from 'cors';
import problemRoutes from './routes/problemRoutes.js';
import connectDB from './db/db.connect.js';

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api', problemRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));