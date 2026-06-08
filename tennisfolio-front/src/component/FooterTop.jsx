function FooterTop() {
  return (
    <div className="container-fluid" style={{ borderTop: "1px solid #E8E8E8" }}>
      <div className="containerWrap">
        <div className="row footerTop">
          <div className="col-xxl-4 col-lg-12 footerTopL">
            <span>고객센터</span>
            <h1 className="number">02-3453-3737</h1>
            <p>평일 10:00 ~ 19:00 (주말 &amp; 공휴일 휴무)</p>
            <p>13:00 ~ 14:00 (점심시간)</p>
          </div>
          <div className="col-xl-8 footerTopR">
            <div className="row">
              <div className="col-xl-6 col-md-12 footerBox info">
                <div className="text">
                  <h3 className="title">테니스폴리오 소개 <i className="fa-solid fa-chevron-right"></i></h3>
                  <p>테니스로 하나되는 이곳, 테니스폴리오</p>
                </div>
              </div>
              <div className="col-xl-6 col-md-12 footerBox qna">
                <div className="text">
                  <h3 className="title">입점문의<i className="fa-solid fa-chevron-right"></i></h3>
                  <p>입점을 희망하신다면 이곳에 문의해주세요.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterTop;
