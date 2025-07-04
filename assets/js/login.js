const nameLogin = document.querySelector('#name');
const emailLogin = document.querySelector('#email');
const passwordLogin = document.querySelector('#password');

const btnLogin = document.querySelector('.submit-btn');

btnLogin.addEventListener('click', (e) => {
    e.preventDefault();
     const users = JSON.parse(localStorage.getItem('listUsers'));
     
    users.forEach(user => {
        if (user.email === emailLogin.value && user.password === passwordLogin.value) {
            alert(`Bem vindo, ${user.name}!`);
            window.location.href = 'index.html'; 
        } else {
            alert('Email Invalido ou Senha Incorreta');
        }
    });

})