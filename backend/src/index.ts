import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import Product from "./models/Product";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
    methods: ['GET', 'POST'], // Allow only these methods
    allowedHeaders: ['Content-Type', 'Access-Control-Allow-Origin'], // Allow only these headers
};

app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI as string)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
    res.json('API is running');
});

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
