import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { employeeActions } from "../Store/EmployeeSlice";
import {useNavigate} from "react-router-dom";

const DetailEmployee = () => {
  const dataEmployee = useSelector((state) => state.employee.dataEmployee);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleDelete = async (id) => {
      await fetch(`https://61601920faa03600179fb8d2.mockapi.io/pegawai/${id}`, {
        method: "DELETE"
      });
    dispatch(employeeActions.removeEmployee(id))
  }
  const handleEdit = (id) => {
    navigateTo(`/edit/${id}`)
  }
  return (
    <div className="detailEmployee">
      <h2 className="titleDetail">Data Employee</h2>
      <div className="wrapEmployee">
        {dataEmployee?.map((data) => {
          return (
            <div key={data.id} className="boxEmployee">
              <p>Id Employee: {data.id}</p>
              <p>Nama: {data.nama}</p>
              <p>jalan: {data.jalan}</p>
              <p>provinsi: {data.provinsi}</p>
              <p>kabupaten: {data.kabupaten}</p>
              <p>kecamatan: {data.kecamatan}</p>
              <p>kelurahan: {data.kelurahan}</p>
              <button type="button" onClick={() => handleDelete(data.id)}>Delete</button>
              <button type="button" onClick={() => handleEdit(data.id)}>Edit</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DetailEmployee;
