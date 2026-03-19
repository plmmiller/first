export function calcHoldingMetrics(holding) {
  const marketValue = holding.shares * holding.currentPrice;
  const costBasis = holding.shares * holding.avgCost;
  const gainLoss = marketValue - costBasis;
  const gainLossPct = ((gainLoss / costBasis) * 100);
  return { marketValue, costBasis, gainLoss, gainLossPct };
}

export function calcPortfolioTotals(holdings) {
  let totalValue = 0;
  let totalCost = 0;
  for (const h of holdings) {
    const { marketValue, costBasis } = calcHoldingMetrics(h);
    totalValue += marketValue;
    totalCost += costBasis;
  }
  const totalGainLoss = totalValue - totalCost;
  const totalGainLossPct = totalCost > 0 ? (totalGainLoss / totalCost) * 100 : 0;
  return { totalValue, totalCost, totalGainLoss, totalGainLossPct };
}

export function calcSectorAllocation(holdings) {
  const sectorMap = {};
  let totalValue = 0;
  for (const h of holdings) {
    const { marketValue } = calcHoldingMetrics(h);
    totalValue += marketValue;
    sectorMap[h.sector] = (sectorMap[h.sector] || 0) + marketValue;
  }
  return Object.entries(sectorMap).map(([name, value]) => ({
    name,
    value,
    pct: totalValue > 0 ? (value / totalValue) * 100 : 0,
  }));
}

export function formatCurrency(val) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(val);
}

export function formatPct(val) {
  const sign = val >= 0 ? "+" : "";
  return `${sign}${val.toFixed(2)}%`;
}

export function nextId(arr) {
  return arr.length > 0 ? Math.max(...arr.map((x) => x.id)) + 1 : 1;
}
