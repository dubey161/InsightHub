import mongoose from "mongoose";

// Define the Mongoose schema for the "book" collection
const bookSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: [true, "Please enter the book title"],
        trim: true,
    },
    author: {
        type: String,
        required: [true, "Please enter the book author"],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Please enter the price"],
        maxLength: [4, "Year can't exceed 4 characters"],
    },
    image: [String],
    category: {
        type: String,
        required: [true, "Please enter the book category"],
    },
    quant: {
        type: Number,
        default: 0,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: [true, "Please enter the book description"],
    },
    createdAt: { type: Date, default: Date.now },
});

const Book = mongoose.model('Book', bookSchema);
export default Book;