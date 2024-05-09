// function myFunction() {
//     // alert("Your application will be processed")
//     document.getElementById("demo").innerHTML = "Hello World!";
//   }
//   function validateForm() {
//     var name = document.getElementById("name").value;
//     var email = document.getElementById("email").value;
     
 

//     if (name == "") {
//         alert("Please enter your name.");
//         return false;
//     } 
//     if (email == "") {
//         alert("Please enter your email address.");
//         return false;
 
//     } 
//     // else if (email.count() <6)
//     //     {
//     //         alert("add more");
//     //         return false;
//     //     }
   
//     alert("Your application will be processed");
// }

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
