import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../Components/style.css';

function CourseRegistrationForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    address: '',
    courses: [],
    center: 'chennai' 
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? (checked ? [...prevState[name], value] : prevState[name].filter(course => course !== value)) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const  {name,email,gender,address} = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (name === "") {
      alert("Please enter your name.");
      return;
    } 
    if (email === "") {
      alert("Please enter your email address.");
      return;
    } 
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (address === "") {
      alert("Please enter your address.");
      return;
    } 
    if (gender === "") {
      alert("Please enter your gender");
      return;
    } 

     
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    
    existingUsers.push({
      name: formData.name,
      email: formData.email,
      gender: formData.gender,
      address: formData.address,
      courses: formData.courses,
      center: formData.center
    });

     
    localStorage.setItem("users", JSON.stringify(existingUsers));

 
    // localStorage.setItem("name", formData.name);
    // localStorage.setItem("email", formData.email);
    // localStorage.setItem("gender", formData.gender);
    // localStorage.setItem('address', formData.address);
    // localStorage.setItem('courses', JSON.stringify(formData.courses));
    // localStorage.setItem('center', formData.center);

    
    navigate('/home', { state: formData });
    e.target.reset();
  };

  return (
    <div className="form-group">
      <h1>Course Registration</h1>
      <form className="box" onSubmit={handleSubmit}>
        <div className="name">
          <label htmlFor="name">Name: </label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <br />
        <div className="e-mail">
          <label htmlFor="email">E-mail: </label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="gender">
          <p>Gender</p>
          <input type="radio" id="male" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} />
          <label htmlFor="male">Male</label><br />
          <input type="radio" id="female" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} />
          <label htmlFor="female">Female</label><br />
        </div>
        <p className="address">Address</p>
        <textarea id="address" name="address" rows="4" cols="25" placeholder="write your address" value={formData.address} onChange={handleChange}></textarea>

        <div className="courses">
          <p>Course</p>
          <input type="checkbox" id="html" name="courses" value="HTML" checked={formData.courses.includes('HTML')} onChange={handleChange} />
          <label htmlFor="html">HTML</label>
          <br />
          <input type="checkbox" id="css" name="courses" value="CSS" checked={formData.courses.includes('CSS')} onChange={handleChange} />
          <label htmlFor="css">CSS</label>
          <br />
          <input type="checkbox" id="javascript" name="courses" value="JavaScript" checked={formData.courses.includes('JavaScript')} onChange={handleChange} />
          <label htmlFor="javascript">JavaScript</label>
          <br />
          <input type="checkbox" id="react" name="courses" value="React" checked={formData.courses.includes('React')} onChange={handleChange} />
          <label htmlFor="react">React</label>
        </div>

        <div>
          <label htmlFor="center">Centers</label>
          <select name="center" id="centers" value={formData.center} onChange={handleChange}>
            <option value="chennai">Chennai</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Delhi">Delhi</option>
          </select>
        </div>
        <div align="center">
          <input type="submit" className="btn btn-success" value="Register" />
        </div>

      </form>
    </div>
  );
}

export default CourseRegistrationForm;
