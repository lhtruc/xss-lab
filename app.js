// app.js
import express from 'express';
import hbs from 'express-handlebars';
import path from 'path';
import session from 'express-session';
import { fileURLToPath } from 'url';
import dotenv from "dotenv";
// load environment variables from .env
dotenv.config();

// Routers
import usersRouter from './routes/users.route.js';
import blogsRouter from './routes/blogs.route.js';
import commentsRouter from './routes/comments.route.js';

// ----- Setup __dirname -----
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ----- App init -----
const app = express();
const PORT = 3000;

// ----- Middleware -----
// body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// static files
app.use(express.static(path.join(__dirname, 'public')));

// session (must be before any router that uses session)
app.use(session({
  secret: process.env.SECRET_KEY,   // đổi key theo project
  resave: false,
  saveUninitialized: true,
}));

// pass user to all views (res.locals.user)
app.use((req, res, next) => {
  const user = req.session?.user || null;
  res.locals.user = user;
  req.user = user;
  next();
});

// ----- View engine -----
app.engine('handlebars', hbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// ----- Routes -----
app.use('/users', usersRouter);
app.use('/blogs', blogsRouter);
app.use('/comments', commentsRouter);

// Home page
app.get('/', (req, res) => {
  res.render('home', { name: req.session?.user?.username || '' });
});

// ----- Start server -----
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
