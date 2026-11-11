import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ApplyConnection from "./pages/ApplyConnection";
import AdminDashboard from "./pages/AdminDashboard";
import AdminApplications from "./pages/AdminApplications";
import AdminApplicationDetails from "./pages/AdminApplicationDetails";
import AiVerificationLogs from "./pages/AiVerificationLogs";
import ApplicationDetails from "./pages/ApplicationDetails";
import AdminLogin from "./pages/AdminLogin";
import TrackStatus from "./pages/TrackStatus";
import Success from "./pages/Success";


function App() {

  return (

    <BrowserRouter>
  <Routes>

    {/* USER */}
    <Route path="/" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/apply" element={<ApplyConnection />} />

    {/* ADMIN */}
    <Route path="/admin-login" element={<AdminLogin />} />
    <Route path="/admin" element={<AdminDashboard />} />
   <Route
    path="/admin-applications/:status"
    element={<AdminApplications />}
/>
<Route
    path="/admin-application/:applicationId"
    element={<AdminApplicationDetails />}
/>
<Route
    path="/application/:id"
    element={<ApplicationDetails />}
/>

<Route
    path="/admin-ai-logs"
    element={<AiVerificationLogs />}
/>

    <Route path="/track-status" element={<TrackStatus />} />

    <Route path="/success" element={<Success />} />

  </Routes>
  
</BrowserRouter>

  );
}

export default App;