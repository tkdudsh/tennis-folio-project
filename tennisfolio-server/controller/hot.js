import * as repository from '../repository/hot.js';

export const getHotProducts = async(req, res, next) => {
    try {
        const result = await repository.getHotProducts();
        // console.log('type : ', typeof result);
        // console.log('isArray :', Array.isArray(result));
        // console.log('data', result);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}