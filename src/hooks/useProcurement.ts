import { ProcurementContext } from "src/contexts/ProcurementContext";
import { useContext, useMemo } from "react";

export const useProcurement = () => {
  const { procurements, setProcurements } = useContext(ProcurementContext);

  const averageCarbonEmissions = useMemo(() => {
    const totalEmissions = procurements.reduce((sum: any, procurement: any) => {
      return sum + procurement.environmentalImpact.carbonEmissions;
    }, 0);
    return totalEmissions / procurements.length;
  }, [procurements]);

  const averageCarbonFootprint = useMemo(() => {
    const totalFootprint = procurements.reduce((sum: any, procurement: any) => {
      return sum + procurement.environmentalImpact.carbonFootprint;
    }, 0);
    return totalFootprint / procurements.length;
  }, [procurements]);

  const averageSustainabilityScore = useMemo(() => {
    const totalSustainabilityScore = procurements.reduce(
      (sum: any, procurement: any) => {
        return sum + procurement.environmentalImpact.sustainabilityScore;
      },
      0
    );
    return totalSustainabilityScore / procurements.length;
  }, [procurements]);

  const averageCarbonEmissionsByRegion = useMemo(() => {
    const emissionsByRegion: { [key: string]: { totalEmissions: number; count: number } } = {};

    procurements.forEach((procurement: any) => {
      const region = procurement.region;
      const emissions = procurement.environmentalImpact.carbonEmissions;

      if (!emissionsByRegion[region]) {
        emissionsByRegion[region] = { totalEmissions: 0, count: 0 };
      }
      emissionsByRegion[region].totalEmissions += emissions;
      emissionsByRegion[region].count += 1;
    });

    // Calculate average emissions and sort by region
    return Object.entries(emissionsByRegion)
      .map(([region, { totalEmissions, count }]) => ({
        region,
        averageEmissions: totalEmissions / count,
      }))
      .sort((a, b) => a.region.localeCompare(b.region));
  }, [procurements]);

  const totalCarbonEmissions = useMemo(() => {
    return procurements.reduce((sum: number, procurement: any) => {
      return sum + procurement.environmentalImpact.carbonEmissions;
    }, 0);
  }, [procurements]);

  const { highestRegion, lowestRegion } = useMemo(() => {
    if (averageCarbonEmissionsByRegion.length === 0) return { highestRegion: null, lowestRegion: null };

    const highest = averageCarbonEmissionsByRegion.reduce((prev, current) => {
      return (prev.averageEmissions > current.averageEmissions) ? prev : current;
    });

    const lowest = averageCarbonEmissionsByRegion.reduce((prev, current) => {
      return (prev.averageEmissions < current.averageEmissions) ? prev : current;
    });

    return { highestRegion: highest, lowestRegion: lowest };
  }, [averageCarbonEmissionsByRegion]);

  const totalAverageCarbonEmissions = useMemo(() => {
    if (averageCarbonEmissionsByRegion.length === 0) return 0;
    const totalAverage = averageCarbonEmissionsByRegion.reduce((sum, region) => {
      return sum + region.averageEmissions;
    }, 0);
    return totalAverage / averageCarbonEmissionsByRegion.length;
  }, [averageCarbonEmissionsByRegion]);

  return {
    procurements,
    setProcurements,
    averageCarbonEmissions,
    averageCarbonFootprint,
    averageSustainabilityScore,
    averageCarbonEmissionsByRegion,
    highestRegion,
    lowestRegion,
    totalCarbonEmissions,
    totalAverageCarbonEmissions,
  };
};
