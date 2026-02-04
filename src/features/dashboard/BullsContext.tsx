import React, { createContext, useContext } from 'react';
import { useBulls } from './useBulls';

type UseBullsReturn = ReturnType<typeof useBulls>;

const BullsContext = createContext<UseBullsReturn | undefined>(undefined);

export function BullsProvider({ children }: { children: React.ReactNode }) {
  const bullsData = useBulls();

  return (
    <BullsContext.Provider value={bullsData}>
      {children}
    </BullsContext.Provider>
  );
}

export function useBullsContext() {
  const context = useContext(BullsContext);
  if (!context) {
    throw new Error('useBullsContext must be used within a BullsProvider');
  }
  return context;
}
