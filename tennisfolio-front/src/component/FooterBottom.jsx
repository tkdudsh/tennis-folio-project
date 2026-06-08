export function FooterBottom() {
  return (
    <div className="container-fluid footerBottom">
      <div className="containerWrap" style={{ borderTop: "1px solid #E8E8E8" }}>
        <div className="row" style={{ padding: "30px 10px 35px 10px" }}>
          <div className="col-xl-4 pr-md-5 pb-3">
            <p>(주)마일리</p>
            <p>대표 : 임보영 ｜ 사업자등록번호:269-88-02172</p>
            <p>주소 : 서울시 강남구 선릉로 82길 15, 4층</p>
          </div>
          <div className="col-xl-4 pr-md-5">
            <p>전화번호:02-3453-3737｜ 이메일:milely@tennisfolio.com</p>
            <p>통신판매업신고:제2022-서울강남-06040호</p>
            <p>개인정보 보호책임자:장하일 ｜ 호스팅서비스:카페24</p>
          </div>
          <div className="col-xl pt-2 menuList">
            <ul className="list-unstyled">
              <li><a href="#">1:1문의</a></li>
              <li><a href="#">이용약관</a></li>
              <li><a href="#" className="bold">개인정보처리방침</a></li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-8 pr-md-5 copyRight">
            <p>(주)마일리는 고객님의 안전거래를 위해 현금결제 금액에 대해 토스페이먼츠와 계약을 체결하여 안전거래를 보장하고 있습니다.</p>
            <p>(주)마일리는 통신판매중개자로서 중개하는 거래에 대하여 책임을 부담하지 않습니다.</p>
          </div>
          <div className="col-xl-4 pt-2 iconList">
            <ul className="social list-unstyled">
              <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
              <li><a href="#"><i className="fa-brands fa-youtube"></i></a></li>
              <li><a href="#"><i className="fa-brands fa-github"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterBottom;
