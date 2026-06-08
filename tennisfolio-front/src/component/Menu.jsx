import { Offcanvas, CloseButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Menu(props) {
  return (
    <Offcanvas show={props.show} onHide={props.handleClose} placement="end" style={{ background: "#5166BF" }}>
      <Offcanvas.Header>
        <CloseButton variant="white" onClick={props.handleClose} />
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="offcanvasWrap">
          <h3>SITEMAP</h3>
        </div>
        <ul className="Menu">
          <li className="list">
            <p>커뮤니티</p>
            <ul><li>SNS</li><li>컨텐츠</li><li>질문답변</li></ul>
          </li>
          <li className="list">
            <p>스토어</p>
            <ul><li>홈</li><li>베스트</li><li>카테고리</li><li>기획전</li></ul>
          </li>
          <li className="list"><p>마이페이지</p></li>
          <li className="list">
            <p>고객센터</p>
            <ul><li>공지사항</li><li>자주하는질문</li><li>1:1문의</li><li>입점문의</li></ul>
          </li>
          <li className="list">
            <p>소개</p>
            <ul><li>테니스폴리오 소개</li></ul>
          </li>
        </ul>
        <ul className="loginMenu">
          <li>로그인</li>
          <li 
            style={{ cursor: 'pointer', color: 'white' }} 
            onClick={() => {
              props.handleClose();        
              props.handleShowSignUp();   
            }}
          >
            회원가입
          </li>
          <li>고객센터</li>
        </ul>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default Menu;
