import { createContext, useContext, useState } from 'react';

const SessionContext = createContext();

export function SessionContextWrapper({ children }) {
  const [session, setSession] = useState(null)
  let sharedState = {session, setSession}

  return (
    <SessionContext.Provider value={sharedState}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSessionContext() {
  return useContext(SessionContext);
}