import express from 'express';
import hbs from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', hbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.get('/', (req, res) => {
    res.render('home', { name: '' });
});
app.post('/greet', (req, res) => {
    const name = req.body.name || '';
    res.render('home', { name });
}
);
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});