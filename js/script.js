// ========================
// --- VARIÁVEIS GLOBAIS ---
// ========================

const body = document.body;

// ========================
// --- DARK/LIGHT MODE ---
// ========================

const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
    body.classList.remove('dark-mode', 'light-mode');
    body.classList.add(savedTheme);
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        }
    });
}

// ========================
// --- MENU MOBILE ---
// ========================

const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const nav = document.querySelector('.nav');

if (mobileMenuToggle && nav) {
    mobileMenuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');

        const spans = mobileMenuToggle.querySelectorAll('span');
        if (nav.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// ========================
// --- SCROLL SUAVE ---
// ========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================
// --- ANIMAÇÃO DE ENTRADA ---
// ========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.book-card, .genre-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ========================
// --- PESQUISA VISUAL ---
// ========================

const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');

if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            alert(`Buscando por: "${searchTerm}"\nEsta é uma demonstração.`);
        }
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchBtn.click();
    });
}

// ========================
// --- CARRINHO DE COMPRAS ---
// ========================

document.addEventListener("DOMContentLoaded", () => {
    const abrirCarrinhoBtn = document.getElementById('abrirCarrinho');
    const fecharCarrinhoBtn = document.getElementById('fecharCarrinho');
    const carrinho = document.getElementById('carrinho');
    const itensCarrinho = document.getElementById('itensCarrinho');
    const totalEl = document.getElementById('total');

    if (!abrirCarrinhoBtn || !fecharCarrinhoBtn || !carrinho || !itensCarrinho || !totalEl) return;

    let carrinhoItens = [];
    let total = 0;

    // --- Função para adicionar item ---
    window.adicionarItem = function(nome, preco) {
        carrinhoItens.push({ nome, preco });
        total += preco;
        atualizarCarrinho();
        abrirCarrinho();
    };

    function atualizarCarrinho() {
        itensCarrinho.innerHTML = '';
        carrinhoItens.forEach((item, index) => {
            const div = document.createElement('div');
            div.classList.add('item');
            div.innerHTML = `
                <span>${item.nome}</span>
                <span>R$ ${item.preco.toFixed(2)}</span>
                <button class="remover" data-index="${index}">✖</button>
            `;
            itensCarrinho.appendChild(div);
        });
        totalEl.textContent = `Total: R$ ${total.toFixed(2)}`;
        ativarRemover();
    }

    function ativarRemover() {
        document.querySelectorAll('.remover').forEach(btn => {
            btn.addEventListener('click', e => {
                const i = e.target.getAttribute('data-index');
                total -= carrinhoItens[i].preco;
                carrinhoItens.splice(i, 1);
                atualizarCarrinho();
            });
        });
    }

    function abrirCarrinho() {
        carrinho.classList.add('aberto');
    }

    fecharCarrinhoBtn.addEventListener('click', () => {
        carrinho.classList.remove('aberto');
    });

    abrirCarrinhoBtn.addEventListener('click', abrirCarrinho);
});
