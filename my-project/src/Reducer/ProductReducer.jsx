export const productsReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_STOCK':
      return state.map(product =>
        product.id === action.payload.id
          ? { ...product, stock: Math.max(0, action.payload.stock) }
          : product
      );
    case 'DECREASE_STOCK':
      return state.map(product =>
        product.id === action.payload.id
          ? { ...product, stock: Math.max(0, product.stock - action.payload.quantity) }
          : product
      );
    case 'INCREASE_STOCK':
      return state.map(product =>
        product.id === action.payload.id
          ? { ...product, stock: product.stock + action.payload.quantity }
          : product
      );
    default:
      return state;
  }
}