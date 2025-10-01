import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyCourses from "./pages/MyCourses";
import PaymentSuccess from "./pages/PaymentSuccess";
import LessonPage from "./pages/LessonPage";
import AddCourse from "./pages/instructor/AddCourse";
import InstructorCourses from "./pages/instructor/InstructorCourses.js";
import InstructorLessonPage from "./pages/instructor/InstructorLessonPage.js"
import InstructorCourseDetail from "./pages/instructor/InstructorCourseDetail.js";
import AdminDashboard from "./pages/admin/AdminDashboard.js";
import { Footer } from "./components/Footer.js";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/courses/:courseId/lessons" element={<LessonPage />} />
        <Route path="/instructor/add-course" element={<AddCourse />} />
        <Route path="/instructor/my-courses" element={<InstructorCourses />} />
         <Route path="/instructor/courses/:courseId/lessons" element={<InstructorLessonPage />} />
        <Route path="/instructor/course/:id" element={<InstructorCourseDetail />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
      <Footer/>
    </Router>
  );
}
export default App;
