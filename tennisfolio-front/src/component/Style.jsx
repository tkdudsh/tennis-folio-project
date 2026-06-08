import { useState } from 'react';
import data from '../data/data.js';
import { useEffect } from 'react';
import axios from 'axios';

function Style() {
  const space = { whiteSpace: "pre-line" };
  const [styleData, setStyleData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/style')
      .then(res => setStyleData(res.data))
      .catch(err => console.error("데이터 가져오기 에러:", err));
  }, []);

  const handleLike = (id) => {
    setStyleData(styleData.map(item => 
      item.id === id ? { ...item, likeNum: item.likeNum + 1 } : item
    ));
  };

  return (
    <>
      <div className="container stylebox" style={{ margin: "150px auto 150px", maxWidth: "1600px", whiteSpace: "pre-line" }}>
        <div className="row">
          <div className="col-xxl-4">
            <div className="ms-5 mb-5 ms-xxl-0 mb-xxl-0">
              <h3 style={space} className="styleTitle">
                {`테니스 칠 때 뭐 입지? \n 관심있는 스타일을 찾아보세요`}
              </h3>
              {/* 남의 상토(Zustand) 안 쓰고, 원래 진진님이 짰던 깔끔한 기획 문구로 유지합니다 */}
              <p style={space} className="styleSub">
                {`로그인 하시면 취향에 맞는 스타일을 \n 확인하실 수 있어요.`}
              </p>
            </div>
            <div className="plusBtn d-none d-xxl-block" style={{ margin: "180px 0" }}>
              <img src="img/btn_plus.png" alt="plus" />
            </div>
            <div className="logoBg d-none d-xxl-block" style={{ opacity: 0.1, position: "relative", left: "-80px", width: "115%" }}>
              <img src="img/logo.svg" alt="logobg" />
            </div>
          </div>
          <div className="col-xxl-8 stylePhotos">
            <div className="row">
              {styleData.map((item, i) => (
                <Stylebox
                  key={i}
                  reply={item.reply}
                  view={item.view}
                  imgUrl={item.img_url}
                  id={item.user_id}
                  likeNum={item.like_num}
                  content={item.content}
                  tag={item.tag}
                  hash={item.hash}
                  onLike={handleLike} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Stylebox(props) {
  const tagStyle = { listStyle: "none", display: "flex", flexWrap: "wrap", padding: "0" };
  return (
    <div className="col-xxl-4 col-sm-6 px-3" style={{ transition: "0.5s" }}>
      <div className="imgbox">
        <div className="sharebox text-white">
          <div><i className="fa-regular fa-comment-dots"></i><span>{props.reply}</span></div>
          <div><i className="fa-regular fa-eye"></i><span>{props.view}</span></div>
        </div>
        <img src={props.imgUrl} alt="img" />
      </div>
      <div className="profilebox">
        <div className="profileTop">
          <div className="idbox">
            {/* 프로필 이미지 찌그러짐 방지만 깔끔하게 반영 */}
            <div className="profileImg" style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#eee", borderRadius: "50%", width: "40px", height: "40px", fontSize: "20px" }}>
              <i className="fa-solid fa-user" style={{ color: "#aaa" }}></i>
            </div>
            <div className="id">{props.id}</div>
          </div>
          <div className="like" onClick={() => props.onLike(props.id)} style={{ cursor: "pointer" }}>
            <i className="fa-regular fa-face-smile"></i>
            <span className="count">{props.likeNum}</span>
          </div>
        </div>
        <div className="profileMid"><p>{props.content}</p></div>
        <div className="profileBottom">
          <ul style={tagStyle} className="tagList">
            {props.tag?.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
        <div className="hashbox">
          <ul style={tagStyle} className="hashList">
            {props.hash?.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Style;