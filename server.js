const path = require('path');
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const { protect } = require('./middleware/authMiddleware')
const cors = require('cors');


connectDB();

const app = express();

// Enable CORS for frontend
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/expenses', require('./routes/expenseRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/savings', require('./routes/savingRoutes'));
app.use('/api/bills', require('./routes/billRoutes'));
app.use('/api/colabs', require('./routes/colabRoutes'));

// Production Code
if (process.env.NODE_ENV === 'production') {
  // console.log('here')
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

app.use(errorHandler);
// app.use(protect);
// console.log(req.user.id)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
