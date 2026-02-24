import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import chatRoutes from './routes/chat-routes.js';
import webPages from './routes/web-pages-selector.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', chatRoutes); 
app.use('/api', webPages); 

// Static Files
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
        res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    }
});

export default app;