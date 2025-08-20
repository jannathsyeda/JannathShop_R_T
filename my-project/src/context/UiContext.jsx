import { createContext, useContext } from 'react';


const UIContext = createContext("");

 const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};

export{ UIContext, useUI }