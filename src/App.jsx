import { useState } from "react";
import { Plus, TrendingUp, List, PieChart, RefreshCw } from "lucide-react";
import SummaryCards from "./components/SummaryCards";
import HoldingsTable from "./components/HoldingsTable";
import AllocationChart from "./components/AllocationChart";
import PerformanceChart from "./components/PerformanceChart";
import TransactionsTable from "./components/TransactionsTable";
import AddHoldingModal from "./components/AddHoldingModal";
import AddTransactionModal from "./components/AddTransactionModal";
import {
  SAMPLE_HOLDINGS,
  SAMPLE_TRANSACTIONS,
  PORTFOLIO_HISTORY,
} from "./data/sampleData";
import { calcPortfolioTotals, nextId } from "./utils/portfolio";
import "./App.css";

const TABS = [
  { id: "holdings", label: "Holdings", icon: List },
  { id: "performance", label: "Performance", icon: TrendingUp },
  { id: "allocation", label: "Allocation", icon: PieChart },
  { id: "transactions", label: "Transactions", icon: RefreshCw },
];

export default function App() {
  const [holdings, setHoldings] = useState(SAMPLE_HOLDINGS);
  const [transactions, setTransactions] = useState(SAMPLE_TRANSACTIONS);
  const [tab, setTab] = useState("holdings");
  const [showAddHolding, setShowAddHolding] = useState(false);
  const [showAddTx, setShowAddTx] = useState(false);

  const totals = calcPortfolioTotals(holdings);

  function addHolding(data) {
    setHoldings((prev) => [...prev, { id: nextId(prev), ...data }]);
    setShowAddHolding(false);
  }

  function removeHolding(id) {
    setHoldings((prev) => prev.filter((h) => h.id !== id));
  }

  function addTransaction(data) {
    setTransactions((prev) => [...prev, { id: nextId(prev), ...data }]);
    setShowAddTx(false);
  }

  function removeTransaction(id) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-left">
          <span className="logo-icon">
            <TrendingUp size={22} />
          </span>
          <div>
            <h1 className="app-title">Portfolio Manager</h1>
            <p className="app-sub">Track your investments</p>
          </div>
        </div>
        <div className="header-right">
          {tab === "holdings" && (
            <button className="btn-primary" onClick={() => setShowAddHolding(true)}>
              <Plus size={16} /> Add Position
            </button>
          )}
          {tab === "transactions" && (
            <button className="btn-primary" onClick={() => setShowAddTx(true)}>
              <Plus size={16} /> Add Transaction
            </button>
          )}
        </div>
      </header>

      <main className="main">
        <SummaryCards totals={totals} holdingsCount={holdings.length} />

        <div className="tabs">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`tab ${tab === id ? "tab-active" : ""}`}
              onClick={() => setTab(id)}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>

        <div className="panel">
          {tab === "holdings" && (
            <HoldingsTable
              holdings={holdings}
              totalValue={totals.totalValue}
              onRemove={removeHolding}
            />
          )}

          {tab === "performance" && (
            <div>
              <h3 className="panel-title">Portfolio Value Over Time</h3>
              <PerformanceChart data={PORTFOLIO_HISTORY} />
            </div>
          )}

          {tab === "allocation" && (
            <div>
              <h3 className="panel-title">Sector Allocation</h3>
              <AllocationChart holdings={holdings} />
            </div>
          )}

          {tab === "transactions" && (
            <TransactionsTable
              transactions={transactions}
              onRemove={removeTransaction}
            />
          )}
        </div>
      </main>

      {showAddHolding && (
        <AddHoldingModal
          onAdd={addHolding}
          onClose={() => setShowAddHolding(false)}
        />
      )}

      {showAddTx && (
        <AddTransactionModal
          onAdd={addTransaction}
          onClose={() => setShowAddTx(false)}
        />
      )}
    </div>
  );
}
