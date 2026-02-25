import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

// Import your custom routes
import chatRoutes from './routes/chat-routes.js';
import webPages from './routes/web-pages-selector.js';
import jobInfo from './routes/render-job-info.js';

// Resolve __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Standard Middleware
app.use(cors());
app.use(express.json());

// 1. API Routes
// Note: These must come BEFORE static file serving
app.use('/api', chatRoutes); 
app.use('/api', webPages); 
app.use('/api', jobInfo); 

// 2. Static File Serving
// This serves your built React/Vite files from the /dist folder
const distPath = path.resolve(__dirname, 'dist');
app.use(express.static(distPath));

// 3. SPA Catch-all
// This ensures that if you refresh the page on a React route (e.g., /dashboard),
// it serves index.html instead of a 404.
app.get('*', (req, res) => {
    // If the request starts with /api but didn't match any routes above, 
    // return a 404 instead of the HTML file.
    if (req.path.startsWith('/api')) {
        return res.status(404).json({ error: 'API route not found' });
    }
    
    // Otherwise, serve the frontend
    res.sendFile(path.join(distPath, 'index.html'), (err) => {
        if (err) {
            // If dist/index.html is missing, provide a clear error
            res.status(500).send("Frontend build (dist/index.html) is missing. Run 'npm run build' first.");
        }
    });
});

export default app;