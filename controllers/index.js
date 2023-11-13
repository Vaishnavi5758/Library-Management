const User = require('../models/user'); // Assuming you have a model defined for your User

const express = require('express');
const app = express();
const path = require('path');



exports.indexPage = (req, res) => {
  const pageUrl = 'C:/Users/ADMIN/Desktop/Vaishnavi/Sharpener/ExpressSQL/Library Management/public/index.html';
  res.sendFile(pageUrl);
};



exports.AddBookToDB = async (req, res, next) => {
  const bookName = req.body.bookName;
  const bookTakenOn = req.body.bookTakenOn;
  const bookReturnDate = req.body.bookReturnDate;

  // Validate the user input
  if (!bookName || !bookTakenOn || !bookReturnDate) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Calculate fare based on hourly rate (assuming 10 Rs per hour)
    const hourlyRate = 10;
    const takenOn = new Date(bookTakenOn);
    const returnDate = new Date(bookReturnDate);
    const hoursDifference = Math.ceil((returnDate - takenOn) / (1000 * 60 * 60));
    const currentFare = hoursDifference * hourlyRate;

    // Create a new user record in the database
    const result = await User.create({
      bookName: bookName,
      bookTakenOn: bookTakenOn,
      bookReturnDate: bookReturnDate,
      currentFare: currentFare,
      finePaid: false,
    });

    console.log('Book Added');

    // Send the result as JSON response
    res.json({ message: 'Book added successfully', user: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occurred while adding the book' });
  }
};

// Route to find all books
exports.findAllUsersBooks= async (req, res, next) => {
  try {
    const allBooks = await User.findAll();
    res.json(allBooks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching all books' });
  }
};

//Route to find books by name
exports.findBooksByName = async (req, res, next) => {
  const { bookName } = req.query;

  // Validate the input
  if (!bookName) {
    return res.status(400).json({ error: 'Missing required parameter: bookName' });
  }

  try {
    const booksByName = await User.findAll({
      where: {
        bookName: bookName,
      },
    });
    res.json(booksByName); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching books by name' });
  }
};


exports.payFine = async (req, res) => {
  const { bookId } = req.body;

  try {
    // Find the book in the database using the User model
    const book = await User.findByPk(bookId);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Update the 'finePaid' status in the database
    await book.update({ finePaid: true });

    // Respond with a success message
    res.json({ message: 'Fine paid successfully', book });
  } catch (error) {
    console.error('Error paying fine:', error);
    // Handle error (display an error message, etc.)
    res.status(500).json({ error: 'An error occurred while paying the fine' });
  }
};
