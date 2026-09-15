import "dotenv/config";
import express from 'express';
import cors from "cors";
import 'dotenv/config';
import connectDb from "./configs/db.js";
import session from 'express-session';
import MongoStore from "connect-mongo";
import AuthRouter from "./routes/AuthRoutes.js";
await connectDb();
const app = express();
// Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true
}));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }, //7 days expire 
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        collectionName: 'session'
    })
}));
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Server is Live!');
});
app.use('/api/auth', AuthRouter);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
