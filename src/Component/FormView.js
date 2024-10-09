import React from "react";
import "./FormView.css";
import {
  tourConditionData,
  TransportaionRules,
  Exclusion,
  Inclusions,
} from "./Service";
import html2pdf from "html2pdf.js";

export const FormView = ({ itineraryData }) => {
  const handlePrintPdf = () => {
    const element = document.getElementById("printSection");

    const options = {
      margin: 0.5,
      filename: "itinerary.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
    };

    html2pdf().set(options).from(element).save();
  };
  const getIconClass = (service) => {
    switch (service) {
      case 'City':
        return 'fas fa-location';
      case 'Time':
        return 'fas fa-clock';
      case 'Service':
        return 'bi bi-geo';
      case 'Mode':
        return 'fas fa-subway';
      case 'File Code':
        return 'fas fa-file-alt';
      case 'Group Name':
        return 'fas fa-users';
      case 'Total Pax':
        return 'fas fa-user-friends';
      case 'Client Name':
        return 'fas fa-user';
      case 'Agent':
        return 'fas fa-user-tie';
      case 'Itinerary':
        return 'fas fa-map-signs';
      case 'Validity':
        return 'fas fa-calendar-check';
      case 'Tour Date':
        return 'fas fa-calendar';
      case 'Date of QTN':
        return 'fas fa-calendar-alt';
      default:
        return '';
    }
  };

  return (
    <div className="formViewContainar" id="printSection">
      <button onClick={handlePrintPdf} className="btn btn-primary mb-3">
        <i className="fas fa-print"></i> Print to PDF
      </button>
      <header className="header">
        <img src={"/Logo RD.jpg"} alt="Rising Destination" className="logo" />
        <h1>Experiential Japan Package</h1>
        <h2>{itineraryData.validity}</h2>
      </header>
      <table className="table table-bordered">
        <tbody>
          <tr>
            <td><i className={getIconClass('File Code')}></i> File Code</td>
            <td>{itineraryData.fileCode}</td>
            <td><i className={getIconClass('Agent')}></i> Agent</td>
            <td colSpan="3">{itineraryData.agent}</td>
          </tr>
          <tr>
            <td><i className={getIconClass('Group Name')}></i> Group Name</td>
            <td>{itineraryData.groupName}</td>
            <td><i className={getIconClass('Client Name')}></i> Client Name</td>
            <td>{itineraryData.clientName}</td>
          </tr>
          <tr>
            <td><i className={getIconClass('Total Pax')}></i> Total Pax</td>
            <td>{itineraryData.totalPax}</td>
            <td><i className={getIconClass('Tour Date')}></i> Tour Date</td>
            <td>{itineraryData.tourDate}</td>
          </tr>
          <tr>
            <td><i className="fas fa-plane-departure ml-1"></i> Flight</td>
            <td>{itineraryData.flight}</td>
            <td><i className={getIconClass('Date of QTN')}></i> Date of QTN</td>
            <td>{itineraryData.dateOfQtn}</td>
          </tr>
          <tr>
            <td><i className={getIconClass('Itinerary')}></i> Itinerary</td>
            <td colSpan="3">{itineraryData.itinerary}</td>
          </tr>
          <tr>
            <td><i className={getIconClass('Validity')}></i> Validity</td>
            <td colSpan="3">{itineraryData.validity}</td>
          </tr>
        </tbody>
      </table>
      <h3>
        <i className="fas fa-route"></i> Itinerary Details
      </h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            
            <th> Day</th>
            <th> Date</th>
            <th> City</th>
            <th> Time</th>
            <th> Service</th>
            <th>Duration</th>
            <th>Mode</th>
            <th> Meal</th>
          </tr>
        </thead>
        <tbody>
          {itineraryData.services.map((service, index) => (
            <tr key={index}>
              
              <td>{service.day && <i className="fas fa-calendar-day icon-small"></i>} {service.day}</td>
              <td>{service.date && <i className="fas fa-calendar-alt icon-small"></i>} {service.date}</td>
              <td>{service.city && <i className={getIconClass('City') + ' icon-small'}></i>} {service.city}</td>
              <td>{service.time && <i className={getIconClass('Time') + ' icon-small'}></i>} {service.time}</td>
              <td>{service.service && <i className={getIconClass('Service') + ' icon-small'}></i>} {service.service}</td>
              <td>{service.duration && <i className="fas fa-hourglass-half icon-small"></i>} {service.duration}</td>
              <td>{service.mode && <i className={getIconClass('Mode') + ' icon-small'}></i>} {service.mode}</td>
              <td>{service.meal && <i className="fas fa-utensils icon-small"></i>} {service.meal}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3><i className="fas fa-hotel"></i> Hotels Envisaged</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th><i className="fas fa-city"></i> City</th>
            <th><i className="fas fa-calendar-alt"></i> Dates</th>
            <th><i className="fas fa-bed"></i> Nights</th>
            <th><i className="fas fa-hotel"></i> Hotels</th>
          </tr>
        </thead>
        <tbody>
          {itineraryData.hotels.map((hotel, index) => (
            <tr key={index}>
              <td>{hotel.city}</td>
              <td>{hotel.dates}</td>
              <td>{hotel.nights}</td>
              <td>{hotel.hotel}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Quotation Slab</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th><i className="fas fa-sliders-h"></i> Slab</th>
            <th><i className="fas fa-user-friends"></i> Minimum Pax</th>
            <th><i className="fas fa-user-friends"></i> Maximum Pax</th>
            <th><i className="fas fa-user"></i> No. of FOC</th>
            <th><i className="fas fa-dollar-sign"></i> PP Cost</th>
          </tr>
        </thead>
        <tbody>
          {itineraryData.quotationSlab.map((slab, index) => (
            <tr key={index}>
              <td>{slab.slab}</td>
              <td>{slab.minPax}</td>
              <td>{slab.maxPax}</td>
              <td>{slab.noOfFOC}</td>
              <td>{slab.ppCost}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>INCLUSION</h3>
      {Inclusions.map((item, i) => (
        <p key={i}><i className="fas fa-check"></i> {item}</p>
      ))}
      <h3>EXCLUSION</h3>
      {Exclusion.map((item, i) => (
        <p key={i}><i className="fas fa-times"></i> {item}</p>
      ))}
       <h3>TOUR CONDITION</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>
              <i className="fas fa-info-circle"></i> Condition
            </th>
            <th>
              <i className="fas fa-info-circle"></i> Detail
            </th>
          </tr>
        </thead>
        <tbody>
          {tourConditionData.map((item, index) => (
            <tr key={index}>
              <td>{item.condition}</td>
              <td>{item.detail}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>JAPAN STATES TRANSPORTATION AGENCY DRIVER WORKING HOURS REGULATION</h3>
      {TransportaionRules.map((item, i) => (
        <p key={i}><i className="fas fa-clock"></i> {item}</p>
      ))}
    </div>
  );
};