SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO';
SET TIME_ZONE = '+09:00';

-- ------------------------------------------------------------
--  DATABASE
-- ------------------------------------------------------------
CREATE DATABASE IF NOT EXISTS `tennisfolio`
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE `tennisfolio`;


-- ============================================================
--  1. member   ←  shoppy.member
--     쇼핑몰 회원 테이블 (주문/장바구니/QnA의 부모)
-- ============================================================
DROP TABLE IF EXISTS `member`;
CREATE TABLE `member` (
  `id`     VARCHAR(50)  NOT NULL,
  `pwd`    VARCHAR(100) NOT NULL,
  `name`   VARCHAR(20)  NOT NULL,
  `phone`  CHAR(13)     DEFAULT NULL,
  `email`  VARCHAR(50)  NOT NULL,
  `mdate`  DATE         DEFAULT NULL,
  `role`   VARCHAR(20)  DEFAULT 'USER',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `member` VALUES
('hong',        '$2a$10$YOnyJJa.h/1gdMnP/Uvc3ecC76EICQJEZnFZjlCUL.wEANvoajMuy', '홍길동', '011-1234-7891', 'hong@naver.com',      '2025-10-20', 'USER'),
('hong1234',    '$2a$10$qBm8ABbvSJ3fv9EyGVvCRuo.HvhpkEI10N2zIfVXCP9O9cRfv8CUi', '홍길순', '010-1234-4567', 'hong1234@naver.com',  '2025-10-22', 'USER'),
('hong2',       '$2a$10$2EVvrYU5w8P/Wh/4nl96WemWo8g9QcJ1JkURTXeFr4rqqNTmk.hu2', '홍이',   '011-1234-1234', 'hong2@naver.com',     '2025-11-25', 'USER'),
('hong99',      '$2a$10$9DFrvwKOkIcC9KAzUiDddeFdJ4EkiwifpH6xz6ZWVl8b3UcwrM.Xi', '쇼피2',  '010-1234-9999', 'hong99@naver.com',    '2025-11-05', 'USER'),
('shoppyadmin', '$2a$10$MK8Qeh6mFJT7gG7PwB7mmu5GofOtSjvC3BwqDA38XsTI8RZe9nBeu', '관리자', '010-1234-2345', 'shoppyadmin@gmail.com','2025-11-13', 'ADMIN'),
('test',        '$2a$10$J68zWd3oRGhLQr4gtCqiU.gqNg1lsZ5jYjhFcFErnekv3E5lhWCN2', '테스트', '011-1234-7892', 'test@daum.net',        '2025-10-20', 'USER'),
('test2',       '$2a$10$Jnfl673KjEpQ/fT4TrYj7uwq2U9kk3tDrgTAqK.ZSeogHHNhU7pRG', '테스트2','010-1234-2345', 'test2@naver.com',     '2025-11-13', 'USER'),
('test3',       '$2a$10$aacoHANW7iRxgozw20UNZuhJrOcBGT6V1hlY.tYgWH9aAj8KsvDRi', '테스트3','010-1224-1234', 'test3@naver.com',     '2025-11-17', 'USER'),
('test4',       '$2a$10$7X4hugmy7cjp5Q1xITqVBuhLM0X4Smf4gyKHiD8HbUNTzUmWJaFC6', 'test4',  '010-1111-2345', 'test4@naver.com',     '2025-11-18', 'USER');


-- ============================================================
--  2. best_category   ←  tennis_mall.bestdata.js
--     best_product.category_id 의 부모 테이블
-- ============================================================
DROP TABLE IF EXISTS `best_category`;
CREATE TABLE `best_category` (
  `category_id` INT          NOT NULL AUTO_INCREMENT,
  `img_url`     VARCHAR(255) NOT NULL,
  `name`        VARCHAR(100) NOT NULL,
  `count`       VARCHAR(10)  NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `best_category` (`category_id`,`img_url`,`name`,`count`) VALUES
(1, 'img/category1.svg', '가방',       '(10)'),
(2, 'img/category2.svg', '테니스용품', '(6)'),
(3, 'img/category3.svg', '라켓',       '(3)'),
(4, 'img/category4.svg', '여성의류',   '(10)'),
(5, 'img/category5.svg', '남성의류',   '(10)'),
(6, 'img/category6.svg', '패션잡화',   '(10)'),
(7, 'img/category7.svg', '신발',       '(2)');


-- ============================================================
--  3. best_product   ←  best_bag + best_tennis + best_racquet +
--                        best_woman + best_man + best_acc + best_shoes
--     7개 테이블을 category_id FK 컬럼으로 분류하는 단일 테이블
--     원본 id 값 그대로 유지 (8~58)
-- ============================================================
DROP TABLE IF EXISTS `best_product`;
CREATE TABLE `best_product` (
  `id`          INT          NOT NULL,
  `category_id` INT          NOT NULL COMMENT 'best_category.category_id FK',
  `img_url`     VARCHAR(255) NOT NULL,
  `shop`        VARCHAR(100) NOT NULL,
  `product`     VARCHAR(255) NOT NULL,
  `price`       VARCHAR(20)  NOT NULL,
  `dc`          VARCHAR(20)  NOT NULL DEFAULT '',
  `per`         VARCHAR(10)  NOT NULL DEFAULT '',
  `no_dc`       VARCHAR(20)  NOT NULL DEFAULT '',
  `sub_img`     JSON         NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_best_product_category`
    FOREIGN KEY (`category_id`) REFERENCES `best_category` (`category_id`)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- category_id=1 : 가방 (원 best_bag)
INSERT INTO `best_product` VALUES
(0, 8, 'img/hot/hot1.jpg', '컨셉트컬리지', '남여공용 테니스볼 애쉬그레이 맨투맨', '91,000', '', '', '', '["img/detail/hot_detail12.jpg"]'),
(1, 8, 'img/hot/hot2.jpg', '윌슨', '윌슨 핑크 테니스 볼', '18,900', '6,100↓', '', '25,000', '["img/detail/hot_detail12.jpg"]'),
(2, 8, 'img/hot/hot3.jpg', '논포멀하우스', 'Stretch cotton polo shirt (Pink)', '76,000', '', '', '', '["img/detail/hot_detail13.jpg"]'),
(3, 8, 'img/hot/hot4.jpg', '러브포티', '테니스 크루 캡 Skyblue', '39,000', '', '', '', '["img/detail/hot_detail14.jpg"]'),
(4, 8, 'img/hot/hot5.jpg', '르누쿠', '랩 반바지 Mustart', '239,000', '', '', '', '["img/detail/hot_detail15.jpg"]'),
(5, 8, 'img/hot/hot6.png', '데이브앤데이즈', '반짚업 맨투맨 Navy', '139,000', '', '', '', '["img/detail/hot_detail16.jpg"]'),
(6, 8, 'img/hot/hot7.jpg', 'FCMM', '테니스 클럽 클래식 맨투맨 Melange gray', '41,300', '17,700↓', '', '59,000', '["img/detail/hot_detail17.jpg"]'),
(7, 8, 'img/hot/hot8.jpg', '나이키', '손목밴드 스우시 2개입 Pink', '13,300', '', '5%', '14,000', '["img/detail/hot_detail18.jpg"]'),
(8,  1,'img/best/bag1.jpg',  '러브포티','퀄팅 라켓 백 Black',          '89,000',  '',        '', '',        '["img/detail/detail1.jpg"]'),
(9,  1,'img/best/bag2.jpg',  '러브포티','퀄팅 라켓 토트백 Black',      '159,000', '',        '', '',        '["img/detail/detail2.jpg"]'),
(10, 1,'img/best/bag3.jpg',  '러브포티','퀄팅 라켓 백팩 Navy',         '109,000', '',        '', '',        '["img/detail/detail3.jpg"]'),
(11, 1,'img/best/bag4.jpg',  '러브포티','라켓 에코백 White',           '59,000',  '',        '', '',        '["img/detail/detail4.jpg"]'),
(12, 1,'img/best/bag5.jpg',  '윌슨',   '윌슨 롤랑가로스 백팩',         '59,000',  '21,000↓', '', '80,000',  '["img/detail/detail5.jpg"]'),
(13, 1,'img/best/bag6.png',  '라라스마일','헬로 라라 멀티 보냉백 Yellow','119,000','21,000↓', '', '140,000', '["img/detail/detail6.jpg"]'),
(14, 1,'img/best/bag7.jpg',  '러브포티','퀄팅 라켓 토트백 Grey',       '159,000', '21,000↓', '', '180,000', '["img/detail/detail7.jpg"]'),
(15, 1,'img/best/bag8.jpg',  '러브포티','라켓 토트백 Ivory',           '139,000', '21,000↓', '', '160,000', '["img/detail/detail8.jpg"]'),
(16, 1,'img/best/bag9.jpg',  '러브포티','라켓 백 Navy',                '69,000',  '21,000↓', '', '90,000',  '["img/detail/detail9.jpg"]'),
(17, 1,'img/best/bag10.jpg', '러브포티','퀄팅 라켓 백팩 White',        '109,000', '21,000↓', '', '130,000', '["img/detail/detail10.jpg"]'),

-- category_id=2 : 테니스용품 (원 best_tennis)
(18, 2,'img/best/tennis1.jpg','리치즈', '220g 초경량 장우산 Deep green',               '75,000',  '',        '',    '',        '["img/detail/detail12.jpg"]'),
(19, 2,'img/best/tennis2.jpg','리치즈', '220g 초경량 장우산 Deep green',               '75,000',  '',        '',    '',        '["img/detail/detail13.jpg"]'),
(20, 2,'img/best/tennis3.jpg','업스트림','로고 댐프너',                                 '20,000',  '',        '',    '',        '["img/detail/detail15.jpg"]'),
(21, 2,'img/best/tennis4.jpg','윌슨',   '윌슨 핑크 테니스볼',                           '18,900',  '6,100↓',  '',    '25,000',  '["img/detail/hot_detail6.jpg"]'),
(22, 2,'img/best/tennis5.jpg','요넥스',  '폴리투어 에어 200M PTA 1.25mm Sky blue',       '112,000', '',        '20%', '140,000', '["img/detail/detail16.jpg"]'),
(23, 2,'img/best/tennis6.jpg','리치즈', '220g 초경량 장우산 Navy',                      '75,000',  '',        '',    '',        '["img/detail/detail14.jpg"]'),

-- category_id=3 : 라켓 (원 best_racquet)
(24, 3,'img/best/racquet1.jpg','요넥스','2022 요넥스 라켓 이존 필(102sq/250g/16x18)',  '234,000', '', '10%', '260,000', '["img/detail/detail17.jpg"]'),
(25, 3,'img/best/racquet2.jpg','헤드',  '2022 헤드 라켓 붐 팀(107sq/260g/16x19)',     '294,300', '', '10%', '327,000', '["img/detail/detail18.jpg"]'),
(26, 3,'img/best/racquet3.jpg','윌슨',  '윌슨 울트라 100L(100sq/277g/16x19)2017',    '243,000', '', '10%', '270,000', '["img/detail/hot_detail7.jpg"]'),

-- category_id=4 : 여성의류 (원 best_woman)
(27, 4,'img/best/woman1.jpg', '르노쿠',       '직조 라벨 반레깅스 Green blue',          '58,000',  '',        '', '',       '["img/detail/detail19.jpg"]'),
(28, 4,'img/best/woman2.jpg', 'FCMM',         '원포인트 아노락 Light green',            '69,300',  '29,700↓', '', '99,000', '["img/detail/detail20.jpg"]'),
(29, 4,'img/best/woman3.jpg', 'FCMM',         '원포인트 아노락 Light orange',           '69,300',  '29,700↓', '', '99,000', '["img/detail/detail21.jpg"]'),
(30, 4,'img/best/woman4.jpg', '르누쿠',        '세라 단가라 집업 니트 Navy',             '210,000', '29,700↓', '', '',       '["img/detail/detail22.jpg"]'),
(31, 4,'img/best/woman5.jpg', '컨셉트컬리지', '남여공용 올 블랙 풋볼 챔스 바시티 자켓','319,000', '29,700↓', '', '',       '["img/detail/detail23.jpg"]'),
(32, 4,'img/best/woman6.jpg', '르누쿠',        '아가일 니트 베스트 Burgundy',           '189,000', '29,700↓', '', '',       '["img/detail/detail24.jpg"]'),
(33, 4,'img/best/woman7.jpg', '러브포티',      '로고 티셔츠 Blue',                      '45,000',  '29,700↓', '', '',       '["img/detail/detail25.jpg"]'),
(34, 4,'img/best/woman8.jpg', '논포멀 하우스', '스너그 테니스 스커트 White',            '128,000', '29,700↓', '', '',       '["img/detail/detail26.jpg"]'),
(35, 4,'img/best/woman9.jpg', '러브포티',      '로고 스커트 Grey',                      '69,000',  '29,700↓', '', '',       '["img/detail/detail27.jpg"]'),
(36, 4,'img/best/woman10.jpg','러브포티',      '스포티 원피스',                         '94,000',  '29,700↓', '', '',       '["img/detail/detail28.jpg"]'),

-- category_id=5 : 남성의류 (원 best_man)
(37, 5,'img/best/man1.jpg',  'FCMM','테니스 코트 인 티셔츠 Black',               '27,300', '11,700↓', '', '39,000', '["img/detail/detail29.jpg"]'),
(38, 5,'img/best/man2.jpg',  'FCMM','테니스 코트 인 티셔츠 White01',             '27,300', '11,700↓', '', '39,000', '["img/detail/detail30.jpg"]'),
(39, 5,'img/best/man3.jpg',  'FCMM','테니스 코트 인 티셔츠 White02',             '27,300', '11,700↓', '', '39,000', '["img/detail/detail31.jpg"]'),
(40, 5,'img/best/man4.jpg',  'FCMM','테니스 클럽 클래식 기모 후디 Black',        '48,300', '20,700↓', '', '69,000', '["img/detail/detail32.jpg"]'),
(41, 5,'img/best/man5.jpg',  'FCMM','테니스 클럽 클래식 기모 후디 Blue gray',    '48,300', '20,700↓', '', '69,000', '["img/detail/detail33.jpg"]'),
(42, 5,'img/best/man6.jpg',  'FCMM','테니스 클럽 클래식 기모 후디 Oil green',    '48,300', '20,700↓', '', '69,000', '["img/detail/detail34.jpg"]'),
(43, 5,'img/best/man7.jpg',  'FCMM','테니스 클럽 클래식 기모 후디 Butter',       '48,300', '20,700↓', '', '69,000', '["img/detail/detail35.jpg"]'),
(44, 5,'img/best/man8.jpg',  'FCMM','테니스 클럽 클래식 기모 후디 Melange gray', '48,300', '20,700↓', '', '69,000', '["img/detail/detail36.jpg"]'),
(45, 5,'img/best/man9.jpg',  'FCMM','포시즌 시그니처 스트레치 쇼츠 Black',      '27,300', '11,700↓', '', '39,000', '["img/detail/detail37.jpg"]'),
(46, 5,'img/best/man10.jpg', 'FCMM','포시즌 시그니처 스트레치 쇼츠 Sky blue',   '27,300', '11,700↓', '', '39,000', '["img/detail/detail38.jpg"]'),

-- category_id=6 : 패션잡화 (원 best_acc)
(47, 6,'img/best/acc1.jpg',  'FCMM',       '테니스 그라운드 커버 볼캡 White',  '27,300', '11,700↓', '',   '39,000', '["img/detail/detail39.jpg"]'),
(48, 6,'img/best/acc2.jpg',  '러브포티',   '로고 테니스 캡 Brown',             '39,000', '11,700↓', '',   '',       '["img/detail/detail40.jpg"]'),
(49, 6,'img/best/acc3.jpg',  'FCMM',       '테니스 그라운드 썬캡 Black',       '27,300', '11,700↓', '',   '39,000', '["img/detail/detail41.jpg"]'),
(50, 6,'img/best/acc4.jpg',  'FCMM',       '테니스 그라운드 썬캡 White',       '27,300', '11,700↓', '',   '39,000', '["img/detail/detail42.jpg"]'),
(51, 6,'img/best/acc5.png',  '라라스마일', '윌헬로 라라 테리 썬 바이저 Pink',  '78,000', '',        '',   '',       '["img/detail/detail43.jpg"]'),
(52, 6,'img/best/acc6.png',  '라라스마일', '라라 스마일 볼캡 Green',           '78,000', '',        '',   '',       '["img/detail/detail44.jpg"]'),
(53, 6,'img/best/acc7.png',  '라라스마일', '라라 스마일 볼캡 Skyblue',         '78,000', '',        '',   '',       '["img/detail/detail45.jpg"]'),
(54, 6,'img/best/acc8.png',  '라라스마일', '라라 스마일 볼캡 Yellow',          '78,000', '',        '',   '',       '["img/detail/detail45.jpg"]'),
(55, 6,'img/best/acc9.jpg',  '논포멀하우스','코트 볼캡 Navy',                  '36,000', '',        '5%', '',       '["img/detail/hot_detail2.jpg"]'),
(56, 6,'img/best/acc10.jpg', '논포멀하우스','코트 볼캡 Ivory',                 '36,000', '',        '5%', '',       '["img/detail/detail48.jpg"]'),

-- category_id=7 : 신발 (원 best_shoes)
(57, 7,'img/best/shoes1.jpg','골스튜디오','그래비티 밸런스 PRO',                           '50,150',  '8,850↓', '', '59,000',  '["img/detail/detail46.jpg"]'),
(58, 7,'img/best/shoes2.jpg','나이키',    '나이키 테니스화 리액트 베이퍼 NXT-CV0724-002',  '189,000', '8,850↓', '', '197,850', '["img/detail/detail47.jpg"]');


-- ============================================================
--  4. product_hot   ←  tennis_mall.productHot.js
-- hot 테이블 삭제
-- ============================================================
DROP TABLE IF EXISTS `product_hot`;

-- ============================================================
--  5. cart   ←  shoppy.cart
--     member(id) FK, best_product(id) FK
--     ※ best_product.id 범위(8~58)에 맞게 샘플 데이터 조정
-- ============================================================
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
  `cid`   INT          NOT NULL AUTO_INCREMENT,
  `size`  CHAR(50)      NOT NULL,
  `qty`   INT          NOT NULL,
  `pid`   INT          NOT NULL COMMENT 'best_product.id',
  `id`    VARCHAR(50)  NOT NULL COMMENT 'member.id',
  `cdate` DATETIME     NOT NULL,
  PRIMARY KEY (`cid`),
  CONSTRAINT `fk_cart_pid`
    FOREIGN KEY (`pid`) REFERENCES `best_product` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_cart_id`
    FOREIGN KEY (`id`)  REFERENCES `member` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `cart` VALUES
(1, 'XS', 1,  8,  'test', '2025-12-30 00:00:00'),
(2, 'M',  1,  27, 'test', '2025-12-30 00:00:00'),
(3, 'M',  3,  37, 'test', '2025-12-30 00:00:00');


-- ============================================================
--  6. orders   ←  shoppy.orders
--     member(id) FK
-- ============================================================
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `oid`             INT          NOT NULL AUTO_INCREMENT,
  `order_code`      VARCHAR(40)  NOT NULL,
  `id`              VARCHAR(50)  NOT NULL COMMENT 'member.id',
  `status`          ENUM('대기중','결제중','결제완료','취소','환불','만료')
                    NOT NULL DEFAULT '대기중',
  `shipping_fee`    INT          NOT NULL DEFAULT 0,
  `discount_amount` INT          NOT NULL DEFAULT 0,
  `total_amount`    INT          NOT NULL,
  `receiver_name`   VARCHAR(50)  DEFAULT NULL,
  `receiver_phone`  VARCHAR(50)  DEFAULT NULL,
  `zipcode`         VARCHAR(20)  DEFAULT NULL,
  `address1`        VARCHAR(255) DEFAULT NULL,
  `address2`        VARCHAR(255) DEFAULT NULL,
  `memo`            VARCHAR(255) DEFAULT NULL,
  `odate`           DATETIME     DEFAULT NULL,
  PRIMARY KEY (`oid`),
  UNIQUE KEY `uq_order_code` (`order_code`),
  CONSTRAINT `fk_orders_member`
    FOREIGN KEY (`id`) REFERENCES `member` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `orders` VALUES
(1,'2b921fe6-f285-45da-8d8e-1044591cf95d','test', '대기중',0,0,0,'홍길동','010-1234-1234','12345','서울시 강남구 역삼동','123','문앞','2025-12-05 16:04:16'),
(2,'4b7fbb11-e400-4ebb-b106-ab0e590ceb7a','test', '대기중',0,0,0,'홍길동','010-1234-1234','12345','서울시 강남구 역삼동','123','문앞','2025-12-05 16:17:37'),
(3,'608b95da-7976-4226-8a40-fe59757ec76d','test', '대기중',0,0,0,'홍길동','010-1234-1234','12345','서울시 강남구 역삼동','123','문앞','2025-12-05 16:27:04'),
(4,'f54408b7-a4d3-47f4-909e-8d2b692cafa9','test', '대기중',0,0,0,'홍길동','010-1234-1234','12345','서울시 강남구 역삼동','123','문앞','2025-12-05 16:33:50'),
(5,'9790512b-f75d-4f2e-b8b1-9df9300a5db3','hong', '대기중',0,0,0,'홍길동','010-1234-1234','12345','서울시 강남구 역삼동','123','문앞','2025-12-05 16:45:07'),
(6,'3b2a56c9-c16f-4f1b-b252-a4ad06006cc3','hong', '대기중',0,0,0,'홍길동','010-1234-1234','12345','서울시 강남구 역삼동','123','문앞','2025-12-05 16:46:31'),
(7,'5d39bdaf-6455-43b4-bb2a-6f9ad8308281','hong', '대기중',0,0,0,'홍길동','010-1234-1234','12345','서울시 강남구 역삼동','123','문앞','2025-12-05 16:47:46'),
(8,'70f232e1-680b-4c98-89d6-a6bdfde9db49','test', '대기중',0,0,0,'홍길동','010-1234-1234','12345','서울시 강남구 역삼동','123','문앞','2025-12-05 18:03:11'),
(9,'9b3cbfcd-84d4-48cc-8020-bcaf3db7d69b','test', '대기중',0,0,0,'홍길동','010-1234-1234','12345','서울시 강남구 역삼동','123','문앞','2025-12-08 17:07:01');


-- ============================================================
--  7. order_detail   ←  shoppy.order_detail
--     orders(order_code) FK, best_product(id) FK
--     ※ pid 를 best_product.id 범위 내 값으로 조정
-- ============================================================
DROP TABLE IF EXISTS `order_detail`;
CREATE TABLE `order_detail` (
  `odid`            INT          NOT NULL AUTO_INCREMENT,
  `order_code`      VARCHAR(40)  NOT NULL COMMENT 'orders.order_code',
  `pid`             INT          NOT NULL COMMENT 'best_product.id',
  `pname`           VARCHAR(255) DEFAULT NULL,
  `size`            CHAR(2)      DEFAULT NULL,
  `qty`             INT          DEFAULT NULL,
  `pid_total_price` DECIMAL(10,0) DEFAULT NULL,
  `discount`        DECIMAL(10,0) DEFAULT NULL,
  PRIMARY KEY (`odid`),
  CONSTRAINT `fk_order_detail_order`
    FOREIGN KEY (`order_code`) REFERENCES `orders` (`order_code`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_order_detail_product`
    FOREIGN KEY (`pid`) REFERENCES `best_product` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `order_detail` VALUES
(1, '2b921fe6-f285-45da-8d8e-1044591cf95d',  8, '퀄팅 라켓 백 Black',               'XS', 3, 267000, 0),
(2, '2b921fe6-f285-45da-8d8e-1044591cf95d', 27, '직조 라벨 반레깅스 Green blue',     'XS', 1,  58000, 0),
(3, '2b921fe6-f285-45da-8d8e-1044591cf95d', 37, '테니스 코트 인 티셔츠 Black',       'M',  1,  27300, 0),
(4, '4b7fbb11-e400-4ebb-b106-ab0e590ceb7a',  8, '퀄팅 라켓 백 Black',               'XS', 5, 445000, 0),
(5, '608b95da-7976-4226-8a40-fe59757ec76d', 37, '테니스 코트 인 티셔츠 Black',       'XS', 3,  81900, 0),
(6, 'f54408b7-a4d3-47f4-909e-8d2b692cafa9', 35, '로고 스커트 Grey',                  'XS', 2, 138000, 0),
(7, '9790512b-f75d-4f2e-b8b1-9df9300a5db3',  8, '퀄팅 라켓 백 Black',               'XS', 1,  89000, 0),
(8, '3b2a56c9-c16f-4f1b-b252-a4ad06006cc3', 10, '퀄팅 라켓 백팩 Navy',              'XS', 2, 218000, 0),
(9, '9b3cbfcd-84d4-48cc-8020-bcaf3db7d69b', 24, '2022 요넥스 라켓 이존 필',          'M',  4, 936000, 0);


-- ============================================================
--  8. product_qna   ←  shoppy.product_qna
--     member(id) FK, best_product(id) FK
-- ============================================================
DROP TABLE IF EXISTS `product_qna`;
CREATE TABLE `product_qna` (
  `qid`         INT          NOT NULL AUTO_INCREMENT,
  `title`       VARCHAR(100) NOT NULL,
  `content`     VARCHAR(200) DEFAULT NULL,
  `is_complete` TINYINT(1)   DEFAULT NULL,
  `is_lock`     TINYINT(1)   DEFAULT NULL,
  `id`          VARCHAR(50)  NOT NULL COMMENT 'member.id',
  `pid`         INT          NOT NULL COMMENT 'best_product.id',
  `cdate`       DATETIME     DEFAULT NULL,
  PRIMARY KEY (`qid`),
  CONSTRAINT `fk_qna_member`
    FOREIGN KEY (`id`)  REFERENCES `member` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_qna_product`
    FOREIGN KEY (`pid`) REFERENCES `best_product` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `product_qna` VALUES
(1,'사이즈문의','라켓 백 사이즈 문의 드립니다.',  1,0,'hong', 8, '2025-09-22 00:00:00'),
(2,'반품문의',  '라켓 백 반품 문의 드립니다.',    1,1,'test', 8, '2025-09-22 00:00:00'),
(3,'사이즈문의','스커트 사이즈 문의 드립니다.',   1,0,'hong',35, '2025-10-02 00:00:00'),
(4,'사이즈문의','티셔츠 사이즈 문의 드립니다.',   0,0,'test',37, '2025-10-03 00:00:00'),
(5,'사이즈문의','라켓 사이즈 문의 드립니다.',     1,0,'hong',24, '2025-10-10 00:00:00'),
(6,'배송문의',  '배송 조회 방법 문의드립니다.',   0,0,'test', 9, '2025-10-15 00:00:00');


-- ============================================================
--  9. product_return   ←  shoppy.product_return
--     독립 정보성 테이블 (FK 없음)
-- ============================================================
DROP TABLE IF EXISTS `product_return`;
CREATE TABLE `product_return` (
  `rid`         INT          NOT NULL AUTO_INCREMENT,
  `title`       VARCHAR(100) NOT NULL,
  `description` VARCHAR(200) DEFAULT NULL,
  `list`        JSON         DEFAULT NULL,
  PRIMARY KEY (`rid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `product_return` VALUES
(1,
 '배송/교환/반품/AS 관련 유의사항',
 '상품상세설명에 배송/교환/반품/취소 관련 안내가 기재된 경우 다음 안내사항보다 우선 적용됩니다.',
 '[{"title":"배송 정보","infoList":["상품별로 상품 특성 및 배송지에 따라 배송유형 및 소요기간이 달라집니다.","일부 주문상품 또는 예약상품의 경우 기본 배송일 외에 추가 배송 소요일이 발생될 수 있습니다.","제주 및 도서산간 지역은 출고, 반품, 교환시 추가 배송비(항공, 도선료)가 부과 될 수 있습니다.","상품의 배송비는 공급업체의 정책에 따라 다르오며 공휴일 및 휴일은 배송이 불가합니다."]},{"title":"취소/반품/교환 안내","infoList":["배송 완료 후 7일 이내 신청 가능합니다.","단순 변심에 의한 반품 배송비는 고객 부담입니다.","상품 불량·오배송의 경우 배송비 전액 지원합니다.","세탁 또는 사용 후에는 교환·반품이 불가합니다."]},{"title":"반품/교환 불가능한 경우","infoList":["착용 흔적이나 세탁 흔적이 있는 경우","상품 택(TAG)이 제거된 경우","소비자의 부주의로 상품이 훼손된 경우","주문 제작 상품인 경우"]},{"title":"A/S 안내","infoList":["상품 수령 후 30일 이내 하자 발생 시 무상 수리 또는 교환합니다.","단순 변심에 의한 A/S는 유상으로 진행됩니다."]}]'
);


-- ============================================================
-- 10. support   ←  shoppy.support
--     독립 공지/FAQ 테이블 (FK 없음)
-- ============================================================
DROP TABLE IF EXISTS `support`;
CREATE TABLE `support` (
  `sid`     INT          NOT NULL AUTO_INCREMENT,
  `title`   VARCHAR(100) NOT NULL,
  `content` VARCHAR(200) DEFAULT NULL,
  `stype`   VARCHAR(30)  NOT NULL COMMENT 'system|theater|event|partner|etc',
  `hits`    INT          DEFAULT NULL,
  `rdate`   DATETIME     DEFAULT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `support` VALUES
( 1,'iOS 18 업데이트 관련 예매 서비스 이용안내',   'iOS 18 업그레이드 후 앱 오류 발생 시 재설치를 권장합니다.',  'system', 118692,'2024-09-13 00:00:00'),
( 2,'테니스몰 개인정보 처리방침 개정 안내',         NULL, 'system',  8500,'2025-01-10 00:00:00'),
( 3,'설 연휴 배송 안내 (1/27~1/30)',                NULL, 'system',  6200,'2025-01-20 00:00:00'),
( 4,'앱 점검 안내 (2/5 02:00~04:00)',               NULL, 'system',  4100,'2025-02-03 00:00:00'),
( 5,'android 앱 2.1.0 업데이트 안내',               '안드로이드 앱 최신 버전으로 업데이트해 주세요.', 'system', 20000,'2025-05-13 00:00:00'),
( 6,'[테니스몰 단독] FCMM 봄 신상품 출시',          NULL, 'event',  15000,'2025-03-01 00:00:00'),
( 7,'[이벤트] 리뷰 작성 시 포인트 500P 증정',       NULL, 'event',  12000,'2025-03-10 00:00:00'),
( 8,'[이벤트] 첫 구매 10% 할인 쿠폰 증정',          NULL, 'event',   9800,'2025-04-01 00:00:00'),
( 9,'러브포티 팝업스토어 오픈',                      NULL,'theater', 11000,'2025-04-15 00:00:00'),
(10,'요넥스 공식 파트너 등록 안내',                  NULL,'partner',  5000,'2025-04-20 00:00:00'),
(11,'윌슨 공식 파트너 등록 안내',                    NULL,'partner',  4800,'2025-04-22 00:00:00'),
(12,'회원 등급 정책 변경 안내',                      NULL, 'etc',    7200,'2025-05-01 00:00:00'),
(13,'포인트 사용 정책 안내',                          NULL, 'etc',    6100,'2025-05-05 00:00:00');


-- ============================================================
-- 11. card_data   ←  tennis_mall.cardData.js
-- ============================================================
DROP TABLE IF EXISTS `card_data`;
CREATE TABLE `card_data` (
  `id`      INT          NOT NULL AUTO_INCREMENT,
  `img_url` VARCHAR(255) NOT NULL,
  `title`   VARCHAR(255) NOT NULL,
  `tag`     JSON         NOT NULL,
  `hash`    JSON         NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `card_data` (`img_url`,`title`,`tag`,`hash`) VALUES
('./img/cardList1.jpg','테린이 환영해! 테니스 준비과정 비용 정리',         '["실외","서울","나이키","테린이"]',                          '["#테린이","#테니스 준비 과정","#테니스시작"]'),
('./img/cardList2.jpg','테니스 코트가 있는 숙소',                          '["실외","서울","나이키","스포티","라켓"]',                    '["#테니스코트","#숙소","#전국"]'),
('./img/cardList3.jpg','이색적인 테니스 코트를 찾아서:보라색코트',         '["실외","서울","나이키","스포티","동호회"]',                  '["#보라색","#테니스코트","#테니스","#명소"]'),
('./img/cardList4.jpg','테니스 영화',                                       '["실외","서울","나이키","빈티지"]',                          '["#테니스","#영화","#드라마","#애니메이션"]'),
('./img/cardList5.jpg','테린이일기| 테니스레슨 27-28회차',                 '["실외","강원","러브포티","테니스웨어","동호회"]',            '["#테린이","#일기","#레슨","#디아도라"]'),
('./img/cardList6.jpg','복장에 마침표를 찍어줄 테니스 모자 스타일링',      '["실내","논포멀하우스","캐주얼","모자"]',                    '["#테니스","#모자","#테니스웨어","#자외선차단"]'),
('./img/cardList7.jpg','나트랑 더 아남 액티비티| 테니스 코트 대여',        '["실내","강원","러브포티","ESFP","캐주얼","테니스웨어"]',    '["#나트랑","#요가","#테니스","#테니스코트"]'),
('./img/cardList8.jpg','테니스 선수들의 테니스 명언',                       '["기타","선수","테니스","명언"]',                            '["#테니스","#선수","#명언"]');


-- ============================================================
-- 12. style_data   ←  tennis_mall.data.js
--     member(id) FK (user_id)
-- ============================================================
DROP TABLE IF EXISTS `style_data`;
CREATE TABLE `style_data` (
  `id`       INT          NOT NULL AUTO_INCREMENT,
  `idx`      INT          NOT NULL,
  `user_id`  VARCHAR(100) NOT NULL COMMENT 'SNS 핸들 (member.id 와 별도)',
  `img_url`  VARCHAR(255) NOT NULL,
  `like_num` INT          NOT NULL DEFAULT 0,
  `content`  TEXT         NOT NULL,
  `tag`      JSON         NOT NULL,
  `hash`     JSON         NOT NULL,
  `reply`    INT          NOT NULL DEFAULT 0,
  `view`     INT          NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ※ user_id 는 인스타그램 핸들 등 외부 SNS 계정이므로
--   member 테이블과 직접 FK 연결 없이 유지합니다.
INSERT INTO `style_data` (`idx`,`user_id`,`img_url`,`like_num`,`content`,`tag`,`hash`,`reply`,`view`) VALUES
(1,'miniellie_',  'img/style/style1.jpg', 38,'무서운 테니스 실력의 소유자(남들이 볼까 무서운...^^) 인스타그램(@miniellie_)','["실외","서울","기타","ENTP","OOTD","캐주얼","러블리","셋업","S/S","여자"]','["#내곡동"]',0,820),
(2,'지니',        'img/style/style2.jpeg',31,'찐 외향형 ENFJ는 크리스마스를 놓칠 수 없어요🔥','["실외","서울","기타","ENFJ","셋업","동호회","라켓","테니스용품","160cm","남여공용"]','["#테니스","#테린이","#테이비","#테니스웨어","#크리스마스"]',3,409),
(3,'flowerchobi', 'img/style/style3.jpg', 30,'테니스한다고 하기엔 너무 하얀 🌧🤍👟 인스타그램(@flower_chobi)','["실외","서울","러브포티","ENTP","OOTD","캐주얼","스포티","러블리","스커트","S/S","테니스웨어","여자"]','["#tennis"]',0,455),
(4,'flowerchobi', 'img/style/style4.png', 27,'귀요미 탈 빌려서 한컷 대박🙈💜 인스타그램(@tennis_nrnr)','["실외","서울","기타","OOTD","캐주얼","러블리","S/S","여자"]','["#ts"]',1,230),
(5,'jhmintennis', 'img/style/style5.jpg', 26,'#지금도 못치고 그때도 못쳤다#테니스#그래도 재밌다 인스타그램(@jhmin_tennis)','["실내","서울","기타","OOTD","캐주얼","스포티","스커트","S/S","여자"]','["#테린이","#테생아","#계남실내테니스장"]',1,374),
(6,'dal_sun',     'img/style/style6.jpg', 24,'나이키가 그랬지!! 자신감만 있으면 어디든 그곳이 우리의 무대라고 💃🏼 인스타그램(@dal_sun)','["실외","서울","나이키","OOTD","캐주얼","스포티","스트릿","F/W","여자"]','["#ownthefloor"]',2,216);


-- ============================================================
-- 13. review   ←  tennis_mall.review.js
--     독립 리뷰 테이블
--     (향후 best_product / member FK 연결 가능)
-- ============================================================
DROP TABLE IF EXISTS `review`;
CREATE TABLE `review` (
  `id`      INT          NOT NULL AUTO_INCREMENT,
  `rating`  DECIMAL(3,1) NOT NULL,
  `percent` VARCHAR(10)  NOT NULL,
  `text`    TEXT         NOT NULL,
  `date`    DATE         NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `review` VALUES
(1, 4.0,'80%', '매일 같은 브랜드 것만 샀다가, 지겨워서 정도 좀 찾아보고 구매했는데 생각보단 괜찮아요~','2023-11-03'),
(2, 5.0,'100%','테니스 레슨 받을때 편하게 쓰려고 샀는데 딱 좋네요! 사이즈도 딱 맞아요',               '2023-10-29'),
(3, 4.5,'93%', '색상도 사진 그대로라서 마음에 드네요. 감사합니다. 배송이 조금 늦는 게 아쉬웠어요.',   '2023-10-26');


-- ============================================================
--  VIEW : 장바구니 상세 목록
--  view_cartlist  (shoppy.view_cartlist 을 tennis_mall 스키마에 맞게 재작성)
-- ============================================================
DROP VIEW IF EXISTS `view_cartlist`;
CREATE VIEW `view_cartlist` AS
SELECT
  m.id          AS id,
  m.name        AS mname,
  m.phone       AS phone,
  m.email       AS email,
  bp.id         AS pid,
  bp.product    AS name,
  bp.shop       AS shop,
  bp.img_url    AS image,
  bp.price      AS price,
  c.size        AS size,
  c.qty         AS qty,
  c.cid         AS cid,
  t.total_price AS total_price
FROM member m
JOIN cart         c  ON m.id   = c.id
JOIN best_product bp ON bp.id  = c.pid
JOIN (
  SELECT c2.id,
         SUM(
           c2.qty *
           CAST(REPLACE(REPLACE(bp2.price, ',', ''), ' ', '') AS UNSIGNED)
         ) AS total_price
  FROM cart c2
  JOIN best_product bp2 ON c2.pid = bp2.id
  GROUP BY c2.id
) t ON t.id = c.id;


SET FOREIGN_KEY_CHECKS = 1;

select * from 

-- ============================================================
--  END OF DUMP
-- ============================================================
