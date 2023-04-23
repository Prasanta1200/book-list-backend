// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser')
// const cors = require('cors');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');



// const app = express();
// app.use(bodyParser.json());
// app.use(cors());


// const DB = "mongodb+srv://Prasanta:Prasanta@cluster0.z4m8koz.mongodb.net/?retryWrites=true&w=majority";
// if (!DB) {
//     console.error("DB_CONNECTION_STRING environment variable is not set");
//     process.exit(1);
// }
// mongoose.connect(DB).then(() => {
//     console.log("Connection Success");
// }).catch((err) => {
//     console.log(err.message);
// })

// //user Schema
// const userSchema = new mongoose.Schema({
//     email:{
//         type : String,
//         required : true,
//         unique : true
//     },
//     password:{
//         type : String,
//         required : true
//     },
//     cpassword:{
//         type:String,
//         required:true
//     }
// });
// //BookSchema


// //User Model
// const User = mongoose.model('User4',userSchema)
// //User Model for Book
// const Book = mongoose.model('Book',{
//     title:String,
//     author:String,
//     genre:String
// })

// //register endpoint
// app.post('/register',async (req,res)=>{
//     const {email, password, cpassword} = req.body;

//     try {
//         const user = await User.findOne({email});
//         if(user){
//             return res.status(400).json({message:'User already exist'})
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new User({email,password:hashedPassword});
//         await newUser.save();

//         res.status(201).json({message:'User created'})
//         } catch (error) {
//         console.log(error);
//         res.status(500).json({message:'server error'})
//     }
// })

// // login endpoint
// app.post('/login', async (req,res)=>{
//     const {email,password} = req.body;

//     try {
//         const user = await User.findOne({email});
//         if(!user){
//             return res.status(400).json({message:'invalid user'});
//         }

//         //password compare
//         const match = await bcrypt.compare(password, user.password);
//         if(!match){
//             return res.status(400).json({message:'invalid user'});
//         }

//         //generate token
//         const token = jwt.sign({email:user.email},'secret',{expiresIn:'2h'});
//         res.status(200).json({token})
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message:'server error'})
//     }
// });

// //Get all the book
// app.get('/books',(req,res)=>{
//     Book.find({},(err,books)=>{
//         if(err){
//             res.status(500).send(err)
//         }else{
//             res.status(200).send(books)
//         }
//     })
// });
// //get a book by ID
// app.get('books/:id',(req,res)=>{
//     const bookId = req.params.id;
//     Book.findById(bookId,(err,book)=>{
//         if(err){
//             res.status(500).send(err)
//         }else{
//             res.status(200).send(books)
//         }
//     })
// });

// //Add a book
// app.post('/books',(req,res)=>{
//     const newBook = new Book({
//         title:req.body.title,
//         author:req.body.author,
//         genre:req.body.genre
//     });
//     newBook.save()
//     .then(book => {
//       res.status(200).send(book);
//     })
//     .catch(err => {
//       res.status(500).send(err);
//     });
// });

// //Edit a book by id
// app.put('/books/:id',(req,res)=>{
//     const bookId = req.params.id;
//     Book.findByIdAndUpdate(bookId,{
//         title:req.body.title,
//         author:req.body.author,
//         genre:req.body.genre
//     },{new:true},(err,book)=>{
//         if(err){
//             res.status(500).send(err)
//         }else{
//             res.status(200).send(books)
//         }
//     })
// });
// // Delete a book by id
// app.delete('/books/:id',(req,res)=>{
//     const bookId = req.params.id;
//     // Book.findByIdAndDelete(bookId,(err,book)=>{
//     //     if(err){
//     //         res.status(500).send(err)
//     //     }else{
//     //         res.status(200).send(books)
//     //     }
//     // })
//     Book.findByIdAndDelete(bookId)
//   .then((deletedDoc) => {
//     console.log("Document deleted successfully:", deletedDoc);
//     // any additional logic here
//   })
//   .catch((err) => {
//     console.error("Error deleting document:", err);
//     // any additional error handling here
//   });

// })

// app.listen(8080,()=>{
//     console.log('server is running at port 8080');
// })

// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const cors = require('cors');

