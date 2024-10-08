import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import Login from "./Component/Login";
import Form from "./Component/Form";
import Dashboard from "./Component/Dashboard2";
import Tourform from "./Component/Tourform";
import { FormView } from "./Component/FormView";
import { dummyData, queryDashboardDummyData } from "./Component/Service";
import "./App.css";
import QeryDashboard from "./Component/QueryDashboard";
import Footer from "./Component/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './i18n'; 

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [forms, setForms] = useState([...dummyData]);
  const [queryForms, setQueryForms] = useState([...queryDashboardDummyData]);
  const [itineraryData, setItineraryData] = useState(dummyData[0]);
  const [editFormData, setEditFormData] = useState({});
  const [editQeryFormData, setEditQeryFormData] = useState({});
  const [formList, setFormList] = useState([]);
  

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

  const addForm = (form) => {
    if (!form) {
      console.error("Form data is undefined");
      return;
    }
  
    const fileCode = form.file_code?.trim() || '';
    if (!fileCode) {
      alert("File code is required.");
      return;
    }
  
    const newForm = {
      group_name: form.group_name?.trim() || '',
      file_code: fileCode,
      total_pax: Math.max(parseInt(form.total_pax, 10), 1),
      client_name: form.client_name?.trim() || '',
      tour_date: form.tour_date || '',
      flight: form.flight?.trim() || '',
      itinerary: form.itinerary?.trim() || '',
      date_of_qtn: form.date_of_qtn || '',
      agent: form.agent?.trim() || '',
      days: form.days || [],
      hotels: form.hotels || [],
      validity: form.validity ? form.validity.split('T')[0] : '',
      quotation_slabs: form.quotation_slabs || [],
    };
  
    setForms((prevForms) => [...prevForms, newForm]);
  };
  
  const handleUpdateForm = (updatedForm) => {
    console.log("new", updatedForm)
    if (!updatedForm) {
      console.error("Updated form data is undefined");
      return;
    }
  
    const fileCode = updatedForm.file_code?.trim() || '';
    if (!fileCode) {
      alert("File code is required.");
      return;
    }
  
    const newUpdatedForm = {
      group_name: updatedForm.group_name?.trim() || '',
      file_code: fileCode,
      total_pax: Math.max(parseInt(updatedForm.total_pax, 10), 1),
      client_name: updatedForm.client_name?.trim() || '',
      tour_date: updatedForm.tour_date || '',
      flight: updatedForm.flight?.trim() || '',
      itinerary: updatedForm.itinerary?.trim() || '',
      date_of_qtn: updatedForm.date_of_qtn || '',
      agent: updatedForm.agent?.trim() || '',
      days: updatedForm.days || [],
      hotels: updatedForm.hotels || [],
      validity: updatedForm.validity ? updatedForm.validity.split('T')[0] : '',
      quotation_slabs: updatedForm.quotation_slabs || [],
    };
  
    const updatedForms = forms.map((item) =>
      item.file_code === fileCode ? newUpdatedForm : item
    );
  
    setForms(updatedForms);
    console.log("Updated Forms:", updatedForms);
  };
  

  const updateQueryFormHandler = (updatedFormData) => {
    const filteredQueryForms = queryForms.map((item) =>
      item.uid === updatedFormData.uid ? updatedFormData : item
    );
    setQueryForms(filteredQueryForms);
  };

  useEffect(() => {
    setFormList(forms);
  }, [forms]);

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
                <Link to="/dashboard" className="d-flex align-items-center text-white text-decoration-none">
                  <img src={"/itineraydashboard.png"} alt="dashboard" className="me-2" style={{ width: "24px", height: "24px" }} />
                  <span>Itinerary Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/query-dashboard" className="d-flex align-items-center text-white text-decoration-none">
                  <img src={"/dashboard.png"} alt="dashboard" className="me-2" style={{ width: "24px", height: "24px" }} />
                  <span>Query Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/tourform" className="d-flex align-items-center text-white text-decoration-none">
                  <img src={"/query.png"} alt="query" className="me-2" style={{ width: "24px", height: "24px" }} />
                  <span>Query Form</span>
                </Link>
              </li>
              <li>
                <Link to="/form" className="d-flex align-items-center text-white text-decoration-none">
                  <img src={"/form.png"} alt="form" className="me-2" style={{ width: "24px", height: "24px" }} />
                  <span>Itinerary Form</span>
                </Link>
              </li>
              <li>
                <Link to="/login" onClick={handleLogout} className="d-flex align-items-center text-white text-decoration-none">
                  <img src={"/logout.png"} alt="logout" className="me-2" style={{ width: "24px", height: "24px" }} />
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
                <Route path="/editForm" element={<Form formData={editFormData} onSubmit={handleUpdateForm} />} />
                <Route path="/dashboard" element={<Dashboard forms={formList} setItineraryData={setItineraryData} setEditFormData={setEditFormData} setFormList={setFormList} />} />
                <Route path="/queryeditForm" element={<Tourform editQeryFormData={editQeryFormData} updateQueryFormHandler={updateQueryFormHandler} />} />
                <Route path="/query-dashboard" element={<QeryDashboard forms={queryForms} setEditQeryFormData={setEditQeryFormData} />} />
                <Route path="/view" element={<FormView itineraryData={itineraryData} />} />
                <Route path="/tourform" element={<Tourform addClient={setQueryForms} queryForms={queryForms} />} />
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
