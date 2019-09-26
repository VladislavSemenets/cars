require('dotenv').config();
require('./db');

const express = require('express');
const app = express();
const cors = require('cors');

const Category = require('./entities/category');
const SubCategory = require('./entities/sub-category');

app.use(cors());

app.get(
    '/api/categories',
    async (request, response) => {
        const categories = await Category.find();
        response.json(categories);
    }
);

app.get(
    '/api/sub-categories/:category_id',
    async (request, response) => {
        const subCategories = await SubCategory.find({
            parentId: request.params.category_id
        });
        response.json(subCategories);
    }
);

app.post(
    '/api/save-form-data',
    (request, response) => response.json({ status: 'ok' })
);


app.listen(process.env.APP_PORT);
