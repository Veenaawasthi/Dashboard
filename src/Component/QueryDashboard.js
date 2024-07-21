import React,{useEffect,useState} from "react";
import "./Dashboard2.css";
import { useNavigate } from "react-router-dom";

const QeryDashboard = ({ forms,setEditQeryFormData }) => {
  const [searchUID, setSearchUID] = useState("");
  const [QuertFormtList, setQueryFormList] = useState([]);
  const navigate = useNavigate();

  const handleEdit = (form) => {
    setEditQeryFormData(form);
    navigate("/queryeditForm");
  };

  useEffect(() => {
    if(searchUID.length){
       const filteredForms=forms.filter((form)=>form.uid.toLowerCase().includes(searchUID.toLocaleLowerCase()))
       setQueryFormList(filteredForms)
    }
    else{
      setQueryFormList(forms)
    }
  }, [forms,searchUID]);

  return (
    <div className="dashboard">
      <h1 style={{ color: "black", backgroundColor: "AppWorkspace" }}>
        Query Dashboard
      </h1>
      <div className="search-bar">
        <label style={{textAlign:'center'}}>Search by UID</label>
        <input
          type="text"
          value={searchUID}
          onChange={(e) => setSearchUID(e.target.value)}
        />
      </div>
      <div className="total-itineraries">
        <p>Total Query: {forms.length}</p>
      </div>
      {QuertFormtList?.length === 0 ? (
        <p>No forms submitted yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>UID</th>
              <th>Client Name</th>
              <th>Company Name</th>
              <th>Status</th>
              <th>Query Date</th>
              <th>Tour Start Date</th>
              <th>Agent</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {QuertFormtList?.map((form, index) => (
              <tr key={index}>
                <td>{form.uid}</td>
                <td>{form.name}</td>
                <td>{form.company}</td>
                <td>{form.status}</td>
                <td>{form.queryDate}</td>
                <td>{form.tourStartDate}</td>
                <td>{form.agentHandling}</td>
                <td>{form.address},{form.city}</td>
                <td>
                  <button onClick={() => handleEdit(form)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default QeryDashboard;
