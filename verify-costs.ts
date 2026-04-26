import { COUNTRIES } from './src/lib/data/countries';

let errors = 0;
COUNTRIES.forEach(c => {
  const b = c.costBreakdown;
  const sum = b.rentUsd + b.groceriesUsd + b.transportUsd + b.utilitiesUsd + b.diningOutUsd + b.healthInsuranceUsd;
  if (sum !== b.totalEstimateUsd) {
    console.error(`Cost mismatch for ${c.name}: sum ${sum} !== total ${b.totalEstimateUsd}`);
    errors++;
  }
});

if (errors === 0) {
  console.log("All cost arithmetic verified successfully!");
} else {
  process.exit(1);
}
