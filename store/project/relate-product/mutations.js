export default {
  setRelateProduct(state, { payload }) {
    const { linkedProduct, products } = payload;
    state.relateProductData = linkedProduct;
    state.allProducts = products;
  }
};
