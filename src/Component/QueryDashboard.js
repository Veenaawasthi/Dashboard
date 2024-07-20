import React from "react";
import "./Dashboard2.css";
import { useNavigate } from "react-router-dom";

const QeryDashboard = ({ forms,setEditQeryFormData }) => {
  const navigate = useNavigate();
  const handleEdit = (form) => {
    setEditQeryFormData(form);
    navigate("/queryeditForm");
  };

  return (
    <div className="dashboard">
      <h1 style={{ color: "black", backgroundColor: "AppWorkspace" }}>
        Query Dashboard
      </h1>
      <div className="total-itineraries">
        <p>Total Query: {forms.length}</p>
      </div>
      {forms?.length === 0 ? (
        <p>No forms submitted yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>UID</th>
              <th>Client Name</th>
              <th>Company Name</th>
              <th>Query Date</th>
              <th>Tour Start Date</th>
              <th>Agent</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {forms?.map((form, index) => (
              <tr key={index}>
                <td>{form.uid}</td>
                <td>{form.name}</td>
                <td>{form.company}</td>
                <td>{form.queryDate}</td>
                <td>{form.tourStartDate}</td>
                <td>{form.agentHandling}</td>
                <td>{form.address},{form.city}</td>
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

export default QeryDashboard;
