import { useEffect, useState, Fragment } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore.js';
import { getCartItems, getTotalPrice } from '../util/cart.js';
import { axiosGet, axiosPost } from '../util/dataAxios.js';
import QRModal from '../../kakaoModal/QRModal.jsx';
import '../css/checkOut.css';

export default function Checkout() {
  const [cartList, setCartList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [payment, setPayment] = useState('kakao');
  const [qrUrl, setQrUrl] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const type = location.state?.type;
  const directItem = location.state?.item;

  const userId = useAuthStore((s) => s.userId);
  const setCartListStore = useAuthStore((s) => s.setCartList);

  const [receiver] = useState({
    name: '홍길동',
    phone: '010-1234-1234',
    zipcode: '12345',
    address1: '서울시 강남구',
    address2: '123',
    memo: '문앞',
  });

  useEffect(() => {
    const fetchCartItems = async () => {
      if (type === 'direct' && directItem) {
        const list = [directItem];

        setCartList(list);
        setCartListStore(list);
        setTotalPrice(getTotalPrice(list));
        return;
      }

      const list = await getCartItems(userId);

      setCartList(list);
      setCartListStore(list);
      setTotalPrice(getTotalPrice(list));
    };

    if (type === 'direct' || userId) {
      fetchCartItems();
    }
  }, [userId, type, directItem, setCartListStore]);

  useEffect(() => {
    if (!showModal || !orderId) {
      return;
    }

    const timer = setInterval(async () => {
      try {
        const result = await axiosGet(`/kakao/status/${orderId}`);

        if (result.status === 'approved') {
          setShowModal(false);
          navigate('/checkout/success');
        }
      } catch (error) {
        console.log('/kakao/status :: error -->', error);
      }
    }, 2000);

    return () => clearInterval(timer);
  }, [showModal, orderId, navigate]);

  const handlePayment = async () => {
    if (!terms || !privacy) {
      alert('필수 약관에 모두 동의해야 결제가 가능합니다.');
      return;
    }

    if (cartList.length === 0) {
      alert('장바구니에 상품이 없습니다.');
      return;
    }

    try {
      const nextOrderId = crypto.randomUUID();
      const itemName =  cartList.length > 1 ? `${cartList[0].name} 외 ${cartList.length - 1}건` : cartList[0].name;
      const quantity = cartList.reduce((total, item) => total + Number(item.qty), 0);
      const totalAmount = totalPrice;
      const orderData = {
        orderId: nextOrderId,
        userId,
        itemName,
        quantity,
        totalAmount,
      };

      const result = await axiosPost('/kakao/ready', orderData);
      const { next_redirect_mobile_url } = result;

      if (next_redirect_mobile_url) {
        setOrderId(nextOrderId);
        setQrUrl(next_redirect_mobile_url);
        setShowModal(true);
      }
    } catch (error) {
      console.log('/kakao/ready :: error -->', error);
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-header">주문/결제</h2>

      <div className="section">
        <h2 className="section-title">받는 사람 정보</h2>
        <div className="info-box">
          <div className="info-grid">
            <div className="label">이름</div>
            <div className="value">{receiver.name}</div>
            <div className="label">배송주소</div>
            <div className="value">
              {receiver.zipcode} / {receiver.address1} {receiver.address2}
            </div>
            <div className="label">연락처</div>
            <div className="value">{receiver.phone}</div>
            <div className="label">배송 요청사항</div>
            <div className="value phone-input">
              <input type="text" defaultValue={receiver.memo} />
              <button className="btn">변경</button>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">주문 상품</h2>
        <div className="info-box">
          <div className="info-grid">
            {cartList.length === 0 ? (
              <>
                <div className="label">상품</div>
                <div className="value">장바구니에 담긴 상품이 없습니다.</div>
              </>
            ) : (
              cartList.map((item) => (
                <Fragment key={item.cid ?? item.pid}>
                  <div className="label">상품명</div>
                  <div className="value">
                    <img src={`/${item.image}`} alt="product" style={{ width: '35px' }} />
                    {item.name}, {item.info}, 수량({item.qty}), 가격{' '}
                    {Number(String(item.price).replaceAll(',', '')).toLocaleString()}원
                  </div>
                </Fragment>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="section">
        <h2>결제 정보</h2>
        <table className="payment-table">
          <tbody>
            <tr>
              <td>총상품가격</td>
              <td className="price">{totalPrice.toLocaleString()}원</td>
            </tr>
            <tr>
              <td>즉시할인</td>
              <td className="discount">-0원</td>
            </tr>
            <tr>
              <td>배송비</td>
              <td className="price">0원</td>
            </tr>
            <tr className="total">
              <td>총결제금액</td>
              <td className="total-price">{totalPrice.toLocaleString()}원</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="section">
        <h2>결제 수단</h2>
        <div className="payment-method">
          <label className="radio-label">
            <input
              type="radio"
              name="payment"
              value="kakao"
              checked={payment === 'kakao'}
              onChange={(e) => setPayment(e.target.value)}
            />
            카카오페이
          </label>
        </div>
        <div className="payment-method">
          <label className="radio-label">
            <input
              type="radio"
              name="payment"
              value="naver"
              checked={payment === 'naver'}
              onChange={(e) => setPayment(e.target.value)}
            />
            네이버페이
          </label>
        </div>
      </div>

      <div className="terms">
        <input
          type="checkbox"
          id="terms"
          checked={terms}
          onChange={(e) => setTerms(e.target.checked)}
        />
        <label htmlFor="terms"> 구매조건 확인 및 결제 진행 동의</label>
        <br />
        <input
          type="checkbox"
          id="privacy"
          checked={privacy}
          onChange={(e) => setPrivacy(e.target.checked)}
        />
        <label htmlFor="privacy"> 개인정보 국외 이전 동의</label>
      </div>

      <button className="pay-button" onClick={handlePayment}>
        결제하기
      </button>

      {showModal && (
        <QRModal
          qrUrl={qrUrl}
          amount={totalPrice}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
