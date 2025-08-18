export const cartReducer = (state, action) => {
 switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => 
        item.id === action.payload.id && 
        item.size === action.payload.size && 
        item.color === action.payload.color
      );
      
      // Prevent adding if stock is 0
      if (action.payload.stock <= 0) {
        return state;
      }

      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id && 
            item.size === action.payload.size && 
            item.color === action.payload.color
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      };
      
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => 
          !(item.id === action.payload.id && 
            item.size === action.payload.size && 
            item.color === action.payload.color)
        )
      };
      
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item => {
          if (
            item.id === action.payload.id &&
            item.size === action.payload.size &&
            item.color === action.payload.color
          ) {
            // Get current stock for this product
            const currentStock = action.payload.currentStock || item.stock;
            // Prevent exceeding stock and going below 1
            const newQuantity = Math.max(1, Math.min(action.payload.quantity, currentStock));
            return { ...item, quantity: newQuantity };
          }
          return item;
        }).filter(item => item.quantity > 0)
      };
      
    case 'APPLY_DISCOUNT':
      return {
        ...state,
        discount: action.payload
      };
      
    default:
      return state;
  }
};
