document.addEventListener("DOMContentLoaded", function() {
    
    // --- "BANCO DE DADOS" DE ALUNOS ---
    const alunos = [
        {
            raLogin: "37939916874",
            senha: "915839",
            nome: "Gabriel Siles",
            raDisplay: "37939916874",
            curso: "Gestão da Tecnologia da Informação",
            foto: "images/profile-pic.jpg",
            carteirinha: "images/carteirinha.png",
            pdf: "images/carteirinha.pdf"
        },
        {
            raLogin: "39993339873",
            senha: "123456789",
            nome: "Lais Bordin",
            raDisplay: "37939916874",
            curso: "Estatística",
            foto: "images/profile-pic-lais.jpg",
            carteirinha: "images/carteirinha_lais.jpg",
            pdf: "images/carteirinha_lais.pdf" // Assumindo que exista o PDF dela também
        }
    ];

 // --- LÓGICA DE LOGIN ---
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const raInput = document.getElementById("ra").value;
            const passwordInput = document.getElementById("password").value;

            const alunoEncontrado = alunos.find(a => a.raLogin === raInput && a.senha === passwordInput);

            if (alunoEncontrado) {
                sessionStorage.setItem("user", JSON.stringify(alunoEncontrado));
                window.location.href = "portal.html";
            } else {
                const errorMsg = document.getElementById("error-message");
                errorMsg.textContent = "RA ou Senha inválidos.";
                errorMsg.style.display = "block";
            }
        });
    }

    // --- LÓGICA DO PORTAL ---
    const studentNameElement = document.getElementById("student-name");
    if (studentNameElement) {
        const userData = JSON.parse(sessionStorage.getItem("user"));

        if (!userData) {
            window.location.href = "login.html";
            return;
        }

        // Preenche dados básicos e imagens
        document.getElementById("student-name").textContent = userData.nome;
        document.getElementById("student-ra").textContent = "RA: " + userData.raDisplay;
        document.getElementById("profile-img").src = userData.foto;
        document.getElementById("modal-img").src = userData.carteirinha;
        document.getElementById("download-link").href = userData.pdf;
        
        const welcomeTitle = document.getElementById("welcome-title");
        if (welcomeTitle) welcomeTitle.textContent = "Bem-vindo(a), " + userData.nome + "!";

        const mainContent = document.getElementById("main-content");
        const inicioContent = mainContent.innerHTML;
        const allMenuItems = document.querySelectorAll(".main-menu a");

        function clearActiveLinks() {
            allMenuItems.forEach(link => link.classList.remove("active"));
        }

        // Link: INÍCIO
        document.getElementById("menu-inicio").addEventListener("click", function(e) {
            e.preventDefault();
            clearActiveLinks();
            this.classList.add("active");
            mainContent.innerHTML = inicioContent;
            addDashboardLinkListeners();
        });

        // Link: CURSOS
        document.getElementById("menu-cursos").addEventListener("click", function(e) {
            e.preventDefault();
            clearActiveLinks();
            this.classList.add("active");
            mainContent.innerHTML = `
                <h2>Meus Cursos</h2>
                <div class="course-card">
                    <h3>${userData.curso}</h3>
                    <div class="course-progress">
                        <label>Progresso do Curso: <strong>65%</strong></label>
                        <progress value="65" max="100"></progress>
                    </div>
                    <a href="#" class="btn-secondary">Ver Detalhes</a>
                </div>`;
        });

        // Link: MATÉRIAS (Lógica de troca de grade)
        document.getElementById("menu-materias").addEventListener("click", function(e) {
            e.preventDefault();
            clearActiveLinks();
            this.classList.add("active");

            if (userData.curso === "Estatística") {
                // GRADE DE ESTATÍSTICA
                mainContent.innerHTML = `
                    <h2>Matérias do Curso - Estatística</h2>
                    <div class="subject-area">
                        <h3>📊 Eixo Matemático e Probabilístico</h3>
                        <ul class="subject-list">
                            <li>Cálculo Diferencial e Integral I, II e III</li>
                            <li>Álgebra Linear Aplicada</li>
                            <li>Probabilidade I e II</li>
                            <li>Inferência Estatística</li>
                        </ul>
                    </div>
                    <div class="subject-area">
                        <h3>💻 Computação e Dados</h3>
                        <ul class="subject-list">
                            <li>Linguagem de Programação R e Python</li>
                            <li>Análise Exploratória de Dados</li>
                            <li>Banco de Dados para Estatística</li>
                            <li>Machine Learning e Data Mining</li>
                        </ul>
                    </div>
                    <div class="subject-area">
                        <h3>📈 Estatística Aplicada</h3>
                        <ul class="subject-list">
                            <li>Modelos de Regressão</li>
                            <li>Análise de Séries Temporais</li>
                            <li>Amostragem e Pesquisa</li>
                            <li>Planejamento de Experimentos</li>
                        </ul>
                    </div>`;
            } else {
                // GRADE DE TI (VOLTOU!)
                mainContent.innerHTML = `
                    <h2>Matérias do Curso - TI</h2>
                    <div class="subject-area">
                        <h3>💻 Área de Tecnologia</h3>
                        <ul class="subject-list">
                            <li>Linguagens de Programação (como Java, Python, C#)</li>
                            <li>Desenvolvimento de Software</li>
                            <li>Banco de Dados e Sistemas de Informação</li>
                            <li>Cloud Computing e Virtualização</li>
                        </ul>
                    </div>
                    <div class="subject-area">
                        <h3>📊 Área de Gestão e Negócios</h3>
                        <ul class="subject-list">
                            <li>Administração Geral</li>
                            <li>Contabilidade e Finanças</li>
                            <li>Economia</li>
                            <li>Gestão de Pessoas</li>
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
                    </div>`;
            }
        });

        // Link: FINANCEIRO
        document.getElementById("menu-financeiro").addEventListener("click", function(e) {
            e.preventDefault();
            clearActiveLinks();
            this.classList.add("active");
            mainContent.innerHTML = `
                <h2>Financeiro</h2>
                <div class="financial-section">
                    <h3>Situação Atual</h3>
                    <p class="status-ok">No momento não há pendências para o curso de ${userData.curso}.</p>
                </div>
                <div class="financial-section">
                    <h3>Faturas Pagas e Histórico</h3>
                    <p>Consulte seu histórico de pagamentos.</p>
                    <a href="#" class="btn-secondary">Acessar Histórico de Boletos</a>
                </div>`;
        });

        // Link: CARTEIRINHA
        document.getElementById("menu-carteirinha").addEventListener("click", function(e) {
            e.preventDefault();
            document.getElementById("modal-backdrop").style.display = "flex";
        });

        // FECHAR MODAL
        document.getElementById("close-modal").addEventListener("click", () => {
            document.getElementById("modal-backdrop").style.display = "none";
        });

        // Links de acesso rápido do Dashboard
        function addDashboardLinkListeners() {
            const links = {
                "quick-link-cursos": "menu-cursos",
                "quick-link-materias": "menu-materias",
                "quick-link-financeiro": "menu-financeiro",
                "quick-link-carteirinha": "menu-carteirinha"
            };
            for (let id in links) {
                const el = document.getElementById(id);
                if (el) el.onclick = () => document.getElementById(links[id]).click();
            }
        }
        addDashboardLinkListeners();
    }
});