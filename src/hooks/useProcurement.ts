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

  const averageCarbonFootprintByProduct = useMemo(() => {
    const footprintByProduct: { [key: string]: { totalFootprint: number; count: number } } = {};

    procurements.forEach((procurement: any) => {
      const title = procurement.title;
      const footprint = procurement.environmentalImpact.carbonFootprint;

      if (!footprintByProduct[title]) {
        footprintByProduct[title] = { totalFootprint: 0, count: 0 };
      }
      footprintByProduct[title].totalFootprint += footprint;
      footprintByProduct[title].count += 1;
    });

    return Object.entries(footprintByProduct)
      .map(([title, { totalFootprint, count }]) => ({
        title,
        averageFootprint: Number((totalFootprint / count).toFixed(2)),
      }))
      .sort((a, b) => b.averageFootprint - a.averageFootprint);
  }, [procurements]);

  const sustainabilityScoresByMonth = useMemo(() => {
    const scoresByMonth: { [key: string]: { totalScore: number; count: number } } = {};

    procurements.forEach((procurement: any) => {
      const date = new Date(procurement.date);
      const monthKey = date.toISOString().substring(0, 7);
      const score = procurement.environmentalImpact.sustainabilityScore;

      if (!scoresByMonth[monthKey]) {
        scoresByMonth[monthKey] = { totalScore: 0, count: 0 };
      }
      scoresByMonth[monthKey].totalScore += score;
      scoresByMonth[monthKey].count += 1;
    });

    return Object.entries(scoresByMonth)
      .map(([monthKey, { totalScore, count }]) => ({
        month: monthKey,
        averageScore: Number((totalScore / count).toFixed(2)),
      }))
      .sort((a, b) => a.month.localeCompare(b.month));
  }, [procurements]);

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
    averageCarbonFootprintByProduct,
    sustainabilityScoresByMonth,
  };
};
