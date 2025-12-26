import React, { useState } from 'react';

const AddItem = ({ items = [], onAdd, onDelete }) => {
  const [formData, setFormData] = useState({ title: '', category: '', amount: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onAdd && formData.title && formData.category && formData.amount) {
      onAdd(formData);
      setFormData({ title: '', category: '', amount: '' });
    }
  };

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow-sm mb-4">
        <h3>Add New Expense</h3>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Category"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              required
            />
          </div>
          <div className="col-md-2">
            <input
              className="form-control"
              type="number"
              placeholder="Amount"
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              required
            />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-success w-100">Add Item</button>
          </div>
        </form>
      </div>

      <div className="card p-4 shadow-sm">
        <h3>Expense List ({Array.isArray(items) ? items.length : 0} items)</h3>
        {Array.isArray(items) && items.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr><th>Title</th><th>Category</th><th>Amount</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item?._id || index}>
                  <td>{item?.title || 'N/A'}</td>
                  <td>{item?.category || 'N/A'}</td>
                  <td>${item?.amount || '0'}</td>
                  <td>
                    {item?._id && onDelete ? (
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => onDelete(item._id)}
                        title="Delete expense"
                      >
                        🗑️
                      </button>
                    ) : (
                      <span className="text-muted">N/A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-muted">No expenses yet. Add your first expense above!</p>
        )}
      </div>
    </div>
  );
};

export default AddItem;