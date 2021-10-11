

let user = JSON.parse(window.localStorage.getItem('loggedInUser'));
if(user == null) {
  window.location.href = 'index.html';
}

const sideNavbar = document.getElementById('mySidenav');
const closeBtn = document.getElementById('closebtn');
const openNavBtn = document.getElementById('openNav');

closeBtn.addEventListener('click', event => {
  return sideNavbar.style.width = "0";
})

openNavBtn.addEventListener('click', event => {
  return sideNavbar.style.width = "260px";
})


const addTodoBtn = document.getElementById('addTodo');
const closeTodoModalBtn = document.getElementById('closeModal');

addTodoBtn.addEventListener('click', event => {
  document.getElementById('todoModal').style.display = 'block'
  document.getElementById('modal-content').style.display = 'block';
})

closeTodoModalBtn.addEventListener('click', event => {
  document.getElementById('todoModal').style.display = 'none';
  document.getElementById('modal-content').style.display = 'none';

})
document.getElementById('todoModal').addEventListener('click', event => {
  document.getElementById('todoModal').style.display = 'none';
  document.getElementById('modal-content').style.display = 'none';
})


const todoPage = document.getElementById('todo-list');
todoPage.addEventListener('click', event => {
  return window.location.href = 'todo-list-page.html'
})

const dashboardPageBtn = document.getElementById('dashboard');
dashboardPageBtn.addEventListener('click', event => {
  return window.location.href = 'dashboard.html'
})





function updateArrowListeners(){
  document.getElementById('down-page-btn').addEventListener('click', event=>{
    let params = new URLSearchParams(window.location.search);
    let pageNum = parseInt(params.get('page'));
  
    pageNum = pageNum - 1;
  
    if (isNaN(pageNum) || pageNum <= 0) {
      return;
    }else {
      window.location.search = '?page='+pageNum
    }
  });
  
  
  document.getElementById('up-page-btn').addEventListener('click', event=>{
    let params = new URLSearchParams(window.location.search);
    let pageNum = parseInt(params.get('page'));
  
    pageNum = pageNum + 1;
  
    if (isNaN(pageNum) || pageNum >= 21) {
      return;
    }else {
      window.location.search = '?page='+pageNum
    }
  });
}


document.addEventListener("DOMContentLoaded", function () {
  let params = new URLSearchParams(window.location.search);
  let pageNum = parseInt(params.get('page'));

  if (isNaN(pageNum) || pageNum <= 0 || pageNum >= 21) {
    pageNum = 1
    window.location.search = '?page=1';
  }

  let paginatorString = '<button id="down-page-btn">&lt;</button>';
  let selectedPageNum = pageNum;
 

  let maxButtons = pageNum + 5;

  if(maxButtons > 21) {
    maxButtons = 21;
    pageNum = 16;
  }

  for (let i = pageNum; i < maxButtons; i++) {
    if (i == selectedPageNum) {
      paginatorString +=
        `<button class="active" onclick="window.location.href='todo-list-page.html?page=${i}'">${i}</button>`;
    } else {
      paginatorString += `<button onclick="window.location.href='todo-list-page.html?page=${i}'">${i}</button>`;
    }
  }
  paginatorString += '<button id="up-page-btn">&gt;</button>';

  document.getElementById('paginator').innerHTML = paginatorString;
  updateArrowListeners();


});

const signoutBoxBtn = document.getElementById('userli');
const userSideBox = document.getElementById('user-side-box');
const innerUserSideBox = document.getElementById('inner-box');
signoutBoxBtn.addEventListener('click', event => {
  if (userSideBox.style.display == 'none' && innerUserSideBox.style.display == 'none') {
    userSideBox.style.display = 'block';
    innerUserSideBox.style.display = 'block';
  } else {
    userSideBox.style.display = 'none';
    innerUserSideBox.style.display = 'none';
  }

})

const logoutBtn = document.getElementById('logout');
logoutBtn.addEventListener('click', event => {
  window.localStorage.removeItem('loggedInUser');
  window.location.href = 'index.html';
})



document.addEventListener("DOMContentLoaded",  function () {
   fetch('https://jsonplaceholder.typicode.com/todos')
  .then(response => response.json())
  .then(data => {
  let params = new URLSearchParams(window.location.search);
  let pageNum = parseInt(params.get('page'));

  let htmlSegment = `<tbody><tr id="row-for-header">
  <th style="width: 291px; padding-left: 20px;">Task name</th>
  <th style="width: 178px;">Is completed</th>
  <th style="width: 166px">Created By</th>
  <th style="width: 158px;">Create Date</th>
  <th style="width: 143px;">Update Date</th>
  <th style="width: 132px; text-align: right; padding-right: 24px;">Actions</th>
</tr>`;
let n = pageNum-1;
let filteresTodos = data.slice(n*10, (n*10)+10);
  for (let todo of filteresTodos) {
    htmlSegment += `
    <tr>
      <td style="padding-left: 20px;">${todo.title}</td>`
    if (todo.completed) {
      htmlSegment += `<td><img style="position: absolute;" src="assets/images/completed_icon.png" alt="" id="icon-complete"> <span
        style="padding-left: 28px;"> Completed </span></td>`
    } else {
      htmlSegment += `<td><img style="position: absolute;" src="assets/images/not_completed_icon.png" alt="" id="icon-complete"> <span
        style="padding-left: 28px;"> 
        Inompleted </span></td>`
    }

    htmlSegment += `  
      <td>${user.firstName} ${user.lastName}</td>
      <td>05/10/2021</td>
      <td>15/10/2021</td>
      <td>
          <button>Edit</button>
          <button>Delete</button>
      </td>
    </tr>`
  }
  htmlSegment += '</tbody>'
  document.getElementById('data-grid').innerHTML = htmlSegment;
  });

  
});

document.addEventListener('DOMContentLoaded', event=> {
  document.getElementById('user-fullname').innerHTML = `${user.firstName} ${user.lastName}`
})