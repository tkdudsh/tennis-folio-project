import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// import cardData from "../data/cardData.js";

function CardList() {
	// const [tennisCard] = useState(cardData);
	const [tennisCard, setTennisCard] = useState([]);
	const location = useLocation();

	// 스크롤
	// useEffect(() => {
	// 	if (location.pathname === "/cardLists") {
	// 		const el = document.getElementById("cardLists");
	// 		if (el) {
	// 			el.scrollIntoView({ behavior: "smooth", block: "start" });
	// 		}
	// 	}
	// }, [location.pathname]);

	// 스크롤
	useEffect(() => {
		if (location.pathname === "/cardLists") {
			setTimeout(() => {
				const el = document.getElementById("cardLists");
				if (el) {
					el.scrollIntoView({ behavior: "smooth", block: "start" });
				}
			}, 500);
		}
	}, [location.pathname]);
	// 데이터 로딩
	useEffect(() => {
		fetch("http://localhost:4000/cardLists")
			.then((res) => res.json())
			.then((data) => setTennisCard(data))
			.catch((err) => console.error("카드 데이터 불러오기 실패:", err));
	}, []);

	return (
		<div
			id="cardLists"
			style={{ margin: "150px auto 150px", maxWidth: "1600px" }}
		>
			<div className="categoryMore">
				<h3>취향저격! 요즘 테니스</h3>
				<p className="more">
					<a href="#">더 많은 컨텐츠 확인하기 +</a>
				</p>
			</div>
			<div className="cardWrap">
				<Swiper
					key={tennisCard.length}
					modules={[Autoplay, Navigation]}
					spaceBetween={30}
					speed={500}
					autoplay={{ delay: 4000, disableOnInteraction: false }}
					breakpoints={{
						1200: { slidesPerView: 4 },
						500: { slidesPerView: 2 },
						300: { slidesPerView: 1 },
					}}
					loop={true}
				>
					{tennisCard.map((item, i) => (
						<SwiperSlide key={i}>
							<Cardbox
								imgUrl={item.img_url}
								title={item.title}
								tag={item.tag}
								hash={item.hash}
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
}

function Cardbox(props) {
	const tagStyle = {
		listStyle: "none",
		display: "flex",
		flexWrap: "wrap",
		padding: "0",
	};
	return (
		<div className="cardHover">
			<div className="imgbox">
				<img src={props.imgUrl} alt="card" />
			</div>
			<div className="textbox">
				<p>{props.title}</p>
				<div className="tagbox">
					<ul style={tagStyle} className="tagList">
						{props.tag.map((item, i) => (
							<li key={i}>{item}</li>
						))}
					</ul>
				</div>
				<div className="hashbox">
					<ul style={tagStyle} className="hashList">
						{props.hash.map((item, i) => (
							<li key={i}>{item}</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}

export default CardList;
