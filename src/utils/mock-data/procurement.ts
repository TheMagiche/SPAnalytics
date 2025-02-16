import { sub } from 'date-fns';
import { exportSuppliers } from './supplier';

export const PRODUCT_TITLES = [
  'Organic Wheat',
  'Fresh Vegetables Assortment',
  'Dairy Products Bundle',
  'Processed Grains',
  'Fruit Package',
  'Meat Products',
  'Fish and Seafood',
  'Processed Foods',  
  'Fertilizers',
  'Seeds Package',
  'Farm Equipment',
  'Irrigation Supplies',
  'Pesticides',
  'Animal Feed',
  'Agricultural Tools',
  'Farming Machinery Parts'
];

const SUB_REGIONS = ['Rural', 'Urban'];

const generateProcurement = (index: number) => {
  const date = sub(new Date(), { days: index * 3 }); // Generates dates going back from current date
  const randomSupplier = exportSuppliers[Math.floor(Math.random() * exportSuppliers.length)];
  
  return {
    id: `proc-${index + 1}-${date.getTime()}`,
    title: PRODUCT_TITLES[Math.floor(Math.random() * PRODUCT_TITLES.length)],
    date: date.toISOString(),
    supplierId: randomSupplier.id,
    region: randomSupplier.country,
    subRegion: SUB_REGIONS[Math.floor(Math.random() * SUB_REGIONS.length)],
    amountSpent: Math.floor(5000 + Math.random() * 95000), // Random amount between 5000 and 100000
    quantity: Math.floor(100 + Math.random() * 900), // Random quantity between 100 and 1000
    environmentalImpact: {
      carbonEmissions: Math.floor(50 + Math.random() * 450), // CO2 emissions in kg
      carbonFootprint: Math.floor(20 + Math.random() * 80) / 10, // Carbon footprint score (2.0 - 10.0)
      sustainabilityScore: Math.floor(1 + Math.random() * 5), // 1-5 rating
    },
    status: Math.random() > 0.1 ? 'completed' : 'pending', // 90% chance of being completed
  };
};

export const exportProcurements = Array.from({ length: 100 }, (_, index) => generateProcurement(index));

