import { ProcurementContext } from "src/contexts/ProcurementContext";
import { useContext, useMemo } from "react";
import { GlobalSettingsContext } from "src/contexts/GlobalSettingsContext";

export const useAnomaliesDetection = () => {
  const { procurements } = useContext(ProcurementContext);
  const { upperThreshold, lowerThreshold } = useContext(GlobalSettingsContext);
  
  const getProcurementsAboveUpperThreshold = useMemo(() => {
    return procurements.filter((procurement: any) => 
      procurement.amountSpent > upperThreshold
    );
  }, [procurements, upperThreshold]);

  const getProcurementsAboveLowerThreshold = useMemo(() => {
    return procurements.filter((procurement: any) => 
      procurement.amountSpent < lowerThreshold
    );
  }, [procurements, lowerThreshold]);

  return {
    getProcurementsAboveUpperThreshold,
    getProcurementsAboveLowerThreshold,
  };
};