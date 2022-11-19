import { useEffect, useState } from 'react';
import Grid from "@mui/material/Grid";

// Project React components
import MDBox from "components/MDBox";

// Project  React Dashbord  components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
// Project redirections
import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate} from 'react-router-dom';
//  JWT DECODE 
import jwt_decode from 'jwt-decode';


 

function Dashboard() {

  const { sales, tasks } = reportsLineChartData;
  const [token,setToken]=useState('');
  const navigate = useNavigate();
 
useEffect(() => {
  refreshToken();

}, [])

const requestOptions = {
  method: 'GET',
  credentials: 'include',
 
 
};

const refreshToken = async()=>{

  try{
    console.log(document.cookie);
        const response = await fetch("http://localhost:3001/token/getToken",requestOptions)
        .then(response => response.json())
        .then(data => {
              //  alert(data.accessToken)
              setToken(data.accessToken)
              const decoded=jwt_decode(data.accessToken)
              // setName(decode.name)
              // setExpire(decode.exp)
              console.log(decoded)
            

        });
  }catch(error){
 console.log('ffffffffff')
 navigate("/");
  }

}
return (
  <div>
      
  <DashboardLayout>
  
    <DashboardNavbar />
    <MDBox py={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="dark"
              icon="weekend"
              title="Produits"
              count={281}
              percentage={{
                color: "success",
                amount: "+55%",
                label: "Entretiens de vente ",
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              icon="leaderboard"
              title="Taux de croissance"
              count="2,300"
              percentage={{
                color: "success",
                amount: "+3%",
                label: "Le mois précédent",
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="success"
              icon="store"
              title="Revenue"
              count="34k"
              percentage={{
                color: "success",
                amount: "+1%",
                label: "Hier",
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="primary"
              icon="person_add"
              title="Utilisateurs"
              count="+10"
              percentage={{
                color: "success",
                amount: "",
                label: "Utilisateurs",
              }}
            />
          </MDBox>
        </Grid>
      </Grid>
      <MDBox mt={4.5}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <ReportsBarChart
                color="info"
                title="Gestion de Besoin"
                description="Statistque de chaque mois "
                date="21/12/2022"
                chart={reportsBarChartData}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <ReportsLineChart
                color="success"
                title="daily sales"
                description={
                  <>
                    (<strong>+15%</strong>) increase in today sales.
                  </>
                }
                date="updated 4 min ago"
                chart={sales}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <ReportsLineChart
                color="dark"
                title="completed tasks"
                description="Last Campaign Performance"
                date="just updated"
                chart={tasks}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <Projects />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <OrdersOverview />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
    <Footer />
   
  </DashboardLayout>

  </div>
);
 }

export default Dashboard;
