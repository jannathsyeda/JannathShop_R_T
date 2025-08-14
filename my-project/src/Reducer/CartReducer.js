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
      
    // case 'UPDATE_QUANTITY':
    //   return {
    //     ...state,
    //     items: state.items.map(item =>
    //       item.id === action.payload.id && 
    //       item.size === action.payload.size && 
    //       item.color === action.payload.color
    //         ? { ...item, quantity: Math.max(0, action.payload.quantity) }
    //         : item
    //     ).filter(item => item.quantity > 0)
    //   };
    case 'UPDATE_QUANTITY':
  return {
    ...state,
    items: state.items.map(item => {
      if (
        item.id === action.payload.id &&
        item.size === action.payload.size &&
        item.color === action.payload.color
      ) {
        // Prevent exceeding stock
        if (action.payload.quantity > item.stock) {
          return item; // no change
        }
        return { ...item, quantity: Math.max(1, action.payload.quantity) };
      }
      return item;
    })
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
