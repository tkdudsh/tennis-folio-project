import { Navbar, Nav, Container } from "react-bootstrap";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore.js";
import CardListPage from "./CardListPage.jsx"; //cardList를 위해 새로운 페이지 추가 2026-05-27
import BestPage from "./BestPage.jsx";
import HotPage from "./HotPage.jsx";
import StylePage from "./StylePage.jsx";

import Login from "./Login.jsx";
import SignUp from "./SignUp.jsx";
import Search from "./Search.jsx";
import Menu from "./Menu.jsx";
import MainSlide from "./MainSlide.jsx";
import Style from "./Style.jsx";
import Hot from "./Hot.jsx";
import Best from "./BestPick.jsx";
import CardList from "./CardList.jsx";
import Detail from "./Detail.jsx";
import Cart from "./Cart.jsx";
import Checkout from "./Checkout.jsx";
import PaymentSuccess from "./PaymentSuccess.jsx";

import "../css/Nav.css";

function NavGroup() {
	let navigate = useNavigate();
	const [isClicked, setIsClicked] = useState(false);
	const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);
	const [showSignUp, setShowSignUp] = useState(false);
	const handleCloseSignUp = () => setShowSignUp(false);
	const [loginShow, setLoginShow] = useState(false); // 로그인 모달
	const handleLoginClose = () => setLoginShow(false);

	const isLogin = useAuthStore((s) => s.isLogin);
	const userId = useAuthStore((s) => s.userId);
	const logout = useAuthStore((s) => s.logout);

	const row = {
		display: "flex",
		flexFlow: "row wrap",
		alignItems: "center",
		marginLeft: "50px",
	};
	const bold = { fontSize: "20px", fontWeight: "700" };

	const boldDisabled = {
		...bold,
		cursor: "default",
		pointerEvents: "none"
	};

	const handleLogout = () => {
		logout();
		alert("로그아웃 되었습니다.");
		navigate("/");
	};

	return (
		<>
			<Navbar bg="black" variant="dark" className="loginBar">
				<Container style={{ maxWidth: "1550px" }}>
					<Navbar.Brand href="#home"></Navbar.Brand>
					<Nav className="ml-auto login">
						{isLogin ? (
							<>
								<span
									className="loginLink"
									style={{ color: "#fff", margin: "10px", fontWeight: "bold" }}
								>
									{userId}님 환영합니다
								</span>
								<Nav.Link href="#" className="loginLink" onClick={handleLogout}>
									로그아웃
								</Nav.Link>
							</>
						) : (
							<>
								<Login />
								<Nav.Link
									className="loginLink"
									onClick={() => setShowSignUp(true)}
								>
									회원가입
								</Nav.Link>
							</>
						)}
						<Nav.Link href="#" className="loginLink">
							고객센터
						</Nav.Link>
					</Nav>
				</Container>
			</Navbar>

			<Navbar expand="xxl" style={{ position: "sticky", top: 0, zIndex: 1000, backgroundColor: "#fff" }}>
				<Container className="categoryBar">
					<Navbar.Brand
						style={{ cursor: "pointer" }}
						onClick={() => { navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
					>
						<img src="/img/logo.svg" width="150" height="65" alt="logo" />
					</Navbar.Brand>
					<Navbar.Collapse className="category">
						<Nav className="me-auto">
							<div style={row} className="community">
								<Nav.Link style={boldDisabled}>
									커뮤니티
								</Nav.Link>
								<Nav.Link onClick={() => navigate("/sns")}>SNS</Nav.Link>
								<Nav.Link onClick={() => navigate("/cardLists")}>
									기획전
								</Nav.Link>
							</div>
							<div style={row} className="store">
								<Nav.Link style={boldDisabled}>
									스토어
								</Nav.Link>
								<Nav.Link onClick={() => navigate("/hot")}>HOT</Nav.Link>
								<Nav.Link onClick={() => navigate("/category")}>카테고리</Nav.Link>
							</div>
						</Nav>
					</Navbar.Collapse>
					<Navbar className="iconbox">
						<Nav.Link onClick={() => setIsClicked(!isClicked)}>
							<i className="fa-solid fa-magnifying-glass"></i>
						</Nav.Link>
						{isLogin && (
							<Nav.Link onClick={() => navigate("/cart")}>
								<i className="fa-solid fa-cart-shopping"></i>
							</Nav.Link>
						)}
						<Nav.Link onClick={handleShow}>
							<i className="fa-solid fa-bars"></i>
						</Nav.Link>
						<Menu
							show={show}
							handleClose={handleClose}
							handleShowSignUp={() => setShowSignUp(true)}
						/>
					</Navbar>
				</Container>
			</Navbar>

			<Routes>
				<Route
					path="/"
					element={
						<div>
							{isClicked ? (
								<Search isClicked={isClicked} setIsClicked={setIsClicked} />
							) : null}
							<MainSlide />
							<Style />
							<Hot />
							<div
								className="banner1 img-fluid"
								style={{ marginBottom: "150px" }}
							>
								<a href="/">
									<img src="img/banner.jpg" alt="banner" />
								</a>
							</div>
							<Best />
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
					}
				/>
				<Route path="/sns"      element={<StylePage isClicked={isClicked} setIsClicked={setIsClicked} />} />
				<Route path="/hot"      element={<HotPage   isClicked={isClicked} setIsClicked={setIsClicked} />} />
				<Route path="/category" element={<BestPage  isClicked={isClicked} setIsClicked={setIsClicked} />} />

				<Route path="/detail/:category/:id" element={<Detail />} />
				<Route path="/detail/:category/:subCategory/:id" element={<Detail />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/checkout" element={<Checkout />} />
				<Route path="/checkout/success" element={<PaymentSuccess />} />

				{/* cardLists 부분 수정했습니다. 2026-05-27 */}
				<Route
					path="/cardLists"
					element={
						<CardListPage isClicked={isClicked} setIsClicked={setIsClicked} />
					}
				/>
			</Routes>
			<SignUp show={showSignUp} handleClose={handleCloseSignUp} />
		</>
	);
}

export default NavGroup;
