import React, { ReactNode, useState } from "react";
import { exportSuppliers } from "../utils/mock-data/supplier";

export const SupplierContext = React.createContext<any>(null);

type SupplierProps = {
  children?: ReactNode;
};

export const SupplierProvider = ({ children }: SupplierProps) => {
  const [suppliers, setSuppliers] = useState(exportSuppliers);

  return (
    <SupplierContext.Provider
      value={{
        suppliers,
        setSuppliers,
      }}
    >
      {children}
    </SupplierContext.Provider>
  );
};
