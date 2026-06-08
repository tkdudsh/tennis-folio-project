import { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Nav.css';

function SignUp({ show, handleClose }) {
  const navigate = useNavigate();

  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [view, setView] = useState(true);

  const [formData, setFormData] = useState({
    userId: '',
    userName: '',
    nickname: '',
    password: '',
    confirmPassword: '',
    email: ''
  })
  
  const resetForm = () => {
    setView(true); 
    setChecked1(false);
    setChecked2(false);
    setFormData({
      userId: '', 
      userName: '', 
      nickname: '',
      password: '', 
      confirmPassword: '', 
      email: ''
    });
  };

  const handleCloseWithReset = () => {
    resetForm(); 
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNextOrSubmit = async (e) => {
    e.preventDefault();
    if (view === true) {
      if (checked1 && checked2) {
        setView(false);
      } else {
        alert("모든 항목에 동의 후 진행하세요");
      }
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }

      if (formData.password.length < 8) {
        alert("비밀번호는 8자리 이상이어야 합니다.");
        return;
      }

      try {
        const response = await axios.post('http://localhost:4000/signup', {
          userId: formData.userId,
          password: formData.password,
          name: formData.userName,
          email: formData.email
        });
        
        if (response.status === 200 || response.status === 201) {
          alert("회원가입이 완료되었습니다!");
          handleClose();
          navigate('/');
        }
      } catch (error) {
        console.error(error);
        alert(error.response?.data?.message || "회원가입 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <Modal show={show} onHide={handleCloseWithReset} centered size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>회원가입</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleNextOrSubmit}>
        <Modal.Body>
          <div className="signup-body">
            {view === true
              ? <Step1 checked1={checked1} setChecked1={setChecked1} checked2={checked2} setChecked2={setChecked2} />
              : <Step2 formData={formData} handleChange={handleChange} />
            }
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseWithReset}>취소</Button>
          <Button type="submit" className="nextBtn">
            {view === true ? "다음" : "가입하기"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

function Step1(props) {
  return (
    <>
      <div className="stepbox">
        <span>Step 1.</span>
        <p>아래 약관에 동의해주세요.</p>
      </div>
      <div className="agreebox">
        <Form.Group>
          <div className="tit">
            <p>개인정보 처리 방침<span>*</span></p>
            <p className="more">약관전체보기</p>
          </div>
          <button
            type="button"
            onClick={() => props.setChecked1(!props.checked1)}
            className={props.checked1 ? "checked" : ""}
          >동의합니다.</button>
          <div className="tit">
            <p>이용약관<span>*</span></p>
            <p className="more">약관전체보기</p>
          </div>
          <button
            type="button"
            onClick={() => props.setChecked2(!props.checked2)}
            className={props.checked2 ? "checked" : ""}
          >동의합니다.</button>
        </Form.Group>
      </div>
    </>
  );
}

function Step2({ formData, handleChange }) {
  return (
    <>
      <div className="stepbox">
        <span>Step 2.</span>
        <p>회원정보를 입력해 주세요.</p>
      </div>
      <div className="signUp">
        <Form.Group>
          <Form.Label>아이디<span>*</span></Form.Label>
          <Form.Control required type="text" name="userId" value={formData.userId} onChange={handleChange} autoComplete="username" />
        </Form.Group>
        <Form.Group>
          <Form.Label>이름<span>*</span></Form.Label>
          <Form.Control required type="text" name="userName" value={formData.userName} onChange={handleChange} autoComplete="name" />
        </Form.Group>
        <Form.Group>
          <Form.Label>닉네임<span>*</span></Form.Label>
          <Form.Control required type="text" name="nickname" value={formData.nickname} onChange={handleChange} autoComplete="nickname" />
        </Form.Group>
        <Form.Group className="pw">
          <Form.Label>비밀번호<span>*</span></Form.Label>
          <Form.Control required type="password" name="password" value={formData.password} onChange={handleChange} autoComplete="new-password" />
          <p className="rule">영어, 숫자, 특수문자를 포함한 8자리 이상</p>
        </Form.Group>
        <Form.Group>
          <Form.Label>비밀번호 확인<span>*</span></Form.Label>
          <Form.Control required type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} autoComplete="new-password" />
        </Form.Group>
        <Form.Group>
          <Form.Label>이메일<span>*</span></Form.Label>
          <Form.Control required type="email" name="email" value={formData.email} onChange={handleChange} autoComplete="email" />
        </Form.Group>
      </div>
    </>
  );
}

export default SignUp;