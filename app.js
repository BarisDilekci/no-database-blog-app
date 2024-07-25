import express from 'express';
import fs from 'fs';
import { addBlog, deletePost, getAllBlogData } from './controller/blogController.js';
import * as routerController from './controller/routeController.js';

const app = express();
const port = process.env.PORT || 4000;

// EJS view engine settings
app.set('view engine', 'ejs');

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));






// Main route
app.get('/', getAllBlogData);

app.get('/add', routerController.getAddPage);

app.post("/add", addBlog);

app.post('/posts/:id/delete', deletePost);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
