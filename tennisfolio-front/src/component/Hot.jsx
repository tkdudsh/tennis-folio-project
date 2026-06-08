import { useState, useEffect } from 'react';
import axios from 'axios';
import Products from './Products.jsx';

function Hot() {
  const [tennisHot, setTennisHot] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotProducts = async() => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get('/api/hot');
        const data = Array.isArray(response.data) ? response.data : [];
        setTennisHot(data);
      }
      catch (error) {
        console.error(error);
        setError('상품 데이터를 불러오지 못했습니다.');
      }
      finally {
        setLoading(false);
      }
    };

    fetchHotProducts();
  }, [])

  return (
    <div className="container hotItems" style={{ margin: "150px auto 150px", maxWidth: "1600px" }}>
      <h3 style={{ fontWeight: "700" }}>요즘 핫해요</h3>
      <div className="row row-cols-2 row-cols-md-3 row-cols-xxl-4">
        {tennisHot.map((item, index) => (
          <Products
            key={item.id ?? index}
            id={item.id}
            categoryId={item.categoryId}
            imgUrl={item.imgUrl}
            shop={item.shop}
            product={item.name}
            dc={item.dc}
            per={item.per}
            price={item.price}
            nodc={item.nodc}
          />
        ))}
      </div>
    </div>
  );
}

export default Hot;
