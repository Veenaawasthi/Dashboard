import React from 'react';
import './Dashboard2.css';
import { useNavigate } from "react-router-dom";

const Dashboard = ({ forms,setItineraryData,setEditFormData}) => {
  // const [searchName, setSearchName] = useState('');
  // const [searchFileCode, setSearchFileCode] = useState('');
  const navigate = useNavigate();

  // Function to handle editing a form
  const handleEdit = (form) => {
    setEditFormData(form)
    navigate('/editForm')
  };


  // Filter forms based on search inputs
  // const filteredForms = forms.filter(form => {
  //   const nameMatch = form.name ? form.name.toLowerCase().includes(searchName.toLowerCase()) : false;
  //   const fileCodeMatch = form.filecode ? form.filecode.toLowerCase().includes(searchFileCode.toLowerCase()) : false;
  //   return nameMatch && fileCodeMatch;
  // });
  const handleView = (form) => {
    setItineraryData(form)
    navigate('/view')
  };

  return (
    <div className="dashboard">
      <h1 style={{ color: 'black', backgroundColor: "AppWorkspace" }}>Itinerary Dashboard</h1>
      {/* <div className="search-bar">
        <label>Search by Name</label>
        <input
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <label>Search by File Code</label>
        <input
          type="text"
          value={searchFileCode}
          onChange={(e) => setSearchFileCode(e.target.value)}
        />
      </div> */}
      <div className="total-itineraries">
        <p>Total Itineraries: {forms.length}</p>
      </div>
      {forms?.length === 0 ? (
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
            {forms?.map((form, index) => (
              <tr key={index}>
                <td>{form.fileCode}</td>
                <td>{form.clientName}</td>
                <td>{form.groupName}</td>
                <td>{form.totalPax}</td>
                <td>{form.tourDate}</td>
                <td>{form.flight}</td>
                <td>
                  <button onClick={() => handleView(form)}>View Form Details</button>
                  <button onClick={() => handleEdit(form)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* {editForm && (
        <div className="edit-form">
          <h2>Edit Form</h2>
          <Form
            formData={editForm}
            onSubmit={handleUpdateForm}
            onCancel={handleCancelEdit}
          />
        </div>
      )} */}
    </div>
  );
};

export default Dashboard;



