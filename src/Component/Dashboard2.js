import React, { useEffect, useState } from "react";
import "./Dashboard2.css";
import { useNavigate } from "react-router-dom";

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
    if(searchName.length){
       const filteredForms=forms.filter((form)=>form.clientName.toLowerCase().includes(searchName.toLocaleLowerCase()))
       setFormList(filteredForms)
    }else if(searchFileCode.length){
      const filteredForms=forms.filter((form)=>form.fileCode.toLowerCase().includes(searchFileCode.toLocaleLowerCase()))
      setFormList(filteredForms)
    }
    else{
      setFormList(forms)
    }
  }, [forms,searchFileCode,searchName]);

  const handleView = (form) => {
    setItineraryData(form);
    navigate("/view");
  };

  return (
    <div className="dashboard">
      <h1 style={{ color: "black", backgroundColor: "AppWorkspace" }}>
        Itinerary Dashboard
      </h1>
      <div className="search-bar">
        <label style={{textAlign:'center'}}>Search by Name</label>
        <input
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <label style={{textAlign:'center'}}>Search by File Code</label>
        <input
          type="text"
          value={searchFileCode}
          onChange={(e) => setSearchFileCode(e.target.value)}
        />
      </div>
      <div className="total-itineraries">
        <p>Total Itineraries: {forms.length}</p>
      </div>
      {formList?.length === 0 ? (
        <p>No forms submitted yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>File Code</th>
              <th>Name</th>
              <th>Group Name</th>
              <th>Total Pax</th>
              <th>Tour Date</th>
              <th>Flight</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {formList?.map((form, index) => (
              <tr key={index}>
                <td>{form.fileCode}</td>
                <td>{form.clientName}</td>
                <td>{form.groupName}</td>
                <td>{form.totalPax}</td>
                <td>{form.tourDate}</td>
                <td>{form.flight}</td>
                <td>
                  <button onClick={() => handleView(form)}>
                    View Form Details
                  </button>
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

export default Dashboard;
