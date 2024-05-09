import './App.css';
import './Components/CourseRegistrationForm.jsx';
import './Components/Home.jsx';
import CourseRegistrationForm from './Components/CourseRegistrationForm.jsx';
// import {Route, Routes, BrowserRouter as Routers } from 'react-router-dom';
// import Home from './Components/Home.jsx';

function App() {
  return (
  // <Routers>
  //   <Routes>
  //     <Route path="/" element={<CourseRegistrationForm/>}/>
  //     <Route path="/Home" element={<Home/>}/>
  //   </Routes>
  // </Routers>
  <CourseRegistrationForm/>
    
  );
}

export default App;
