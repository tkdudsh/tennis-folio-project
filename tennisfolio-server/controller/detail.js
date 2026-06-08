import * as repository from '../repository/detail.js';

/**
 * 리뷰 목록 조회
 */
export const getReview = async(req, res, next) => {
    try {
        const result = await repository.getReview();
        res.json(result);
    }
    catch (error) {
        next(error);
    }
};

/**
 * HOT 상품 상세 조회
 */
export const getHotDetail = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await repository.getHotDetail(Number(id));
        if (!result) return res.status(404).json({ message : '상품을 찾을 수 없습니다.' });
        res.json(result);
    }
    catch (error) {
        next(error);
    };
}

export const getBestDetail = async (req, res, next) => {
    try {
        const { subCategory, id } = req.params;
        const result = await repository.getBestDetail(subCategory, Number(id));
        if (!result) return res.status(404).json({ message : '상품을 찾을 수 없습니다.' });
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}
