import React, { useState, useEffect } from "react";
import { cityServiceMapping, servicePriceMapping } from "./Service";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Cookies from 'js-cookie';


const Form = ({ formData, onSubmit }) => {
const navigate = useNavigate();
const [quotationSlabs, setQuotationSlabs] = useState([ { slab: "", max_pax: "", min_pax: "", no_of_foc: "", pp_cost: "" }, ]);
const [totalPrice, setTotalPrice] = useState(0);
const [totalPax, setTotalPax] = useState("");
const [formState, setFormState] = useState({
    file_code: '',
    validity: '',
    client_name: '',
    itinerary: '',
    group_name: '',
    total_pax: '',
    tour_date: '',
    flight: '',
    date_of_qtn: '',
    agent: "",
    inclusions: true,
    exclusions: true,
    terms: true,
    days: [
      {
        day: "1", date: "", city: "", time: "", service: "", mode: "", meal: "", duration: "", price: "0", availableServices: []
      },
    ],
    hotels: [
      {
        city: "", dates: "", nights: "", hotel: "",
      },
    ],
    quotationSlabs: [
      { slab: "", max_pax: "0", min_pax: "0", no_of_foc: "1", pp_cost: "" },
    ],
  });

  useEffect(() => {
    if (formData) {
      console.log("formData:", formData);
  
      const editFormData = {
        group_name: formData.group_name || '',
        file_code: formData.file_code || '',
        total_pax: formData.total_pax || '',
        tour_date: formData.tour_date || '',
        flight: formData.flight || '',
        client_name: formData.client_name || '',
        date_of_qtn: formData.date_of_qtn || '',
        agent: formData.agent || '',
        itinerary: formData.itinerary || '',
        validity: formData.validity || '',
        inclusions: formData.inclusions ?? [],
        exclusions: formData.exclusions ?? [],
        terms: formData.terms ?? [],
        days: formData.days?.map((day) => ({
          ...day,
          availableServices: cityServiceMapping[day.city] || [],
        })) || [],
        hotels: formData.hotels || [],
        quotationSlabs: formData.quotation_slabs || [],
      };
  
      setFormState(editFormData);
      setQuotationSlabs(editFormData.quotationSlabs);
    }
  }, [formData]);
  

  useEffect(() => {
    const priceSum = formState.days.reduce((acc, day) => acc + parseFloat(day.price || 0), 0);
    setTotalPrice(priceSum * totalPax);
  }, [formState, totalPax]);

  const handleTotalPaxChange = (e) => {
    setTotalPax(parseInt(e.target.value) || 1);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

   const handleDayChange = (index, e) => {
    const { id, value } = e.target;
    setFormState((prevState) => {
      const updatedDays = [...prevState.days];
      updatedDays[index][id] = value;
      return { ...prevState, days: updatedDays };
    });
  };

  const handleCityChange = (dayIndex, event) => {
    const selectedCity = event.target.value;
  
    // Update the day's city and available services
    const availableServices = cityServiceMapping[selectedCity] || [];
    setFormState((prevState) => {
      const updatedDays = [...prevState.days];
      updatedDays[dayIndex] = {
        ...updatedDays[dayIndex],
        city: selectedCity,
        availableServices: availableServices,
        service: '', // Reset selected service
      };
      return { ...prevState, days: updatedDays };
    });
  };
  

  const handleServiceChange = (dayIndex, e) => {
    const { value } = e.target;
    setFormState((prevData) => {
        const updatedDays = [...prevData.days];
        updatedDays[dayIndex].service = value;
        updatedDays[dayIndex].price = servicePriceMapping[value] || '';
        return {
            ...prevData,
            days: updatedDays,
        };
    });
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
                day: String(prevData.days.length + 1),
                date: "",
                city: "",
                service: "",
                mode: "",
                meal: "",
                price: "0",
                availableServices: [],
            },
        ],
    }));
};


  const removeDay = (index) => {
    const updatedDays = formState.days.filter((_, dayIndex) => dayIndex !== index);
    setFormState((prevState) => ({
      ...prevState,
      days: updatedDays,
    }));
  };

  const handleHotelChange = (index, e) => {
    const { name, value } = e.target;
    const updatedHotels = [...formState.hotels];
    updatedHotels[index][name] = value;
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
          city: "",
          dates: "",
          nights: "",
          hotel: "",
        },
      ],
    }));
  };

  const removeHotel = (index) => {
    const updatedHotels = formState.hotels.filter((_, i) => i !== index);
    setFormState((prevData) => ({
      ...prevData,
      hotels: updatedHotels,
    }));
  };

  const handleQuotationSlabChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSlabs = quotationSlabs.map((slab, i) =>
      i === index ? { ...slab, [name]: value } : slab
    );
    setQuotationSlabs(updatedSlabs);
  };

  const removeQuotationSlabRow = (index) => {
    const updatedSlabs = quotationSlabs.filter((_, i) => i !== index);
    setQuotationSlabs(updatedSlabs);
  };

  const addQuotationSlabRow = () => {
    setQuotationSlabs((prevSlabs) => [
      ...prevSlabs,
      { slab: "", max_pax: "", min_pax: "", no_of_foc: "", pp_cost: "" },
    ]);
  };

  const updatedFormData = {
    group_name: formState.group_name?.trim() || '',
    file_code: formState.file_code?.trim() || '',
    total_pax: Math.max(parseInt(formState.total_pax, 10), 1),
    client_name: formState.client_name?.trim() || '',
    tour_date: formState.tour_date || '',
    flight: formState.flight?.trim() || '',
    itinerary: formState.itinerary?.trim() || '',
    date_of_qtn: formState.date_of_qtn || '',
    agent: formState.agent?.trim() || '',
    validity: formState.validity || '',
    days: formState.days.map((day) => ({
      day: parseInt(day.day, 10) || 1,
      date: day.date || '',
      time: day.time || '',
      city: day.city?.trim() || '',
      duration: day.duration || '',
      service: day.service?.trim() || '',
      mode: day.mode?.trim() || '',
      meal: day.meal?.trim() || '',
      price: parseFloat(day.price) || 0,
    })),
    hotels: formState.hotels.map((hotel) => ({
      city: hotel.city?.trim() || '',
      dates: hotel.dates || '',
      nights: Math.max(parseInt(hotel.nights, 10), 1),
      hotel: hotel.hotel?.trim() || '',
    })),
    quotation_slabs: quotationSlabs.map((slab) => ({
      slab: slab.slab?.trim() || '',
      max_pax: Math.max(parseInt(slab.max_pax, 10), 0),
      min_pax: Math.max(parseInt(slab.min_pax, 10), 0),
      no_of_foc: Math.max(parseInt(slab.no_of_foc, 10), 0) || 1,
      pp_cost: Math.max(parseFloat(slab.pp_cost), 0),
    })),
  };
  
  
