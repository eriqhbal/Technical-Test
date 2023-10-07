import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Stack, Autocomplete, MenuItem } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { employeeActions } from "./Store/EmployeeSlice";

const styles = makeStyles({
  container: {
    marginTop: "10px",
  },
  buttonBack: {
    marginBottom: "8px",
  },
});

const EditEmployee = () => {
  // Fetch Data Provinsi, kota, Kecamatan
  const [dataProvinsi, setDataProvinsi] = useState([]);
  const [dataKota, setDataKota] = useState([]);
  const [dataKecamatan, setDataKecamatan] = useState([]);
  const [dataKelurahan, setDataKelurahan] = useState([]);

  const [ubahNama, setUbahNama] = useState("");
  const [ubahJalan, setUbahJalan] = useState("");
  const [ubahProvinsi, setUbahProvinsi] = useState([]);
  const [ubahInputProvinsi, setUbahInputProvinsi] = useState("");
  const [ubahKota, setUbahKota] = useState([]);
  const [ubahKecamatan, setUbahKecamatan] = useState([]);
  const [ubahKelurahan, setUbahKelurahan] = useState([]);
  const [oldData, setOldData] = useState([]);
  const { id } = useParams();

  const dispatch = useDispatch();
  const classes = styles();
  const navigateTo = useNavigate();

  // Fetch Provinsi
  useEffect(() => {
    fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setDataProvinsi(data);
        setUbahProvinsi(data[0]);
      });
  }, []);

  // Fetch Kota/Kabupaten
    useEffect(() => {
      fetch(
        `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${ubahProvinsi?.id}.json`
      )
        .then((res) => {
          return res.json();
        })
        .then((kota) => {
          setDataKota(kota);
          setUbahKota(kota[0]);
        });
    }, [ubahProvinsi, ubahInputProvinsi]);

    // Fetch Kecamatan
      useEffect(() => {
        fetch(
          `http://www.emsifa.com/api-wilayah-indonesia/api/districts/${ubahKota?.id}.json`
        )
          .then((res) => {
            return res.json();
          })
          .then((dataKec) => {
            setDataKecamatan(dataKec);
            setUbahKecamatan(dataKec[0]);
          });
      }, [ubahKota]);

      // Fetch Kelurahan
        useEffect(() => {
          fetch(
            `http://www.emsifa.com/api-wilayah-indonesia/api/villages/${ubahKecamatan.id}.json`
          )
            .then((res) => {
              return res.json();
            })
            .then((dataLurah) => {
              setDataKelurahan(dataLurah);
              setUbahKelurahan(dataLurah[0]);
            });
        }, [ubahKecamatan]);

  const handleEdit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `https://61601920faa03600179fb8d2.mockapi.io/pegawai/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nama: ubahNama, provinsi: ubahProvinsi.name, kabupaten: ubahKota.name, kecamatan: ubahKecamatan.name, kelurahan: ubahKelurahan.name, jalan: ubahJalan}),
      }
    );

    const dataJson = await response.json();

    if (response.ok) {
      dispatch(employeeActions.editEmployee(dataJson));
    }
  };

  return (
    <div className={classes.container}>
      <Typography variant="h4" align="center">
        Edit Data Employee
      </Typography>
      <button
        type="button"
        onClick={() => navigateTo(-1)}
        className={classes.buttonBack}
      >
        Back
      </button>
      <form onSubmit={handleEdit}>
        <Stack spacing={2} width={260}>
          <TextField
            label="Ubah Nama"
            value={ubahNama}
            defaultValue={ubahNama}
            onChange={(e) => setUbahNama(e.target.value)}
          />
          <TextField
            label="Ubah Jalan"
            value={ubahJalan}
            onChange={(e) => setUbahJalan(e.target.value)}
          />
          <Autocomplete
            value={ubahProvinsi}
            onChange={(e, newValue) => {
              setUbahProvinsi(newValue);
            }}
            inputValue={ubahInputProvinsi}
            onInputChange={(e, newValue) => {
              setUbahInputProvinsi(newValue);
            }}
            options={dataProvinsi}
            getOptionLabel={(dataProvinsi) => `${dataProvinsi.name}`}
            renderInput={(dataProvinsi) => {
              return <TextField {...dataProvinsi} label="Ubah Provinsi" />;
            }}
          />
          <TextField
            id="outlined-select-currency"
            select
            label="kota/kabupaten"
            value={ubahKota}
            onChange={(e) => setUbahKota(e.target.value)}
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
            value={ubahKecamatan}
            onChange={(e) => setUbahKecamatan(e.target.value)}
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
            value={ubahKelurahan}
            onChange={(e) => setUbahKelurahan(e.target.value)}
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

export default EditEmployee;
