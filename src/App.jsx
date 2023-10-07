import React, { useEffect } from "react";
import { employeeActions } from "./Store/EmployeeSlice";
import { useDispatch} from "react-redux";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditEmployee from "./EditEmployee";
import Home from "./Home";

const App = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    fetch("https://61601920faa03600179fb8d2.mockapi.io/pegawai")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(employeeActions.setEmployee(data))
      });
  },[]);
  return (
    <div>
      <BrowserRouter>
         <Home/>
        <Routes>
          <Route path="edit/:id" element={<EditEmployee/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
