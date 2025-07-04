const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

const btnRegister = document.querySelector('.submit-btn');

let listUsers = JSON.parse(localStorage.getItem('listUsers')) || [];


btnRegister.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Register button cliclado');

    let users = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value
    }

    listUsers.push(users);
    console.log(listUsers);

    localStorage.setItem('listUsers', JSON.stringify(listUsers));

    ClearFields();
})

function ClearFields(){
    nameInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';
    
    
    console.log('Campos limpos e Salvo no LocalStorage');
}