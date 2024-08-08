import React, { useEffect, useState } from "react";
import "./Dashboard2.css";
import { useNavigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons

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
              <th><i className="bi bi-file-earmark-text"></i> UID</th>
              <th><i className="bi bi-person"></i> Client Name</th>
              <th><i className="bi bi-building"></i> Company Name</th>
              <th><i className="bi bi-flag"></i> Status</th>
              <th><i className="bi bi-calendar"></i> Query Date</th>
              <th><i className="bi bi-calendar-date"></i> Tour Start Date</th>
              <th><i className="bi bi-person-badge"></i> Agent</th>
              <th><i className="bi bi-house-door"></i> Address</th>
              <th><i className="bi bi-gear"></i> Action</th>
            </tr>
          </thead>
          <tbody>
            {queryFormList?.map((form, index) => (
              <tr key={index}>
                <td>{form.uid}</td>
                <td>{form.name}</td>
                <td>{form.company}</td>
                <td className={getStatusColorClass(form.status)}>
                  <i className={`bi bi-circle-fill ${getStatusColorClass(form.status)}`}></i> {form.status}
                </td>
                <td>{form.queryDate}</td>
                <td>{form.tourStartDate}</td>
                <td>{form.agentHandling}</td>
                <td>
                  {form.address}, {form.city}
                </td>
                <td>
                  <button onClick={() => handleEdit(form)}>
                    <i className="bi bi-pencil"></i> Edit
                  </button>
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



