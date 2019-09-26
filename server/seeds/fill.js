require('dotenv').config();
require('../db');

const Category = require('../entities/category');
const SubCategory = require('../entities/sub-category');

async function run() {
    const category = await (new Category({ name: 'BMW M5' }).save());

    await (new SubCategory({
        name: 'hatchback',
        parentId: category._id,
        fields: [
            {
                name: 'number_of_seats',
                placeholder: 'Number of seats',
                type: 'select',
                values: [4, 5, 6]
            },
            {
                name: 'number_of_doors',
                placeholder: 'Number of doors',
                type: 'select',
                values: [3, 4, 5]
            }
        ],
    }).save());

    await (new SubCategory({
        name: 'sedan',
        parentId: category._id,
        fields: [
            {
                name: 'trunk',
                placeholder: 'Cat Trunk',
                type: 'input'
            }
        ]
    }).save());

    process.exit(1);
}

run();
