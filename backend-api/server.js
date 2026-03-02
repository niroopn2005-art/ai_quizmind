import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Question from './models/Question.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/quiz-app')
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// --- API Routes ---

// Get all subjects
app.get('/api/subjects', async (req, res) => {
    try {
        const subjects = await Question.distinct('subject');
        res.json(subjects);
    } catch (error) {
        res.status(500).json({ error: 'Server error fetching subjects' });
    }
});

// Get quiz questions by subject and difficulty
app.get('/api/questions', async (req, res) => {
    const { subject, difficulty, limit = 10 } = req.query;
    try {
        const query: any = {};
        if (subject) query.subject = subject;
        if (difficulty) query.difficulty = difficulty;

        const questions = await Question.aggregate([
            { $match: query },
            { $sample: { size: Number(limit) } }
        ]);

        res.json(questions);
    } catch (error) {
        res.status(500).json({ error: 'Server error fetching questions' });
    }
});

// Save user progress
app.post('/api/progress', async (req, res) => {
    const { userId, subject, score, totalTime } = req.body;
    // Here we would interact with a UserProgress model
    console.log(\`Progress saved for user \${userId}\`);
  res.json({ success: true, message: 'Progress saved successfully' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(\`🚀 Server running on port \${PORT}\`);
});
