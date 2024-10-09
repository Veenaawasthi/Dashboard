import React, { useState } from 'react';
import Select from 'react-select';
import html2pdf from 'html2pdf.js';
import getPricingData from './PricingData';
import './BillGenerator.css';

const BillGenerator = () => {
  const pricingData = getPricingData();
  const [days, setDays] = useState([{ services: [], modes: [], meals: [], hotels: [], city: '' }]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [totalPax, setTotalPax] = useState(1);

  const handleServiceChange = (index, selectedOptions) => {
    const newDays = [...days];
    newDays[index].services = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setDays(newDays);
  };

  const handlePaxChange = (value) => {
    setTotalPax(value);
  };

  const handleCityChange = (index, value) => {
    const newDays = [...days];
    newDays[index].city = value;
    setDays(newDays);
  };

  const handleFlightChange = (e) => {
    setSelectedFlight(e.target.value);
  };

  const handleCheckboxChange = (index, type, value) => {
    const newDays = [...days];
    const day = newDays[index];
    if (!day[type]) {
      day[type] = [];
    }
    if (day[type].includes(value)) {
      day[type] = day[type].filter(item => item !== value);
    } else {
      day[type] = [...day[type], value];
    }
    setDays(newDays);
  };

  const handleAddDay = () => {
    setDays([...days, { services: [], modes: [], meals: [], hotels: [], city: '' }]);
  };

  const getFilteredServices = (city) => {
    return city ? Object.entries(pricingData.services[city] || {}).map(([service, price]) => ({ value: service, label: `${service} - ₹${price}` })) : [];
  };

  const calculateTotal = () => {
    return days.map(day => {
      const serviceTotal = day.services.reduce((total, service) => total + (pricingData.services[day.city]?.[service] || 0), 0) * totalPax;
      const modeTotal = day.modes ? day.modes.reduce((total, mode) => total + pricingData.modes[mode], 0) * totalPax : 0;
      const mealTotal = day.meals ? day.meals.reduce((total, meal) => total + pricingData.meals[meal], 0) * totalPax : 0;
      const hotelTotal = day.hotels ? day.hotels.reduce((total, hotel) => total + pricingData.hotels[hotel], 0) * totalPax : 0;
      return { serviceTotal, modeTotal, mealTotal, hotelTotal, dayTotal: serviceTotal + modeTotal + mealTotal + hotelTotal };
    });
  };

  const totals = calculateTotal();
  const grandTotal = totals.reduce((sum, day) => sum + day.dayTotal, 0);
  const flightTotal = selectedFlight ? pricingData.flights[selectedFlight] * totalPax : 0;
  const finalGrandTotal = grandTotal + flightTotal;

  const downloadPDF = () => {
    const element = document.getElementById('bill-summary');
    const options = {
      margin: [1,1,1,1],
      filename: 'bill_summary.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    html2pdf().from(element).set(options).save();
  };

  return (
    <div>
      <div>
        <h3>Select Flight for the Entire Trip</h3>
        <div>
          <label><i className="fas fa-plane"></i> Flight: </label>
          <select value={selectedFlight || ''} onChange={handleFlightChange}>
            <option value="" disabled>Select a flight</option>
            {Object.keys(pricingData.flights).map(flight => (
              <option key={flight} value={flight}>{flight} - ₹{pricingData.flights[flight]}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <h3>Total Number of Passengers</h3>
        <div>
          <label><i className="fas fa-user"></i> Passengers: </label>
          <input
            type="number"
            value={totalPax}
            onChange={e => handlePaxChange(parseInt(e.target.value))}
            min="1"
          />
        </div>
      </div>
      {days.map((day, index) => (
        <div key={index}>
          <h3>Day {index + 1}</h3>
          <div>
            <label><i className="fas fa-city"></i> City: </label>
            <select value={day.city} onChange={(e) => handleCityChange(index, e.target.value)}>
              <option value="" disabled>Select a city</option>
              {Object.keys(pricingData.cities).map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <div>
            <label><i className="fas fa-concierge-bell"></i> Services: </label>
            <Select
              isMulti
              options={getFilteredServices(day.city)}
              onChange={(selectedOptions) => handleServiceChange(index, selectedOptions)}
              value={day.services.map(service => ({ value: service, label: `${service} - ₹${pricingData.services[day.city][service]}` }))}
            />
          </div>
          <div>
            <label><i className="fas fa-bus"></i> Modes: </label>
            {Object.keys(pricingData.modes).map(mode => (
              <label key={mode}>
                <input
                  type="checkbox"
                  value={mode}
                  checked={day.modes ? day.modes.includes(mode) : false}
                  onChange={() => handleCheckboxChange(index, 'modes', mode)}
                />
                {mode} - ₹{pricingData.modes[mode]}
              </label>
            ))}
          </div>
          <div>
            <label><i className="fas fa-utensils"></i> Meals: </label>
            {Object.keys(pricingData.meals).map(meal => (
              <label key={meal}>
                <input
                  type="checkbox"
                  value={meal}
                  checked={day.meals ? day.meals.includes(meal) : false}
                  onChange={() => handleCheckboxChange(index, 'meals', meal)}
                />
                {meal} - ₹{pricingData.meals[meal]}
              </label>
            ))}
          </div>
          <div>
            <label><i className="fas fa-bed"></i> Hotels: </label>
            {Object.keys(pricingData.hotels).map(hotel => (
              <label key={hotel}>
                <input
                  type="checkbox"
                  value={hotel}
                  checked={day.hotels ? day.hotels.includes(hotel) : false}
                  onChange={() => handleCheckboxChange(index, 'hotels', hotel)}
                />
                {hotel} - ₹{pricingData.hotels[hotel]}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button onClick={handleAddDay}><i className="fas fa-plus"></i> Add Day</button>
      <div id="bill-summary">
        <div className="invoice-header">
          <h1><i className="fas fa-suitcase"></i> Rising Destination</h1>
          <p>168/12 Dharamjin C.H.S. Jawahar Nagar, Road No.2, Near Amit Dairy, Goregoan | Mumbai - 400104</p>
          <p><i className="fas fa-phone"></i> 9810500010</p>
          <p><i className="fas fa-envelope"></i> vivek@risingdestination.com</p>
        </div>
        <h3><i className="fas fa-file-invoice"></i> Bill Summary</h3>
        <table>
          <thead>
            <tr>
              <th>Day</th>
              <th>City</th>
              <th>Services</th>
              <th>Modes</th>
              <th>Meals</th>
              <th>Hotels</th>
              <th>Day Total</th>
            </tr>
          </thead>
          <tbody>
            {days.map((day, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{day.city}</td>
                <td>
                  <div className="service-list">
                    {day.services.map(service => (
                      <div key={service}>
                        {service} - ₹{pricingData.services[day.city]?.[service]}
                      </div>
                    ))}
                  </div>
                </td>
                <td>{day.modes?.join(', ')}</td>
                <td>{day.meals?.join(', ')}</td>
                <td>{day.hotels?.join(', ')}</td>
                <td>₹{totals[index]?.dayTotal || 0}</td>
              </tr>
            ))}
            <tr className="grand-total">
              <td colSpan="6">Grand Total</td>
              <td>₹{finalGrandTotal}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button onClick={downloadPDF}><i className="fas fa-download"></i> Download Bill Summary</button>
    </div>
  );
};

export default BillGenerator;