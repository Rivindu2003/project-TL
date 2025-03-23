import React, { useEffect, useState } from "react";
import "../styles/ViewPaymentsPage.css";

const ViewPaymentsPage = () => {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/payments");
      const data = await response.json();
      setPayments(data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (status) => {
    setFilter(status);
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await fetch(`http://localhost:5000/api/payments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchPayments();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this payment?")) {
      try {
        await fetch(`http://localhost:5000/api/payments/${id}`, {
          method: "DELETE",
        });
        fetchPayments();
      } catch (error) {
        console.error("Error deleting payment:", error);
      }
    }
  };

  const filteredPayments = payments.filter((payment) => {
    return (
      (filter === "all" || payment.status === filter) &&
      (payment.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="payments-container">
      <h2>Payment Details</h2>

      <div className="search-filter">
        <input
          type="text"
          placeholder="🔍 Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button onClick={() => handleFilterChange("all")}>All</button>
        <button onClick={() => handleFilterChange("Pending")}>Pending</button>
        <button onClick={() => handleFilterChange("Paid")}>Paid</button>
      </div>

      <table className="payments-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Method</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPayments.map((payment) => (
            <tr key={payment._id}>
              <td>{payment.firstName}</td>
              <td>{payment.lastName}</td>
              <td>{payment.email}</td>
              <td>{payment.phone}</td>
              <td>{payment.paymentMethod}</td>
              <td>
                <button
                  className={`status-btn ${payment.status.toLowerCase()}`}
                  onClick={() =>
                    handleStatusUpdate(
                      payment._id,
                      payment.status === "Pending" ? "Paid" : "Pending"
                    )
                  }
                >
                  {payment.status}
                </button>
              </td>
              <td>
                <button className="delete-btn" onClick={() => handleDelete(payment._id)}>
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewPaymentsPage;
