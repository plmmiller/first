import { TrendingUp, TrendingDown, DollarSign, BarChart2 } from "lucide-react";
import { formatCurrency, formatPct } from "../utils/portfolio";

function Card({ title, value, sub, subPositive, icon: Icon, iconColor }) {
  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">{title}</span>
        <span className={`card-icon ${iconColor}`}>
          <Icon size={18} />
        </span>
      </div>
      <div className="card-value">{value}</div>
      {sub !== undefined && (
        <div className={`card-sub ${subPositive ? "positive" : "negative"}`}>
          {sub}
        </div>
      )}
    </div>
  );
}

export default function SummaryCards({ totals, holdingsCount }) {
  const { totalValue, totalCost, totalGainLoss, totalGainLossPct } = totals;
  const positive = totalGainLoss >= 0;

  return (
    <div className="summary-grid">
      <Card
        title="Portfolio Value"
        value={formatCurrency(totalValue)}
        icon={DollarSign}
        iconColor="icon-blue"
      />
      <Card
        title="Total Invested"
        value={formatCurrency(totalCost)}
        icon={BarChart2}
        iconColor="icon-gray"
      />
      <Card
        title="Total Gain / Loss"
        value={formatCurrency(totalGainLoss)}
        sub={formatPct(totalGainLossPct)}
        subPositive={positive}
        icon={positive ? TrendingUp : TrendingDown}
        iconColor={positive ? "icon-green" : "icon-red"}
      />
      <Card
        title="Positions"
        value={holdingsCount}
        icon={BarChart2}
        iconColor="icon-purple"
      />
    </div>
  );
}
