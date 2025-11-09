// Espera o DOM (a página) carregar completamente antes de rodar o script
document.addEventListener("DOMContentLoaded", function() {
    
    // --- LÓGICA DE LOGIN ---
    // Esta parte só funciona na página 'login.html'
    const loginForm = document.getElementById("login-form");
    const errorMessage = document.getElementById("error-message");

    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            // Previne o comportamento padrão do formulário (que é recarregar a página)
            event.preventDefault();

            // --- Nosso "Banco de Dados" Falso ---
            const validRA = "37939916874";
            const validPass = "915839";
            const studentName = "Gabriel Siles de Castro";
            // ------------------------------------

            // Pega os valores digitados pelo usuário
            const raInput = document.getElementById("ra").value;
            const passwordInput = document.getElementById("password").value;

            // Verifica se o RA e a Senha estão corretos
            if (raInput === validRA && passwordInput === validPass) {
                
                // Se estiver correto:
                // 1. Armazena os dados do aluno no "sessionStorage" 
                sessionStorage.setItem("loggedInUser", studentName);
                sessionStorage.setItem("loggedInRA", raInput);

                // 2. Redireciona o usuário para a página do portal
                window.location.href = "portal.html";

            } else {
                // Se estiver errado:
                // 1. Mostra a mensagem de erro
                errorMessage.textContent = "RA ou Senha inválidos. Tente novamente.";
                errorMessage.style.display = "block";
            }
        });
    }

    // --- LÓGICA DA PÁGINA DO PORTAL ---
    // Esta parte só funciona na página 'portal.html'
    const studentNameElement = document.getElementById("student-name");
    const studentRaElement = document.getElementById("student-ra");

    // Verifica se estamos na página do portal (vendo se os elementos existem)
    if (studentNameElement && studentRaElement) {
        
        // Pega os dados do sessionStorage
        const userName = sessionStorage.getItem("loggedInUser");
        const userRA = sessionStorage.getItem("loggedInRA");

        if (userName && userRA) {
            // Preenche o menu lateral
            studentNameElement.textContent = userName;
            studentRaElement.textContent = "RA: " + userRA;

            // Personaliza o título do dashboard
            const welcomeTitle = document.getElementById("welcome-title");
            if (welcomeTitle) {
                welcomeTitle.textContent = "Bem-vindo(a) de volta, " + userName + "!";
            }

        } else {
            // Se não houver dados (ex: usuário tentou acessar /portal.html direto)
            // Redireciona de volta para o login
            window.location.href = "login.html";
        }

        // --- CÓDIGO PARA NAVEGAÇÃO DO MENU INTERNO ---

        const mainContent = document.getElementById("main-content");
        
        // Links do Menu
        const menuInicio = document.getElementById("menu-inicio");
        const menuCursos = document.getElementById("menu-cursos");
        const menuMaterias = document.getElementById("menu-materias");
        const menuFinanceiro = document.getElementById("menu-financeiro");
        const menuCarteirinha = document.getElementById("menu-carteirinha");
        
        // Pega todos os links de uma vez para gerenciar a classe 'active'
        const allMenuItems = document.querySelectorAll(".main-menu a");
        
        // Salva o conteúdo inicial JÁ PERSONALIZADO
        const inicioContent = mainContent.innerHTML;

        // Elementos do Modal
        const modalBackdrop = document.getElementById("modal-backdrop");
        const modalContent = document.getElementById("modal-content");
        const closeModalBtn = document.getElementById("close-modal");

        // Função para remover a classe 'active' de todos os links
        function clearActiveLinks() {
            allMenuItems.forEach(link => link.classList.remove("active"));
        }
        
        // 3. Adiciona os "ouvintes" de clique para cada link do menu
        
        // Link: Início
        menuInicio.addEventListener("click", function(event) {
            event.preventDefault();
            clearActiveLinks();
            menuInicio.classList.add("active");
            mainContent.innerHTML = inicioContent; 
            
            // Precisamos re-adicionar os ouvintes aos links rápidos
            // pois o innerHTML foi recarregado.
            addDashboardLinkListeners();
        });

        // Link: Cursos
        menuCursos.addEventListener("click", function(event) {
            event.preventDefault();
            clearActiveLinks();
            menuCursos.classList.add("active");
            
            mainContent.innerHTML = `
                <h2>Meus Cursos</h2>
                <p>Aqui está o seu curso atual e seu progresso.</p>

                <div class="course-card">
                    <h3>Gestão da Tecnologia da Informação</h3>
                    
                    <div class="course-progress">
                        <label for="progress-bar">Progresso do Curso: <strong>65%</strong></label>
                        <progress id="progress-bar" value="65" max="100"> 65% </progress>
                    </div>
                    
                    <a href="#" class="btn-secondary">Ver Detalhes do Curso</a>
                </div>
            `;
        });

        // Link: Matérias
        menuMaterias.addEventListener("click", function(event) {
            event.preventDefault();
            clearActiveLinks();
            menuMaterias.classList.add("active");
            
            mainContent.innerHTML = `
                <h2>Matérias do Curso</h2>
                <p>Abaixo estão as principais matérias organizadas por área de conhecimento.</p>

                <div class="subject-area">
                    <h3>💻 Área de Tecnologia</h3>
                    <ul class="subject-list">
                        <li>Linguagens de Programação (como Java, Python, C#)</li>
                        <li>Desenvolvimento de Software</li>
                        <li>Banco de Dados e Sistemas de Informação</li>
                        <li>Infraestrutura de Redes e Segurança da Informação</li>
                        <li>Arquitetura de Computadores</li>
                        <li>Sistemas Operacionais</li>
                        <li>Gestão de Projetos de TI</li>
                        <li>Governança de TI e ITIL</li>
                        <li>Cloud Computing e Virtualização</li>
                    </ul>
                </div>

                <div class="subject-area">
                    <h3>📊 Área de Gestão e Negócios</h3>
                    <ul class="subject-list">
                        <li>Administração Geral</li>
                        <li>Contabilidade e Finanças</li>
                        <li>Economia</li>
                        <li>Marketing</li>
                        <li>Gestão de Pessoas</li>
                        <li>Gestão da Produção</li>
                        <li>Empreendedorismo</li>
                        <li>Planejamento Estratégico</li>
                    </ul>
                </div>

                <div class="subject-area">
                    <h3>📐 Fundamentos e Suporte</h3>
                    <ul class="subject-list">
                        <li>Matemática Aplicada</li>
                        <li>Estatística</li>
                        <li>Comunicação Empresarial</li>
                        <li>Ética e Legislação em TI</li>
                    </ul>
                </div>
            `;
        });
        
        // Link: Financeiro
        menuFinanceiro.addEventListener("click", function(event) {
            event.preventDefault();
            clearActiveLinks();
            menuFinanceiro.classList.add("active");
            
            mainContent.innerHTML = `
                <h2>Financeiro</h2>
                
                <div class="financial-section">
                    <h3>Situação Atual</h3>
                    <p class="status-ok">No momento não há pendências.</p>
                </div>

                <div class="financial-section">
                    <h3>Faturas Pagas e Histórico</h3>
                    <p>Consulte seu histórico de pagamentos e faturas quitadas.</p>
                    
                    <a href="#" class="btn-secondary" id="link-historico">
                        Acessar Histórico de Boletos Pagos
                    </a>
                </div>
            `;
        });

        // Link: Carteirinha
        menuCarteirinha.addEventListener("click", function(event) {
            event.preventDefault();
            clearActiveLinks();
            menuCarteirinha.classList.add("active");
            
            // Abre o Modal
            modalBackdrop.style.display = "flex";
        });


        // --- LÓGICA PARA FECHAR O MODAL ---
        
        // Função para fechar o modal
        function closeModal() {
            modalBackdrop.style.display = "none";
            
            // Clica no "Início" por código para resetar
            // a seleção do menu e voltar para a tela principal
            menuInicio.click();
        }

        // 1. Fechar ao clicar no 'X'
        closeModalBtn.addEventListener("click", closeModal);

        // 2. Fechar ao clicar FORA da janela (no fundo escuro)
        modalBackdrop.addEventListener("click", function(event) {
            // Verifica se o clique foi no 'modalBackdrop' (o pai)
            // e não no 'modalContent' (o filho)
            if (event.target === modalBackdrop) {
                closeModal();
            }
        });
        
        // --- Função para ativar os links do dashboard ---
        function addDashboardLinkListeners() {
            const quickCursos = document.getElementById("quick-link-cursos");
            const quickMaterias = document.getElementById("quick-link-materias");
            const quickFinanceiro = document.getElementById("quick-link-financeiro");
            const quickCarteirinha = document.getElementById("quick-link-carteirinha");

            if (quickCursos) {
                quickCursos.addEventListener("click", function(e) {
                    e.preventDefault();
                    menuCursos.click(); // Simula o clique no menu
                });
            }
            if (quickMaterias) {
                quickMaterias.addEventListener("click", function(e) {
                    e.preventDefault();
                    menuMaterias.click(); // Simula o clique no menu
                });
            }
            if (quickFinanceiro) {
                quickFinanceiro.addEventListener("click", function(e) {
                    e.preventDefault();
                    menuFinanceiro.click(); // Simula o clique no menu
                });
            }
            if (quickCarteirinha) {
                quickCarteirinha.addEventListener("click", function(e) {
                    e.preventDefault();
                    menuCarteirinha.click(); // Simula o clique no menu
                });
            }
        }
        
        // Roda a função pela primeira vez (para a página inicial)
        addDashboardLinkListeners();

    } // Fim do if (studentNameElement && studentRaElement)
});