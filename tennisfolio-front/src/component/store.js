import { configureStore, createSlice } from "@reduxjs/toolkit";

let cart = createSlice({
  name: "cart",
  initialState: [
    { id: 1, imgUrl: 'hot/hot2.jpg', product: "윌슨 핑크 테니스 볼", count: 2, price: 18900 },
    { id: 2, imgUrl: 'hot/hot3.jpg', product: "Stretch cotton polo shirt (Pink)", count: 1, price: 76000 }
  ],
  reducers: {
    addCount(state, action) {
      let num = state.findIndex((a) => a.id === action.payload);
      state[num].count++;
    },
    decreaseCount(state, action) {
      let num = state.findIndex((a) => a.id === action.payload);
      if (state[num].count > 1) {
        state[num].count--;
      } else if (state[num].count === 1) {
        alert("상품의 최소 수량은 1개 입니다.");
      }
    },
    addItem(state, action) {
      let num = state.findIndex((a) => a.id === action.payload.id);
      if (num !== -1) {
        state[num].count++;
      } else {
        state.push(action.payload);
      }
    },
    deleteItem(state, action) {
      let num = state.findIndex((a) => a.id === action.payload);
      state.splice(num, 1);
    },
  }
});

export let { addCount, decreaseCount, addItem, deleteItem } = cart.actions;

export default configureStore({
  reducer: { cart: cart.reducer }
});
