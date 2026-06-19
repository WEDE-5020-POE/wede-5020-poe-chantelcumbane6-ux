function goToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
// 1. Create the map
const map = L.map('bakeryMap').setView([-25.6265, 28.2188], 15);

// 2. Add the background map
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// 3. Add a marker pin
L.marker([-25.6265, 28.2188]).addTo(map);

// 4. Add a popup
marker.bindPopup('<b>Chanty\'s Cakes</b><br>Zambeji Junction');

// ========================================== */
// SERVICES PAGE JAVASCRIPT                   */
// ========================================== */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Services page loaded! ');
    
    // ========================================== */
    // 1. SERVICES DATA (All your services)       */
    // ========================================== */
    
    const allServices = [
        {
            id: 1,
            name: "Birthday Cakes",
            category: "birthday",
            price: "R300 - R700",
            description: "Celebrate your loved one's special day with a custom birthday cake from Chanty's Cakes. We offer a wide range of flavors and designs to choose from.",
            image: "birthday-cake.jpg",
            featured: true
        },
        {
            id: 2,
            name: "Wedding Cakes",
            category: "wedding",
            price: "R1,200 - R3,500",
            description: "Make your special day even more memorable with a beautiful wedding cake from Chanty's Cakes. Our skilled bakers will create a stunning cake that perfectly matches your wedding theme.",
            image: "wedding-cake.jpg",
            featured: true
        },
        {
            id: 3,
            name: "Special Occasion Cakes",
            category: "occasion",
            price: "R350 - R800",
            description: "Whether you're celebrating an anniversary, baby shower, graduation, or any other special occasion, Chanty's Cakes has the perfect cake for you.",
            image: "occasion-cake.jpg",
            featured: true
        },
        {
            id: 4,
            name: "Cupcakes",
            category: "cupcake",
            price: "R15 - R30 per cupcake",
            description: "In addition to our custom cakes, we also offer a variety of delicious cupcakes that can be customized to match your theme.",
            image: "cupcakes.jpg",
            featured: true
        },
        {
            id: 5,
            name: "Chocolate Fudge Cake",
            category: "birthday",
            price: "R450 - R750",
            description: "Rich, moist chocolate fudge cake with layers of creamy chocolate ganache. Perfect for chocolate lovers!",
            image: "chocolate-cake.jpg",
            featured: false
        },
        {
            id: 6,
            name: "Red Velvet Delight",
            category: "birthday",
            price: "R400 - R700",
            description: "Classic red velvet cake with cream cheese frosting. A timeless favorite for any celebration.",
            image: "red-velvet.jpg",
            featured: false
        },
        {
            id: 7,
            name: "Fruit Celebration Cake",
            category: "occasion",
            price: "R380 - R650",
            description: "Light and fluffy cake filled with fresh fruits and topped with whipped cream. Perfect for summer celebrations.",
            image: "fruit-cake.jpg",
            featured: false
        },
        {
            id: 8,
            name: "Mini Cupcake Platter",
            category: "cupcake",
            price: "R180 - R360",
            description: "A beautiful platter of 24 mini cupcakes in assorted flavors. Great for parties and events!",
            image: "mini-cupcakes.jpg",
            featured: false
        },
        {
            id: 9,
            name: "Graduation Cake",
            category: "occasion",
            price: "R500 - R900",
            description: "Celebrate your graduate's achievement with a personalized graduation cake. Custom designs available.",
            image: "graduation-cake.jpg",
            featured: false
        },
        {
            id: 10,
            name: "Custom Design Cake",
            category: "wedding",
            price: "R1,500 - R4,000",
            description: "Fully custom designed cake for your special day. Anything you can imagine, we can create!",
            image: "custom-cake.jpg",
            featured: false
        }
    ];
    
    // ========================================== */
    // 2. RENDER SERVICES FUNCTION                */
    // ========================================== */
    
    let currentPage = 1;
    const itemsPerPage = 4;
    let filteredServices = [...allServices];
    
    function renderServices() {
        const grid = document.getElementById('servicesGrid');
        const start = 0;
        const end = currentPage * itemsPerPage;
        const servicesToShow = filteredServices.slice(start, end);
        
        if (servicesToShow.length === 0) {
            grid.innerHTML = '';
            document.getElementById('noServicesResults').classList.add('show');
            document.getElementById('loadMoreBtn').style.display = 'none';
            return;
        }
        
        document.getElementById('noServicesResults').classList.remove('show');
        
        // Build HTML for each service
        let html = '';
        servicesToShow.forEach(function(service) {
            html += `
                <div class="service-card" data-category="${service.category}" data-price="${service.price}">
                    <div class="service-image">
                        <img src="images/${service.image}" alt="${service.name}" onerror="this.src='images/placeholder-cake.jpg'">
                        ${service.featured ? '<span class="featured-badge">⭐ Featured</span>' : ''}
                    </div>
                    <div class="service-content">
                        <h3>${service.name}</h3>
                        <div class="service-price">${service.price}</div>
                        <p>${service.description}</p>
                        <div class="service-actions">
                            <a href="enquiry.html?service=${service.id}" class="btn-enquire">Enquire Now</a>
                            <button class="btn-like" data-id="${service.id}"> <span class="like-count">0</span></button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        grid.innerHTML = html;
        
        // Hide/show load more button
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (end >= filteredServices.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
        
        // Update total count
        updateServiceCount();
    }
    
    function updateServiceCount() {
        const count = filteredServices.length;
        const countDisplay = document.getElementById('serviceCount');
        if (!countDisplay) {
            const controls = document.querySelector('.services-controls');
            const existing = document.querySelector('.service-count');
            if (existing) existing.remove();
            const span = document.createElement('span');
            span.className = 'service-count';
            span.textContent = `Showing ${filteredServices.length} services`;
            controls.appendChild(span);
        } else {
            countDisplay.textContent = `Showing ${filteredServices.length} services`;
        }
    }
    
    // ========================================== */
    // 3. LOAD MORE FUNCTION                      */
    // ========================================== */
    
    document.getElementById('loadMoreBtn').addEventListener('click', function() {
        currentPage++;
        renderServices();
        console.log('Loaded more services! ');
    });
    
    // ========================================== */
    // 4. SEARCH FUNCTIONALITY                    */
    // ========================================== */
    
    document.getElementById('serviceSearch').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        const filterValue = document.getElementById('serviceFilter').value;
        
        filterAndSearch(searchTerm, filterValue);
    });
    
    // ========================================== */
    // 5. FILTER FUNCTIONALITY                    */
    // ========================================== */
    
    document.getElementById('serviceFilter').addEventListener('change', function() {
        const searchTerm = document.getElementById('serviceSearch').value.toLowerCase().trim();
        const filterValue = this.value;
        
        filterAndSearch(searchTerm, filterValue);
    });
    
    // ========================================== */
    // 6. SORT FUNCTIONALITY                      */
    // ========================================== */
    
    document.getElementById('serviceSort').addEventListener('change', function() {
        const sortValue = this.value;
        sortServices(sortValue);
    });
    
    function filterAndSearch(searchTerm, filterValue) {
        let results = [...allServices];
        
        // Apply search
        if (searchTerm.length > 0) {
            results = results.filter(function(service) {
                return service.name.toLowerCase().includes(searchTerm) ||
                       service.description.toLowerCase().includes(searchTerm);
            });
        }
        
        // Apply filter
        if (filterValue !== 'all') {
            results = results.filter(function(service) {
                return service.category === filterValue;
            });
        }
        
        // Apply current sort
        const sortValue = document.getElementById('serviceSort').value;
        results = sortResults(results, sortValue);
        
        filteredServices = results;
        currentPage = 1;
        renderServices();
    }
    
    function sortResults(results, sortValue) {
        const sorted = [...results];
        switch(sortValue) {
            case 'price-low':
                return sorted.sort(function(a, b) {
                    const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
                    const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
                    return priceA - priceB;
                });
            case 'price-high':
                return sorted.sort(function(a, b) {
                    const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
                    const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
                    return priceB - priceA;
                });
            case 'name':
                return sorted.sort(function(a, b) {
                    return a.name.localeCompare(b.name);
                });
            default:
                return sorted;
        }
    }
    
    function sortServices(sortValue) {
        const sorted = sortResults(filteredServices, sortValue);
        filteredServices = sorted;
        currentPage = 1;
        renderServices();
    }
    
    // ========================================== */
    // 7. LIKE BUTTON FUNCTIONALITY               */
    // ========================================== */
    
    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn-like')) {
            const btn = e.target.closest('.btn-like');
            const likeSpan = btn.querySelector('.like-count');
            let count = parseInt(likeSpan.textContent);
            count++;
            likeSpan.textContent = count;
            console.log('Someone liked a service! ');
        }
    });
    
    // ========================================== */
    // 8. PRICE CALCULATOR                        */
    // ========================================== */
    
    function updatePrice() {
        const size = document.getElementById('cakeSize').value;
        const flavor = document.getElementById('cakeFlavor').value;
        const filling = document.getElementById('cakeFilling').value;
        const design = document.getElementById('cakeDesign').value;
        
        const sizePrices = {
            'small': 300,
            'medium': 450,
            'large': 650,
            'extra': 900
        };
        
        const designPrices = {
            'simple': 0,
            'medium': 100,
            'complex': 250,
            'premium': 400
        };
        
        let total = sizePrices[size] + designPrices[design];
        
        // Add extra for premium flavors
        if (flavor === 'red-velvet' || flavor === 'lemon') {
            total += 50;
        }
        
        // Add extra for premium fillings
        if (filling === 'cream-cheese' || filling === 'ganache') {
            total += 30;
        }
        
        document.getElementById('totalPrice').textContent = 'R' + total;
    }
    
    // Add event listeners to all customize inputs
    document.getElementById('cakeSize').addEventListener('change', updatePrice);
    document.getElementById('cakeFlavor').addEventListener('change', updatePrice);
    document.getElementById('cakeFilling').addEventListener('change', updatePrice);
    document.getElementById('cakeDesign').addEventListener('change', updatePrice);
    
    // Quote button
    document.getElementById('quoteBtn').addEventListener('click', function() {
        const size = document.getElementById('cakeSize').options[document.getElementById('cakeSize').selectedIndex].text;
        const flavor = document.getElementById('cakeFlavor').options[document.getElementById('cakeFlavor').selectedIndex].text;
        const filling = document.getElementById('cakeFilling').options[document.getElementById('cakeFilling').selectedIndex].text;
        const design = document.getElementById('cakeDesign').options[document.getElementById('cakeDesign').selectedIndex].text;
        const total = document.getElementById('totalPrice').textContent;
        
        alert(` Your Custom Cake Quote:\n\nSize: ${size}\n Flavor: ${flavor}\n Filling: ${filling}\n Design: ${design}\n Total: ${total}\n\nFill out our enquiry form to place your order!`);
    });
    
    // ========================================== */
    // 9. INITIAL RENDER                          */
    // ========================================== */
    
    filteredServices = [...allServices];
    renderServices();
    
    console.log('Services page ready!');
    console.log(` Total services: ${allServices.length}`);
});
// update price after a short deal 
setTimeout(function() {
    updatePrice();
    console.log('Initial price calculated! ');
}, 200);