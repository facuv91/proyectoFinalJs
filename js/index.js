

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

const loginButton = document.getElementById('login-button');
const registerButton = document.getElementById('register-button');

const loginError = document.getElementById('login-error');
const registerSuccess = document.getElementById('register-success');

const users = [];

loginButton.addEventListener('click', () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    loginError.textContent = '';
    
    const confirmMessage = 'Inicio de sesión exitoso. ¿Deseas continuar?';
    if (window.confirm(confirmMessage)) {
      window.location.href = 'e-comerce.html'; 
    }
  } else {
    loginError.textContent = 'Credenciales incorrectas';
  }
});

registerButton.addEventListener('click', () => {
  const newUsername = document.getElementById('new-username').value;
  const newPassword = document.getElementById('new-password').value;

  const existingUser = users.find(user => user.username === newUsername);

  if (existingUser) {
    registerSuccess.textContent = 'El usuario ya existe';
  } else {
    users.push({ username: newUsername, password: newPassword });
    
    const confirmMessage = `Usuario "${newUsername}" registrado exitosamente. ¿Deseas continuar?`;
    if (window.confirm(confirmMessage)) {
      registerSuccess.textContent = `Registrado como "${newUsername}"`;
    }
  }
});


registerButton.addEventListener('mouseover', () => {
  registerButton.style.backgroundColor = '#2980b9';
});

registerButton.addEventListener('mouseout', () => {
  registerButton.style.backgroundColor = '#3498db';
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    if (loginForm.contains(document.activeElement)) {
      loginButton.click();
    } else if (registerForm.contains(document.activeElement)) {
      registerButton.click();
    }
  }
});

