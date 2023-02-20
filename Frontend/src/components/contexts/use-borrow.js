import { createContext, useContext } from 'react';

export const borrowListContext = createContext();
// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useBorrowList = () => {
    return useContext(borrowListContext);
};