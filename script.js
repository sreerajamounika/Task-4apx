document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    const navLinks = document.querySelectorAll('nav ul li a');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header Scroll Effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Todo App
    if (document.getElementById('todo-list')) {
        const todoApp = {
            todos: JSON.parse(localStorage.getItem('todos')) || [],
            filter: 'all',
            
            init() {
                this.cacheElements();
                this.bindEvents();
                this.render();
            },
            
            cacheElements() {
                this.todoInput = document.getElementById('todo-input');
                this.addBtn = document.getElementById('add-todo');
                this.todoList = document.getElementById('todo-list');
                this.filterBtns = document.querySelectorAll('.filter-btn');
                this.taskCount = document.getElementById('task-count');
                this.clearCompleted = document.getElementById('clear-completed');
            },
            
            bindEvents() {
                this.addBtn.addEventListener('click', () => this.addTodo());
                this.todoInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') this.addTodo();
                });
                
                this.filterBtns.forEach(btn => {
                    btn.addEventListener('click', () => {
                        this.filterBtns.forEach(b => b.classList.remove('active'));
                        btn.classList.add('active');
                        this.filter = btn.dataset.filter;
                        this.render();
                    });
                });
                
                this.clearCompleted.addEventListener('click', () => {
                    this.todos = this.todos.filter(todo => !todo.completed);
                    this.saveTodos();
                    this.render();
                });
            },
            
            addTodo() {
                const text = this.todoInput.value.trim();
                if (text) {
                    this.todos.push({
                        id: Date.now(),
                        text,
                        completed: false,
                        createdAt: new Date()
                    });
                    this.saveTodos();
                    this.todoInput.value = '';
                    this.render();
                }
            },
            
            toggleComplete(id) {
                const todo = this.todos.find(t => t.id === id);
                if (todo) {
                    todo.completed = !todo.completed;
                    this.saveTodos();
                    this.render();
                }
            },
            
            deleteTodo(id) {
                this.todos = this.todos.filter(t => t.id !== id);
                this.saveTodos();
                this.render();
            },
            
            saveTodos() {
                localStorage.setItem('todos', JSON.stringify(this.todos));
            },
            
            render() {
                this.todoList.innerHTML = '';
                
                const filteredTodos = this.todos.filter(todo => {
                    if (this.filter === 'all') return true;
                    if (this.filter === 'active') return !todo.completed;
                    if (this.filter === 'completed') return todo.completed;
                    return true;
                });
                
                if (filteredTodos.length === 0) {
                    const emptyState = document.createElement('p');
                    emptyState.className = 'no-tasks';
                    emptyState.textContent = this.filter === 'all' 
                        ? 'No tasks yet. Add one above!' 
                        : this.filter === 'active' 
                            ? 'No active tasks' 
                            : 'No completed tasks';
                    this.todoList.appendChild(emptyState);
                } else {
                    filteredTodos.forEach(todo => {
                        const todoItem = document.createElement('li');
                        todoItem.className = 'todo-item';
                        if (todo.completed) todoItem.classList.add('completed');
                        
                        todoItem.innerHTML = `
                            <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
                            <span class="todo-text">${todo.text}</span>
                            <button class="todo-delete"><i class="fas fa-trash"></i></button>
                        `;
                        
                        todoItem.querySelector('.todo-checkbox').addEventListener('change', () => {
                            this.toggleComplete(todo.id);
                        });
                        
                        todoItem.querySelector('.todo-delete').addEventListener('click', () => {
                            this.deleteTodo(todo.id);
                        });
                        
                        this.todoList.appendChild(todoItem);
                    });
                }
                
                const activeCount = this.todos.filter(todo => !todo.completed).length;
                this.taskCount.textContent = ${activeCount} ${activeCount === 1 ? 'task' : 'tasks'} remaining;
            }
        };
        
        todoApp.init();
    }
    
    // Product Listing
    if (document.getElementById('product-grid')) {
        const productListing = {
            products: [
                { 
                    id: 1, 
                    name: 'Wireless Headphones', 
                    price: 99.99, 
                    category: 'electronics', 
                    rating: 4.5, 
                    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' 
                },
                { 
                    id: 2, 
                    name: 'Smart Watch', 
                    price: 199.99, 
                    category: 'electronics', 
                    rating: 4.2, 
                    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1399&q=80' 
                },
                { 
                    id: 3, 
                    name: 'Cotton T-Shirt', 
                    price: 24.99, 
                    category: 'clothing', 
                    rating: 3.8, 
                    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80' 
                },
                { 
                    id: 4, 
                    name: 'Denim Jeans', 
                    price: 59.99, 
                    category: 'clothing', 
                    rating: 4.1, 
                    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1526&q=80' 
                },
                { 
                    id: 5, 
                    name: 'Coffee Table', 
                    price: 149.99, 
                    category: 'home', 
                    rating: 4.7, 
                    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' 
                },
                { 
                    id: 6, 
                    name: 'Desk Lamp', 
                    price: 34.99, 
                    category: 'home', 
                    rating: 4.0, 
                    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' 
                }
            ],
            selectedCategories: ['electronics', 'clothing', 'home'],
            maxPrice: 500,
            sortBy: 'name-asc',
            
            init() {
                this.cacheElements();
                this.bindEvents();
                this.render();
            },
            
            cacheElements() {
                this.categoryCheckboxes = document.querySelectorAll('input[name="category"]');
                this.priceRange = document.getElementById('price-range');
                this.currentMaxPrice = document.getElementById('current-max-price');
                this.sortOptions = document.getElementById('sort-options');
                this.productGrid = document.getElementById('product-grid');
            },
            
            bindEvents() {
                this.categoryCheckboxes.forEach(checkbox => {
                    checkbox.addEventListener('change', () => this.updateCategories());
                });
                
                this.priceRange.addEventListener('input', () => {
                    this.maxPrice = parseInt(this.priceRange.value);
                    this.currentMaxPrice.textContent = $${this.maxPrice};
                    this.render();
                });
                
                this.sortOptions.addEventListener('change', () => {
                    this.sortBy = this.sortOptions.value;
                    this.render();
                });
            },
            
            updateCategories() {
                this.selectedCategories = Array.from(this.categoryCheckboxes)
                    .filter(checkbox => checkbox.checked)
                    .map(checkbox => checkbox.value);
                this.render();
            },
            
            getFilteredProducts() {
                return this.products.filter(product => {
                    return this.selectedCategories.includes(product.category) && 
                           product.price <= this.maxPrice;
                });
            },
            
            getSortedProducts(products) {
                return [...products].sort((a, b) => {
                    switch (this.sortBy) {
                        case 'name-asc': return a.name.localeCompare(b.name);
                        case 'name-desc': return b.name.localeCompare(a.name);
                        case 'price-asc': return a.price - b.price;
                        case 'price-desc': return b.price - a.price;
                        case 'rating-desc': return b.rating - a.rating;
                        default: return 0;
                    }
                });
            },
            
            render() {
                const filteredProducts = this.getFilteredProducts();
                const sortedProducts = this.getSortedProducts(filteredProducts);
                
                this.productGrid.innerHTML = '';
                
                if (sortedProducts.length === 0) {
                    const emptyState = document.createElement('div');
                    emptyState.className = 'no-products';
                    emptyState.innerHTML = `
                        <i class="fas fa-search" style="font-size: 3rem; color: #999; margin-bottom: 20px;"></i>
                        <p>No products match your filters. Try adjusting your criteria.</p>
                    `;
                    this.productGrid.appendChild(emptyState);
                    return;
                }
                
                sortedProducts.forEach(product => {
                    const productCard = document.createElement('div');
                    productCard.className = 'product-card';
                    
                    const fullStars = Math.floor(product.rating);
                    const hasHalfStar = product.rating % 1 >= 0.5;
                    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
                    
                    let starsHtml = '';
                    for (let i = 0; i < fullStars; i++) starsHtml += '<i class="fas fa-star"></i>';
                    if (hasHalfStar) starsHtml += '<i class="fas fa-star-half-alt"></i>';
                    for (let i = 0; i < emptyStars; i++) starsHtml += '<i class="far fa-star"></i>';
                    
                    productCard.innerHTML = `
                        <div class="product-img">
                            <img src="${product.image}" alt="${product.name}" loading="lazy">
                        </div>
                        <div class="product-info">
                            <h3>${product.name}</h3>
                            <div class="product-price">$${product.price.toFixed(2)}</div>
                            <div class="product-rating">
                                ${starsHtml} (${product.rating})
                            </div>
                            <span class="product-category ${product.category}">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
                        </div>
                    `;
                    
                    this.productGrid.appendChild(productCard);
                });
            }
        };
        
        productListing.init();
    }
    
    // Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                setTimeout(() => {
                    this.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }, 1500);
        });
    }
    
    // Animation on Scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.project-card, .todo-app-container, .product-controls, .contact-content');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initialize animations
    document.querySelectorAll('.project-card, .todo-app-container, .product-controls, .contact-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});
