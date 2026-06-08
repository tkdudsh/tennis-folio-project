import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function MainSlide() {
  return (
    <>
      <Swiper
        modules={[Navigation, Scrollbar]}
        slidesPerView={1}
        loop={true}
        navigation={true}
        speed={500}
      >
        <SwiperSlide className="slide">
          <div className="slideTextbox">
            <p className="title">{`지금 입기 좋은\n 테니스 룩`}</p>
            <button className="viewBtn">자세히 보기</button>
          </div>
          <div className="slideImgbox">
            <img src="img/slider1.png" alt="slider1" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slideTextbox">
            <p className="title">{`테니스를 위한\n TENNIS STYLE`}</p>
            <button className="viewBtn">자세히 보기</button>
          </div>
          <div className="slideImgbox">
            <img src="img/slider3.jpg" alt="slider3" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slideTextbox">
            <p className="title">{`on the court\n 코트 위 순간들`}</p>
            <button className="viewBtn">자세히 보기</button>
          </div>
          <div className="slideImgbox">
            <img src="img/slider2.jpg" alt="slider2" />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default MainSlide;
