
const user = JSON.parse(window.localStorage.getItem('loggedInUser'));
if(user == null) {
  window.location.href = '/index.html';
}
const sideNavbar = document.getElementById('mySidenav');
const closeBtn = document.getElementById('closebtn');
const openNavBtn = document.getElementById('openNav');

closeBtn.addEventListener('click', event=>{    
  return sideNavbar.style.width = "0";
})

openNavBtn.addEventListener('click', event=> { 
    return sideNavbar.style.width = "16.25%";
})

const todoPage = document.getElementById('todoList');
todoPage.addEventListener('click', event=> {
  return window.location.href='/todo-list-page.html'
})

const dashboardPageBtn = document.getElementById('dashboard');
dashboardPageBtn.addEventListener('click', event=>{
  return window.location.href='/dashboard.html'
})

const signoutBoxBtn = document.getElementById('userli');
const userSideBox = document.getElementById('user-side-box');
const innerUserSideBox = document.getElementById('inner-box');
signoutBoxBtn.addEventListener('click', event=>{
    if(userSideBox.style.display == 'none' && innerUserSideBox.style.display == 'none') {
        userSideBox.style.display = 'block';
        innerUserSideBox.style.display  = 'block';
    } else {
        userSideBox.style.display = 'none';
        innerUserSideBox.style.display ='none';
    }

})


const logoutBtn = document.getElementById('logout');
logoutBtn.addEventListener('click', event => {
  window.localStorage.removeItem('loggedInUser');
  window.location.href = '/index.html';
})

document.addEventListener('DOMContentLoaded', event=> {
  document.getElementById('user-fullname').innerHTML = `${user.firstName} ${user.lastName}`
})


document.addEventListener("DOMContentLoaded",  function () {
  fetch('https://jsonplaceholder.typicode.com/todos')
 .then(response => response.json())
 .then(data => {
   let completedTasks = data.filter(x=>x.completed).length;
   let incompletedTasks = data.filter(x=>!x.completed).length;
   let totalTasks = data.length;
   document.getElementsByClassName('total-items')[0].innerHTML = totalTasks;
   document.getElementsByClassName('items-compl')[0].innerHTML = completedTasks;
   document.getElementsByClassName('items-incomp')[0].innerHTML = incompletedTasks; 
 })
})