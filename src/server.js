import express from 'express';
import morgan from 'morgan';
import router from './routes/pdf.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.set('view engine', 'ejs');

app.use('/', router);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app is running on PORT ${port}`);
});
