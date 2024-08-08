import React, { useEffect, useState } from "react";
import "./Dashboard2.css";
import { useNavigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons

const Dashboard = ({ forms, setItineraryData, setEditFormData }) => {
  const [searchName, setSearchName] = useState("");
  const [searchFileCode, setSearchFileCode] = useState("");
  const [formList, setFormList] = useState([]);
  const navigate = useNavigate();

  // Function to handle editing a form
  const handleEdit = (form) => {
    setEditFormData(form);
    navigate("/editForm");
  };

  // Filter forms based on search inputs
  useEffect(() => {
    const filteredForms = forms.filter((form) =>
      form.clientName.toLowerCase().includes(searchName.toLowerCase()) &&
      form.fileCode.toLowerCase().includes(searchFileCode.toLowerCase())
    );
    setFormList(filteredForms);
  }, [forms, searchFileCode, searchName]);

  const handleView = (form) => {
    setItineraryData(form);
    navigate("/view");
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Itinerary Dashboard</h1>
      <div className="search-bar">
        <label style={{ textAlign: 'center' }}>Search by Name</label>
        <input
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <label style={{ textAlign: 'center' }}>Search by File Code</label>
        <input
          type="text"
          value={searchFileCode}
          onChange={(e) => setSearchFileCode(e.target.value)}
        />
      </div>
      <div className="total-itineraries">
        <p>Total Itineraries: {forms.length}</p>
      </div>
      {formList.length === 0 ? (
        <p>No forms submitted yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th><i className="bi bi-file-earmark-text"></i> File Code</th>
              <th><i className="bi bi-person"></i> Name</th>
              <th><i className="bi bi-house-door"></i> Group Name</th>
              <th><i className="bi bi-people"></i> Total Pax</th>
              <th><i className="bi bi-calendar"></i> Tour Date</th>
              <th><i className="bi bi-plane"></i> Flight</th>
              <th><i className="bi bi-gear"></i> Action</th>
            </tr>
          </thead>
          <tbody>
            {formList.map((form, index) => (
              <tr key={index}>
                <td>{form.fileCode}</td>
                <td>{form.clientName}</td>
                <td>{form.groupName}</td>
                <td>{form.totalPax}</td>
                <td>{form.tourDate}</td>
                <td>{form.flight}</td>
                <td>
                  <button onClick={() => handleView(form)}>
                    <i className="bi bi-eye"></i> View Form Details
                  </button>
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

export default Dashboard;

