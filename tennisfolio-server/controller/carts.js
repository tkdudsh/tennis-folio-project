import * as repository from "../repository/carts.js";

//장바구니 아이템 수량 변경

export const updateItems= async(req,res,next)=>{
  const {cid,qty}=req.body;
  const result = await repository.getQtyUpdate(cid,qty);
  res.json(
    {message:"장바구니 아이템 수량이 변경되었습니다."}
  );
};

//장바구니 아이템 삭제
export const deleteItems = async (req, res) => {
  const { cids } = req.body;
  await repository.deleteCartItems(cids); 
  res.json({
    message: "장바구니 아이템이 삭제되었습니다."
  });
} ;

//장바구니 아이템 추가
export const addToCart = async (req, res) => {
    const { pid, size, qty, userId } = req.body;

    const cartItem = await repository.getCartItem({ pid, size, userId });
    if (cartItem) {
      await repository.updateCartQty({
        cid: cartItem.cid,
        qty
      });
      return res.json({
        message: "장바구니 수량이 증가되었습니다.",
        type: "update"
      });
    }
    const result = await repository.addCartItem({ pid, size, qty, userId });
    res.json({
      message: "장바구니에 추가되었습니다.",
      type: "insert",
      insertId: result.insertId
    });
  
};


// 장바구니 아이템 조회
export const getCartItems = async (req, res) => {
  const result=await repository.getCartItems(req.query.userId);
  res.json(result);
};
