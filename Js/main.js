
//LOGIN LOGIC

//VARIABLES

var loginEmail = document.getElementById('loginEmail');
var loginPassword = document.getElementById('loginPassword');
var loginBtn = document.getElementById('loginBtn');
var note = document.getElementById('note');
var data = JSON.parse(localStorage.getItem("user"));

loginBtn.addEventListener('click', function(){
    Login()
})

//LOGIN FUNCTION 

function Login() {

    if (loginEmail.value == '' || loginPassword.value == '') {
        loginEmail.classList.add('is-invalid');
        loginPassword.classList.add('is-invalid');
        note.innerHTML = "All inputs are required";
    } else {
        for (let i = 0; i < data.length; i++) {
            if (loginEmail.value === data[i].uEmail && loginPassword.value === data[i].uPassword) {
                document.location.href =  "./pages/home.html";
                localStorage.setItem('name', JSON.stringify(data[i].uName));
            } else {
                note.innerHTML = "incorrect email or password";
            }
        }
    }
}

