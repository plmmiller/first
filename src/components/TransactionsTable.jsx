import { Trash2 } from "lucide-react";
import { formatCurrency } from "../utils/portfolio";

export default function TransactionsTable({ transactions, onRemove }) {
  if (transactions.length === 0) {
    return <div className="empty-state">No transactions recorded.</div>;
  }

  const sorted = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="table-wrapper">
      <table className="holdings-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Symbol</th>
            <th>Type</th>
            <th className="num">Shares</th>
            <th className="num">Price</th>
            <th className="num">Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((t) => (
            <tr key={t.id}>
              <td>{t.date}</td>
              <td>
                <span className="symbol-badge">{t.symbol}</span>
              </td>
              <td>
                <span className={`type-badge ${t.type === "BUY" ? "buy" : "sell"}`}>
                  {t.type}
                </span>
              </td>
              <td className="num">{t.shares.toLocaleString()}</td>
              <td className="num">{formatCurrency(t.price)}</td>
              <td className="num bold">{formatCurrency(t.shares * t.price)}</td>
              <td>
                <button className="remove-btn" onClick={() => onRemove(t.id)}>
                  <Trash2 size={14} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
