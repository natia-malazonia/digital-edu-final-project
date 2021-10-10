class User {
    constructor(firstName, lastName, userName, email, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.email = email;
        this.password = password;
    }
}


const signUpButton = document.getElementById('signup');

signUpButton.addEventListener('click', event => {
    HideUserExistsErrorMessage();

    let fName = document.getElementById('firstName');
    let lName = document.getElementById('lastName');
    let uName = document.getElementById('userName');
    let mail = document.getElementById('email');
    let psw = document.getElementById('password');
    let confPsw = document.getElementById('confPsw');

    if (!checkForEmptyInput(fName) || !checkForEmptyInput(lName) || !checkForEmptyInput(uName)
        || !checkForEmptyInput(mail) || !checkForEmptyInput(psw) || !checkForEmptyInput(confPsw) ||
        !checkForPassword(psw, confPsw) || !checkForMail(mail) || !checkCheckBox()) { return };


    let user = new User(
        fName.value,
        lName.value,
        uName.value,
        mail.value,
        psw.value
    );
    let users = [];
    let usersString = window.localStorage.getItem('users');
    if(usersString != null && usersString != '') {
        users = JSON.parse(usersString);
    }
    
    let filteredUser = users.filter(x => x.userName == uName.value || x.email == mail.value);
    if (filteredUser.length > 0) {
        ShowErrorMessageUserExists();
        return;
    }
    
    users.push(user);
    window.localStorage.setItem('users', JSON.stringify(users));
    window.location.replace('index.html');

});

function ShowErrorMessageUserExists() {
    document.getElementById("user-exists-error-message").style.display = 'block'

}
function HideUserExistsErrorMessage() {
    document.getElementById("user-exists-error-message").style.display = 'none'
}

function checkForEmptyInput(element) {
    if (element.value === '') {
        element.setCustomValidity('Empty input')
        return false;
    }
    element.setCustomValidity('');
    return true;
}

function checkForMail(email) {
    let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email.value);
}

function checkForPassword(pass, confPass) {
    if (pass.value.length < 8) {
        pass.setCustomValidity('Required 8 charachter');
        return false;
    }
    if (pass.value != confPass.value) {
        confPass.setCustomValidity('Incorrect charachters');
        return false;
    }
    return true;
}


window.addEventListener('DOMContentLoaded', (event) => {
    const checkBoxButton = document.getElementById('check');
    checkBoxButton.addEventListener('click', event => {
        let chBox = document.getElementById('checkbox')
        if (chBox.className == "checked") {
            chBox.className = '';
        } else {
            chBox.className = "checked"
        }
    });
});

function checkCheckBox () {
let boxTxt = document.getElementById('checkTxt');
    if(document.getElementById('checkbox').className !='checked') {
        boxTxt.className = 'unchecked';
        return false;
    } else if(document.getElementById('checkbox').className = 'checked'){
        boxTxt.className = 'checkedTxt';
        return true;
    }
}
