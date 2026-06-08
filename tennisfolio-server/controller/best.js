import * as repository from '../repository/best.js';

export const getCategories = async(req, res, next) => {
    try {
        const result = await repository.getCategories();
        res.json(result);
    }
    catch (error) {
        next(error);
    }
};

export const getBestProducts = async(req, res, next) => {
    try {
        const { category } = req.query;
        const result = await repository.getBestProducts(category);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
};