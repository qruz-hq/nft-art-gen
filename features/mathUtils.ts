export const createDistribution = (
  array: Array<any>,
  weights: Array<number>,
  size: number,
) => {
  const distribution = [];
  const sum = weights.reduce((a, b) => a + b);
  const quant = size / sum;
  for (let i = 0; i < array.length; ++i) {
    const limit = quant * weights[i];
    for (let j = 0; j < limit; ++j) {
      distribution.push(i);
    }
  }
  return distribution;
};

export const randomIndex = (distribution: Array<any>) => {
  const index = Math.floor(distribution.length * Math.random()); // random index
  return distribution[index];
};
