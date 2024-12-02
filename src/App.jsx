import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Loginpage from "./pages/Loginpage";
import SignupPage from "./pages/SignupPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import Appointmentpage from "./pages/Appointemntpage";
import Paymentpage from "./pages/Paymentpage";
import ServiceHistorypage from "./pages/ServiceHistorypage";
import Trackerpage from "./pages/Trackerpage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/Signup" element={<SignupPage />} />
        <Route path="/RestPassword" element={<ResetPasswordPage />} />
        <Route path="/appointments" element={<Appointmentpage />} />
        <Route path="/payment" element={<Paymentpage />} />
        <Route path="/service-history" element={<ServiceHistorypage />} />
        <Route path="/tracker" element={<Trackerpage />} />
      </Routes>
    </Router>
  );
}

export default App;
