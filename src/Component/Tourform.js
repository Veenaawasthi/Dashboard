import React, { useEffect, useState } from "react";
import "./Tourform.css";
import { useNavigate } from "react-router-dom";

const Tourform = ({ addClient, editQeryFormData, updateQueryFormHandler,queryForms }) => {
  const navigator=useNavigate();
  const [formData, setFormData] = useState({
    adult: "",
    child: "",
    infant: "",
    company: "",
    name: "",
    city: "",
    address: "",
    mobile: "",
    email: "",
    status: "",
    duration: "",
    queryDate: "",
    tourStartDate: "",
    uid: "",
    agentHandling: "",
  });

  const generateTravelString = (adult, fullName, travelDate) => {
    const initials = fullName
      .split(" ")
      .map((name) => name.charAt(0))
      .join("")
      .toUpperCase();
    const date = new Date(travelDate);
    const day = String(date.getDate()).padStart(2, "0");
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getMonth()];
    const year = String(date.getFullYear()).slice(-2);
    return `${String(adult).padStart(2, "0")}_${initials}${day}${month}${year}`;
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const uid = generateTravelString(
      formData.adult,
      formData.name,
      formData.tourStartDate
    );
    const updatedFormData = { ...formData, uid };
    console.log("first", updatedFormData);

    try {
      // Simulating adding client to state
      addClient([...queryForms,updatedFormData]); // Assuming addClient is provided via props
      alert("Form submitted successfully");
      handleReset();
      navigator('/query-dashboard')
    } catch (error) {
      console.error("Error submitting form", error);
      alert(`Failed to submit the form: ${error.message}`);
    }
  };

  const handleUpdate = () => {
    try {
      updateQueryFormHandler(formData);
      alert("Form submitted successfully");
      handleReset();
      navigator('/query-dashboard')
    } catch (error) {
      console.error("Error submitting form", error);
      alert(`Failed to submit the form: ${error.message}`);
    }
  };

  const handleReset = () => {
    setFormData({
      adult: "",
      child: "",
      infant: "",
      company: "",
      name: "",
      city: "",
      address: "",
      mobile: "",
      email: "",
      status: "",
      duration: "",
      queryDate: "",
      tourStartDate: "",
      uid: "",
      agentHandling: "",
    });
  };

  useEffect(() => {
    if (editQeryFormData) {
      setFormData(editQeryFormData);
    }
  }, [editQeryFormData]);

  return (
    <form
      className="form"
      onSubmit={editQeryFormData ? handleUpdate : handleSubmit}
    >
      <h1 className="form-h1"> * Query Form *</h1>
      <div className="form-group">
        <label htmlFor="pax">Pax:</label>
        <div className="div-pax">
          <label htmlFor="adult">Adult(12+):</label>
          <input
            type="number"
            id="adult"
            name="adult"
            min="0"
            value={formData.adult}
            onChange={handleChange}
            required
          />
          <label htmlFor="child">Child(2-12):</label>
          <input
            type="number"
            id="child"
            name="child"
            min="0"
            value={formData.child}
            onChange={handleChange}
            required
          />
          <label htmlFor="infant">Infant(less than 2):</label>
          <input
            type="number"
            id="infant"
            name="infant"
            value={formData.infant}
            onChange={handleChange}
            min="0"
            required
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="company">Company:</label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="address">Address:</label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="mobile">Mobile:</label>
        <input
          type="text"
          id="mobile"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="">Select Status</option>
          <option value="Replied">Replied</option>
          <option value="Open">Open</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Lost">Lost</option>
          <option value="NA(Reason for NA)">NA(Reason for NA)</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="duration">Duration:</label>
        <input
          type="number"
          id="duration"
          name="duration"
          min="0"
          value={formData.duration}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="queryDate">Query Date:</label>
        <input
          type="date"
          id="queryDate"
          name="queryDate"
          value={formData.queryDate}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="tourStartDate">Tour start date:</label>
        <input
          type="date"
          id="tourStartDate"
          name="tourStartDate"
          value={formData.tourStartDate}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="uid">UID (File Name):</label>
        <input
          type="text"
          id="uid"
          name="uid"
          disabled
          value={formData.uid}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="agentHandling">
          Agent Handling (Initials of employee):
        </label>
        <input
          type="text"
          id="agentHandling"
          name="agentHandling"
          value={formData.agentHandling}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        {editQeryFormData ? (
          <button onClick={handleUpdate} className="submit">
            Update
          </button>
        ) : (
          <button type="submit" className="submit">
            Submit
          </button>
        )}
        <button type="button" onClick={handleReset} className="reset">
          Reset
        </button>
      </div>
    </form>
  );
};

export default Tourform;
