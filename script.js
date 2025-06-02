// Funcionalidad para el menú móvil
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navIcons = document.querySelector('.nav-icons');

if (burger) {
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        navIcons.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });
}

// Funcionalidad para las pestañas de autenticación
const authTabs = document.querySelectorAll('.auth-tab');
const authForms = document.querySelectorAll('.auth-form');

if (authTabs.length > 0) {
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            
            // Desactivar todas las pestañas y formularios
            authTabs.forEach(t => t.classList.remove('active'));
            authForms.forEach(f => f.classList.remove('active'));
            
            // Activar la pestaña y formulario seleccionados
            tab.classList.add('active');
            document.getElementById(`${target}-form`).classList.add('active');
        });
    });
}

// Funcionalidad para el slider de precio
const priceRange = document.getElementById('price-range');
const priceValue = document.getElementById('price-value');

if (priceRange && priceValue) {
    priceRange.addEventListener('input', () => {
        const value = priceRange.value;
        priceValue.textContent = `$${parseInt(value).toLocaleString()}`;
    });
}

// Funcionalidad para los botones de cantidad en el carrito
const quantityBtns = document.querySelectorAll('.quantity-btn');

if (quantityBtns.length > 0) {
    quantityBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.parentElement.querySelector('input');
            let value = parseInt(input.value);
            
            if (btn.classList.contains('plus')) {
                value = value < parseInt(input.max) ? value + 1 : value;
            } else {
                value = value > parseInt(input.min) ? value - 1 : value;
            }
            
            input.value = value;
            updateCartItemTotal(input);
        });
    });
}

// Actualizar el total de un item en el carrito
function updateCartItemTotal(input) {
    const cartItem = input.closest('.cart-item');
    if (!cartItem) return;
    
    const price = parseFloat(cartItem.querySelector('.item-price').textContent.replace('$', '').replace(',', ''));
    const quantity = parseInt(input.value);
    const total = price * quantity;
    
    cartItem.querySelector('.item-total').textContent = `$${total.toLocaleString()}`;
    updateCartTotal();
}

// Actualizar el total del carrito
function updateCartTotal() {
    const cartItems = document.querySelectorAll('.cart-item');
    if (cartItems.length === 0) return;
    
    let subtotal = 0;
    
    cartItems.forEach(item => {
        const totalText = item.querySelector('.item-total').textContent;
        const total = parseFloat(totalText.replace('$', '').replace(',', ''));
        subtotal += total;
    });
    
    const shipping = 199;
    const tax = subtotal * 0.16;
    const total = subtotal + shipping + tax;
    
    const summaryRows = document.querySelectorAll('.summary-row');
    if (summaryRows.length >= 4) {
        summaryRows[0].querySelectorAll('span')[1].textContent = `$${subtotal.toLocaleString()}`;
        summaryRows[2].querySelectorAll('span')[1].textContent = `$${tax.toLocaleString()}`;
        summaryRows[3].querySelectorAll('span')[1].textContent = `$${total.toLocaleString()}`;
    }
}

// Funcionalidad para eliminar items del carrito
const removeButtons = document.querySelectorAll('.remove-item');

if (removeButtons.length > 0) {
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const cartItem = button.closest('.cart-item');
            cartItem.remove();
            updateCartTotal();
            updateCartCount();
        });
    });
}

// Actualizar contador del carrito
function updateCartCount() {
    const cartItems = document.querySelectorAll('.cart-item');
    const cartCount = document.querySelector('.cart-count');
    
    if (cartCount) {
        cartCount.textContent = cartItems.length;
    }
}

// Funcionalidad para añadir al carrito
const addToCartButtons = document.querySelectorAll('.add-to-cart:not(.disabled)');

if (addToCartButtons.length > 0) {
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const cartCount = document.querySelector('.cart-count');
            if (cartCount) {
                let count = parseInt(cartCount.textContent);
                cartCount.textContent = count + 1;
            }
            
            // Mostrar mensaje de confirmación
            const product = button.closest('.product-card');
            if (product) {
                const productName = product.querySelector('h3').textContent;
                showNotification(`${productName} añadido al carrito`);
            }
        });
    });
}

// Mostrar notificación
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <p>${message}</p>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    document.body.appendChild(notification);
    
    // Estilo para la notificación
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = 'white';
    notification.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    notification.style.borderRadius = '4px';
    notification.style.padding = '1rem';
    notification.style.display = 'flex';
    notification.style.alignItems = 'center';
    notification.style.justifyContent = 'space-between';
    notification.style.maxWidth = '300px';
    notification.style.zIndex = '1000';
    notification.style.animation = 'slideIn 0.3s forwards';
    
    // Estilo para el contenido de la notificación
    const content = notification.querySelector('.notification-content');
    content.style.display = 'flex';
    content.style.alignItems = 'center';
    content.style.gap = '0.5rem';
    
    // Estilo para el icono de check
    const checkIcon = content.querySelector('i');
    checkIcon.style.color = 'var(--success-color)';
    checkIcon.style.fontSize = '1.2rem';
    
    // Estilo para el botón de cerrar
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.background = 'none';
    closeBtn.style.border = 'none';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.fontSize = '1rem';
    closeBtn.style.color = 'var(--dark-gray)';
    
    // Agregar animación
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Cerrar notificación al hacer clic en el botón
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Cerrar automáticamente después de 5 segundos
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.animation = 'slideOut 0.3s forwards';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}