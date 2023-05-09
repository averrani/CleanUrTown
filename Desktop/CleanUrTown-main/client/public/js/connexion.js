document.addEventListener('DOMContentLoaded', () => {



const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  console.log(email, password);
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:3001/api/login');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      console.log(response);
    } else {
      console.error(xhr.statusText);
    }
  };
  xhr.onerror = function() {
    console.error(xhr.statusText);
  };
  xhr.send(JSON.stringify({ email: email, password: password }));
});
});