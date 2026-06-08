import { useState, useRef } from "react";
import { Nav, Form, Modal, Button } from "react-bootstrap";
import { axiosPost } from "../util/dataAxios.js";
import { useAuthStore } from "../../store/useAuthStore.js";
import { useNavigate } from "react-router-dom";

import "../css/Nav.css";

function Login() {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const navigate = useNavigate();

	// [정예원] Ref로 빈칸 제출 확인
	const idRef = useRef(null);
	const pwdRef = useRef(null);

	// [정예원] useAuthStore 상태관리
	const [formData, setFormData] = useState({ id: "", pwd: "" });
	const [errors, setErrors] = useState({ id: "", pwd: "" });
	const login = useAuthStore((s) => s.login);

	const handleFormChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
		setErrors({ id: "", pwd: "" }); // [정예원] 입력 시 에러 초기화
	};

	const handleLoginSubmit = async (e) => {
		e.preventDefault(); // [정예원] 페이지 새로고침 방지

		if (!formData.id) {
			setErrors((prev) => ({ ...prev, id: "아이디를 입력해주세요" }));
			idRef.current.focus();
			return;
		}
		if (!formData.pwd) {
			setErrors((prev) => ({ ...prev, pwd: "비밀번호를 입력해주세요" }));
			pwdRef.current.focus();
			return;
		}

		const result = await axiosPost("/login", formData);
		console.log("서버 응답:", result);

		if (result.isLogin) {
			// [정예원] Zustand store에 로그인 정보 저장
			login({
				userId: formData.id,
				role: result.role,
				accessToken: result.token,
				isLogin: result.isLogin,
			});
			navigate("/"); // 로그인 성공 후 홈으로 이동
			handleClose();
			setFormData({ id: "", pwd: "" });
		} else {
			alert("로그인에 실패하셨습니다.");
		}
	};

	return (
		<>
			<Nav.Link onClick={handleShow} href="#" className="loginLink">
				로그인
			</Nav.Link>
			<Modal show={show} onHide={handleClose} centered>
				<Modal.Header>
					<img src="/img/logo.svg" alt="logo" />
					<button onClick={handleClose} type="button">
						<i className="fa-solid fa-x"></i>
					</button>
				</Modal.Header>
				<Modal.Body>
					{/* [정예원] 폼 전송 이벤트 연결 */}
					<Form onSubmit={handleLoginSubmit}>
						<Form.Group>
							<Form.Label>아이디</Form.Label>
							<Form.Control
								autoFocus
								name="id"
								value={formData.id}
								ref={idRef}
								onChange={handleFormChange}
							/>
							<span style={{ color: "red", fontSize: "0.8rem" }}>
								{errors.id}
							</span>
						</Form.Group>
						<Form.Group className="mt-3">
							<Form.Label>비밀번호</Form.Label>

							{/* [정예원] name, value, ref, onChange 연결 */}
							<Form.Control
								type="password"
								name="pwd"
								value={formData.pwd}
								ref={pwdRef}
								onChange={handleFormChange}
							/>
							<span style={{ color: "red", fontSize: "0.8rem" }}>
								{errors.pwd}
							</span>
						</Form.Group>

						{/* [정예원] 버튼 타입 -> submit */}
						<Button type="submit" className="loginBtn mt-4">
							로그인
						</Button>
					</Form>

					<div className="sign mt-3">
						<button type="button">회원가입</button>
						<button type="button">아이디·비밀번호 찾기</button>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
}

export default Login;
