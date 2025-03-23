import React, { useState } from "react";
import "../styles/PaymentPage.css";

const PaymentPage = () => {
  const [paymentData, setPaymentData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    paymentMethod: "bank_transfer",
    file: null,
  });

  const [fileError, setFileError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPaymentData({ ...paymentData, file });
      setFileName(file.name);
      setFileError("");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    if (e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setPaymentData({ ...paymentData, file });
      setFileName(file.name);
      setFileError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (paymentData.paymentMethod === "bank_transfer" && !paymentData.file) {
      setFileError("Payment slip is required for bank transfer.");
      return;
    }

    const formData = new FormData();
    formData.append("firstName", paymentData.firstName);
    formData.append("lastName", paymentData.lastName);
    formData.append("email", paymentData.email);
    formData.append("phone", paymentData.phone);
    formData.append("paymentMethod", paymentData.paymentMethod);
    if (paymentData.file) {
      formData.append("paymentSlip", paymentData.file);
    }

    try {
      const response = await fetch("http://localhost:5000/api/payments", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Payment submitted successfully!");
        setPaymentData({ firstName: "", lastName: "", email: "", phone: "", paymentMethod: "bank_transfer", file: null });
        setFileName("");
      } else {
        alert("Error submitting payment.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit payment.");
    }
  };

  return (
    <div className="payment-container">
      <h2>Payment</h2>
      <form onSubmit={handleSubmit} className="payment-form">
        <div className="input-group">
          <div>
            <label>First Name</label>
            <input type="text" name="firstName" value={paymentData.firstName} onChange={handleChange} required />
          </div>
          <div>
            <label>Last Name</label>
            <input type="text" name="lastName" value={paymentData.lastName} onChange={handleChange} required />
          </div>
        </div>

        <div className="input-group">
          <div>
            <label>E-mail address</label>
            <input type="email" name="email" value={paymentData.email} onChange={handleChange} required />
          </div>
          <div>
            <label>Phone number</label>
            <input type="tel" name="phone" value={paymentData.phone} onChange={handleChange} required />
          </div>
        </div>

        <div className="payment-options">
          <label>Payment Option</label>
          <div className="payment-methods">
            <label className="custom-checkbox">
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={paymentData.paymentMethod === "cash"}
                onChange={handleChange}
              />
              <span className="icon">💰</span> Cash
            </label>

            <label className="custom-checkbox">
              <input
                type="radio"
                name="paymentMethod"
                value="bank_transfer"
                checked={paymentData.paymentMethod === "bank_transfer"}
                onChange={handleChange}
              />
              <span className="icon">🏦</span> Bank Transfer
            </label>
          </div>
        </div>

        {paymentData.paymentMethod === "bank_transfer" && (
          <div className="file-upload">
            <label>Upload payment slip (Required for Bank Transfer)</label>
            <div
              className={`drop-area ${dragActive ? "drag-active" : ""}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input type="file" name="file" accept="image/*, application/pdf" onChange={handleFileChange} />
              <p>{fileName ? `📄 ${fileName}` : "📤 Drag & drop here or select one"}</p>
            </div>
            {fileError && <p className="error-text">{fileError}</p>}
          </div>
        )}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PaymentPage;
