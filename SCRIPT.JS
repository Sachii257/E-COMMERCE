document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    let cart = [];

    // --- TEMPLATES ---

    const homePageTemplate = `
        <div class="content-wrapper-single">
            <section class="hero">
                <div class="hero-text">
                    <h1>Curated for the Modern You</h1>
                    <p>Discover products that blend form, function, and style, designed to elevate your everyday.</p>
                    <a href="#" class="cta-button nav-link" data-page="shop">Explore Collection</a>
                </div>
            </section>
            
            <section class="home-section">
                <h2 class="section-title">Our Promise</h2>
                <div class="promise-section">
                    <div class="promise-item">
                        <span class="material-symbols-outlined">diamond</span>
                        <h3>Premium Quality</h3>
                        <p>We source only the finest materials for products that are built to last.</p>
                    </div>
                    <div class="promise-item">
                        <span class="material-symbols-outlined">eco</span>
                        <h3>Sustainable Choices</h3>
                        <p>Committed to eco-friendly practices and sustainable products.</p>
                    </div>
                    <div class="promise-item">
                        <span class="material-symbols-outlined">local_shipping</span>
                        <h3>Fast Shipping</h3>
                        <p>Get your new favorite items delivered to your door, quickly and reliably.</p>
                    </div>
                </div>
            </section>

            <section class="home-section">
                <h2 class="section-title">Featured Products</h2>
                <div class="product-grid">
                    <div class="product-card" data-id="15" data-name="Performance Running Shoes" data-price="160.00"><div class="product-image-container"><img src="https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Running Shoes"></div><div class="product-info"><h3>Performance Running Shoes</h3><p class="price">$160.00</p><button class="add-to-cart-btn home-add-to-cart">Add to Cart</button></div></div>
                    <div class="product-card" data-id="3" data-name="Noise-Cancelling Headphones" data-price="249.99"><div class="product-image-container"><img src="https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Headphones"></div><div class="product-info"><h3>Noise-Cancelling Headphones</h3><p class="price">$249.99</p><button class="add-to-cart-btn home-add-to-cart">Add to Cart</button></div></div>
                    <div class="product-card" data-id="10" data-name="Weekender Canvas Duffel" data-price="185.00"><div class="product-image-container"><img src="https://images.pexels.com/photos/2422476/pexels-photo-2422476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Duffel Bag"></div><div class="product-info"><h3>Weekender Canvas Duffel</h3><p class="price">$185.00</p><button class="add-to-cart-btn home-add-to-cart">Add to Cart</button></div></div>
                    <div class="product-card" data-id="12" data-name="Sandalwood & Oak Candle" data-price="34.50"><div class="product-image-container"><img src="https://images.pexels.com/photos/5699479/pexels-photo-5699479.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Candle"></div><div class="product-info"><h3>Sandalwood & Oak Candle</h3><p class="price">$34.50</p><button class="add-to-cart-btn home-add-to-cart">Add to Cart</button></div></div>
                </div>
            </section>
        </div>
    `;

    const shopPageTemplate = `
        <div class="content-wrapper">
            <section class="products">
                <div class="shop-header">
                    <h2>Our Collection</h2>
                    <div class="cart-icon-wrapper">
                        <span class="material-symbols-outlined">shopping_bag</span>
                        <span id="cart-count">0</span>
                    </div>
                </div>
                <div class="product-grid">
                    <div class="product-card" data-id="1" data-name="Artisan Leather Journal" data-price="39.99"><div class="product-image-container"><img src="https://images.pexels.com/photos/8995927/pexels-photo-8995927.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Leather Journal"></div><div class="product-info"><h3>Artisan Leather Journal</h3><p class="price">$39.99</p><button class="add-to-cart-btn">Add to Cart</button></div></div>
                    <div class="product-card" data-id="2" data-name="Matte Black Coffee Press" data-price="49.50"><div class="badge">Sale</div><div class="product-image-container"><img src="https://images.pexels.com/photos/7133183/pexels-photo-7133183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Coffee Press"></div><div class="product-info"><h3>Matte Black Coffee Press</h3><p class="price">$49.50</p><button class="add-to-cart-btn">Add to Cart</button></div></div>
                    <div class="product-card" data-id="3" data-name="Noise-Cancelling Headphones" data-price="249.99"><div class="product-image-container"><img src="https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Headphones"></div><div class="product-info"><h3>Noise-Cancelling Headphones</h3><p class="price">$249.99</p><button class="add-to-cart-btn">Add to Cart</button></div></div>
                    <div class="product-card" data-id="4" data-name="Minimalist Desk Lamp" data-price="85.00"><div class="product-image-container"><img src="https://images.pexels.com/photos/6633913/pexels-photo-6633913.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Desk Lamp"></div><div class="product-info"><h3>Minimalist Desk Lamp</h3><p class="price">$85.00</p><button class="add-to-cart-btn">Add to Cart</button></div></div>
                    <div class="product-card" data-id="5" data-name="Organic Linen Throw Blanket" data-price="120.00"><div class="product-image-container"><img src="https://images.pexels.com/photos/7018391/pexels-photo-7018391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Linen Blanket"></div><div class="product-info"><h3>Organic Linen Throw Blanket</h3><p class="price">$120.00</p><button class="add-to-cart-btn">Add to Cart</button></div></div>
                    <div class="product-card" data-id="6" data-name="Insulated Steel Tumbler" data-price="32.99"><div class="product-image-container"><img src="https://images.pexels.com/photos/8532454/pexels-photo-8532454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Steel Tumbler"></div><div class="product-info"><h3>Insulated Steel Tumbler</h3><p class="price">$32.99</p><button class="add-to-cart-btn">Add to Cart</button></div></div>
                    <div class="product-card" data-id="7" data-name="Portable Bluetooth Speaker" data-price="99.95"><div class="product-image-container"><img src="https://images.pexels.com/photos/3782788/pexels-photo-3782788.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Bluetooth Speaker"></div><div class="product-info"><h3>Portable Bluetooth Speaker</h3><p class="price">$99.95</p><button class="add-to-cart-btn">Add to Cart</button></div></div>
                    <div class="product-card" data-id="8" data-name="Suede Yoga Mat" data-price="75.50"><div class="product-image-container"><img src="https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Yoga Mat"></div><div class="product-info"><h3>Suede Yoga Mat</h3><p class="price">$75.50</p><button class="add-to-cart-btn">Add to Cart</button></div></div>
                    <div class="product-card" data-id="9" data-name="Gourmet Espresso Beans" data-price="28.00"><div class="product-image-container"><img src="https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Coffee Beans"></div><div class="product-info"><h3>Gourmet Espresso Beans</h3><p class="price">$28.00</p><button class="add-to-cart-btn">Add to Cart</button></div></div>
                    <div class="product-card" data-id="10" data-name="Weekender Canvas Duffel" data-price="185.00"><div class="product-image-container"><img src="https://images.pexels.com/photos/2422476/pexels-photo-2422476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Duffel Bag"></div><div class="product-info"><h3>Weekender Canvas Duffel</h3><p class="price">$185.00</p><button class="add-to-cart-btn">Add to Cart</button></div></div>
                    <div class="product-card" data-id="11" data-name="Fountain Pen & Ink Set" data-price="58.99"><div class="badge">Sale</div><div class="product-image-container"><img src="https://images.pexels.com/photos/6353846/pexels-photo-6353846.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Fountain Pen"></div><div class="product-info"><h3>Fountain Pen & Ink Set</h3><p class="price">$58.99</p><button class="add-to-cart-btn">Add to Cart</button></div></div>
                    <div class="product-card" data-id="12" data-name="Sandalwood & Oak Candle" data-price="34.50"><div class="product-image-container"><img src="https://images.pexels.com/photos/5699479/pexels-photo-5699479.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Candle"></div><div class="product-info"><h3>Sandalwood & Oak Candle</h3><p class="price">$34.50</p><button class="add-to-cart-btn">Add to Cart</button></div></div>
                    <div class="product-card" data-id="13" data-name="Polarized Aviator Sunglasses" data-price="149.99"><div class="product-image-container"><img src="https://images.pexels.com/photos/2847648/pexels-photo-2847648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Sunglasses"></div><div class="product-info"><h3>Polarized Aviator Sunglasses</h3><p class="price">$149.99</p><button class="add-to-cart-btn">Add to Cart</button></div></div>
                    <div class="product-card" data-id="14" data-name="Gooseneck Electric Kettle" data-price="115.00"><div class="product-image-container"><img src="https://images.pexels.com/photos/8148633/pexels-photo-8148633.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Electric Kettle"></div><div class="product-info"><h3>Gooseneck Electric Kettle</h3><p class="price">$115.00</p><button class="add-to-cart-btn">Add to Cart</button></div></div>
                    <div class="product-card" data-id="15" data-name="Performance Running Shoes" data-price="160.00"><div class="product-image-container"><img src="https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Running Shoes"></div><div class="product-info"><h3>Performance Running Shoes</h3><p class="price">$160.00</p><button class="add-to-cart-btn">Add to Cart</button></div></div>
                    <div class="product-card" data-id="16" data-name="Smart WiFi Digital Frame" data-price="199.00"><div class="product-image-container"><img src="https://images.pexels.com/photos/4009409/pexels-photo-4009409.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Digital Frame"></div><div class="product-info"><h3>Smart WiFi Digital Frame</h3><p class="price">$199.00</p><button class="add-to-cart-btn">Add to Cart</button></div></div>
                    <div class="product-card" data-id="17" data-name="Ceramic Pour-Over Coffee Set" data-price="68.50"><div class="product-image-container"><img src="https://images.pexels.com/photos/4109845/pexels-photo-4109845.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Pour-Over Set"></div><div class="product-info"><h3>Ceramic Pour-Over Coffee Set</h3><p class="price">$68.50</p><button class="add-to-cart-btn">Add to Cart</button></div></div>
                    <div class="product-card" data-id="18" data-name="Merino Wool Scarf" data-price="92.00"><div class="product-image-container"><img src="https://images.pexels.com/photos/1484677/pexels-photo-1484677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Wool Scarf"></div><div class="product-info"><h3>Merino Wool Scarf</h3><p class="price">$92.00</p><button class="add-to-cart-btn">Add to Cart</button></div></div>
                    <div class="product-card" data-id="19" data-name="Smart Home Hub" data-price="139.00"><div class="product-image-container"><img src="https://images.pexels.com/photos/3928279/pexels-photo-3928279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Smart Home Hub"></div><div class="product-info"><h3>Smart Home Hub</h3><p class="price">$139.00</p><button class="add-to-cart-btn">Add to Cart</button></div></div>
                    <div class="product-card" data-id="20" data-name="Full-Grain Leather Belt" data-price="75.00"><div class="product-image-container"><img src="https://images.pexels.com/photos/997567/pexels-photo-997567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Leather Belt"></div><div class="product-info"><h3>Full-Grain Leather Belt</h3><p class="price">$75.00</p><button class="add-to-cart-btn">Add to Cart</button></div></div>
                    <div class="product-card" data-id="21" data-name="Stoneware Ceramic Mug" data-price="24.00"><div class="product-image-container"><img src="https://images.pexels.com/photos/373639/pexels-photo-373639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Ceramic Mug"></div><div class="product-info"><h3>Stoneware Ceramic Mug</h3><p class="price">$24.00</p><button class="add-to-cart-btn">Add to Cart</button></div></div>
                    <div class="product-card" data-id="22" data-name="Techwear Rain Jacket" data-price="210.00"><div class="product-image-container"><img src="https://images.pexels.com/photos/11059437/pexels-photo-11059437.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Jacket"></div><div class="product-info"><h3>Techwear Rain Jacket</h3><p class="price">$210.00</p><button class="add-to-cart-btn">Add to Cart</button></div></div>
                    <div class="product-card" data-id="23" data-name="Ergonomic Wireless Mouse" data-price="79.99"><div class="product-image-container"><img src="https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Wireless Mouse"></div><div class="product-info"><h3>Ergonomic Wireless Mouse</h3><p class="price">$79.99</p><button class="add-to-cart-btn">Add to Cart</button></div></div>
                    <div class="product-card" data-id="24" data-name="Memory Foam Travel Pillow" data-price="48.00"><div class="product-image-container"><img src="https://images.pexels.com/photos/4210610/pexels-photo-4210610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Travel Pillow"></div><div class="product-info"><h3>Memory Foam Travel Pillow</h3><p class="price">$48.00</p><button class="add-to-cart-btn">Add to Cart</button></div></div>
                    <div class="product-card" data-id="25" data-name="Acacia Wood Cutting Board" data-price="64.99"><div class="product-image-container"><img src="https://images.pexels.com/photos/8992911/pexels-photo-8992911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Cutting Board"></div><div class="product-info"><h3>Acacia Wood Cutting Board</h3><p class="price">$64.99</p><button class="add-to-cart-btn">Add to Cart</button></div></div>
                </div>
            </section>
            <aside class="cart">
                <h2>Your Cart</h2>
                <ul id="cart-items">
                    <li class="empty-cart-message">Your cart is empty.</li>
                </ul>
                <p class="total-price">Total: $<span id="total-price">0.00</span></p>
                <button class="checkout-btn">Proceed to Checkout</button>
            </aside>
        </div>
    `;

    const contactPageTemplate = `
        <div class="content-wrapper-single">
            <section class="contact-section">
                <h2>Let's Connect</h2>
                <p>Have a question or feedback? We’d love to hear from you. Fill out the form below and our team will get back to you shortly.</p>
                <form class="contact-form">
                    <div class="form-group"><label for="name">Full Name</label><input type="text" id="name" name="name" required></div>
                    <div class="form-group"><label for="email">Email Address</label><input type="email" id="email" name="email" required></div>
                    <div class="form-group"><label for="message">Your Message</label><textarea id="message" name="message" rows="6" required></textarea></div>
                    <button type="submit" class="submit-btn">Send Message</button>
                </form>
            </section>
        </div>
    `;
    
    // --- LOGIC ---
    
    function addToCart(productCard) {
        const productId = productCard.dataset.id;
        const existingProduct = cart.find(item => item.id === productId);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ id: productId, name: productCard.dataset.name, price: parseFloat(productCard.dataset.price), quantity: 1 });
        }
    }

    function initializeHomeLogic() {
        document.querySelectorAll('.home-add-to-cart').forEach(button => {
            button.addEventListener('click', e => {
                const productCard = e.target.closest('.product-card');
                addToCart(productCard);
                alert(`'${productCard.dataset.name}' has been added to your cart.`);
            });
        });
    }
    
    function initializeShopLogic() {
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', e => {
                const productCard = e.target.closest('.product-card');
                addToCart(productCard);
                updateCartDisplay();
            });
        });
        document.querySelector('.checkout-btn').addEventListener('click', () => {
            if (cart.length > 0) {
                alert(`Thank you for your purchase! Your total is $${document.getElementById('total-price').textContent}. This is a demo; no real transaction has occurred.`);
                cart = [];
                updateCartDisplay();
            } else { alert('Your cart is currently empty!'); }
        });
        updateCartDisplay();
    }

    function initializeContactLogic() {
        document.querySelector('.contact-form').addEventListener('submit', (event) => {
            event.preventDefault();
            alert('Thank you! Your message has been sent successfully.');
            renderPage('home');
        });
    }

    function updateCartDisplay() {
        const cartItemsList = document.getElementById('cart-items');
        const cartCount = document.getElementById('cart-count');
        const totalPriceElement = document.getElementById('total-price');
        if (!cartItemsList) return;

        cartItemsList.innerHTML = '';
        if (cart.length === 0) {
            cartItemsList.innerHTML = '<li class="empty-cart-message">Your cart is empty.</li>';
        } else {
            cart.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `<div>${item.name} <br><small>(x${item.quantity})</small></div> <span>$${(item.price * item.quantity).toFixed(2)}</span>`;
                cartItemsList.appendChild(li);
            });
        }
        
        let totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        let totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        
        totalPriceElement.textContent = totalPrice.toFixed(2);
        cartCount.textContent = totalItems;
    }

    function renderPage(page) {
        app.innerHTML = '';
        setTimeout(() => {
            if (page === 'home') {
                app.innerHTML = homePageTemplate;
                initializeHomeLogic();
            } else if (page === 'shop') {
                app.innerHTML = shopPageTemplate;
                initializeShopLogic();
            } else if (page === 'contact') {
                app.innerHTML = contactPageTemplate;
                initializeContactLogic();
            }
            attachNavLinks();
        }, 50);
    }

    function attachNavLinks() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const page = event.currentTarget.dataset.page;
                renderPage(page);
            });
        });
    }

    renderPage('home');
});