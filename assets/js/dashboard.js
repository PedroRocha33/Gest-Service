const services = JSON.parse(localStorage.getItem('listServices')) || [];
const tableBody = document.querySelector('#serviceTableBody');

function renderServicesTable() {
    tableBody.innerHTML = '';

    services.forEach(service => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>#${service.id}</td>
            <td>${service.nome}</td>
            <td>${service.descricao}</td>
            <td><span class="status">${service.select}</span></td>
            <td>R$ ${parseFloat(service.valor).toFixed(2)}</td>
            <td>${service.data}</td> 
            <td><button class="btn-concluir" data-id="${service.id}">Concluir</button></td>
            <button class="btn-remove" data-id="${service.id}">Remover</button>
            
        `;

        tableBody.appendChild(tr);
    });

    doneServices();
    removeServices();
}

const btnClear = document.querySelector('#remove-services');
btnClear.addEventListener('click', () => {
    localStorage.removeItem('listServices');
    window.location.reload();

})


function servicesCount(){
    const statCountServices = document.querySelector('.stat-agends');
    if (statCountServices) { 
        statCountServices.innerHTML = services.length;
        statCountServices.classList.add('stat-number');
    }
}

function servicesClient(){
    let count = 0;
    const statFat = document.querySelector('.stat-fat');
    
    if (statFat) {
        services.forEach(service => {
            const valorNumerico = parseFloat(service.valor);
            if (valorNumerico > 0) {
                count += valorNumerico;
            }
        });
        statFat.classList.add('stat-number');
        statFat.innerHTML = `R$ ${count.toFixed(2)}`;
    }
}

function servicesStatus(){
    const statClients = document.querySelector('.stat-clients');
    if (statClients) { 
        statClients.innerHTML = services.length;
        statClients.classList.add('stat-number');
    }
}


function doneServices() {
    const btnConcluirElements = document.querySelectorAll('.btn-concluir');

    btnConcluirElements.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Pega o ID do atributo 'data-id' do botão clicado
            const clickedServiceId = e.target.dataset.id;

            services.forEach(service => {
                let done = 0;

                if (service.id === clickedServiceId) {
                    service.select = 'Concluído';
                    
                    done++;
                    let statusDone = document.querySelector('.stat-number');
                    statusDone.innerHTML = done;

                    const statusSpan = document.querySelector('.status');
                     statusSpan.classList.add('completed');
                    
                }
            });

            localStorage.setItem('listServices', JSON.stringify(services));

            // Recarrega a página
            renderServicesTable();
        });
    });
}

function removeServices() {
    const btns = document.querySelectorAll('.btn-remove');

    btns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const id = e.target.dataset.id;

            // Procura o índice correto no array pelo ID
            const index = services.findIndex(service => service.id === id);

            // Se encontrou, remove
            if (index !== -1) {
                services.splice(index, 1);
                localStorage.setItem('listServices', JSON.stringify(services));

                renderServicesTable();
                servicesCount();
                servicesClient();
                servicesStatus();
            }
        });
    });
}


document.addEventListener('DOMContentLoaded', () => {
    renderServicesTable();

    
    servicesCount();
    servicesClient();
    servicesStatus();
    removeServices();
    
});

