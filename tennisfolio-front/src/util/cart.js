import { axiosPost,axiosGet } from "./dataAxios.js";


/**
 * 상품 총 금액 구하기
 */
export function getTotalPrice(cartItems) {
  return (cartItems ?? []).reduce((total, item) => {
    const price = Number(String(item.price).replaceAll(",", ""));
    return total + price * item.qty;
  }, 0);
}

//장바구니 아이템 수량변경
export const updateItems=async({cid,qty})=>{
    const result=await axiosPost("/carts/update",{cid,qty});
    console.log(result);
    return result;
};

//장바구니 아이템 삭제
export const deleteItems=async (cids)=>{
    const result= await axiosPost("/carts/delete",{cids});
    console.log(result);
    return result;
};

export const addItem=async ({pid,size,qty,userId})=>{

    const item = {
        pid:pid,
        size:size,
        qty:qty,
        userId:userId
    };
    const cartItems= await axiosPost("/carts/add",item);
    console.log(cartItems);
    return cartItems;

}

export const getCartItems=async(userId)=>{
    const cartItems= await axiosGet(`/carts/list?userId=${userId}`);
    console.log(cartItems);
    return cartItems;       
};
