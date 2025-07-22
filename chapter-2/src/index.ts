import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://mongo:27017/mydb';

interface IUser {
  name: string;
  email: string;
  age: number;
}

const UserSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true }
});

const User = mongoose.model<IUser>('User', UserSchema);

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Docker + Express! with MongoDB' });
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

async function initializeData() {
  const userCount = await User.countDocuments();
  if (userCount === 0) {
    const dummyUsers = [
      { name: 'Alice Johnson', email: 'alice@example.com', age: 28 },
      { name: 'Bob Smith', email: 'bob@example.com', age: 35 },
      { name: 'Carol Williams', email: 'carol@example.com', age: 42 }
    ];
    
    await User.insertMany(dummyUsers);
    console.log('Dummy users created');
  }
}

async function connectToMongoDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    await initializeData();
  } catch (error) {
    console.error('MongoDB connection error:', error);
    setTimeout(connectToMongoDB, 5000);
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectToMongoDB();
});