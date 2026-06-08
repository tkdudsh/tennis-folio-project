# 🎾 Tennis-Folio (테니스 전문 이커머스 플랫폼)

<div align="center">

**테니스 관련 상품을 전문으로 판매하는 팀 기반 이커머스 플랫폼**

<div>
  <a href="#-프로젝트-개요" style="display:inline-block;margin:4px 6px;padding:10px 16px;border-radius:999px;background:#1db954;color:#fff;text-decoration:none;font-weight:600;font-size:0.96rem;">프로젝트 개요</a>
  <a href="#-주요-기능" style="display:inline-block;margin:4px 6px;padding:10px 16px;border-radius:999px;background:#2196f3;color:#fff;text-decoration:none;font-weight:600;font-size:0.96rem;">주요 기능</a>
  <a href="#-기술-스택" style="display:inline-block;margin:4px 6px;padding:10px 16px;border-radius:999px;background:#ff9800;color:#fff;text-decoration:none;font-weight:600;font-size:0.96rem;">기술 스택</a>
  <a href="#-프로젝트-구조" style="display:inline-block;margin:4px 6px;padding:10px 16px;border-radius:999px;background:#9c27b0;color:#fff;text-decoration:none;font-weight:600;font-size:0.96rem;">구조</a>
  <a href="#-설치-및-실행" style="display:inline-block;margin:4px 6px;padding:10px 16px;border-radius:999px;background:#e91e63;color:#fff;text-decoration:none;font-weight:600;font-size:0.96rem;">설치 및 실행</a>
</div>

</div>

---

## 📋 프로젝트 개요

Tennis-Folio는 테니스 장비, 의류, 액세서리를 판매하는 종합 이커머스 플랫폼입니다.  
팀 프로젝트로 진행되었으며, **MVC 아키텍처**를 기반으로 클라이언트와 서버가 RESTful API로 통신합니다.

**프로젝트 기간:** 2024년 (팀 프로젝트)  
**팀 규모:** 다인 팀 프로젝트

---

## 🛠 주요 기능 및 구현 내용

### 1️⃣ **Hot Products 컴포넌트**

<sub>Frontend: React | Backend: Node.js/Express | Database: MySQL</sub>

#### 📌 구현 내용

- **SQL 테이블 통합 관리**: `best_product` 테이블의 `category_id = 8`을 활용하여 bestProduct와 hotProduct를 동일 테이블에서 관리
- **카테고리 기반 필터링**: Category ID를 통한 유연한 데이터 조회로 확장성 확보
- **Axios 기반 데이터 로드**: 동적 데이터 페칭 및 에러 처리

#### 🔧 기술 스택

| 계층         | 기술                                            |
| ------------ | ----------------------------------------------- |
| **Frontend** | React, Axios, useState/useEffect Hooks          |
| **Backend**  | Node.js, Express.js, Controller-Repository 패턴 |
| **Database** | MySQL (SQL 쿼리 최적화)                         |

#### 💻 코드 예시

**Frontend - Hot.jsx:**

```jsx
// Axios를 통한 데이터 페칭
const fetchHotProducts = async () => {
  try {
    setLoading(true);
    const response = await axios.get("/api/hot");
    const data = Array.isArray(response.data) ? response.data : [];
    setTennisHot(data);
  } catch (error) {
    setError("상품 데이터를 불러오지 못했습니다.");
  } finally {
    setLoading(false);
  }
};
```

**Backend - Repository/hot.js (SQL 통합 쿼리):**

```javascript
// Category ID를 통한 효율적인 데이터 조회
export const getHotProducts = async () => {
  const sql = `SELECT 
                    id, 
                    category_id AS categoryId, 
                    img_url AS imgUrl, 
                    shop,
                    product AS name,
                    price,
                    dc,
                    per,
                    no_dc AS nodc
                 FROM best_product 
                 WHERE category_id = 8`;
  const result = await pool.execute(sql, []);
  return Array.isArray(result[0]) ? result[0] : [];
};
```

---

### 2️⃣ **장바구니 로직 (Shopping Cart)**

<sub>Frontend: React | Backend: Node.js/Express | Database: MySQL</sub>

#### 📌 구현 기능

- ✅ **상품 추가**: 동일 상품의 중복 추가 시 수량 증가 로직
- ✅ **수량 관리**: 증감 버튼으로 실시간 수량 변경
- ✅ **상품 삭제**: 개별 및 일괄 삭제 기능
- ✅ **총액 계산**: 상품별 수량 × 가격으로 자동 계산
- ✅ **상태 동기화**: 프론트엔드와 백엔드 상태 실시간 동기화

