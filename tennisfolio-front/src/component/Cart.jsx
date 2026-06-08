import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import style from '../css/Cart.module.css';
import { useEffect, useState } from 'react';
import { getCartItems,deleteItems, updateItems, getTotalPrice } from '../util/cart.js';
import { useAuthStore } from '../../store/useAuthStore.js';
import {useNavigate} from 'react-router-dom';


function Cart() {
  let category = "";
  let index = 0;
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const userId = useAuthStore((s) => s.userId);

  const totalPrice = getTotalPrice(cartItems);

  let sign = { margin: "0 10px", fontWeight: "700", fontSize: "15px", color: "#888" };

  useEffect(() => {
    // 장바구니 아이템을 서버에서 가져오는 로직
    const axiosCartItems = async () => {
      const result = await getCartItems(userId);
      setCartItems(result);
    };

    axiosCartItems();
  }, []);

  const handleDelete= async(cid)  => {
    await deleteItems([cid]);
    setCartItems(cartItems.filter(item => item.cid !== cid));
  };

  const handleUpdate= async(cid,qty)  => {
    await updateItems({cid,qty});
    setCartItems(cartItems.map(item => item.cid === cid ? { ...item, qty: item.qty + qty } : item));
  };

  return (
    <div className="container-fluid" style={{ background: "#f5f6f7" }}>
      <div className="container" style={{ padding: "100px 0" }}>
        <div className="row d-flex justify-content-evenly">
          {/* 장바구니 */}
          <div className={`col-xl-7 col-12 ${style.cartbox}`}>
            <Table className="cartList">
              <tbody>
                {cartItems.map((item, i) => {
                  let total = Number(item.price.replaceAll(",", "")) * item.qty;

                  if (item.image.indexOf("hot") > -1) {
                    category = "/detail/hot/"; index = item.pid;
                  } else if (item.image.indexOf("bag") > -1) {
                    category = "/detail/best/bag/"; index = item.pid - 8;
                  } else if (item.image.indexOf("tennis") > -1) {
                    category = "/detail/best/item/"; index = item.pid - 18;
                  } else if (item.image.indexOf("racquet") > -1) {
                    category = "/detail/best/racquet/"; index = item.pid - 24;
                  } else if (item.image.indexOf("woman") > -1) {
                    category = "/detail/best/woman/"; index = item.pid - 27;
                  } else if (item.image.indexOf("man") > -1) {
                    category = "/detail/best/man/"; index = item.pid - 37;
                  } else if (item.image.indexOf("acc") > -1) {
                    category = "/detail/best/acc/"; index = item.pid - 47;
                  } else if (item.image.indexOf("shoes") > -1) {
                    category = "/detail/best/shoes/"; index = item.pid - 57;
                  }

                  return (
                    <tr key={item.cid || i}>
                      <td className={style.imgbox}>
                        <Link to={`${category}${index}`}>
                          <img src={`/${item.image}`} alt="img" />
                        </Link>
                      </td>
                      <td className={style.optionbox}>
                        <div className={style.titlebox}>
                          <p className={style.product}>{item.name}</p>
                        </div>
                        <div className={style.btnbox}>
                          <div className={style.countBtn}>
                            <button className={style.minus} onClick={() => handleUpdate(item.cid, -1)} disabled={item.qty <= 1}>
                              -
                            </button>
                            <input type="number" value={item.qty} readOnly className={style.inputNum} />
                            <button className={style.plus} onClick={() => handleUpdate(item.cid, 1)}>
                              +
                            </button>
                          </div>
                          <div className={style.price}>
                            <div className={style.priceWrap}>
                              <p className={style.total}>{total.toLocaleString()}</p>
                              <span className={style.won}>원</span>
                            </div>
                            <button className={style.delete} onClick={() => handleDelete(item.cid)}>
                              X
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <div className={style.totalBoxMain}>
              <span>총 상품 금액 <span className={style.bold}>{totalPrice.toLocaleString()}</span>원</span>
              <span style={sign}>+</span>
              <span>배송비 <span className={style.bold}>0</span>원</span>
              <span style={sign}>=</span>
              <span>총 주문 금액 <span className={style.highlight}>{totalPrice.toLocaleString()}</span>원</span>
            </div>
          </div>
          {/* 결제요청 */}
          <div className="col-xl-4 col-12">
            <div className={style.totalBox}>
              <p style={{ fontWeight: "500", fontSize: "17px" }}>결제요청</p>
              <div className={style.order}>
                <div><p>주문건수</p><span>{cartItems.length} 개</span></div>
                <div><p>주문금액</p><span>{`${totalPrice.toLocaleString()} 원`}</span></div>
                <div><p>배송비</p><span>0 원</span></div>
              </div>
              <div className={style.totalPrice}>
                <p>총 결제 금액</p>
                <span>{`${totalPrice.toLocaleString()} 원`}</span>
              </div>
            </div>
            <Button
              className={`btn btn-primary ${style.buyBtn}`}
              onClick={() => navigate('/checkout',              
              )}
            >
              결제하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
