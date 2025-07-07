// A constante 'services' é recuperada apenas uma vez no início.
const services = JSON.parse(localStorage.getItem('listServices')) || [];
const tableBody = document.getElementById('serviceTableBody');

// --- Função para Renderizar a Tabela (Melhor para organização) ---
function renderServicesTable() {
    // Limpa a tabela antes de renderizar para evitar duplicatas ao recarregar
    tableBody.innerHTML = '';

    services.forEach(service => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>#${service.id}</td>
            <td>${service.nome}</td>
            <td>${service.descricao}</td>
            <td><span class="status ${service.select.toLowerCase()}">${service.select}</span></td>
            <td>R$ ${parseFloat(service.valor).toFixed(2)}</td>
            <td>${service.data}</td> 
            <td><button class="btn-concluir" data-id="${service.id}">Concluir</button></td>
            <button class="btn-remove" data-id="${service.id}">Remover</button>
        `;

        tableBody.appendChild(tr);
    });

    // Chama a função para adicionar os ouvintes APÓS todos os botões terem sido criados
    attachDoneServiceListeners();
    addRemoveEventListeners();
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
    
    // Verifica se statFat existe antes de manipulá-lo
    if (statFat) {
        services.forEach(service => {
            // Verifica se service.valor é um número válido e maior que 0
            const valorNumerico = parseFloat(service.valor);
            if (!isNaN(valorNumerico) && valorNumerico > 0) {
                count += valorNumerico;
            }
        });
        statFat.classList.add('stat-number');
        statFat.innerHTML = `R$ ${count.toFixed(2)}`;
    }
}

function servicesStatus(){
    const statClients = document.querySelector('.stat-clients');
    if (statClients) { // Sempre bom verificar se o elemento existe
        statClients.innerHTML = services.length; // Assumindo que services.length representa 'clients' aqui
        statClients.classList.add('stat-number');
    }
}

// --- Nova Função para Adicionar Listeners aos Botões "Concluir" ---
function attachDoneServiceListeners() {
    // Seleciona TODOS os botões '.btn-concluir' que foram recém-criados
    const btnConcluirElements = document.querySelectorAll('.btn-concluir');

    // Itera sobre CADA botão e adiciona o ouvinte de evento individualmente
    btnConcluirElements.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Pega o ID do serviço diretamente do atributo 'data-id' do botão clicado
            const clickedServiceId = e.target.dataset.id;
            
            // Procura e atualiza o serviço correspondente
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

            // Salva a lista de serviços atualizada de volta no localStorage
            localStorage.setItem('listServices', JSON.stringify(services));

            // Recarrega a página para refletir as mudanças na tabela
            window.location.reload();
        });
    });
}

function addRemoveEventListeners() {
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

                // Atualiza a interface
                renderServicesTable();
                servicesCount();
                servicesClient();
                servicesStatus();
            }
        });
    });
}



// --- Execução Inicial ---
document.addEventListener('DOMContentLoaded', () => {
    // Renderiza a tabela e anexa os listeners assim que o DOM estiver pronto
    renderServicesTable();

    // Chama as funções de contagem uma vez, após a tabela ser renderizada
    servicesCount();
    servicesClient();
    servicesStatus();
    addRemoveEventListeners();
    
});