#### 🏗 MVC 기반 아키텍처

```
Routes (API 엔드포인트)
    ↓
Controller (비즈니스 로직)
    ↓
Repository (데이터 접근)
    ↓
Database (MySQL)
```

#### 📊 API 엔드포인트

| 메서드   | 엔드포인트      | 기능                 |
| -------- | --------------- | -------------------- |
| **POST** | `/carts/add`    | 장바구니에 상품 추가 |
| **POST** | `/carts/update` | 수량 변경            |
| **POST** | `/carts/delete` | 상품 삭제            |
| **GET**  | `/carts/list`   | 장바구니 목록 조회   |

#### 💻 코드 예시

**Backend - Controller/carts.js (MVC 컨트롤러):**

```javascript
// 장바구니 추가: 중복 확인 후 수량 증가 또는 신규 추가
export const addToCart = async (req, res) => {
  const { pid, size, qty, userId } = req.body;

  const cartItem = await repository.getCartItem({ pid, size, userId });
  if (cartItem) {
    // 이미 있는 상품이면 수량만 증가
    await repository.updateCartQty({
      cid: cartItem.cid,
      qty,
    });
    return res.json({
      message: "장바구니 수량이 증가되었습니다.",
      type: "update",
    });
  }
  // 없으면 새로 추가
  const result = await repository.addCartItem({ pid, size, qty, userId });
  res.json({
    message: "장바구니에 추가되었습니다.",
    type: "insert",
    insertId: result.insertId,
  });
};

// 수량 변경
export const updateItems = async (req, res, next) => {
  const { cid, qty } = req.body;
  const result = await repository.getQtyUpdate(cid, qty);
  res.json({ message: "장바구니 아이템 수량이 변경되었습니다." });
};

// 장바구니 아이템 삭제
export const deleteItems = async (req, res) => {
  const { cids } = req.body;
  await repository.deleteCartItems(cids);
  res.json({ message: "장바구니 아이템이 삭제되었습니다." });
};
```

**Backend - Repository/carts.js (데이터베이스 쿼리):**

```javascript
// 수량 증감 (안전성: qty + ? > 0으로 음수 방지)
export const getQtyUpdate = async (cid, qty) => {
  const sql = `
    UPDATE cart
    SET qty = qty + ?
    WHERE cid = ?
      AND qty + ? > 0
  `;
  const [rows] = await pool.execute(sql, [qty, cid, qty]);
  return rows;
};

// 다중 삭제 (동적 쿼리 구성)
export const deleteCartItems = async (cids) => {
  const sql = `
    DELETE FROM cart
    WHERE cid IN (${cids.map(() => "?").join(",")})
  `;
  const [rows] = await pool.execute(sql, cids);
  return rows;
};
```

**Frontend - Cart.jsx (React 상태 관리):**

```jsx
// 수량 변경 핸들러
const handleUpdate = async (cid, qty) => {
  await updateItems({ cid, qty });
  setCartItems(
    cartItems.map((item) =>
      item.cid === cid ? { ...item, qty: item.qty + qty } : item,
    ),
  );
};

// 상품 삭제 핸들러
const handleDelete = async (cid) => {
  await deleteItems([cid]);
  setCartItems(cartItems.filter((item) => item.cid !== cid));
};
```

---

### 3️⃣ **카카오페이 결제 API 연동**

<sub>Frontend: React | Backend: Node.js/Express | External API: KakaoPay</sub>

#### 📌 결제 프로세스

```
1. Ready 단계 (결제 준비)
   ↓ (사용자가 결제 진행)
2. Approve 단계 (결제 승인)
   ↓ (PG Token 수신)
3. Redirect (성공 페이지로 이동)
```

#### 🔐 API 호출 흐름

| 단계        | 설명                          | 반환값                            |
| ----------- | ----------------------------- | --------------------------------- |
| **Ready**   | KakaoPay API에 결제 준비 요청 | `tid`, `next_redirect_mobile_url` |
| **Approve** | PG Token을 이용한 최종 승인   | 결제 정보, redirect               |
| **Status**  | 결제 상태 조회                | `ready`, `approved`               |

#### 💻 코드 예시

**Backend - Controller/kakao.js (결제 로직):**

