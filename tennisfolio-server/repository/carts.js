import pool from "../DB/connection.js";


//장바구니 아이템 수량 변경
export const getQtyUpdate = async (cid, qty ) => {
  const sql = `
    UPDATE cart
    SET qty = qty + ?
    WHERE cid = ?
      AND qty + ? > 0
  `;
  const [rows] = await pool.execute(sql,[qty,cid,qty]);
  return rows;
};
//장바구니 아이템  삭제
export const deleteCartItems = async (cids) => {
  const sql = `
    DELETE FROM cart
    WHERE cid IN (${cids.map(() => '?').join(',')})
  `;
  const [rows] = await pool.execute(sql, cids);
  return rows;
};

export const addCartItem = async (cartItem) => {//장바구니 추가
  const { pid, size, qty, userId } = cartItem;
  const sql = `
    INSERT INTO cart(size, qty, pid, id, cdate)
    VALUES (?, ?, ?, ?, NOW())
  `;
  const [result] = await pool.execute(sql, [size, qty, pid, userId]);
  return result;
};


export const getCartItem = async ({ pid, size, userId }) => {
  const sql = `
    SELECT *
    FROM cart
    WHERE pid = ? AND size = ? AND id = ?
  `;
  const [rows] = await pool.execute(sql, [pid, size, userId]);
  return rows[0];
};

export const getCartItems = async (userId) => {
  const sql = `
    SELECT *
    FROM view_cartlist
    WHERE id = ?
  `;
  const [rows] = await pool.execute(sql, [userId]);
  return rows;
};
export const updateCartQty = async ({ cid, qty }) => {
  const sql = `
    UPDATE cart
    SET qty = qty + ?
    WHERE cid = ?
  `;
  const [result] = await pool.execute(sql, [qty, cid]);
  return result;
};
