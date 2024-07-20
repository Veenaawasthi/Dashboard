import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./Component/Login";
import Form from "./Component/Form";
import Dashboard from "./Component/Dashboard2";
import Tourform from "./Component/Tourform";
import { FormView } from "./Component/FormView";
import { dummyData } from "./Component/Service";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [forms, setForms] = useState([...dummyData]);
  const [queryForms, setQueryForms] = useState([...dummyData]);
  const [itineraryData, setItineraryData] = useState(dummyData[0]);
  const [editFormData, setEditFormData] = useState({});
  const [formList, setFormList] = useState([]);
  const addForm = (form) => {
    const newForm = {
      id: uuidv4(),
      groupName: form.groupName,
      fileCode: form.filecode,
      totalPax: form.totalPax,
      clientName: form.name,
      tourDate: form.tourDate,
      flight: form.flight,
      itinerary: form.itinerary,
      dateOfQtn: form.dateOfQtn,
      agent: form.agent,
      services: form.days,
      hotels: form.hotels,
      validity: form.validity,
      quotationSlab: form.quotationSlabs,
    };
    setForms([...forms, newForm]);
  };

  const handleUpdateForm = (updatedForm) => {
    // Logic to update the form in your state or backend
    const newUpdatedForm = {
      id: updatedForm.id,
      groupName: updatedForm.groupName,
      fileCode: updatedForm.filecode,
      totalPax: updatedForm.totalPax,
      clientName: updatedForm.name,
      tourDate: updatedForm.tourDate,
      flight: updatedForm.flight,
      itinerary: updatedForm.itinerary,
      dateOfQtn: updatedForm.dateOfQtn,
      agent: updatedForm.agent,
      services: updatedForm.days,
      hotels: updatedForm.hotels,
      validity: updatedForm.validity,
      quotationSlab: updatedForm.quotationSlabs,
    };
    const filterForm = forms.filter((item) => item.id !== updatedForm.id);
    setForms([...filterForm, newUpdatedForm]);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  useEffect(() => {
    setFormList(forms);
  }, [forms]);

  console.log('queryForm',queryForms)

  return (
    <BrowserRouter>
      <div className="app">
        {isLoggedIn && (
          <button className="hamburger-menu" onClick={toggleSidebar}>
            <img
              src={"/home.png"}
              alt='home'
              style={{
                padding: "0.5px",
                width: "24px",
                height: "24px",
                backgroundColor: "red",
              }}
            />
          </button>
        )}

        {isLoggedIn && isSidebarOpen && (
          <div className="sidebar">
            <ul>
              <li>
                <Link
                  to="/dashboard"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                  }}
                >
                  <img
                    src={"/dashboard.png"}
                    alt='dashboard'
                    style={{ padding: "0.5px", width: "24px", height: "24px" }}
                  />
                  <span style={{ fontSize: "17px" }}>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/tourform"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                  }}
                >
                  <img
                    src={"/flowsheet.png"}
                    alt='flowsheet'
                    style={{ padding: "0.5px", width: "24px", height: "24px" }}
                  />
                  <span style={{ fontSize: "17px" }}>Query Form</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/form"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                  }}
                >
                  <img
                    src={"/flowsheet.png"}
                    alt='flowsheet'
                    style={{ padding: "0.5px", width: "24px", height: "24px" }}
                  />
                  <span style={{ fontsize: "17px" }}>Itinerary Form</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  onClick={handleLogout}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                  }}
                >
                  <img
                    src={"/logout.png"}
                    alt='logout'
                    style={{ padding: "0.5px", width: "24px", height: "24px" }}
                  />
                  <span style={{ fontsize: "17px" }}>Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        )}

        <div className="main-content">
          <Routes>
            <Route path="/" element={<Login onLogin={handleLogin} />} />
            {isLoggedIn ? (
              <>
                <Route path="/form" element={<Form onSubmit={addForm} />} />
                <Route
                  path="/editForm"
                  element={
                    <Form formData={editFormData} onSubmit={handleUpdateForm} />
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <Dashboard
                      forms={formList}
                      setItineraryData={setItineraryData}
                      setEditFormData={setEditFormData}
                      setFormList={setFormList}
                    />
                  }
                />
                <Route
                  path="/view"
                  element={<FormView itineraryData={itineraryData} />}
                />
                <Route
                  path="/tourform"
                  element={<Tourform addClient={setQueryForms} />}
                />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/" />} />
            )}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
