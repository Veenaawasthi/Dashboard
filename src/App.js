import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import Login from "./Component/Login";
import Form from "./Component/Form";
import Dashboard from "./Component/Dashboard2";
import Tourform from "./Component/Tourform";
import { FormView } from "./Component/FormView";
import { dummyData, queryDashboardDummyData } from "./Component/Service";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import QeryDashboard from "./Component/QueryDashboard";
import Footer from "./Component/Footer";
// import BillGenerator from "./Component/BillGenerator";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [forms, setForms] = useState([...dummyData]);
  const [queryForms, setQueryForms] = useState([...queryDashboardDummyData]);
  const [itineraryData, setItineraryData] = useState(dummyData[0]);
  const [editFormData, setEditFormData] = useState({});
  const [editQeryFormData, setEditQeryFormData] = useState({});
  const [formList, setFormList] = useState([]);
  // const [selectedServices, setSelectedServices] = useState([]);
  // const [numberOfPassengers, setNumberOfPassengers] = useState(1);

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

  const updateQueryFormHandler = (formDate) => {
    const updateQueryFormData = formDate;
    const filterQueryFormData = queryForms.filter(
      (item) => item.uid !== formDate.uid
    );
    setQueryForms([...filterQueryFormData, updateQueryFormData]);
  };

  return (
    <BrowserRouter>
      <div className="app">
        {isLoggedIn && (
          <button className="hamburger-menu btn btn-light" onClick={toggleSidebar}>
            <i className="bi bi-list"></i>
          </button>
        )}

        {isLoggedIn && isSidebarOpen && (
          <div className="sidebar bg-dark text-white">
            <ul className="list-unstyled">
              <li>
                <Link
                  to="/dashboard"
                  className="d-flex align-items-center text-white text-decoration-none"
                >
                  <img
                    src={"/itineraydashboard.png"}
                    alt="dashboard"
                    className="me-2"
                    style={{ width: "24px", height: "24px" }}
                  />
                  <span>Itinerary Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/query-dashboard"
                  className="d-flex align-items-center text-white text-decoration-none"
                >
                  <img
                    src={"/dashboard.png"}
                    alt="dashboard"
                    className="me-2"
                    style={{ width: "24px", height: "24px" }}
                  />
                  <span>Query Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/tourform"
                  className="d-flex align-items-center text-white text-decoration-none"
                >
                  <img
                    src={"/query.png"}
                    alt="query"
                    className="me-2"
                    style={{ width: "24px", height: "24px" }}
                  />
                  <span>Query Form</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/form"
                  className="d-flex align-items-center text-white text-decoration-none"
                >
                  <img
                    src={"/form.png"}
                    alt="form"
                    className="me-2"
                    style={{ width: "24px", height: "24px" }}
                  />
                  <span>Itinerary Form</span>
                </Link>
              </li>
              
              <li>
                <Link
                  to="/login"
                  onClick={handleLogout}
                  className="d-flex align-items-center text-white text-decoration-none"
                >
                  <img
                    src={"/logout.png"}
                    alt="logout"
                    className="me-2"
                    style={{ width: "24px", height: "24px" }}
                  />
                  <span>Logout</span>
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
                  path="/queryeditForm"
                  element={
                    <Tourform
                      editQeryFormData={editQeryFormData}
                      updateQueryFormHandler={updateQueryFormHandler}
                    />
                  }
                />
                <Route
                  path="/query-dashboard"
                  element={
                    <QeryDashboard
                      forms={queryForms}
                      setEditQeryFormData={setEditQeryFormData}
                    />
                  }
                />
                <Route
                  path="/view"
                  element={<FormView itineraryData={itineraryData} />}
                />
                <Route
                  path="/tourform"
                  element={
                    <Tourform
                      addClient={setQueryForms}
                      queryForms={queryForms}
                    />
                  }
                />
                {/* <Route
                  path="/bill-generator"
                  element={
                    <BillGenerator
                      selectedServices={selectedServices}
                      numberOfPassengers={numberOfPassengers}
                    />
                  }
                /> */}
              </>
            ) : (
              <Route path="*" element={<Navigate to="/" />} />
            )}
          </Routes>
        </div>
        <ConditionalFooter />
      </div>
    </BrowserRouter>
  );
};

const ConditionalFooter = () => {
  const location = useLocation();
  return location.pathname === "/" ? <Footer /> : null;
};

export default App;

