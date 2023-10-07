import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Typography,
  TextField,
  Stack,
  Autocomplete,
  MenuItem,
} from "@mui/material";
import { employeeActions } from "../Store/EmployeeSlice";

const FormEmployee = () => {
  // Fetch Data Provinsi, kota, Kecamatan
  const [dataProvinsi, setDataProvinsi] = useState([]);
  const [dataKota, setDataKota] = useState([]);
  const [dataKecamatan, setDataKecamatan] = useState([]);
  const [dataKelurahan, setDataKelurahan] = useState([]);

  // Data Employee
  const [namaEmployee, setNamaEmployee] = useState("");
  const [jalanEmployee, setJalanEmployee] = useState("");
  const [provinsiEmployee, setProvinsiEmployee] = useState([]);
  const [inputProvinsiEmployee, setInputProvinsiEmployee] = useState("");
  const [inputKotaEmployee, setInputKotaEmployee] = useState([]);
  const [kecamatanEmployee, setKecamatanEmployee] = useState([]);
  const [dataKelurahanEmployee, setDataKelurahanEmployee] = useState([]);

  // Controller Dispatch
  const dispatch = useDispatch();

  // Fetch Data Provinsi
  useEffect(() => {
    fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setDataProvinsi(data);
        setProvinsiEmployee(data[0]);
      });
  }, []);

  // Fetch Data Kota/Kabupaten
  useEffect(() => {
    fetch(
      `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinsiEmployee?.id}.json`
    )
      .then((res) => {
        return res.json();
      })
      .then((kota) => {
        setDataKota(kota);
        setInputKotaEmployee(kota[0]);
      });
  }, [provinsiEmployee, inputProvinsiEmployee]);

  // Fetch Data Kecamatan
  useEffect(() => {
    fetch(
      `http://www.emsifa.com/api-wilayah-indonesia/api/districts/${inputKotaEmployee?.id}.json`
    )
      .then((res) => {
        return res.json();
      })
      .then((dataKec) => {
        setDataKecamatan(dataKec);
        setKecamatanEmployee(dataKec[0]);
      });
  }, [inputKotaEmployee]);

  // Fetch Data Kelurahan
  useEffect(() => {
    fetch(
      `http://www.emsifa.com/api-wilayah-indonesia/api/villages/${kecamatanEmployee.id}.json`
    )
      .then((res) => {
        return res.json();
      })
      .then((dataLurah) => {
        setDataKelurahan(dataLurah);
        setDataKelurahanEmployee(dataLurah[0]);
      });
  }, [kecamatanEmployee]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "https://61601920faa03600179fb8d2.mockapi.io/pegawai",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama: namaEmployee,
          jalan: jalanEmployee,
          provinsi: provinsiEmployee.name,
          kabupaten: inputKotaEmployee.name,
          kecamatan: kecamatanEmployee.name,
          kelurahan: dataKelurahanEmployee.name,
        }),
      }
    );

    const dataResponse = await response.json();

    if(response.ok){
      console.log(dataResponse);
      dispatch(employeeActions.addEmployee(dataResponse));
    }
  };

  return (
    <div className="formEmployee">
      <Typography variant="h4">Add Employee</Typography>
      <form onSubmit={handleSubmit}>
        <Stack sx={{}} spacing={2}>
          <TextField
            label="Nama Employee"
            variant="outlined"
            defaultValue={namaEmployee}
            onChange={(e) => setNamaEmployee(e.target.value)}
          />
          <TextField
            label="Jalan"
            variant="outlined"
            defaultValue={jalanEmployee}
            onChange={(e) => setJalanEmployee(e.target.value)}
          />
          <Autocomplete
            id="name_province_demo"
            value={provinsiEmployee}
            onChange={(event, newValue) => {
              setProvinsiEmployee(newValue);
            }}
            inputValue={inputProvinsiEmployee}
            onInputChange={(event, newInputValue) => {
              setInputProvinsiEmployee(newInputValue);
            }}
            options={dataProvinsi}
            getOptionLabel={(dataProvinsi) => `${dataProvinsi.name}`}
            sx={{ width: 300 }}
            renderInput={(dataProvinsi) => (
              <TextField {...dataProvinsi} label="Provinsi" />
            )}
          />
          <TextField
            id="outlined-select-currency"
            select
            label="kota/kabupaten"
            value={inputKotaEmployee}
            onChange={(e) => setInputKotaEmployee(e.target.value)}
          >
            {dataKota.map((kota) => (
              <MenuItem key={kota.id} value={kota}>
                {kota.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-select-currency"
            select
            label="kecamatan"
            value={kecamatanEmployee}
            onChange={(e) => setKecamatanEmployee(e.target.value)}
          >
            {dataKecamatan.map((dataKec) => (
              <MenuItem key={dataKec.id} value={dataKec}>
                {dataKec.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-select-currency"
            select
            label="kelurahan"
            value={dataKelurahanEmployee}
            onChange={(e) => setDataKelurahanEmployee(e.target.value)}
          >
            {dataKelurahan.map((dataLurah) => (
              <MenuItem key={dataLurah.id} value={dataLurah}>
                {dataLurah.name}
              </MenuItem>
            ))}
          </TextField>
          <button type="submit">Enter</button>
        </Stack>
      </form>
    </div>
  );
};

export default FormEmployee;
