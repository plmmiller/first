import { useState } from "react";
import { X } from "lucide-react";

const SECTORS = [
  "Technology",
  "Financials",
  "Healthcare",
  "Energy",
  "Telecom",
  "Consumer Staples",
  "Consumer Discretionary",
  "Industrials",
  "Materials",
  "Real Estate",
  "Utilities",
];

const EMPTY = {
  symbol: "",
  name: "",
  shares: "",
  avgCost: "",
  currentPrice: "",
  sector: "Technology",
};

export default function AddHoldingModal({ onAdd, onClose }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!form.symbol.trim()) e.symbol = "Required";
    if (!form.name.trim()) e.name = "Required";
    if (!form.shares || isNaN(form.shares) || Number(form.shares) <= 0)
      e.shares = "Must be > 0";
    if (!form.avgCost || isNaN(form.avgCost) || Number(form.avgCost) <= 0)
      e.avgCost = "Must be > 0";
    if (
      !form.currentPrice ||
      isNaN(form.currentPrice) ||
      Number(form.currentPrice) <= 0
    )
      e.currentPrice = "Must be > 0";
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onAdd({
      symbol: form.symbol.toUpperCase().trim(),
      name: form.name.trim(),
      shares: Number(form.shares),
      avgCost: Number(form.avgCost),
      currentPrice: Number(form.currentPrice),
      sector: form.sector,
    });
  }

  function set(field) {
    return (e) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      setErrors((err) => ({ ...err, [field]: undefined }));
    };
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h2>Add Position</h2>
          <button className="icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <Field label="Ticker Symbol" error={errors.symbol}>
              <input
                value={form.symbol}
                onChange={set("symbol")}
                placeholder="e.g. AAPL"
                maxLength={10}
              />
            </Field>
            <Field label="Company Name" error={errors.name}>
              <input
                value={form.name}
                onChange={set("name")}
                placeholder="e.g. Apple Inc."
              />
            </Field>
          </div>
          <div className="form-row">
            <Field label="Shares" error={errors.shares}>
              <input
                type="number"
                value={form.shares}
                onChange={set("shares")}
                placeholder="0"
                min="0.0001"
                step="any"
              />
            </Field>
            <Field label="Avg Cost / Share ($)" error={errors.avgCost}>
              <input
                type="number"
                value={form.avgCost}
                onChange={set("avgCost")}
                placeholder="0.00"
                min="0.0001"
                step="any"
              />
            </Field>
          </div>
          <div className="form-row">
            <Field label="Current Price ($)" error={errors.currentPrice}>
              <input
                type="number"
                value={form.currentPrice}
                onChange={set("currentPrice")}
                placeholder="0.00"
                min="0.0001"
                step="any"
              />
            </Field>
            <Field label="Sector">
              <select value={form.sector} onChange={set("sector")}>
                {SECTORS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Add Position
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div className={`form-field ${error ? "field-error" : ""}`}>
      <label>{label}</label>
      {children}
      {error && <span className="error-msg">{error}</span>}
    </div>
  );
}
