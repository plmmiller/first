import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { calcSectorAllocation, formatCurrency } from "../utils/portfolio";
import { SECTOR_COLORS } from "../data/sampleData";

function getColor(sector) {
  return SECTOR_COLORS[sector] || SECTOR_COLORS.Other;
}

export default function AllocationChart({ holdings }) {
  const data = calcSectorAllocation(holdings);

  if (data.length === 0) {
    return <div className="empty-state">No data to display.</div>;
  }

  return (
    <div className="allocation-wrap">
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={110}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={getColor(entry.name)} />
            ))}
          </Pie>
          <Tooltip
            formatter={(val) => [formatCurrency(val), "Value"]}
            contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "8px", color: "#f1f5f9" }}
          />
          <Legend
            iconType="circle"
            iconSize={10}
            formatter={(val) => <span style={{ color: "#94a3b8", fontSize: 13 }}>{val}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="sector-list">
        {data.map((s) => (
          <div key={s.name} className="sector-row">
            <span
              className="sector-dot"
              style={{ background: getColor(s.name) }}
            />
            <span className="sector-name">{s.name}</span>
            <span className="sector-pct">{s.pct.toFixed(1)}%</span>
            <span className="sector-val">{formatCurrency(s.value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
