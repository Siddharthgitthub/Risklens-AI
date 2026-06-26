import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Analysis from "./pages/Analysis";
import Dashboard from "./pages/Dashboard";
import ScrollToTop from "./components/ScrollToTop";
export default function App(){
  return(
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/analysis" element={<Analysis/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  )
}