const handleSubmit = async (e) => {
  e.preventDefault();

  const token = Cookies.get('jwt');
  if (!token) {
      alert("Authentication token is missing. Please log in again.");
      return;
  }

  const config = {
      headers: {
          Authorization: `Bearer ${token}`,
      },
  };

  console.log("Form Data to Submit:", formData || updatedFormData);

  try {
      if (updatedFormData) {
          await axios.post("http://127.0.0.1:8000/itineraries/", updatedFormData, config);
          alert("Form submitted successfully");

          onSubmit(); // Callback to reset or perform further actions
          navigate('/Dashboard'); // Navigate to the dashboard
      } else {
          alert("No form data available to submit.");
      }
  } catch (error) {
      console.error("Error submitting form:", error);
  }
};

const handleUpdate = async () => {
  // Retrieve the JWT token from cookies
  const token = Cookies.get('jwt');
  
  // Check if the token exists
  if (!token) {
    alert("Authentication token is missing. Please log in again.");
    navigate('/login');
    return;
  }

  // Configuration for the request, including the Authorization header
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Ensure that updatedFormData is defined before proceeding
  if (!updatedFormData) {
    alert("Updated form data is not available.");
    return;
  }

  // Extract and validate the fileCode from updatedFormData
  const fileCode = updatedFormData.file_code?.trim();
  if (!fileCode) {
    alert("File code is missing.");
    return;
  }

  try {
    // Make the PUT request to update the form data using the provided file code
    const response = await axios.put(
      `http://127.0.0.1:8000/itineraries/${fileCode}/`,
      updatedFormData,
      config
    );

    // Check if the update was successful with status 200
    if (response.status === 200) {
      alert("Form updated successfully");

      // Explicitly navigate to the dashboard after a successful update
      navigate('/Dashboard');
    } else {
      // Handle unexpected status codes
      alert(`Unexpected response from server: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging
    console.error("Error updating form:", error);

    // Extract a user-friendly error message from the server response, if available
    const errorMessage = error.response?.data?.detail || "An unknown error occurred while updating the form.";
    alert(`Error updating form: ${errorMessage}`);

    // Optional: Handle specific error codes if needed (e.g., unauthorized access)
    if (error.response?.status === 401) {
      alert("Your session has expired. Please log in again.");
      navigate('/login');
    }
  }
};




return (
  
    <div className="container"  style={{  maxWidth: "90%",  margin: "0 auto",  padding: "20px",  backgroundColor: "lightyellow",  border: "1px solid #ccc",  borderRadius: "8px",  }}>
      <h1 style={{ fontFamily: "Arial, sans-serif", color: "black" }}>
        ITINERARY FORM
      </h1>
      <form >
  <div id="itineraryForm">
    <div
      style={{
        backgroundColor: "#fff",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", backgroundColor: "lightblue" }}>
        <img src={"/Logo RD.jpg"} alt={"Logo RD"} className="company-logo" style={{ maxWidth: "200px", marginRight: "20px" }} />
        <h1 style={{ color: "black", fontWeight: "bold" }}>Rising Destination</h1>
      </div>
      <h2>Experiential Japan Package</h2>
      <div className="form-container">
        <div className="form-row">
          <label htmlFor="filecode" style={{ fontWeight: "bold", marginBottom: "5px", display: "inline-block" }}>
            File Code
          </label>
          <input
            type="text"
            id="filecode"
            name="file_code"
            value={formState.file_code}
            onChange={handleChange}
            required
            style={{
              width: "calc(100% - 10px)",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          />
        </div>

        <div className="form-row">
          <label htmlFor="validity" style={{ fontWeight: "bold", marginBottom: "5px", display: "inline-block" }}>
            Validity:
          </label>
          <input
            type="text"
            id="validity"
            name="validity"
            value={formState.validity}
            onChange={handleChange}
            required
            style={{
              width: "calc(100% - 10px)",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          />
        </div>

        <div className="form-row">
          <label htmlFor="clientName" style={{ fontWeight: "bold", marginBottom: "5px", display: "inline-block" }}>
            Name:
          </label>
          <input
            type="text"
            id="clientName"
            name="client_name"
            value={formState.client_name}
            onChange={handleChange}
            required
            style={{
              width: "calc(100% - 10px)",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          />
        </div>

        <div className="form-row">
          <label htmlFor="itinerary" style={{ fontWeight: "bold", marginBottom: "5px", display: "inline-block" }}>
            Itinerary
          </label>
          <input
            type="text"
            id="itinerary"
            name="itinerary"
            value={formState.itinerary}
            onChange={handleChange}
            required
            style={{
              width: "calc(100% - 10px)",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          />
        </div>

        <div className="form-table">
          <table style={{ width: "100%", marginTop: "10px", borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>
                  <label htmlFor="groupName" style={{ fontWeight: "bold", marginBottom: "5px", display: "inline-block" }}>
                    Group Name:
                  </label>
                  <input
                    type="text"
                    id="groupName"
                    name="group_name"
                    value={formState.group_name}
                    onChange={handleChange}
                    required
                    style={{
                      width: "calc(100% - 10px)",
                      padding: "8px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      fontSize: "14px",
                    }}
                  />
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>
                  <label htmlFor="totalPax" style={{ fontWeight: "bold", marginBottom: "5px", display: "inline-block" }}>
                    Total Pax:
                  </label>
                  <input
                    type="number"
                    id="totalPax"
                    name="total_pax"
                    value={formState.total_pax}
                    onChange={handleChange}
                    required
                    style={{
                      width: "calc(100% - 10px)",
                      padding: "8px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      fontSize: "14px",
                    }}
                  />
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>
                  <label htmlFor="tourDate" style={{ fontWeight: "bold", marginBottom: "5px", display: "inline-block" }}>
                    Tour Date:
                  </label>
                  <input
                    type="date"
                    id="tourDate"
                    name="tour_date"
                    value={formState.tour_date}
                    onChange={handleChange}
                    required
                    style={{
                      width: "calc(100% - 10px)",
                      padding: "8px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      fontSize: "14px",
                    }}
                  />
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>
                  <label htmlFor="flight" style={{ fontWeight: "bold", marginBottom: "5px", display: "inline-block" }}>
                    Flight:
                  </label>
                  <input
                    type="text"
                    id="flight"
                    name="flight"
                    value={formState.flight}
                    onChange={handleChange}
                    required
                    style={{
                      width: "calc(100% - 10px)",
                      padding: "8px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      fontSize: "14px",
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="3" style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>
                  <label htmlFor="dateOfQtn" style={{ fontWeight: "bold", marginBottom: "5px", display: "inline-block" }}>
                    Date of QTN:
                  </label>
                  <input
                    type="date"
                    id="dateOfQtn"
                    name="date_of_qtn"
                    value={formState.date_of_qtn}
                    onChange={handleChange}
                    required
                    style={{
                      width: "calc(100% - 10px)",
                      padding: "8px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      fontSize: "14px",
                    }}
                  />
                </td>
                <td colSpan="3" style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>
                  <label htmlFor="agent" style={{ fontWeight: "bold", marginBottom: "5px", display: "inline-block" }}>
                    Agent:
                  </label>
                  <input
                    type="text"
                    id="agent"
                    name="agent"
                    value={formState.agent}
                    onChange={handleChange}
                    required
                    style={{
                      width: "calc(100% - 10px)",
                      padding: "8px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      fontSize: "14px",
                    }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <h2 style={{ fontFamily: "Arial, sans-serif", color: "#333", marginTop: "20px" }}>
  Itinerary Details
</h2>
<div className="form-table" style={{ marginTop: "10px" }}>
  <table style={{ width: "100%", borderCollapse: "collapse" }}>
    <thead>
      <tr>
        <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Day</th>
        <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Date</th>
        <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>City</th>
        <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Time</th>
        <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Service</th>
        <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Duration</th>
        <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Mode</th>
        <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Meal</th>
        <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Price</th>
        <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Action</th>
      </tr>
    </thead>
    <tbody>
      {formState?.days?.map((day, dayIndex) => (
        <tr key={dayIndex}>
          <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>
            <input
              type="text"
              name = 'day'
              value={day.day}
              onChange={(e) => handleDayChange(dayIndex, e)}
              id="day"
              style={{ width: "calc(100% - 10px)", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px" }}
            />
          </td>
          <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>
            <input
              type="date"
              name = 'date'
              value={day.date}
              onChange={(e) => handleDateChange(dayIndex, e)}
              id="date"
              style={{ width: "calc(100% - 10px)", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px" }}
            />
          </td>
          <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>
            <select
              value={day.city}
              onChange={(e) => handleCityChange(dayIndex, e)}
              style={{ width: "calc(100% - 10px)", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px" }}
            > 
              <option disabled value="">Select A City</option>
              {Object.keys(cityServiceMapping || {}).map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </select>
          </td>
          <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>
            <input
              type="time"
              value={day.time}
              onChange={(e) => handleDayChange(dayIndex, e)}
              id="time"
              style={{ width: "calc(100% - 10px)", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px" }}
            />
          </td>
          <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>
            <select
             value={day.service}
             onChange={(e) => handleServiceChange(dayIndex, e)}
            style={{ width: "calc(100% - 10px)", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px" }}
      >
           <option disabled value="">Select A Service</option>
           {(day.availableServices || []).map((service, index) => (
           <option key={index} value={service}>{service}</option>
          ))}
        </select>
          </td>
          <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>
            <input
              type="number"
              value={day.duration}
              onChange={(e) => handleDurationChange(dayIndex, 0, e)}
              style={{ width: "calc(100% - 10px)", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px" }}
            />
          </td>
          <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>
            <input
              type="text"
              value={day.mode}
              onChange={(e) => handleDayChange(dayIndex, e)}
              id="mode"
              style={{ width: "calc(100% - 10px)", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px" }}
            />
          </td>
          <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>
            <input
              type="text"
              value={day.meal}
              onChange={(e) => handleDayChange(dayIndex, e)}
              id="meal"
              style={{ width: "calc(100% - 10px)", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px" }}
            />
          </td>
          <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>
            <input
              type="text"
              value={day.price}
              readOnly
              style={{ width: "calc(100% - 10px)", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px" }}
            />
          </td>
          <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>
            <button
              type="button"
              onClick={() => removeDay(dayIndex)}
              style={{ padding: "8px 12px", border: "none", backgroundColor: "red", color: "#fff", borderRadius: "4px", cursor: "pointer" }}
            >
              Remove
            </button>
          </td>
        </tr>
      ))}
      <tr>
        <td colSpan="9" style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>
          <button
            type="button"
            onClick={addDay}
            style={{ padding: "8px 12px", border: "none", backgroundColor: "#007bff", color: "#fff", borderRadius: "4px", cursor: "pointer" }}
          >
            + Add Day
          </button>
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
    <h2 style={{ fontFamily: "Arial, sans-serif", color: "#333", marginTop: "20px" }}>
  HOTELS ENVISAGED:
</h2>
<div className="form-table" style={{ marginTop: "10px" }}>
  <table style={{ width: "100%", borderCollapse: "collapse" }}>
    <thead>
      <tr>
        <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>City</th>
        <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Dates</th>
        <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Nights</th>
        <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Hotel</th>
        <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Actions</th>
      </tr>
    </thead>
    <tbody>
      {formState?.hotels?.map((hotel, hotelIndex) => (
        <tr key={hotelIndex}>
          <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>
            <input
              type="text"
              name="city"
              value={hotel.city}
              onChange={(e) => handleHotelChange(hotelIndex, e)}
              id={`city-${hotelIndex}`}
              style={{ width: "calc(100% - 10px)", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px" }}
              placeholder="City"
            />
          </td>
          <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>
            <input
              type="date"
              name="dates"
              value={hotel.dates}
              onChange={(e) => handleHotelChange(hotelIndex, e)}
              id={`dates-${hotelIndex}`}
              style={{ width: "calc(100% - 10px)", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px" }}
            />
          </td>
          <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>
            <input
              type="text"
              name="nights"
              value={hotel.nights}
              onChange={(e) => handleHotelChange(hotelIndex, e)}
              id={`nights-${hotelIndex}`}
              style={{ width: "calc(100% - 10px)", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px" }}
              placeholder="Nights"
            />
          </td>
          <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>
            <input
              type="text"
              name="hotel"
              value={hotel.hotel}
              onChange={(e) => handleHotelChange(hotelIndex, e)}
              id={`hotel-${hotelIndex}`}
              style={{ width: "calc(100% - 10px)", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px" }}
              placeholder="Hotel Name"
            />
          </td>
          <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>
            <button
              type="button"
              onClick={() => removeHotel(hotelIndex)}
              style={{ backgroundColor: "#dc3545", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}
            >
              Remove
            </button>
          </td>
        </tr>
      ))}
    </tbody>
    <tfoot>
      <tr>
        <td colSpan={5}>
          <button
            type="button"
            onClick={addHotel}
            style={{ marginTop: "10px", padding: "8px 16px", fontSize: "14px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            Add Hotel
          </button>
        </td>
      </tr>
    </tfoot>
  </table>
</div>
<h2 style={{ fontFamily: "Arial, sans-serif", color: "#333", marginTop: "20px" }}>
  Quotation Slab
</h2>
<div className="form-table" style={{ marginTop: "10px" }}>
  <table style={{ width: "100%", borderCollapse: "collapse" }}>
    <thead>
      <tr>
        <th style={{ border: "1px solid #ddd", padding: "6px", textAlign: "left" }}>Slab</th>
        <th style={{ border: "1px solid #ddd", padding: "6px", textAlign: "left" }}>Max Pax</th>
        <th style={{ border: "1px solid #ddd", padding: "6px", textAlign: "left" }}>Min Pax</th>
        <th style={{ border: "1px solid #ddd", padding: "6px", textAlign: "left" }}>No. of FOC</th>
        <th style={{ border: "1px solid #ddd", padding: "6px", textAlign: "left" }}>PP Cost</th>
        <th style={{ border: "1px solid #ddd", padding: "6px", textAlign: "left" }}>Actions</th>
      </tr>
    </thead>
    <tbody>
      {quotationSlabs.map((slab, index) => (
        <tr key={index}>
          <td>
            <input
              type="text"
              name="slab"
              value={slab.slab}
              onChange={(e) => handleQuotationSlabChange(index, e)}
              style={{ width: "calc(100% - 10px)", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px" }}
              placeholder="Slab"
            />
          </td>
          <td>
            <input
              type="number"
              name="max_pax"
              value={slab.max_pax}
              onChange={(e) => handleQuotationSlabChange(index, e)}
              style={{ width: "calc(100% - 10px)", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px" }}
              placeholder="Max Pax"
            />
          </td>
          <td>
            <input
              type="number"
              name="min_pax"
              value={slab.min_pax}
              onChange={(e) => handleQuotationSlabChange(index, e)}
              style={{ width: "calc(100% - 10px)", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px" }}
              placeholder="Min Pax"
            />
          </td>
          <td>
            <input
              type="number"
              name="no_of_foc"
              value={slab.no_of_foc}
              onChange={(e) => handleQuotationSlabChange(index, e)}
              style={{ width: "calc(100% - 10px)", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px" }}
              placeholder="No. of FOC"
            />
          </td>
          <td>
            <input
              type="text"
              name="pp_cost"
              value={slab.pp_cost}
              onChange={(e) => handleQuotationSlabChange(index, e)}
              style={{ width: "calc(100% - 10px)", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px" }}
              placeholder="PP Cost"
            />
          </td>
          <td>
            {quotationSlabs.length > 1 && (
              <button
                type="button"
                onClick={() => removeQuotationSlabRow(index)}
                style={{ backgroundColor: "#dc3545", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}
              >
                Remove
              </button>
            )}
          </td>
        </tr>
      ))}
    </tbody>
    <tfoot>
      <tr>
        <td colSpan="6">
          <button
            type="button"
            onClick={addQuotationSlabRow}
            style={{ backgroundColor: "#28a745", color: "#fff", border: "none", padding: "8px 12px", borderRadius: "4px", cursor: "pointer" }}
          >
            Add Quotation Slab
          </button>
        </td>
      </tr>
    </tfoot>
  </table>
</div>
<div className="form-row">
  <label htmlFor="inclusions" style={{ fontWeight: "bold", marginBottom: "5px", display: "inline-block" }}>
    Inclusions:
  </label>
  <input
    type="checkbox"
    id="inclusions"
    name="inclusions"
    checked={formState.inclusions}
    onChange={handleChange}
  />
</div>
<div className="form-row">
  <label htmlFor="exclusions" style={{ fontWeight: "bold", marginBottom: "5px", display: "inline-block" }}>
    Exclusions:
  </label>
  <input
    type="checkbox"
    id="exclusions"
    name="exclusions"
    checked={formState.exclusions}
    onChange={handleChange}
  />
</div>
<div className="form-row">
  <label htmlFor="terms" style={{ fontWeight: "bold", marginBottom: "5px", display: "inline-block" }}>
    Terms & Conditions:
  </label>
  <input
    type="checkbox"
    id="terms"
    name="terms"
    checked={formState.terms}
    onChange={handleChange}
  />
</div>

<div style={{ marginTop: "20px" }}>
  {formData ? (
    <button
      onClick={handleUpdate}
      style={{ padding: "10px 20px", marginRight: "10px", border: "none", backgroundColor: "#28a745", color: "#fff", borderRadius: "4px", cursor: "pointer" }}
    >
      Update
    </button>
  ) : (
    <button
      type="submit"
      onClick ={handleSubmit}
      style={{ padding: "10px 20px", marginRight: "10px", border: "none", backgroundColor: "#28a745", color: "#fff", borderRadius: "4px", cursor: "pointer" }}
    >
      Submit
    </button>
  )}
  <button
    type="button"
    onClick={() => navigate("/dashboard")}
    style={{ padding: "10px 20px", border: "none", backgroundColor: "#dc3545", color: "#fff", borderRadius: "4px", cursor: "pointer" }}
  >
    Cancel
  </button>
</div>
 </form>
    </div>
  );
};
export default Form;
