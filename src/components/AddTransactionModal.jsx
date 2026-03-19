import { useState } from "react";
import { X } from "lucide-react";

const EMPTY = {
  date: new Date().toISOString().slice(0, 10),
  symbol: "",
  type: "BUY",
  shares: "",
  price: "",
};

export default function AddTransactionModal({ onAdd, onClose }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!form.symbol.trim()) e.symbol = "Required";
    if (!form.shares || isNaN(form.shares) || Number(form.shares) <= 0)
      e.shares = "Must be > 0";
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0)
      e.price = "Must be > 0";
    if (!form.date) e.date = "Required";
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
      date: form.date,
      symbol: form.symbol.toUpperCase().trim(),
      type: form.type,
      shares: Number(form.shares),
      price: Number(form.price),
    });
  }

  function set(field) {
    return (e) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      setErrors((err) => ({ ...err, [field]: undefined }));
    };
  }

  const total =
    form.shares && form.price ? Number(form.shares) * Number(form.price) : null;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal">
        <div className="modal-header">
          <h2>Add Transaction</h2>
          <button className="icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <Field label="Date" error={errors.date}>
              <input type="date" value={form.date} onChange={set("date")} />
            </Field>
            <Field label="Type">
              <select value={form.type} onChange={set("type")}>
                <option value="BUY">BUY</option>
                <option value="SELL">SELL</option>
              </select>
            </Field>
          </div>
          <div className="form-row">
            <Field label="Ticker Symbol" error={errors.symbol}>
              <input
                value={form.symbol}
                onChange={set("symbol")}
                placeholder="e.g. AAPL"
                maxLength={10}
              />
            </Field>
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
          </div>
          <div className="form-row">
            <Field label="Price / Share ($)" error={errors.price}>
              <input
                type="number"
                value={form.price}
                onChange={set("price")}
                placeholder="0.00"
                min="0.0001"
                step="any"
              />
            </Field>
            <Field label="Total Value">
              <input
                readOnly
                value={
                  total
                    ? new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(total)
                    : ""
                }
                placeholder="Auto-calculated"
                className="readonly"
              />
            </Field>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Add Transaction
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
