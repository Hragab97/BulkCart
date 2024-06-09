
//SIGN UP LOGIC

//VARIABLES;

var userName = document.getElementById('userName');
var userEmail = document.getElementById('userEmail');
var userPassword = document.getElementById('userPassword');
var btnSignUp = document.getElementById('btnSignUp');
var emailExist = document.getElementById('emailExist');
var loginEmail = document.getElementById('loginEmail');
var loginPassword = document.getElementById('loginPassword');
var loginBtn = document.getElementById('loginBtn');


var userList ;

if (localStorage.getItem('user') == null) 
    userList = []
    
else {
    userList = JSON.parse(localStorage.getItem('user'));
}

btnSignUp.addEventListener('click', function(){

    Signup();
    clearSignUp();

})

// SIGN UP FUNCTION

function Signup(){

    var userInfo = {
        uName: userName.value,
        uEmail: userEmail.value,
        uPassword: userPassword.value,
    }

    if (Validation(userName) && Validation(userEmail) && Validation(userPassword) && checkEmailExist() === false ){

        userList.push(userInfo);
        localStorage.setItem('user', JSON.stringify(userList));
        console.log(JSON.stringify(userList));

        window.alert('Congratulations you Successfuly Created your Account!')
        document.location.href = '../index.html';
    }   

}

//CLEAR FUNCTION


function clearSignUp (){
    userName.value = null;
    userEmail.value = null;
    userPassword.value = null;
}

// SIGN UP VALIDATION

function Validation(ele) {

    var Regex = {
        userName: /^[A-Za-z].{3,30}$/,
        userEmail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        userPassword: /^.{5,20}$/,
    };

    if(Regex[ele.id].test(ele.value)){
        ele.classList.add('is-valid');
        ele.classList.remove('is-invalid');
        ele.nextElementSibling.classList.replace('d-block', 'd-none');
        return true
    }
    else{
        ele.classList.add('is-invalid');
        ele.classList.remove('is-valid');
        ele.nextElementSibling.classList.replace('d-none', 'd-block');
        return false
    }
}

//CHECK EMAIL FUNCTION


function checkEmailExist(){
    
    // console.log("userList2:")
    // console.log(userList)
    // console.log("User INput:")
    // console.log(userEmail.value)

    for (let i = 0; i < userList.length; i++) {
        
       
        if (userEmail.value === userList[i].uEmail){
            userEmail.classList.add('is-invalid');
            userEmail.classList.remove('is-valid');
            window.alert('Email Already Exists')
            
            console.log('exist');
            return true
        } 
    
    }
    return false
    
}

