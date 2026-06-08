import { useEffect } from "react";
import Search from "./Search.jsx";
import MainSlide from "./MainSlide.jsx";
import Style from "./Style.jsx";
import Hot from "./Hot.jsx";
import Best from "./BestPick.jsx";
import CardList from "./CardList.jsx";
import { Container } from "react-bootstrap";

function StylePage({ isClicked, setIsClicked }) {
	useEffect(() => {
		setTimeout(() => {
			const el = document.getElementById("style");
			if (el) {
				el.scrollIntoView({ behavior: "smooth", block: "start" });
			}
		}, 300);
	}, []);

	return (
		<div>
			{isClicked ? (
				<Search isClicked={isClicked} setIsClicked={setIsClicked} />
			) : null}
			<MainSlide />
			<div id="style">
				<Style />
			</div>
			<div id="hotItems">
				<Hot />
			</div>
			<div className="banner1 img-fluid" style={{ marginBottom: "150px" }}>
				<a href="/">
					<img src="img/banner.jpg" alt="banner" />
				</a>
			</div>
			<div id="bestItem">
				<Best />
			</div>
			<Container
				className="banner2 d-flex justify-content-between"
				style={{ maxWidth: "1600px", marginBottom: "150px" }}
			>
				<div className="row row-cols-1 row-cols-xl-2">
					<div className="col img-fluid">
						<a href="/">
							<img src="img/banner2.png" alt="banner2" />
						</a>
					</div>
					<div className="col img-fluid">
						<a href="/">
							<img src="img/banner3.png" alt="banner3" />
						</a>
					</div>
				</div>
			</Container>
			<CardList />
		</div>
	);
}

export default StylePage;