```javascript
// 1️⃣ Ready: 결제 준비 단계
export const kakaoReady = async (req, res) => {
  const { orderId, userId, itemName, quantity, totalAmount } = req.body;

  try {
    const readyURL = "https://open-api.kakaopay.com/online/v1/payment/ready";
    const data = {
      cid: "TC0ONETIME",
      partner_order_id: orderId,
      partner_user_id: userId,
      item_name: itemName,
      quantity,
      total_amount: totalAmount,
      tax_free_amount: 0,
      approval_url: `https://[YOUR_DOMAIN]/kakao/approve?partner_order_id=${orderId}`,
      cancel_url: "https://[YOUR_DOMAIN]/checkout/cancel",
      fail_url: "https://[YOUR_DOMAIN]/checkout/fail",
    };

    const readyResponse = await axios.post(readyURL, data, {
      headers: kakaoHeaders,
    });
    const { tid, next_redirect_mobile_url } = readyResponse.data;

    // 추후 승인 단계에서 사용할 tid 저장
    approvalData[orderId] = {
      tid,
      orderId,
      userId,
      status: "ready",
    };

    res.json({
      tid,
      next_redirect_mobile_url,
    });
  } catch (error) {
    console.error(
      "카카오페이 준비 실패:",
      error.response?.data || error.message,
    );
    res.status(500).json({
      error: "카카오페이 준비 실패",
      detail: error.response?.data,
    });
  }
};

// 2️⃣ Approve: 결제 승인 단계
export const kakaoApprove = async (req, res) => {
  const { pg_token, partner_order_id } = req.query;
  const saved = approvalData[partner_order_id];

  if (!saved) {
    return res.status(400).json({ error: "유효하지 않은 주문입니다." });
  }

  try {
    const approveURL =
      "https://open-api.kakaopay.com/online/v1/payment/approve";
    const data = {
      cid: "TC0ONETIME",
      tid: saved.tid,
      partner_order_id: saved.orderId,
      partner_user_id: saved.userId,
      pg_token,
    };

    const approveResponse = await axios.post(approveURL, data, {
      headers: kakaoHeaders,
    });

    // 승인 데이터 저장 및 상태 업데이트
    approvalData[partner_order_id] = {
      ...saved,
      status: "approved",
      approvedAt: new Date().toISOString(),
      approveData: approveResponse.data,
    };

    // 결제 성공 페이지로 리다이렉트
    res.redirect("http://[YOUR_DOMAIN]/checkout/success");
  } catch (error) {
    console.error(
      "카카오페이 승인 실패:",
      error.response?.data || error.message,
    );
    res.status(500).json({
      error: "카카오페이 승인 실패",
      detail: error.response?.data,
    });
  }
};

// 3️⃣ Status: 결제 상태 조회
export const kakaoStatus = (req, res) => {
  const { orderId } = req.params;
  const saved = approvalData[orderId];

  if (!saved) {
    return res.json({ status: "none" });
  }

  res.json({ status: saved.status });
};
```

**Backend - Routes/kakao.js:**

```javascript
import express from "express";
import * as controller from "../controller/kakao.js";

const router = express.Router();

router.post("/ready", controller.kakaoReady); // 결제 준비
router.get("/approve", controller.kakaoApprove); // 결제 승인
router.get("/status/:orderId", controller.kakaoStatus); // 상태 조회

