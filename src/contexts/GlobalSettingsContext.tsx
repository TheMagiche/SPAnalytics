import React, { ReactNode, useState } from "react";

export const GlobalSettingsContext = React.createContext<any>(null);

type GlobalSettingsProps = {
  children?: ReactNode;
};

export const GlobalSettingsProvider = ({ children }: GlobalSettingsProps) => {
  const [upperThreshold, setUpperThreshold] = useState<number>(1000);
  const [lowerThreshold, setLowerThreshold] = useState<number>(10);

  return (
    <GlobalSettingsContext.Provider
      value={
        {
          upperThreshold,
          setUpperThreshold,
          lowerThreshold,
          setLowerThreshold,
        } as const
      }
    >
      {children}
    </GlobalSettingsContext.Provider>
  );
};
