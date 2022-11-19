import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
// Project redirections
import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import './index.css'
//  JWT DECODE 
import jwt_decode from 'jwt-decode';
import { getBottomNavigationUtilityClass } from "@mui/material";

const muiCache = createCache({
  key: "mui-datatables",
  prepend: true
});

function DataTable() {


  const [token, setToken] = useState('');
  const [data2, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    refreshToken();

  }, [])

  const requestOptions = {
    method: 'GET',
    credentials: 'include',


  };

  const refreshToken = async () => {

    try {

      const response = await fetch("http://localhost:3001/token/getToken", requestOptions)
        .then(response => response.json())
        .then(data => {
          //  alert(data.accessToken)
          setToken(data.accessToken)
          const decoded = jwt_decode(data.accessToken)

          const result = fetch(" http://localhost:3001/categorie/getCategories", requestOptions)
            .then(response => response.json())
            .then(data => {
              console.log(data)
              setData(data)
              
             
            })
        });
    } catch (error) {
      console.log('can t get categories')
      navigate("/");
    }
  

  }


  const [responsive, setResponsive] = useState("vertical");
  const [tableBodyHeight, setTableBodyHeight] = useState("400px");
  const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
  const [searchBtn, setSearchBtn] = useState(true);
  const [downloadBtn, setDownloadBtn] = useState(true);
  const [printBtn, setPrintBtn] = useState(true);
  const [viewColumnBtn, setViewColumnBtn] = useState(true);
  const [filterBtn, setFilterBtn] = useState(true);

  const columns = [
    {
     name: "id_Categorie",
     label: "Num",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
     name: "label_categorie",
     label: "Category",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
      name: "Description",
      label: "Descritpion",
      options: {
       filter: true,
       sort: true,
      }
     },{
      name: "Action",
      label: "Action",
      options: {
       filter: false,
       sort: false,
      }
     }
   
    
   
   ];

  const options = {
    search: searchBtn,
    download: downloadBtn,
    print: printBtn,
    viewColumns: viewColumnBtn,
    filter: filterBtn,
    filterType: "dropdown",
    responsive,
    tableBodyHeight,
    tableBodyMaxHeight,
    onTableChange: (action, state) => {
      console.log(action);
      console.dir(state);
    }
  };



  return (
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={createTheme()}>
      <i class="fa fa-key addIcon" aria-hidden="true"></i>
        <MUIDataTable
        
          title={"Catégories de Produits"}
          data={data2}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </CacheProvider>
  );
}
export default DataTable;