export default router;
```

#### 🔑 주요 구현 특징

- **외부 URL 터널링**: ngrok을 통해 로컬 서버를 외부에 노출
- **TID 저장소**: 승인 단계에서 필요한 tid를 메모리 객체에 저장
- **에러 처리**: KakaoPay API 실패 시 상세 에러 메시지 반환
- **보안**: SECRET_KEY를 환경 변수로 관리

---

## 🛠 기술 스택

### Frontend

- **React.js** - UI 컴포넌트 라이브러리
- **React Router** - 클라이언트 라우팅
- **Axios** - HTTP 클라이언트
- **Bootstrap** - CSS 프레임워크
- **Zustand** - 상태 관리 (인증 정보)

### Backend

- **Node.js** - 런타임 환경
- **Express.js** - 웹 프레임워크
- **MySQL** - 데이터베이스
- **mysql2/promise** - MySQL 드라이버
- **dotenv** - 환경 변수 관리

### DevOps

- **ngrok** - 로컬 서버 외부 노출 (카카오페이 테스트)
- **Vite** - 프론트엔드 번들러

---

## 📁 프로젝트 구조

```
tennis-folio-project/
│
├── tennisfolio-front/          # 프론트엔드 (React)
│   ├── src/
│   │   ├── component/
│   │   │   ├── Hot.jsx         # 🔴 Hot Products 컴포넌트
│   │   │   ├── Cart.jsx        # 🔴 장바구니 컴포넌트
│   │   │   ├── Checkout.jsx    # 결제 페이지
│   │   │   └── PaymentSuccess.jsx
│   │   ├── util/
│   │   │   └── cart.js         # 🔴 장바구니 유틸리티 함수
│   │   └── store/
│   │       └── useAuthStore.js # Zustand 상태 관리
│   └── package.json
│
├── tennisfolio-server/         # 백엔드 (Node.js/Express)
│   ├── controller/
│   │   ├── hot.js              # 🔴 Hot Products 컨트롤러
│   │   ├── carts.js            # 🔴 장바구니 컨트롤러
│   │   └── kakao.js            # 🔴 카카오페이 컨트롤러
│   ├── repository/
│   │   ├── hot.js              # 🔴 Hot Products 데이터 접근
│   │   └── carts.js            # 🔴 장바구니 데이터 접근
│   ├── routes/
│   │   ├── hot.js
│   │   ├── carts.js
│   │   └── kakao.js            # 🔴 카카오페이 라우트
│   ├── DB/
│   │   └── connection.js       # MySQL 커넥션
│   ├── app.js                  # Express 설정
│   └── package.json
│
└── README.md
```

🔴 = 주요 구현 담당 파일

---

## 💡 핵심 기술 포인트

### 1. **SQL 최적화 & 테이블 설계**

- Category ID를 활용한 효율적인 데이터 분류
- JOIN 쿼리 대신 단일 테이블에서 필터링으로 쿼리 성능 최적화
- VIEW를 활용한 복잡한 조인 쿼리 단순화

### 2. **MVC 패턴 구현**

- **Controller**: 요청 처리 및 응답 반환
- **Repository**: 데이터베이스 쿼리 로직 분리
- **Routes**: API 엔드포인트 정의
- 계층 분리로 코드 유지보수성 및 테스트 용이성 향상

### 3. **비동기 처리 (async/await)**

- 데이터베이스 쿼리의 논블로킹 처리
- Axios를 통한 클라이언트 사이드 비동기 데이터 로드
- 결제 API 호출 시 정확한 타이밍 제어

### 4. **보안**

- 환경 변수를 통한 민감한 정보 관리 (.env)
- SQL 파라미터화를 통한 SQL Injection 방지
- 결제 tid 저장소를 통한 트랜잭션 무결성

### 5. **상태 관리**

- React Hooks (useState, useEffect)로 컴포넌트 상태 관리
- 서버 상태와 클라이언트 상태 동기화
- Zustand를 통한 전역 상태 관리 (인증)

---

## 🚀 설치 및 실행

### 사전 요구사항

- Node.js (v14 이상)
- MySQL (v5.7 이상)
- npm 또는 yarn

### 데이터베이스 설정

```bash
# MySQL에 데이터베이스 생성
mysql -u root -p < tennisfolio_dump.sql
```

### 백엔드 실행

```bash
cd tennisfolio-server

# 의존성 설치
npm install

# .env 파일 설정
# .env 파일에 다음 내용 추가:
# Kakao_Secret_KEY=your_kakao_secret_key
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=your_password
# DB_NAME=tennisfolio

# 서버 시작
npm start
```

### 프론트엔드 실행

```bash
cd tennisfolio-front

# 의존성 설치
npm install

# 개발 서버 시작
npm run dev
```

### 카카오페이 테스트 (ngrok)

```bash
# ngrok 다운로드 및 로컬 서버 노출
ngrok http 5000

# 출력된 URL을 카카오페이 승인 URL에 설정
```

---

## 📊 성과 및 배운 점

### ✅ 성공적으로 구현된 기능

- ✅ Hot Products 동적 데이터 로딩 및 렌더링
- ✅ 장바구니 CRUD 작업 (Create, Read, Update, Delete)
- ✅ 카카오페이 Ready → Approve → Redirect 전체 결제 흐름
- ✅ MVC 아키텍처를 통한 체계적인 코드 구조

### 🎓 핵심 학습 포인트

1. **REST API 설계**: 명확한 엔드포인트와 HTTP 메서드 사용
2. **데이터베이스 쿼리 최적화**: 카테고리 기반 필터링으로 성능 향상
3. **외부 API 연동**: KakaoPay API를 통한 실제 결제 프로세스 구현
4. **팀 협업**: 백엔드-프론트엔드 간 명확한 API 문서화 및 의사소통

---

## 📝 라이센스

이 프로젝트는 학습 목적의 팀 프로젝트입니다.

---

**작성일:** 2024년  
**개발자:** Tennis-Folio 팀  
**역할:** Hot Products 컴포넌트 개발 | 장바구니 로직 구현 | 카카오페이 API 연동
