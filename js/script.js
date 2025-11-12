// // ALTERNADOR DE TEMA (DARK/LIGHT MODE)
 const themeToggle = document.getElementById('themeToggle');
 const body = document.body;

// // Verificar se há um tema salvo no localStorage
const savedTheme = localStorage.getItem('theme');
 if (savedTheme) {
    body.classList.remove('dark-mode', 'light-mode');
    body.classList.add(savedTheme);
}

//  Alternar entre os modos ao clicar no botão
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


// // MENU MOBILE

const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const nav = document.querySelector('.nav');

mobileMenuToggle.addEventListener('click', () => {
     nav.classList.toggle('active');
    
//     // Animar o ícone do menu
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

// // Fechar o menu ao clicar em um link
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


// // SCROLL SUAVE

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


// // ANIMAÇÃO DE ENTRADA (SCROLL)

 const observerOptions = {
     threshold: 0.1,
     rootMargin: '0px 0px -50px 0px'
 };

 const observer = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
         if (entry.isIntersecting) {
             entry.target.style.opacity = '1';
             entry.target.style.transform = 'translateY(0)';
         }
     });
 }, observerOptions);

// // Observar cards de livros e gêneros
 document.querySelectorAll('.book-card, .genre-card').forEach(card => {
     card.style.opacity = '0';
     card.style.transform = 'translateY(20px)';
     card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
     observer.observe(card);
 });

// // FUNCIONALIDADE DE PESQUISA (VISUAL)

 const searchInput = document.querySelector('.search-input');
 const searchBtn = document.querySelector('.search-btn');

 searchBtn.addEventListener('click', () => {
     const searchTerm = searchInput.value.trim();
     if (searchTerm) {
         console.log('Buscando por:', searchTerm);
         // Aqui você pode adicionar a lógica de pesquisa quando integrar com backend
         alert(`Buscando por: "${searchTerm}"\n\nEsta é uma demonstração. A funcionalidade completa será implementada com backend.`);
     }
 });

 searchInput.addEventListener('keypress', (e) => {
     if (e.key === 'Enter') {
         searchBtn.click();
     }
 });
//carrinho de compra
// Utilitário para formatar valores como moeda brasileira
function formatCurrency(value) {
    // Usamos toLocaleString para formatação robusta, garantindo 2 casas decimais
    return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Chave usada no localStorage para salvar o carrinho
const CART_KEY = 'meu_carrinho_exemplo_v1';
// Inicializa o carrinho tentando carregar do localStorage, ou usa um objeto vazio
let cart = JSON.parse(localStorage.getItem(CART_KEY) || '{}');

// ---------------------------------------------------------------------------
// Elementos do DOM (IDs ajustados para o HTML modificado)
// ---------------------------------------------------------------------------

const productsEl = document.getElementById('products') || document.createElement('div'); 
const cartItemsEl = document.getElementById('cart-items');
const cartCountEl = document.getElementById('cart-count') || document.createElement('span'); 
// IDs Corrigidos:
const cartSubtotalEl = document.getElementById('cart-subtotal');
const cartShippingEl = document.getElementById('cart-shipping');
const cartTotalEl = document.getElementById('cart-total');
// Botões:
const clearCartBtn = document.getElementById('clear-cart');
const checkoutBtn = document.getElementById('checkout');
// Visibilidade (para o caso de ser um sidebar/modal):
const toggleCartBtn = document.getElementById('toggle-cart') || document.createElement('button');
const cartEl = document.getElementById('cart') || document.createElement('div');


// ---------------------------------------------------------------------------
// ---- Funções Principais de Gerenciamento do Carrinho ----
// ---------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  const abrirCarrinhoBtn = document.getElementById('abrirCarrinho');
  const fecharCarrinhoBtn = document.getElementById('fecharCarrinho');
  const carrinho = document.getElementById('carrinho');
  const itensCarrinho = document.getElementById('itensCarrinho');
  const totalEl = document.getElementById('total');

  let carrinhoItens = [];
  let total = 0;

  // --- Funções principais ---
  window.adicionarItem = function(nome, preco) {
    carrinhoItens.push({ nome, preco });
    total += preco;
    atualizarCarrinho();
    abrirCarrinho(); // abre automaticamente ao adicionar
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