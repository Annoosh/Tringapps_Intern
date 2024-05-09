function validateForm() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (name.trim() === "") {
        alert("Please enter your name.");
        return false;
    } 
    
    if (email.trim() === "") {
        alert("Please enter your email address.");
        return false;
    } 
    
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }
    
    alert("Your application will be processed");
}
