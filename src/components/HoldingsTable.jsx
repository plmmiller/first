import { Trash2, TrendingUp, TrendingDown } from "lucide-react";
import { calcHoldingMetrics, formatCurrency, formatPct } from "../utils/portfolio";

export default function HoldingsTable({ holdings, totalValue, onRemove }) {
  if (holdings.length === 0) {
    return (
      <div className="empty-state">
        No positions yet. Add a holding to get started.
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="holdings-table">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Sector</th>
            <th className="num">Shares</th>
            <th className="num">Avg Cost</th>
            <th className="num">Current Price</th>
            <th className="num">Market Value</th>
            <th className="num">Gain / Loss</th>
            <th className="num">Weight</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {holdings.map((h) => {
            const { marketValue, gainLoss, gainLossPct } = calcHoldingMetrics(h);
            const weight = totalValue > 0 ? (marketValue / totalValue) * 100 : 0;
            const pos = gainLoss >= 0;
            return (
              <tr key={h.id}>
                <td>
                  <span className="symbol-badge">{h.symbol}</span>
                </td>
                <td className="company-name">{h.name}</td>
                <td>
                  <span className="sector-tag">{h.sector}</span>
                </td>
                <td className="num">{h.shares.toLocaleString()}</td>
                <td className="num">{formatCurrency(h.avgCost)}</td>
                <td className="num">{formatCurrency(h.currentPrice)}</td>
                <td className="num bold">{formatCurrency(marketValue)}</td>
                <td className="num">
                  <div className={`gain-cell ${pos ? "positive" : "negative"}`}>
                    <span>{pos ? <TrendingUp size={13} /> : <TrendingDown size={13} />}</span>
                    <span>{formatCurrency(gainLoss)}</span>
                    <span className="pct">({formatPct(gainLossPct)})</span>
                  </div>
                </td>
                <td className="num">
                  <div className="weight-cell">
                    <div className="weight-bar-bg">
                      <div
                        className="weight-bar-fill"
                        style={{ width: `${Math.min(weight, 100)}%` }}
                      />
                    </div>
                    <span>{weight.toFixed(1)}%</span>
                  </div>
                </td>
                <td>
                  <button
                    className="remove-btn"
                    onClick={() => onRemove(h.id)}
                    title="Remove position"
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
