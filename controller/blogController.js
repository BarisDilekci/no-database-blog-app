import fs from 'fs/promises';
import path from 'path';

const filePath = 'post.json';

const readPostFile = async () => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`File read error: ${error.message}`);
        throw error;
    }
};

const writePostsFile = async (data) => {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error(`File write error: ${error.message}`);
        throw error;
    }
};

export const addBlog = async (req, res) => {
    try {
        const { title, author, content } = req.body;
        const newPost = { id: Date.now().toString(), title, author, content, createdAt: new Date() };

        const posts = await readPostFile();

        posts.unshift(newPost);

        await writePostsFile(posts);

        res.redirect('/');
    } catch (error) {
        console.error(`Server error: ${error.message}`);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getAllBlogData = async (req, res) => {
    try {
        const posts = await readPostFile();

        res.render('index', {
            posts
        });
    } catch (error) {
        console.error(`File read error: ${error.message}`);
        res.status(500).send('File read error');
    }
};

export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id.toString();

        const posts = await readPostFile();

        const updatedPosts = posts.filter(post => post.id.toString() !== postId);

        await writePostsFile(updatedPosts);

        res.redirect('/');
    } catch (error) {
        console.error('Error during deletion: ', error);
        res.status(500).send('An error occurred.');
    }
};
