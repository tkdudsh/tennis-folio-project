import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../css/checkOut.css';

export default function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <div className="cart-container">
      <h2 className="cart-header">주문 완료</h2>

      <div className="section">
        <div className="info-box" style={{ textAlign: 'center', padding: '48px 24px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>결제가 완료되었습니다.</h2>
          <p style={{ margin: 0, color: '#666' }}>주문이 정상적으로 접수되었습니다.</p>
        </div>
      </div>

      <Button className="pay-button" onClick={() => navigate('/')}>
        홈으로 이동
      </Button>
    </div>
  );
}
