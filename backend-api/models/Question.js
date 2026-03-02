import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
        enum: ['Physics', 'Chemistry', 'Biology']
    },
    topic: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    options: [{
        type: String,
        required: true
    }],
    correctAnswer: {
        type: String,
        required: true
    },
    explanation: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        default: 'medium'
    },
    neetYear: {
        type: String, // e.g., '2019', '2020'
        default: null
    },
    resources: {
        videoUrl: String,
        pdfUrl: String
    }
}, { timestamps: true });

export default mongoose.model('Question', questionSchema);
