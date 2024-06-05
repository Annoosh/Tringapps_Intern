import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Components/style.css';

function CourseRegistrationForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    address: '',
    courses: [],
    center: '' 
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? (checked ? [...prevState[name], value] : prevState[name].filter(courses => courses !== value)) : value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, email, gender, address, center } = formData;
    const val = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (name === '' || email === '' || address === '' || gender === '' || center === '') {
      alert('Please fill in all fields');
      return;
    }
    if (!val.test(email)) {
      alert('Invalid email');
      return;
    }

    axios.post('http://192.168.1.61:8081/user', formData)
      .then((res) => {
        navigate("/home");
      })
      .catch((err) => {
        console.error(err);
        alert('An error occurred while submitting the form');
      });
  };

  return (
    <div className="form-group">
      
      <form className="box" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name: </label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
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
        <div>
          <label className="address">Address</label>
          <textarea id="address" name="address" rows="4" cols="25" placeholder="Write your address" value={formData.address} onChange={handleChange}></textarea>
        </div>
        <div className="courses">
          <p>Course</p>
          <input type="checkbox" id="html" name="courses" value="HTML" checked={formData.courses.includes('HTML')} onChange={handleChange} />
          <label htmlFor="html">HTML</label><br />
          <input type="checkbox" id="css" name="courses" value="CSS" checked={formData.courses.includes('CSS')} onChange={handleChange} />
          <label htmlFor="css">CSS</label><br />
          <input type="checkbox" id="javascript" name="courses" value="JavaScript" checked={formData.courses.includes('JavaScript')} onChange={handleChange} />
          <label htmlFor="javascript">JavaScript</label><br />
          <input type="checkbox" id="react" name="courses" value="React" checked={formData.courses.includes('React')} onChange={handleChange} />
          <label htmlFor="react">React</label>
        </div>
        <div className="center">
          <label htmlFor="center">Center</label>
          <select name="center" id="center" value={formData.center} onChange={handleChange}>
          <option value="chennai">Select a Center</option>
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