// const app = express();
// app.use(express.json());
// app.use(cors());

// // Connect to MongoDB
// const DB = "mongodb+srv://Prasanta:Prasanta@cluster0.z4m8koz.mongodb.net/?retryWrites=true&w=majority";
// if (!DB) {
//     console.error("DB_CONNECTION_STRING environment variable is not set");
//     process.exit(1);
// }
// mongoose.connect(DB).then(() => {
//     console.log("Connection Success");
// }).catch((err) => {
//     console.log(err.message);
// })

// // Define user schema
// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// // Define user model
// const User = mongoose.model('user4', userSchema);

// // Register endpoint
// app.post('/register', async (req, res) => {
//   try {
//     // Check if email already exists
//     const user = await User.findOne({ email: req.body.email });
//     if (user) {
//       return res.status(400).json({ message: 'Email already exists' });
//     }

//     // Hash password
//     const salt = await bcrypt.genSalt();
//     const hashedPassword = await bcrypt.hash(req.body.password, salt);

//     // Create new user
//     const newUser = new User({
//       email: req.body.email,
//       password: hashedPassword,
//     });

//     // Save user to database
//     const savedUser = await newUser.save();

//     // Generate JWT token
//     const token = jwt.sign({ userId: savedUser._id }, 'mysecretkey');

//     // Send token in response
//     res.status(200).json({ token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Login endpoint
// app.post('/login', async (req, res) => {
//   try {
//     // Check if email exists
//     const user = await User.findOne({ email: req.body.email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     // Check password
//     const validPassword = await bcrypt.compare(req.body.password, user.password);
//     if (!validPassword) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ userId: user._id }, 'mysecretkey');

//     // Send token in response
//     res.status(200).json({ token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Start server
// app.listen(8080, () => {
//   console.log('Server started');
// });


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const cors = require('cors')

const app = express();

// Connect to MongoDB

const DB = "mongodb+srv://Prasanta:Prasanta@cluster0.z4m8koz.mongodb.net/?retryWrites=true&w=majority";
if (!DB) {
    console.error("DB_CONNECTION_STRING environment variable is not set");
    process.exit(1);
}
mongoose.connect(DB).then(() => {
    console.log("Connection Success");
}).catch((err) => {
    console.log(err.message);
})

// Define Book schema and model
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
});

const Book = mongoose.model('Book', bookSchema);

// Configure passport for user authentication
const User = require('./models/User');

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return done(null, false, { message: 'Incorrect email or password.' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Incorrect email or password.' });
    }
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Configure Express middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors())

// Define routes
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const user = new User({ email, password: await bcrypt.hash(password, 10) });
  try {
    await user.save();
    res.send({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).send({ message: 'Error occurred while registering user' });
  }
});

app.post('/login', passport.authenticate('local'), (req, res) => {
  res.send({ message: 'Login successful' });
});

app.post('/books', async (req, res) => {
  const { title, author, genre } = req.body;
  const book = new Book({ title, author, genre });
  try {
    await book.save();
    res.send({ message: 'Book added successfully' });
  } catch (err) {
    res.status(500).send({ message: 'Error occurred while adding book' });
  }
});

app.get('/books', async (req, res) => {
    try {
      const books = await Book.find();
      res.send(books);
    } catch (err) {
      res.status(500).send({ message: 'Error occurred while retrieving books' });
    }
  });
  

app.get('/books/:id', async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.send(book);
});

app.put('/books/:id', async (req, res) => {
  const { title, author, genre } = req.body;
  try {
    await Book.findByIdAndUpdate(req.params.id, { title, author, genre });
    res.send({ message: 'Book updated successfully' });
  } catch (err) {
    res.status(500).send({ message: 'Error occurred while updating book' });
}
});

app.delete('/books/:id', async (req, res) => {
try {
await Book.findByIdAndDelete(req.params.id);
res.send({ message: 'Book deleted successfully' });
} catch (err) {
res.status(500).send({ message: 'Error occurred while deleting book' });
}
});

app.get('/logout', (req, res) => {
req.logout();
res.send({ message: 'Logout successful' });
});

// Start server
const port = 8080;
app.listen(port, () => {
console.log(`Server started on port ${port}`);
});


