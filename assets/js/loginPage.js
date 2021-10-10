const loginButton = document.getElementById('login');
const fPageSignupButton = document.getElementById('fPageSignup');

fPageSignupButton.addEventListener('click', event=>{
    window.location.replace('/sign-up.html');
})

loginButton.addEventListener('click', event=> {
    let regUsName = document.getElementById('regUsername');
    let regPass = document.getElementById('regPassword');

    
    let storedUsers = window.localStorage.getItem('users');
    let storedUsersArray = JSON.parse(storedUsers);
    if(storedUsersArray != null && storedUsersArray.filter(a=>a.userName == regUsName.value && a.password == regPass.value).length == 1) {
        let user = storedUsersArray.filter(a=>a.userName == regUsName.value && a.password == regPass.value)[0];
        window.localStorage.setItem('loggedInUser', JSON.stringify(user));
        window.location.replace('/todo-list-page.html');
    } else {
        showErrorMessageToUser();
    }
    
})



window.addEventListener('DOMContentLoaded', (event) => {
    const fPageCheckBoxButton = document.getElementById('checkContainer');
    fPageCheckBoxButton.addEventListener('click', event => {
        let fPageChBox = document.getElementById('checkbox')
        if (fPageChBox.className == "checkedBox") {
            fPageChBox.className = '';
        } else {
            fPageChBox.className = "checkedBox"
        }
    });
});

function showErrorMessageToUser() {
    document.getElementById('user-notFound-message').style.display = 'block';
}