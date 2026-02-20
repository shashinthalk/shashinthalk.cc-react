import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import chatRoutes from './routes/chatRoutes.js';
import webPages from './routes/webPagesSelector.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', chatRoutes); 
app.use('/api', webPages); 

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`🚀 Local Dev on http://localhost:${PORT}`));
}

export default app;