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
      margin: 0.22,
      filename: "iternerary.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(options).from(element).save();
  };

  return (
    <div className="formViewContainar" id="printSection">
      <button onClick={handlePrintPdf}>Print to PDF</button>
      <header className="header">
        <img
          src={"/Logo RD.jpg"}
          alt="Rising Destination"
          className="logo"
        />
        <h1>Experiential Japan Package</h1>
        <h2>07 Nights/ 08 Days</h2>
      </header>
      <table className="info-table">
        <tbody>
          <tr>
            <td>File Code</td>
            <td>{itineraryData.fileCode}</td>
            <td>Agent</td>
            <td colSpan="3">{itineraryData.agent}</td>
          </tr>
          <tr>
            <td>Group Name</td>
            <td>{itineraryData.groupName}</td>
            <td>Client Name</td>
            <td>{itineraryData.clientName}</td>
          </tr>
          <tr>
            <td>Total Pax</td>
            <td>{itineraryData.totalPax}</td>
            <td>Tour Date</td>
            <td>{itineraryData.tourDate}</td>
          </tr>
          <tr>
            <td>Flight</td>
            <td>{itineraryData.flight}</td>
            <td>Date of QTN</td>
            <td>{itineraryData.dateOfQtn}</td>
          </tr>
          <tr>
            <td>Itinerary</td>
            <td colSpan="3">{itineraryData.itinerary}</td>
          </tr>
          <tr>
            <td>Validity</td>
            <td colSpan="3">{itineraryData.validity}</td>
          </tr>
        </tbody>
      </table>
      <h3>Services</h3>
      <table className="services-table">
        <thead>
          <tr>
            <th>City</th>
            <th>Day</th>
            <th>Date</th>
            <th>Service</th>
            <th>Duration</th>
            <th>Mode</th>
            <th>Meal</th>
          </tr>
        </thead>
        <tbody>
          {itineraryData.services.map((service, index) => (
            <tr key={index}>
              <td>{service.city}</td>
              <td>{service.day}</td>
              <td>{service.date}</td>
              <td>{service.service}</td>
              <td>{service.duration}</td>
              <td>{service.mode}</td>
              <td>{service.meal}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Hotels Envisaged</h3>
      <table className="hotels-table">
        <thead>
          <tr>
            <th>City</th>
            <th>Dates</th>
            <th>Nights</th>
            <th>Hotels</th>
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
      <table className="quotation-table">
        <thead>
          <tr>
            <th>Slab</th>
            <th>Minimum Pax</th>
            <th>Maximum Pax</th>
            <th>No. of FOC</th>
            <th>PP Cost</th>
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
        <p key={i}> {item}</p>
      ))}
      <h3>EXCLUSION</h3>
      {Exclusion.map((item, i) => (
        <p key={i}> {item}</p>
      ))}
      <h3>TOUR CONDITION</h3>
      <table className="tour-condition-table">
        <tbody>
          {tourConditionData.map((item, index) => (
            <tr key={index}>
              <td>{item.condition}</td>
              <td>{item.detail}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>
        JAPAN STATES TRANSPORTATION AGENCY DRIVER WORKING HOURS REGULATION
      </h3>
      {TransportaionRules.map((item, i) => (
        <p key={i}> {item}</p>
      ))}
    </div>
  );
};
