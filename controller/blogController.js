// blogController.js

import fs from 'fs/promises';
import path from 'path';

let posts = [];
const filePath = "post.json"; 


export const addBlog = async (req, res) => {
    try {
        const { title, author, content } = req.body;
        const newPost = { id: Date.now(), title, author, content, createdAt: new Date() };


        try {
            const data = await fs.readFile(filePath, 'utf8'); 
            posts = JSON.parse(data);
        } catch (error) {
            console.error(`Dosya okuma hatası: ${error.message}`);
        }

        posts.unshift(newPost);

        await fs.writeFile(filePath, JSON.stringify(posts, null, 2), 'utf8'); 

        res.status(201).json(newPost);
    } catch (error) {
        console.error(`Sunucu hatası: ${error.message}`);
        res.status(500).json({ message: 'Sunucu hatası' });
    }
};


export const getAllBlogData = async (req, res) => {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        const posts = JSON.parse(data); // posts verisini al

        res.render('index', {
            posts 
        });
    } catch (error) {
        console.error(`Dosya okuma hatası: ${error.message}`);
        res.status(500).send('Dosya okuma hatası');
    }
};