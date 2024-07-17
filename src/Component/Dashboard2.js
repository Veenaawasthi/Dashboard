import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Make sure to install jspdf-autotable plugin
import Form from './Form'; // Adjust path as needed
import './Dashboard2.css';

const Dashboard = ({ forms }) => {
  const [editForm, setEditForm] = useState(null);
  const [searchName, setSearchName] = useState('');
  const [searchFileCode, setSearchFileCode] = useState('');

  // Function to handle downloading PDF of a form
  const handleDownload = (form) => {
    const {
      logo,
      name,
      groupName,
      totalPax,
      tourDate,
      flight,
      clientName,
      dateOfQtn,
      agent,
      days,
      date,
      city,
      service,
      duration,
      mode,
      meal,
      hotels,
      hotelNights,
      ppCost,
      slab,
      minPax,
      maxPax,
      noOfFoc,
      nights,
      dates,
      filecode
    } = form;

    const doc = new jsPDF();
    doc.setTextColor(0, 0, 0); // Black text

    // Function to add content to PDF document
    const addContent = () => {
      let startY = 20; // Adjust start position as needed
      doc.setFontSize(16);
      doc.text("Itinerary Form", 14, startY);
      doc.setFontSize(12);

      // General details section
      const details = [
        ["Name:", name],
        ["Group Name:", groupName],
        ["Total Pax:", totalPax],
        ["Tour Date:", tourDate],
        ["Flight:", flight],
        ["Client Name:", clientName],
        ["Date of QTN:", dateOfQtn],
        ["Agent:", agent]
      ];

      doc.autoTable({
        head: [['Field', 'Value']],
        body: details,
        startY: startY + 10, // Adjust start Y position of the table
        theme: 'plain', // Optional - change table theme
        columnStyles: {
          0: { fontStyle: 'bold' } // Style for the first column (Field)
        }
      });

      // Itinerary details section
      const itineraryDetails = [
        ["Days", days],
        ["Date", date],
        ["City", city],
        ["Service", service],
        ["Duration", duration],
        ["Mode", mode],
        ["Meal", meal],
        ["Hotels", hotels],
        ["Hotel Nights", hotelNights],
        ["PP Cost", ppCost]
      ];

      doc.autoTable({
        head: [['Field', 'Value']],
        body: itineraryDetails,
        startY: doc.autoTable.previous.finalY + 10, // Start below the previous table
        theme: 'plain', // Optional - change table theme
        columnStyles: {
          0: { fontStyle: 'bold' } // Style for the first column (Field)
        }
      });

      // Quotation Slab table section
      const slabData = [
        ["Slab", slab],
        ["Min Pax", minPax],
        ["Max Pax", maxPax],
        ["No. of Foc", noOfFoc],
        ["Nights", nights],
        ["Dates", dates]
      ];

      doc.autoTable({
        head: [['Field', 'Value']],
        body: slabData,
        startY: doc.autoTable.previous.finalY + 10, // Start below the previous table
        theme: 'grid', // Optional - change table theme
        columnStyles: {
          0: { fontStyle: 'bold' } // Style for the first column (Field)
        }
      });

      // Add logo if available
      if (logo) {
        const img = new Image();
        img.src = logo;
        img.onload = function () {
          doc.addImage(this, 'JPEG', 150, 10, 40, 40);
          doc.save(`${filecode}_itinerary.pdf`);
        };
      } else {
        doc.save(`${filecode}_itinerary.pdf`);
      }
    };

    addContent();
  };

  // Function to handle editing a form
  const handleEdit = (form) => {
    setEditForm(form);
  };

  // Function to handle cancelling edit mode
  const handleCancelEdit = () => {
    setEditForm(null);
  };

  // Function to handle updating a form after editing
  const handleUpdateForm = (updatedForm) => {
    // Logic to update the form in your state or backend
    console.log('Updated form:', updatedForm);
    setEditForm(null); // Clear the edit form state after updating
  };

  // Filter forms based on search inputs
  const filteredForms = forms.filter(form => {
    const nameMatch = form.name ? form.name.toLowerCase().includes(searchName.toLowerCase()) : false;
    const fileCodeMatch = form.filecode ? form.filecode.toLowerCase().includes(searchFileCode.toLowerCase()) : false;
    return nameMatch && fileCodeMatch;
  });

  return (
    <div className="dashboard">
      <h1 style={{ color: 'black', backgroundColor: "AppWorkspace" }}>Itinerary Dashboard</h1>
      <div className="search-bar">
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
      </div>
      <div className="total-itineraries">
        <p>Total Itineraries: {forms.length}</p>
      </div>
      {filteredForms.length === 0 ? (
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
            {filteredForms.map((form, index) => (
              <tr key={index}>
                <td>{form.filecode}</td>
                <td>{form.name}</td>
                <td>{form.groupName}</td>
                <td>{form.totalPax}</td>
                <td>{form.tourDate}</td>
                <td>{form.flight}</td>
                <td>
                  <button onClick={() => handleDownload(form)}>Download PDF</button>
                  <button onClick={() => handleEdit(form)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editForm && (
        <div className="edit-form">
          <h2>Edit Form</h2>
          <Form
            formData={editForm}
            onSubmit={handleUpdateForm}
            onCancel={handleCancelEdit}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;



