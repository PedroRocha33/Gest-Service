const idService = document.querySelector('#id');
const nomeService = document.querySelector('#nome');
const descricaoService = document.querySelector('#servico');
const selectService = document.querySelector('#status');
const valorService = document.querySelector('#valor');
const dataService = document.querySelector('#data');

const btnAddService = document.querySelector('.btn-primary');

let listServices = JSON.parse(localStorage.getItem('listServices')) || [];
btnAddService.addEventListener('click', (e) => {
       e.preventDefault();

    let service = {
        id: idService.value,
        nome: nomeService.value,
        descricao: descricaoService.value,
        select: selectService.value,
        valor: valorService.value,
        data: dataService.value
    }
    listServices.push(service);
    console.log(listServices);

    localStorage.setItem('listServices', JSON.stringify(listServices));
    ClearFields();
})

function ClearFields() {
    idService.value = '';
    nomeService.value = '';
    descricaoService.value = '';
    selectService.value = '';
    valorService.value = '';
    dataService.value = '';
}