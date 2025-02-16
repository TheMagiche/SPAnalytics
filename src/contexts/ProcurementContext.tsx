import React, { ReactNode, useState } from "react";
import { exportProcurements } from "src/utils/mock-data/procurement";

export const ProcurementContext = React.createContext<any>(null);

type ProcurementProps = {
  children?: ReactNode;
};

export const ProcurementProvider = ({ children }: ProcurementProps) => {
  const [procurements, setProcurements] = useState(exportProcurements);

  return (
    <ProcurementContext.Provider
      value={{
        procurements,
        setProcurements,
      }}
    >
      {children}
    </ProcurementContext.Provider>
  );
};
