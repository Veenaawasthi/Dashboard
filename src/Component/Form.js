import React, { useState, useEffect } from "react";
import { cityServiceMapping, servicePriceMapping } from "./Service";
import { useNavigate } from "react-router-dom";

const Form = ({ formData, onSubmit }) => {
  const navigate = useNavigate();

  const [quotationSlabs, setQuotationSlabs] = useState([
    { slab: "", maxPax: "", minPax: "", noOfFOC: "", ppCost: "" },
  ]);

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPax, setTotalPax] = useState("");

  const [formState, setFormState] = useState({
    id: "", logo: "", name: "",  groupName: "", totalPax: "", tourDate: "", flight: "", service: "", clientName: "", dateOfQtn: "", agent: "",
    validity: "", itinerary: "", inclusions: true, exclusions: true, terms: true,
    days: [
      {
        day: "", date: "", city: "", time: "", service: "", mode: "", meal: "", duration: "",  price: "",  availableServices: []
      },
    ],
    hotels: [
      {
        city: "", dates: "", nights: "", hotel: "",
      },
    ],
    quotationSlabs: [
      { slab: "", maxPax: "", minPax: "", noOfFOC: "", ppCost: "" },
    ],
  });
  // Set Edit Form value
  useEffect(() => {
    if (formData) {
      const editFormData = {
        id: formData.id,
        logo: "",
        name: formData.clientName,
        groupName: formData.groupName,
        filecode: formData.fileCode,
        totalPax: formData.totalPax,
        tourDate: formData.tourDate,
        flight: formData.flight,
        service: "",
        clientName: formData.clientName,
        dateOfQtn: formData.dateOfQtn,
        agent: formData.agent,
        itinerary: formData.itinerary,
        validity: formData.validity,
        inclusions: true,
        exclusions: true,
        terms: true,
        days: formData.services,
        hotels: formData.hotels,
        quotationSlabs: formData.quotationSlabs,
      };
      setFormState(editFormData); // Sync form state with passed formData when editing
      setQuotationSlabs(formData?.quotationSlab);
    }
  }, [formData]);

  useEffect(() => {
    const priceSum = formState.days.reduce((acc, day) => acc + parseFloat(day.price || 0), 0);
    setTotalPrice(priceSum * totalPax);
  }, [formState, totalPax]);

  const handleTotalPaxChange = (e) => {
    setTotalPax(parseInt(e.target.value) || 1);
  };

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormState((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDayChange = (index, e) => {
    const { id, value } = e.target;
    const updatedDays = [...formState.days];
    updatedDays[index][id] = value;
    setFormState((prevData) => ({
      ...prevData,
      days: updatedDays,
    }));
  };

  // Handle city change and update services accordingly
  const handleCityChange = (dayIndex, e) => {
    const { value } = e.target;
    const updatedDays = [...formState.days];
    updatedDays[dayIndex].city = value;
    updatedDays[dayIndex].service = '';
    updatedDays[dayIndex].price = '';
    updatedDays[dayIndex].availableServices = cityServiceMapping[value] || [];
    setFormState((prevData) => ({
      ...prevData,
      days: updatedDays,
    }));
  };

  const handleServiceChange = (dayIndex, e) => {
    const { value } = e.target;
    const updatedDays = [...formState.days];
    updatedDays[dayIndex].service = value;
    updatedDays[dayIndex].price = servicePriceMapping[value] || '';
    setFormState((prevData) => ({
      ...prevData,
      days: updatedDays,
    }));
  };

  const handleDateChange = (dayIndex, e) => {
    const { value } = e.target;
    const updatedDays = [...formState.days];
    updatedDays[dayIndex].date = value;
    setFormState((prevData) => ({
      ...prevData,
      days: updatedDays,
    }));
  };
  
  const handleDurationChange = (dayIndex, serviceIndex, e) => {
    const { value } = e.target;
    const updatedDays = [...formState.days];
    updatedDays[dayIndex].duration = value;
    setFormState((prevData) => ({
      ...prevData,
      days: updatedDays,
    }));
  };
 const addDay = () => {
    setFormState((prevData) => ({
      ...prevData,
      days: [
        ...prevData.days,
        {
          day: "",  date: "",  time: "",  city: "",  services: "",  mode: "",  meal: "",  price: "",
        },
      ],
    }));
  };

  const handleHotelChange = (index, e) => {
    const { id, value } = e.target;
    const updatedHotels = [...formState.hotels];
    updatedHotels[index][id] = value;
    setFormState((prevData) => ({
      ...prevData,
      hotels: updatedHotels,
    }));
  };

  const addHotel = () => {
    setFormState((prevData) => ({
      ...prevData,
      hotels: [
        ...prevData.hotels,
        {
          city: "",  dates: "",  nights: "",  hotel: "",
        },
      ],
    }));
  };

  const handleQuotationSlabChange = (index, event) => {
    const { name, value } = event.target;
    const newSlabs = [...quotationSlabs];
    newSlabs[index][name] = value;
    setQuotationSlabs(newSlabs);
  };

  // Function to add a new row for quotation slabs
  const addQuotationSlabRow = () => {
    setQuotationSlabs([
      ...quotationSlabs,
      { slab: "", maxPax: "", minPax: "", noOfFOC: "", ppCost: "" },
    ]);
  };

  // Function to remove a row from quotation slabs
  const removeQuotationSlabRow = (index) => {
    const newSlabs = [...quotationSlabs];
    newSlabs.splice(index, 1);
    setQuotationSlabs(newSlabs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formState, quotationSlabs: quotationSlabs }); // Ensure onSubmit is a function
    navigate("/Dashboard");
  };

  const handleUpdate = () => {
    onSubmit({ ...formState, quotationSlabs: quotationSlabs });
    navigate("/Dashboard");
  };

  return (
    <div
      className="container"  style={{  maxWidth: "950px",  margin: "0 auto",  padding: "20px",  backgroundColor: "lightyellow",  border: "1px solid #ccc",  borderRadius: "8px",  }}
    >
      <h1 style={{ fontFamily: "Arial, sans-serif", color: "black" }}>
        ITINERARY FORM
      </h1>
      <form onSubmit={handleSubmit}>
        <div id="itineraryForm">
          <div
            style={{backgroundColor: "#fff",padding: "20px", border: "1px solid #ddd",borderRadius: "8px", }}>
            <div style={{display: "flex",alignItems: "center",backgroundColor: "lightblue",}}>
              <img src={"/Logo RD.jpg"} alt={"Logo RD"} className="company-logo" style={{ maxWidth: "200px", marginRight: "20px" }} />
              <h1 style={{ color: "black", fontWeight: "bold" }}>
                Rising Destination
              </h1>
            </div>
            <h2>Experiential Japan Package</h2>
            <div className="form-row">
              <label htmlFor="filecode" style={{ fontWeight: "bold", marginBottom: "5px", display: "inline-block",}} >File Code</label>
              <input type="text" id="filecode" value={formState.filecode} onChange={handleChange} style={{ width: "calc(100% - 10px)",  padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px", }}/>
            </div>
            <div className="form-row">
              <label htmlFor="validity" style={{ fontWeight: "bold", marginBottom: "5px", display: "inline-block",  }} >Validity:</label>
              <input  type="text"  id="validity" value={formState.validity} onChange={handleChange} style={{ width: "calc(100% - 10px)",  padding: "8px",  border: "1px solid #ccc",  borderRadius: "4px", fontSize: "14px", }} />
            </div>
            <div className="form-row">
              <label htmlFor="name" style={{  fontWeight: "bold",  marginBottom: "5px",  display: "inline-block",  }} >Name:</label>
              <input  type="text" id="name"  value={formState.name} onChange={handleChange} style={{  width: "calc(100% - 10px)", padding: "8px",  border: "1px solid #ccc",  borderRadius: "4px",  fontSize: "14px",  }}/>
            </div>
            <div className="form-row">
              <label  htmlFor="filecode" style={{  fontWeight: "bold",  marginBottom: "5px",  display: "inline-block",  }} >Itinerary</label>
              <input type="text"  id="itinerary"  value={formState.itinerary}  onChange={handleChange}  style={{  width: "calc(100% - 10px)",  padding: "8px",  border: "1px solid #ccc",  borderRadius: "4px",  fontSize: "14px",  }}  />
            </div>
            <div className="form-table">
              <table  style={{  width: "100%",  marginTop: "10px",  borderCollapse: "collapse",  }} >
                      <tbody>
                  <tr>
                    <td style={{  border: "1px solid #ddd",  padding: "8px",  textAlign: "left",  }} >
                      <label  htmlFor="groupName"  style={{  fontWeight: "bold",  marginBottom: "5px",  display: "inline-block", }} >Group Name:</label>
                      <input  type="text"  id="groupName"  value={formState.groupName}  onChange={handleChange}  style={{  width: "calc(100% - 10px)",  padding: "8px",  border: "1px solid #ccc",  borderRadius: "4px",  fontSize: "14px"  }}  />
                    </td>
                    <td  style={{  border: "1px solid #ddd",  padding: "8px",  textAlign: "left",  }}  >
                      <label  htmlFor="totalPax"  style={{  fontWeight: "bold", marginBottom: "5px", display: "inline-block",  }}  >Total Pax:</label>
                      <input  type="text"  id="totalPax"  value={formState.totalPax}  onChange={handleChange}  style={{  width: "calc(100% - 10px)",  padding: "8px",  border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px",  }} />
                    </td>
                    <td  style={{  border: "1px solid #ddd",  padding: "8px",  textAlign: "left",  }} >
                      <label  htmlFor="tourDate"  style={{  fontWeight: "bold", marginBottom: "5px",  display: "inline-block", }} >Tour Date:</label>
                      <input  type="text"  id="tourDate"  value={formState.tourDate}  onChange={handleChange}  style={{  width: "calc(100% - 10px)",  padding: "8px",  border: "1px solid #ccc",  borderRadius: "4px",  fontSize: "14px",  }}  />
                    </td>
                    <td style={{ border: "1px solid #ddd",  padding: "8px",  textAlign: "left", }}  >
                      <label  htmlFor="flight"  style={{  fontWeight: "bold",  marginBottom: "5px",  display: "inline-block",  }} >Flight:</label>
                      <input type="text"  id="flight" value={formState.flight} onChange={handleChange} style={{ width: "calc(100% - 10px)", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px", }} />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="3" style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left", }} >
                      <input type="text" id="" value={formState.dateOfQtn} onChange={handleChange} style={{ width: "calc(100% - 10px)", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px", }} />
                    </td>
                    <td colSpan="3" style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left", }} >
                      <label htmlFor="dateOfQtn" style={{ fontWeight: "bold", marginBottom: "5px", display: "inline-block", }} >Date of QTN:</label>
                      <input type="text" id="dateOfQtn" value={formState.dateOfQtn} onChange={handleChange} style={{ width: "calc(100% - 10px)", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px", }} />
                    </td>
                    <td colSpan="4" style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left", }} >
                      <label htmlFor="agent" style={{ fontWeight: "bold", marginBottom: "5px", display: "inline-block", }} >Agent:</label>
                      <input type="text" id="agent" value={formState.agent} onChange={handleChange} style={{ width: "calc(100% - 10px)", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px", }} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <h2 style={{ fontFamily: "Arial, sans-serif", color: "#333", marginTop: "20px", }} >
          Itinerary Details
        </h2>
        <div className="form-table" style={{ marginTop: "10px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left", alignItems: "center", textDecoration: "none", }} >Day</th>
                <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left", alignItems: "center", textDecoration: "none", }}> Date</th>
                <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left", alignItems: "center", textDecoration: "none", }} >City</th>
                <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left", alignItems: "center", textDecoration: "none", }} >Time</th>
                <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left", alignItems: "center", textDecoration: "none", }} >Service</th>
                <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left", alignItems: "center", textDecoration: "none", }} >Duration</th>
                <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left", alignItems: "center", textDecoration: "none", }} >Mode</th>
                <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left", alignItems: "center", textDecoration: "none", }} >Meal</th>
                <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left", alignItems: "center", textDecoration: "none", }} >Price</th>
              </tr>
            </thead>
            <tbody>
              {formState?.days?.map((day, dayIndex) => (
                <tr key={dayIndex}>
                  <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left", }} >
                    <input type="text" value={day.day} onChange={(e) => handleDayChange(dayIndex, e)} id="day" style={{ width: "calc(100% - 10px)", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px", }} />
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left", }} >
                    <input type="text" value={day.date}   onChange={(e) => handleDateChange(dayIndex, e)} id="date" style={{ width: "calc(100% - 10px)", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px", }}/>
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left", }} >
                    <select value={day.city} onChange={(e) => handleCityChange(dayIndex, e)} style={{ width: "calc(100% - 10px)", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px", }} >
                    <option disabled value="">Select A City</option>
                   {Object.keys(cityServiceMapping || {}).map((city, index) => (
                    <option key={index} value={city}>{city}</option>))}
                   </select>
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left", }} >
                  <input type="text" value={day.time} onChange={(e) => handleDayChange(dayIndex, e)} id="time" style={{ width: "calc(100% - 10px)", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px", }} />
                  </td> 
                  <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left", }} >
                  <select value={day.service} onChange={(e) => handleServiceChange(dayIndex, e)} style={{width: "calc(100% - 10px)", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px",}}>
                  <option disabled selected value={""}>Select A Service</option>
                  {(day.availableServices || []).map((service, index) => (
                  <option key={index} value={service}>{service}</option>))}
                 </select>
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left", }} >
                    <input type="text" value={day.duration} onChange={(e) => handleDurationChange(dayIndex, 0, e)} style={{ width: "calc(100% - 10px)", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px", }} />
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left", }} >
                    <input type="text" value={day.mode} onChange={(e) => handleDayChange(dayIndex, e)} id="mode" style={{ width: "calc(100% - 10px)", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px", }} />
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left", }}>
                    <input type="text" value={day.meal} onChange={(e) => handleDayChange(dayIndex, e)} id="meal" style={{width: "calc(100% - 10px)",padding: "8px",border: "1px solid #ccc",  borderRadius: "4px",  fontSize: "14px",  }}  />
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>
                  <input type="text" value={day.price} readOnly style={{ width: "calc(100% - 10px)", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px",}}/>
            </td>
                </tr>
              ))}
              <tr>
                <td  colSpan="7"  style={{  border: "1px solid #ddd",  padding: "8px", textAlign: "left"  }} >
                  <button  type="button"  onClick={addDay}  style={{  padding: "8px 12px",  border: "none",  backgroundColor: "#007bff",  color: "#fff",  borderRadius: "4px",   cursor: "pointer",  }}  >+ Add Day</button>
                </td>
              </tr>
            </tbody>
          </table>
          <h2 style={{ fontFamily: "Arial, sans-serif", color: "#333", marginTop: "20px" }}>Total Service Price</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Total Price</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Total Pax</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>
              {totalPrice}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>
              <input type="number" value={totalPax} onChange={handleTotalPaxChange} min="" style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px" }} />
            </td>
          </tr>
        </tbody>
      </table>
        </div>
        <h2  style={{  fontFamily: "Arial, sans-serif",  color: "#333",  marginTop: "20px",  }}  >HOTELS ENVISAGED:</h2>
        <div className="form-table" style={{ marginTop: "10px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th  style={{  border: "1px solid #ddd",  padding: "8px",  textAlign: "left",  }}  >City</th>
                <th  style={{  border: "1px solid #ddd" , padding: "8px",  textAlign: "left",  }} >Dates</th>
                <th  style={{  border: "1px solid #ddd",  padding: "8px",  textAlign: "left",  }}  >Nights</th>
                <th  style={{  border: "1px solid #ddd",  padding: "8px",  textAlign: "left",  }}  >Hotel</th>
              </tr>
            </thead>
            <tbody>
              {formState?.hotels?.map((hotel, hotelIndex) => (
                <tr key={hotelIndex}>
                  <td  style={{  border: "1px solid #ddd", padding: "8px",  textAlign: "left",  }}  >
                    <input  type="text"  value={hotel.city} onChange={(e) => handleHotelChange(hotelIndex, e)}  id="city"  style={{  width: "calc(100% - 10px)",  padding: "8px",  border: "1px solid #ccc",  borderRadius: "4px",  fontSize: "14px",  }} />
                  </td>
                  <td  style={{  border: "1px solid #ddd",  padding: "8px",  textAlign: "left",  }}  >
                    <input  type="text"  value={hotel.dates}  onChange={(e) => handleHotelChange(hotelIndex, e)}  id="dates"  style={{  width: "calc(100% - 10px)",  padding: "8px",  border: "1px solid #ccc",  borderRadius: "4px",  fontSize: "14px",  }}  />
                  </td>
                  <td  style={{  border: "1px solid #ddd",  padding: "8px",  textAlign: "left",  }}  >
                    <input  type="text"  value={hotel.nights}  onChange={(e) => handleHotelChange(hotelIndex, e)}  id="nights"  style={{  width: "calc(100% - 10px)",  padding: "8px",  border: "1px solid #ccc",  borderRadius: "4px",  fontSize: "14px",  }}  />
                  </td>
                  <td  style={{  border: "1px solid #ddd",  padding: "8px",  textAlign: "left",  }} >
                    <input  type="text"  value={hotel.hotel}  onChange={(e) => handleHotelChange(hotelIndex, e)} id="hotel"  style={{  width: "calc(100% - 10px)",  padding: "8px",  border: "1px solid #ccc",  borderRadius: "4px",  fontSize: "14px",  }}  />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button  type="button"  onClick={addHotel}  style={{  marginTop: "10px",  padding: "8px 16px",  fontSize: "14px",  backgroundColor: "#4CAF50",color: "white",  border: "none",  borderRadius: "4px",  cursor: "pointer",  }}  >Add Hotel</button>
        </div>

        <h2  style={{  fontFamily: "Arial, sans-serif",  color: "#333",  marginTop: "20px",  }}  >Quotation Slab</h2>
        <div className="form-table" style={{ marginTop: "10px" }}>
          <table style={{ width: "100%",  }}>
            <thead>
              <tr>
                <th  style={{  border: "1px solid #ddd",  padding: "6px",  textAlign: "left",  }}  >Slab</th>
                <th  style={{  border: "1px solid #ddd",  padding: "6px",  textAlign: "left",  }}  >Max Pax</th>
                <th  style={{  border: "1px solid #ddd",  padding: "6px",  textAlign: "left",  }}  >Min Pax</th>
                <th style={{  border: "1px solid #ddd",  padding: "6px",  textAlign: "left",  }} >No. of FOC</th>
                <th style={{  border: "1px solid #ddd",  padding: "6px",  textAlign: "left",  }}  >PP Cost</th>
                <th style={{  border: "1px solid #ddd",  padding: "6px",  textAlign: "left",  }} >Actions</th>
              </tr>
            </thead>
            <tbody>
              {quotationSlabs?.map((slab, index) => (
                <tr key={index}>
                  <td  style={{  border: "1px solid #ddd",  padding: "8px",  textAlign: "left",  }}  >
                    <input  type="text"  name="slab"  value={slab.slab}  onChange={(e) => handleQuotationSlabChange(index, e)}  style={{  width: "calc(100% - 10px)",  padding: "8px",  border: "1px solid #ccc",  borderRadius: "4px",  fontSize: "14px",  }} />
                  </td>
                  <td  style={{  border: "1px solid #ddd",  padding: "8px",  textAlign: "left",  }}  > 
                    <input  type="text"  name="maxPax"  value={slab.maxPax} onChange={(e) => handleQuotationSlabChange(index, e)}  style={{  width: "calc(100% - 10px)",padding: "8px",  border: "1px solid #ccc",  borderRadius: "4px",  fontSize: "14px",  }}  />
                  </td>
                  <td  style={{  border: "1px solid #ddd",  padding: "8px",  textAlign: "left",  }} >
                    <input  type="text"  name="minPax" value={slab.minPax}  onChange={(e) => handleQuotationSlabChange(index, e)}  style={{  width: "calc(100% - 10px)",  padding: "8px",  border: "1px solid #ccc",  borderRadius: "4px",  fontSize: "14px",  }}  />
                  </td>
                  <td  style={{  border: "1px solid #ddd",  padding: "8px",  textAlign: "left",  }}  >
                    <input  type="text"  name="noOfFOC"  value={slab.noOfFOC} onChange={(e) => handleQuotationSlabChange(index, e)}  style={{  width: "calc(100% - 10px)",  padding: "8px",  border: "1px solid #ccc",  borderRadius: "4px",  fontSize: "14px",  }}  />
                  </td>
                  <td  style={{  border: "1px solid #ddd",  padding: "8px",  textAlign: "left",  }}  >
                    <input  type="text"  name="ppCost"  value={slab.ppCost}  onChange={(e) => handleQuotationSlabChange(index, e)}  style={{width: "calc(100% - 10px)",  padding: "8px",  border: "1px solid #ccc", borderRadius: "4px",   fontSize: "14px",  }}  />
                  </td>
                  <td  style={{ border: "1px solid #ddd",  padding: "8px",  textAlign: "left",  }} >
                    {quotationSlabs.length !== 1 && (
                      <button  type="button"  onClick={() => removeQuotationSlabRow(index)}  style={{ backgroundColor: "#dc3545", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer",  width: "100%",  }}  >Remove</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" onClick={addQuotationSlabRow} style={{  marginTop: "10px",  padding: "8px 16px",  fontSize: "14px",  backgroundColor: "#4CAF50",  color: "white",  border: "none",  borderRadius: "4px",  cursor: "pointer",  }}  >Add Row</button>
        </div>

        <div className="form-row">
          <label htmlFor="inclusions" style={{  fontWeight: "bold", marginBottom: "5px", display: "inline-block", }}  >Inclusions:</label>
          <input type="checkbox" id="inclusions"  checked={formState.inclusions} onChange={handleChange}  />
        </div>
        <div className="form-row">
          <label htmlFor="exclusions" style={{  fontWeight: "bold",  marginBottom: "5px", display: "inline-block",  }} >Exclusions:</label>
          <input  type="checkbox" id="exclusions"  checked={formState.exclusions}  onChange={handleChange} />
        </div>
          <div className="form-row">
          <label  htmlFor="terms"  style={{  fontWeight: "bold",  marginBottom: "5px",  display: "inline-block",  }}  >Terms & Conditions:</label>
          <input  type="checkbox"  id="terms"  checked={formState.terms}  onChange={handleChange}  />
        </div>

        <div style={{ marginTop: "20px" }}>
          {formData ? (
            <button  onClick={handleUpdate} style={{  padding: "10px 20px",  marginRight: "10px",  border: "none",  backgroundColor: "#28a745",  color: "#fff",  borderRadius: "4px",   cursor: "pointer",  }} >Update</button>
          ) : (
            <button  type="submit" style={{  padding: "10px 20px",  marginRight: "10px",  border: "none",  backgroundColor: "#28a745",  color: "#fff",  borderRadius: "4px",  cursor: "pointer",  }} >Submit</button>
          )}
          <button  type="button"  onClick={() => navigate("/dashboard")}  style={{  padding: "10px 20px",  border: "none",  backgroundColor: "#dc3545",  color: "#fff",  borderRadius: "4px",  cursor: "pointer",  }} >Cancel</button>
        </div>
      </form>
    </div>
  );
};
export default Form;
