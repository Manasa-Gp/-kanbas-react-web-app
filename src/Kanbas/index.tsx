import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import "./styles.css";
import { Routes, Route, Navigate } from "react-router";
import Courses from "./Courses";
export default function Kanbas() {
  return (
  <div id="wd-kanbas" className="h-100">
  <div className="d-flex h-100">
    <div className="d-none d-md-block bg-black" style = {{marginRight:"25px"}}>
      <KanbasNavigation />
    </div>
    <div className="flex-fill">
      <Routes>
        <Route path="/" element={<Navigate to="Dashboard" />} />
        <Route path="Dashboard" element={<Dashboard />} />
        <Route path="Courses/:cid/*" element={<Courses />} />
      </Routes>
    </div>
  </div>
</div>

);}
