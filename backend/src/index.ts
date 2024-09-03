import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import Product from "./models/Product";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: [ process.env.VUE_APP_API ?? '*' ],
    methods: ['GET', 'POST'], // Allow only these methods
    allowedHeaders: ['Content-Type'], // Allow only these headers
};

app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI as string)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/', () => {
    //res.json('API is running');
    console.log('API is running');
});

app.get('/api/products', async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        console.log('p', products);
        //res.json(products);
    } catch (error) {
        console.log('error', error);
        //res.status(500).json({ message: 'Error fetching products', error });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
