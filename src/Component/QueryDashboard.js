import React, { useEffect, useState } from "react";
import "./Dashboard2.css";
import { useNavigate } from "react-router-dom";

const QueryDashboard = ({ forms, setEditQeryFormData }) => {
  const [searchUID, setSearchUID] = useState("");
  const [queryFormList, setQueryFormList] = useState([]);
  const navigate = useNavigate();

  const handleEdit = (form) => {
    setEditQeryFormData(form);
    navigate("/queryeditForm");
  };

  useEffect(() => {
    if (searchUID.length) {
      const filteredForms = forms.filter((form) =>
        form.uid.toLowerCase().includes(searchUID.toLowerCase())
      );
      setQueryFormList(filteredForms);
    } else {
      setQueryFormList(forms);
    }
  }, [forms, searchUID]);

  const getStatusColorClass = (status) => {
    switch (status) {
      case "Replied":
        return "status-Replied";
      case "Open":
        return "status-Open";
      case "Lost":
        return "status-Lost";
      case "Confirmed":
        return "status-Confirmed";
      case "NA":
        return "status-NA";
      default:
        return "";
    }
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Query Dashboard</h1>
      <div className="search-bar">
        <label className="search-label">Search by UID</label>
        <input
          type="text"
          value={searchUID}
          onChange={(e) => setSearchUID(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="total-queries">
        <p>Total Queries: {forms.length}</p>
      </div>
      {queryFormList?.length === 0 ? (
        <p>No forms submitted yet.</p>
      ) : (
        <table className="queries-table">
          <thead>
            <tr>
              <th>UID</th>
              <th>Client Name</th>
              <th>Company Name</th>
              <th>Status</th>
              <th>Query Date</th>
              <th>Tour Start Date</th>
              <th>Agent</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {queryFormList?.map((form, index) => (
              <tr key={index}>
                <td>{form.uid}</td>
                <td>{form.name}</td>
                <td>{form.company}</td>
                <td className={getStatusColorClass(form.status)}>{form.status}</td>
                <td>{form.queryDate}</td>
                <td>{form.tourStartDate}</td>
                <td>{form.agentHandling}</td>
                <td>
                  {form.address}, {form.city}
                </td>
                <td>
                  <button onClick={() => handleEdit(form)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default QueryDashboard;

