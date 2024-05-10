import './Components/form.jsx'
import './Components/home.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CourseRegistrationForm from './Components/form.jsx';
import Home from './Components/home.jsx';

function App() {
  return (
    <BrowserRouter>
    <Routes>
         <Route path='/' element ={<CourseRegistrationForm/>}/>
         <Route path='/home' element ={<Home/>}/>
       </Routes>
      </BrowserRouter>
        

 
  );
}

export default App;


// import CourseRegistrationForm from './Components/form.jsx'

// import './App.css';
// import './Components/form.jsx';

// function App() {
//   return (
//   <CourseRegistrationForm />
//   );
// }

// export default App;

 
