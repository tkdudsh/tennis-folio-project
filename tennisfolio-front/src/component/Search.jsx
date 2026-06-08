import { useState } from 'react';

function Search(props) {
  let [text, setText] = useState("");

  return (
    <div className="searchBox">
      <form>
        <input
          type="search"
          id="search"
          placeholder="제목을 입력해주세요"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={(e) => e.preventDefault()}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <button onClick={(e) => { props.setIsClicked(!props.isClicked); e.preventDefault(); }}>
          <i className="fa-solid fa-x text-white ms-3"></i>
        </button>
      </form>
    </div>
  );
}

export default Search;
