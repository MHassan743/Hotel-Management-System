// script.js
// User Authentication State
let currentUser = {
    isLoggedIn: false,
    role: null, // 'admin' or 'customer'
    username: null
};

// Sample Data
let sampleBookings = [
    { id: 'BK001', guestName: 'John Smith', roomType: 'Deluxe Room', checkIn: '2023-06-15', checkOut: '2023-06-20', status: 'confirmed' },
    { id: 'BK002', guestName: 'Maria Garcia', roomType: 'Single Room', checkIn: '2023-06-16', checkOut: '2023-06-18', status: 'confirmed' },
    { id: 'BK003', guestName: 'Ahmed Khan', roomType: 'Suite', checkIn: '2023-06-17', checkOut: '2023-06-22', status: 'pending' },
    { id: 'BK004', guestName: 'Wei Zhang', roomType: 'Double Room', checkIn: '2023-06-18', checkOut: '2023-06-21', status: 'confirmed' },
    { id: 'BK005', guestName: 'Sophie Martin', roomType: 'Deluxe Room', checkIn: '2023-06-19', checkOut: '2023-06-25', status: 'cancelled' }
];

let sampleGuests = [
    { id: 'GU001', name: 'John Smith', email: 'john.smith@example.com', phone: '+1-555-1234', country: 'USA', vip: false },
    { id: 'GU002', name: 'Maria Garcia', email: 'maria.garcia@example.com', phone: '+34-555-5678', country: 'Spain', vip: false },
    { id: 'GU003', name: 'Ahmed Khan', email: 'ahmed.khan@example.com', phone: '+92-555-9012', country: 'Pakistan', vip: true },
    { id: 'GU004', name: 'Wei Zhang', email: 'wei.zhang@example.com', phone: '+86-555-3456', country: 'China', vip: false },
    { id: 'GU005', name: 'Sophie Martin', email: 'sophie.martin@example.com', phone: '+33-555-7890', country: 'France', vip: true }
];

let sampleRooms = [
    { number: '101', type: 'Single Room', price: 120, status: 'occupied', amenities: ['WiFi', 'TV', 'AC'] },
    { number: '102', type: 'Single Room', price: 120, status: 'available', amenities: ['WiFi', 'TV', 'AC'] },
    { number: '201', type: 'Double Room', price: 180, status: 'available', amenities: ['WiFi', 'TV', 'AC', 'Mini Bar'] },
    { number: '202', type: 'Double Room', price: 180, status: 'maintenance', amenities: ['WiFi', 'TV', 'AC', 'Mini Bar'] },
    { number: '301', type: 'Deluxe Room', price: 250, status: 'occupied', amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony'] },
    { number: '302', type: 'Deluxe Room', price: 250, status: 'available', amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony'] },
    { number: '401', type: 'Suite', price: 400, status: 'occupied', amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony', 'Jacuzzi'] },
    { number: '402', type: 'Suite', price: 400, status: 'available', amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony', 'Jacuzzi'] }
];

let sampleServices = [
    { id: 'SRV001', name: 'Room Service', description: '24/7 in-room dining service', price: 15, available: true },
    { id: 'SRV002', name: 'Spa & Wellness', description: 'Relaxing spa treatments and massages', price: 80, available: true },
    { id: 'SRV003', name: 'Airport Transfer', description: 'Complimentary airport pickup and drop-off', price: 0, available: true },
    { id: 'SRV004', name: 'Laundry Service', description: 'Same-day laundry and dry cleaning', price: 25, available: true },
    { id: 'SRV005', name: 'Business Center', description: 'Fully equipped business facilities', price: 10, available: true }
];

let sampleServiceRequests = [
    { id: 'REQ001', guestName: 'John Smith', serviceType: 'Room Service', roomNo: '101', requestTime: '2023-06-15 19:30', status: 'completed' },
    { id: 'REQ002', guestName: 'Maria Garcia', serviceType: 'Laundry Service', roomNo: '102', requestTime: '2023-06-16 10:15', status: 'in-progress' },
    { id: 'REQ003', guestName: 'Ahmed Khan', serviceType: 'Spa & Wellness', roomNo: '301', requestTime: '2023-06-17 14:00', status: 'pending' }
];

let samplePerformance = [
    { month: 'January', revenue: 38500, occupancy: 72, newGuests: 45, servicesRevenue: 5200, rating: 4.1 },
    { month: 'February', revenue: 40200, occupancy: 75, newGuests: 52, servicesRevenue: 6100, rating: 4.3 },
    { month: 'March', revenue: 42580, occupancy: 78, newGuests: 58, servicesRevenue: 6850, rating: 4.2 },
    { month: 'April', revenue: 38900, occupancy: 70, newGuests: 41, servicesRevenue: 4950, rating: 4.0 },
    { month: 'May', revenue: 43600, occupancy: 80, newGuests: 62, servicesRevenue: 7200, rating: 4.4 }
];

// Application State
let onlineBookingEnabled = false;
let selectedRoomForBooking = null;

// Language and Currency Settings
let currentLanguage = 'en';
let currentCurrency = 'USD';

// Login Credentials
const loginCredentials = {
    admin: {
        username: 'admin',
        password: 'admin123'
    },
    customer: {
        username: 'guest',
        password: 'guest123'
    }
};

// Language Translations
const translations = {
    en: {
        dashboard: "Dashboard",
        roomManagement: "Room Management",
        reservations: "Reservations",
        guests: "Guests",
        services: "Services",
        reports: "Reports",
        settings: "Settings",
        onlineBooking: "Online Booking",
        hotelManagementDashboard: "Hotel Management Dashboard",
        totalRooms: "Total Rooms",
        occupiedRooms: "Occupied Rooms",
        availableRooms: "Available Rooms",
        occupancyRate: "Occupancy Rate",
        recentBookings: "Recent Bookings",
        guestManagement: "Guest Management",
        newBooking: "New Booking",
        addGuest: "Add Guest",
        bookingId: "Booking ID",
        guestName: "Guest Name",
        roomType: "Room Type",
        checkIn: "Check-In",
        checkOut: "Check-Out",
        status: "Status",
        actions: "Actions",
        edit: "Edit",
        delete: "Delete",
        save: "Save",
        cancel: "Cancel"
    },
    es: {
        dashboard: "Panel de Control",
        roomManagement: "Gestión de Habitaciones",
        reservations: "Reservas",
        guests: "Huéspedes",
        services: "Servicios",
        reports: "Informes",
        settings: "Configuración",
        onlineBooking: "Reserva Online",
        hotelManagementDashboard: "Panel de Gestión Hotelera",
        totalRooms: "Total Habitaciones",
        occupiedRooms: "Habitaciones Ocupadas",
        availableRooms: "Habitaciones Disponibles",
        occupancyRate: "Tasa de Ocupación",
        recentBookings: "Reservas Recientes",
        guestManagement: "Gestión de Huéspedes",
        newBooking: "Nueva Reserva",
        addGuest: "Añadir Huésped",
        bookingId: "ID de Reserva",
        guestName: "Nombre del Huésped",
        roomType: "Tipo de Habitación",
        checkIn: "Check-In",
        checkOut: "Check-Out",
        status: "Estado",
        actions: "Acciones",
        edit: "Editar",
        delete: "Eliminar",
        save: "Guardar",
        cancel: "Cancelar"
    },
    fr: {
        dashboard: "Tableau de Bord",
        roomManagement: "Gestion des Chambres",
        reservations: "Réservations",
        guests: "Clients",
        services: "Services",
        reports: "Rapports",
        settings: "Paramètres",
        onlineBooking: "Réservation en Ligne",
        hotelManagementDashboard: "Tableau de Bord de Gestion Hôtelière",
        totalRooms: "Total des Chambres",
        occupiedRooms: "Chambres Occupées",
        availableRooms: "Chambres Disponibles",
        occupancyRate: "Taux d'Occupation",
        recentBookings: "Réservations Récentes",
        guestManagement: "Gestion des Clients",
        newBooking: "Nouvelle Réservation",
        addGuest: "Ajouter un Client",
        bookingId: "ID de Réservation",
        guestName: "Nom du Client",
        roomType: "Type de Chambre",
        checkIn: "Arrivée",
        checkOut: "Départ",
        status: "Statut",
        actions: "Actions",
        edit: "Modifier",
        delete: "Supprimer",
        save: "Sauvegarder",
        cancel: "Annuler"
    },
    de: {
        dashboard: "Dashboard",
        roomManagement: "Zimmerverwaltung",
        reservations: "Reservierungen",
        guests: "Gäste",
        services: "Dienstleistungen",
        reports: "Berichte",
        settings: "Einstellungen",
        onlineBooking: "Online Buchung",
        hotelManagementDashboard: "Hotel Management Dashboard",
        totalRooms: "Gesamtzimmer",
        occupiedRooms: "Belegte Zimmer",
        availableRooms: "Verfügbare Zimmer",
        occupancyRate: "Belegungsrate",
        recentBookings: "Aktuelle Buchungen",
        guestManagement: "Gästeverwaltung",
        newBooking: "Neue Buchung",
        addGuest: "Gast hinzufügen",
        bookingId: "Buchungs-ID",
        guestName: "Gastname",
        roomType: "Zimmertyp",
        checkIn: "Check-In",
        checkOut: "Check-Out",
        status: "Status",
        actions: "Aktionen",
        edit: "Bearbeiten",
        delete: "Löschen",
        save: "Speichern",
        cancel: "Abbrechen"
    },
    hi: {
        dashboard: "डैशबोर्ड",
        roomManagement: "कमरा प्रबंधन",
        reservations: "आरक्षण",
        guests: "मेहमान",
        services: "सेवाएं",
        reports: "रिपोर्ट",
        settings: "सेटिंग्स",
        onlineBooking: "ऑनलाइन बुकिंग",
        hotelManagementDashboard: "होटल प्रबंधन डैशबोर्ड",
        totalRooms: "कुल कमरे",
        occupiedRooms: "कब्जे वाले कमरे",
        availableRooms: "उपलब्ध कमरे",
        occupancyRate: "अधिभोग दर",
        recentBookings: "हाल की बुकिंग",
        guestManagement: "मेहमान प्रबंधन",
        newBooking: "नई बुकिंग",
        addGuest: "मेहमान जोड़ें",
        bookingId: "बुकिंग आईडी",
        guestName: "मेहमान का नाम",
        roomType: "कमरे का प्रकार",
        checkIn: "चेक-इन",
        checkOut: "चेक-आउट",
        status: "स्थिति",
        actions: "कार्रवाई",
        edit: "संपादित करें",
        delete: "हटाएं",
        save: "सहेजें",
        cancel: "रद्द करें"
    }
};

// Currency Exchange Rates
const exchangeRates = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
    JPY: 110.5,
    INR: 75.2
};

// Currency Symbols
const currencySymbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    INR: '₹'
};

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    init();
});

// Initialize the application
function init() {
    loadSettings();
    setupEventListeners();
    checkAuthentication();
}

// Authentication Functions
function checkAuthentication() {
    const savedUser = localStorage.getItem('hotelUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        if (currentUser.isLoggedIn) {
            handleSuccessfulLogin();
        } else {
            showLoginModal();
        }
    } else {
        showLoginModal();
    }
}

function showLoginModal() {
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
        loginModal.style.display = 'flex';
        // Reset form and show default user type
        const userTypeSelect = document.getElementById('userType');
        if (userTypeSelect) {
            userTypeSelect.value = 'customer';
            updateLoginFormPlaceholders('customer');
        }
    }
}

function updateLoginFormPlaceholders(userType) {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginHelpText = document.getElementById('loginHelpText');
    
    if (!usernameInput || !passwordInput) return;
    
    if (userType === 'admin') {
        usernameInput.placeholder = 'Enter admin username';
        passwordInput.placeholder = 'Enter admin password';
        if (loginHelpText) {
            loginHelpText.textContent = 'Use admin credentials to access full management features';
            loginHelpText.style.display = 'block';
        }
    } else {
        usernameInput.placeholder = 'Enter guest username';
        passwordInput.placeholder = 'Enter guest password';
        if (loginHelpText) {
            loginHelpText.textContent = 'Use guest credentials for view-only access';
            loginHelpText.style.display = 'block';
        }
    }
    
    // Clear the fields when switching user types
    usernameInput.value = '';
    passwordInput.value = '';
}

function login(username, password, userType) {
    // Validate credentials based on user type
    if (userType === 'admin') {
        if (username === loginCredentials.admin.username && password === loginCredentials.admin.password) {
            currentUser = {
                isLoggedIn: true,
                role: 'admin',
                username: username
            };
            localStorage.setItem('hotelUser', JSON.stringify(currentUser));
            handleSuccessfulLogin();
            return true;
        } else {
            showToast('Invalid admin credentials', 'error');
            return false;
        }
    } else {
        // Customer authentication
        if (username === loginCredentials.customer.username && password === loginCredentials.customer.password) {
            currentUser = {
                isLoggedIn: true,
                role: 'customer',
                username: username
            };
            localStorage.setItem('hotelUser', JSON.stringify(currentUser));
            handleSuccessfulLogin();
            return true;
        } else {
            showToast('Invalid guest credentials', 'error');
            return false;
        }
    }
}

function logout() {
    currentUser = {
        isLoggedIn: false,
        role: null,
        username: null
    };
    localStorage.removeItem('hotelUser');
    location.reload();
}

function handleSuccessfulLogin() {
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
        loginModal.style.display = 'none';
    }
    
    document.body.classList.add(currentUser.role + '-mode');
    
    // Update UI based on role
    updateUIForUserRole();
    
    // Initialize the rest of the application
    updateLanguage();
    updateAllPrices();
    renderBookings();
    renderGuests();
    renderRooms();
    renderServices();
    renderServiceRequests();
    renderPerformance();
    renderReservations();
    renderAllGuests();
    renderOnlineRooms();
    updateDashboardStats();
    setupResponsiveBehavior();
    
    showToast(`Welcome ${currentUser.username}! (${currentUser.role} access)`, 'success');
}

function updateUIForUserRole() {
    const userRoleElement = document.getElementById('userRoleDisplay');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (userRoleElement) {
        userRoleElement.textContent = `${currentUser.username} (${currentUser.role.toUpperCase()})`;
    }
    
    if (logoutBtn) {
        logoutBtn.style.display = 'inline-flex';
    }
    
    // Show/hide admin elements based on role
    if (currentUser.role === 'admin') {
        document.body.classList.add('admin-mode');
        document.body.classList.remove('customer-mode');
        
        // Show all admin-only elements
        document.querySelectorAll('.admin-only').forEach(el => {
            el.style.display = 'block';
        });
    } else {
        document.body.classList.add('customer-mode');
        document.body.classList.remove('admin-mode');
        
        // Hide all admin-only elements
        document.querySelectorAll('.admin-only').forEach(el => {
            el.style.display = 'none';
        });
    }
}

function isAdmin() {
    return currentUser.role === 'admin';
}

// Language and Currency Management
function loadSettings() {
    const savedLanguage = localStorage.getItem('hotelLanguage');
    const savedCurrency = localStorage.getItem('hotelCurrency');
    
    if (savedLanguage) {
        currentLanguage = savedLanguage;
        const languageSelect = document.getElementById('language');
        if (languageSelect) languageSelect.value = currentLanguage;
    }
    
    if (savedCurrency) {
        currentCurrency = savedCurrency;
        const currencySelect = document.getElementById('currency');
        if (currencySelect) currencySelect.value = currentCurrency;
    }
}

function saveSettings() {
    localStorage.setItem('hotelLanguage', currentLanguage);
    localStorage.setItem('hotelCurrency', currentCurrency);
}

function updateLanguage() {
    const t = translations[currentLanguage];
    
    // Update navigation
    updateElementText('navDashboard', t.dashboard);
    updateElementText('navRooms', t.roomManagement);
    updateElementText('navReservations', t.reservations);
    updateElementText('navGuests', t.guests);
    updateElementText('navServices', t.services);
    updateElementText('navReports', t.reports);
    updateElementText('navSettings', t.settings);
    updateElementText('navOnlineBooking', t.onlineBooking);
    
    // Update page title
    updateElementText('pageTitle', t.hotelManagementDashboard);
    
    // Update dashboard
    updateElementText('cardTotalRooms', t.totalRooms);
    updateElementText('cardOccupiedRooms', t.occupiedRooms);
    updateElementText('cardAvailableRooms', t.availableRooms);
    updateElementText('cardOccupancyRate', t.occupancyRate);
    updateElementText('recentBookingsTitle', t.recentBookings);
    updateElementText('guestManagementTitle', t.guestManagement);
    updateElementText('btnNewBooking', t.newBooking);
    updateElementText('btnAddGuest', t.addGuest);
    
    // Update table headers
    updateElementText('thBookingId', t.bookingId);
    updateElementText('thGuestName', t.guestName);
    updateElementText('thRoomType', t.roomType);
    updateElementText('thCheckIn', t.checkIn);
    updateElementText('thCheckOut', t.checkOut);
    updateElementText('thStatus', t.status);
    updateElementText('thActions', t.actions);
}

function updateElementText(elementId, text) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = text;
    }
}

function formatPrice(price) {
    const convertedPrice = price * exchangeRates[currentCurrency];
    const symbol = currencySymbols[currentCurrency];
    
    if (currentCurrency === 'JPY') {
        return `${symbol}${Math.round(convertedPrice).toLocaleString()}`;
    }
    
    return `${symbol}${convertedPrice.toFixed(2)}`;
}

function updateAllPrices() {
    document.querySelectorAll('.room-price').forEach(element => {
        const text = element.textContent;
        const priceMatch = text.match(/\$(\d+)/);
        if (priceMatch) {
            const price = parseInt(priceMatch[1]);
            element.textContent = `${formatPrice(price)}/night`;
        }
    });
    
    document.querySelectorAll('.service-card p').forEach(element => {
        const text = element.textContent;
        if (text.includes('Price:')) {
            const priceMatch = text.match(/\$(\d+)/);
            if (priceMatch) {
                const price = parseInt(priceMatch[1]);
                element.textContent = element.textContent.replace(/\$\d+/, formatPrice(price));
            }
        }
    });
    
    document.querySelectorAll('td').forEach(td => {
        const text = td.textContent;
        if (text.startsWith('$')) {
            const priceMatch = text.match(/\$(\d+)/);
            if (priceMatch) {
                const price = parseInt(priceMatch[1]);
                td.textContent = formatPrice(price);
            }
        }
    });
}

function changeLanguage(language) {
    if (translations[language]) {
        currentLanguage = language;
        saveSettings();
        updateLanguage();
        updateAllPrices();
        showToast(`Language changed to ${language.toUpperCase()}`, 'success');
    }
}

function changeCurrency(currency) {
    if (exchangeRates[currency]) {
        currentCurrency = currency;
        saveSettings();
        updateAllPrices();
        showToast(`Currency changed to ${currency}`, 'success');
    }
}

// Setup event listeners
function setupEventListeners() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    const userTypeSelect = document.getElementById('userType');
    
    if (userTypeSelect) {
        userTypeSelect.addEventListener('change', function() {
            updateLoginFormPlaceholders(this.value);
        });
    }
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const userType = document.getElementById('userType').value;
            
            login(username, password, userType);
        });
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }

    // Language and Currency
    const languageSelect = document.getElementById('language');
    const currencySelect = document.getElementById('currency');
    
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            changeLanguage(this.value);
        });
    }
    
    if (currencySelect) {
        currencySelect.addEventListener('change', function() {
            changeCurrency(this.value);
        });
    }

    // Online bookings toggle - only for admin
    const onlineBookingsToggle = document.getElementById('onlineBookings');
    if (onlineBookingsToggle) {
        onlineBookingsToggle.addEventListener('change', function() {
            if (!isAdmin()) {
                this.checked = !this.checked;
                showToast('Only administrators can change this setting', 'error');
                return;
            }
            toggleOnlineBooking(this.checked);
            showToast(`Online bookings ${this.checked ? 'enabled' : 'disabled'}`);
        });
    }
    
    // Modal open buttons - only for admin
    const newBookingBtn = document.getElementById('newBookingBtn');
    const addGuestBtn = document.getElementById('addGuestBtn');

    if (newBookingBtn) {
        newBookingBtn.addEventListener('click', () => {
            if (!isAdmin()) {
                showToast('Only administrators can create bookings', 'error');
                return;
            }
            const bookingModal = document.getElementById('bookingModal');
            if (bookingModal) bookingModal.style.display = 'flex';
        });
    }

    if (addGuestBtn) {
        addGuestBtn.addEventListener('click', () => {
            if (!isAdmin()) {
                showToast('Only administrators can add guests', 'error');
                return;
            }
            const guestModal = document.getElementById('guestModal');
            if (guestModal) guestModal.style.display = 'flex';
        });
    }

    // Additional button listeners - only for admin
    const addRoomBtn = document.getElementById('addRoomBtn');
    const newReservationBtn = document.getElementById('newReservationBtn');
    const addNewGuestBtn = document.getElementById('addNewGuestBtn');
    const addServiceBtn = document.getElementById('addServiceBtn');
    const generateReportBtn = document.getElementById('generateReportBtn');

    if (addRoomBtn) {
        addRoomBtn.addEventListener('click', () => {
            if (!isAdmin()) {
                showToast('Only administrators can add rooms', 'error');
                return;
            }
            addNewRoom();
        });
    }
    
    if (newReservationBtn) {
        newReservationBtn.addEventListener('click', () => {
            if (!isAdmin()) {
                showToast('Only administrators can create reservations', 'error');
                return;
            }
            const bookingModal = document.getElementById('bookingModal');
            if (bookingModal) bookingModal.style.display = 'flex';
        });
    }
    
    if (addNewGuestBtn) {
        addNewGuestBtn.addEventListener('click', () => {
            if (!isAdmin()) {
                showToast('Only administrators can add guests', 'error');
                return;
            }
            const guestModal = document.getElementById('guestModal');
            if (guestModal) guestModal.style.display = 'flex';
        });
    }
    
    if (addServiceBtn) {
        addServiceBtn.addEventListener('click', () => {
            if (!isAdmin()) {
                showToast('Only administrators can add services', 'error');
                return;
            }
            addNewService();
        });
    }
    
    if (generateReportBtn) {
        generateReportBtn.addEventListener('click', () => {
            if (!isAdmin()) {
                showToast('Only administrators can generate reports', 'error');
                return;
            }
            generateReport();
        });
    }

    // Modal close buttons
    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const bookingModal = document.getElementById('bookingModal');
            const guestModal = document.getElementById('guestModal');
            if (bookingModal) bookingModal.style.display = 'none';
            if (guestModal) guestModal.style.display = 'none';
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        const bookingModal = document.getElementById('bookingModal');
        const guestModal = document.getElementById('guestModal');
        if (event.target === bookingModal && bookingModal) {
            bookingModal.style.display = 'none';
        }
        if (event.target === guestModal && guestModal) {
            guestModal.style.display = 'none';
        }
    });

    // Form submissions - only for admin
    const bookingForm = document.getElementById('bookingForm');
    const guestForm = document.getElementById('guestForm');
    const onlineBookingForm = document.getElementById('onlineBookingForm');

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!isAdmin()) {
                showToast('Only administrators can create bookings', 'error');
                return;
            }
            const newBooking = {
                id: `BK${String(sampleBookings.length + 1).padStart(3, '0')}`,
                guestName: document.getElementById('guestName').value,
                roomType: document.getElementById('roomType').value,
                checkIn: document.getElementById('checkIn').value,
                checkOut: document.getElementById('checkOut').value,
                status: 'confirmed'
            };
            sampleBookings.push(newBooking);
            renderBookings();
            renderReservations();
            updateDashboardStats();
            showToast('Booking created successfully!');
            const bookingModal = document.getElementById('bookingModal');
            if (bookingModal) bookingModal.style.display = 'none';
            bookingForm.reset();
        });
    }

    if (guestForm) {
        guestForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!isAdmin()) {
                showToast('Only administrators can add guests', 'error');
                return;
            }
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const newGuest = {
                id: `GU${String(sampleGuests.length + 1).padStart(3, '0')}`,
                name: `${firstName} ${lastName}`,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                country: document.getElementById('country').value,
                vip: false
            };
            sampleGuests.push(newGuest);
            renderGuests();
            renderAllGuests();
            updateDashboardStats();
            showToast('Guest added successfully!');
            const guestModal = document.getElementById('guestModal');
            if (guestModal) guestModal.style.display = 'none';
            guestForm.reset();
        });
    }
    
    // Online booking form submission - only for admin
    if (onlineBookingForm) {
        onlineBookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (!isAdmin()) {
                showToast('Please contact hotel administration for booking', 'info');
                return;
            }
            
            if (!selectedRoomForBooking) {
                showToast('Please select a room to book', 'warning');
                return;
            }
            
            const bookingData = {
                firstName: document.getElementById('onlineFirstName').value,
                lastName: document.getElementById('onlineLastName').value,
                email: document.getElementById('onlineEmail').value,
                phone: document.getElementById('onlinePhone').value,
                checkIn: document.getElementById('onlineCheckIn').value,
                checkOut: document.getElementById('onlineCheckOut').value,
                roomType: document.getElementById('onlineRoomType').value,
                guests: document.getElementById('onlineGuests').value,
                specialRequests: document.getElementById('onlineSpecialRequests').value
            };
            
            processOnlineBooking(bookingData);
        });
    }

    // Sidebar navigation
    const sidebarItems = document.querySelectorAll('.sidebar-menu li');
    const pageTitle = document.getElementById('pageTitle');
    sidebarItems.forEach(item => {
        item.addEventListener('click', () => {
            const section = item.dataset.section;
            
            sidebarItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            const contentSections = document.querySelectorAll('.content-section');
            contentSections.forEach(s => s.classList.remove('active'));
            const targetSection = document.getElementById(section);
            if (targetSection) targetSection.classList.add('active');
            
            if (pageTitle) {
                const t = translations[currentLanguage];
                pageTitle.textContent = t[section] || section.charAt(0).toUpperCase() + section.slice(1);
            }
            
            if (window.innerWidth <= 768) {
                const sidebar = document.getElementById('sidebar');
                if (sidebar) sidebar.classList.remove('show');
            }
        });
    });

    // Settings buttons - only for admin
    const backupBtn = document.getElementById('backupBtn');
    const clearDataBtn = document.getElementById('clearDataBtn');
    const resetBtn = document.getElementById('resetBtn');
    const darkModeToggle = document.getElementById('darkMode');

    if (backupBtn) {
        backupBtn.addEventListener('click', () => {
            if (!isAdmin()) {
                showToast('Only administrators can backup data', 'error');
                return;
            }
            showToast('Database backup created successfully!');
        });
    }
    
    // Dark mode toggle - available for all
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', () => {
            if (darkModeToggle.checked) {
                document.body.classList.add('dark-mode');
                showToast('Dark mode enabled');
            } else {
                document.body.classList.remove('dark-mode');
                showToast('Dark mode disabled');
            }
        });
    }

    if (clearDataBtn) {
        clearDataBtn.addEventListener('click', () => {
            if (!isAdmin()) {
                showToast('Only administrators can clear data', 'error');
                return;
            }
            if (confirm('Are you sure you want to clear all test data? This action cannot be undone.')) {
                sampleBookings = [];
                sampleGuests = [];
                sampleRooms = [];
                sampleServices = [];
                sampleServiceRequests = [];
                renderBookings();
                renderGuests();
                renderRooms();
                renderServices();
                renderReservations();
                renderAllGuests();
                renderOnlineRooms();
                updateDashboardStats();
                showToast('All test data cleared successfully!');
            }
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (!isAdmin()) {
                showToast('Only administrators can reset data', 'error');
                return;
            }
            if (confirm('Are you sure you want to reset all data? This will restore default values.')) {
                // Reset to initial sample data
                sampleBookings = [
                    { id: 'BK001', guestName: 'John Smith', roomType: 'Deluxe Room', checkIn: '2023-06-15', checkOut: '2023-06-20', status: 'confirmed' },
                    { id: 'BK002', guestName: 'Maria Garcia', roomType: 'Single Room', checkIn: '2023-06-16', checkOut: '2023-06-18', status: 'confirmed' },
                    { id: 'BK003', guestName: 'Ahmed Khan', roomType: 'Suite', checkIn: '2023-06-17', checkOut: '2023-06-22', status: 'pending' },
                    { id: 'BK004', guestName: 'Wei Zhang', roomType: 'Double Room', checkIn: '2023-06-18', checkOut: '2023-06-21', status: 'confirmed' },
                    { id: 'BK005', guestName: 'Sophie Martin', roomType: 'Deluxe Room', checkIn: '2023-06-19', checkOut: '2023-06-25', status: 'cancelled' }
                ];
                
                sampleGuests = [
                    { id: 'GU001', name: 'John Smith', email: 'john.smith@example.com', phone: '+1-555-1234', country: 'USA', vip: false },
                    { id: 'GU002', name: 'Maria Garcia', email: 'maria.garcia@example.com', phone: '+34-555-5678', country: 'Spain', vip: false },
                    { id: 'GU003', name: 'Ahmed Khan', email: 'ahmed.khan@example.com', phone: '+92-555-9012', country: 'Pakistan', vip: true },
                    { id: 'GU004', name: 'Wei Zhang', email: 'wei.zhang@example.com', phone: '+86-555-3456', country: 'China', vip: false },
                    { id: 'GU005', name: 'Sophie Martin', email: 'sophie.martin@example.com', phone: '+33-555-7890', country: 'France', vip: true }
                ];
                
                sampleRooms = [
                    { number: '101', type: 'Single Room', price: 120, status: 'occupied', amenities: ['WiFi', 'TV', 'AC'] },
                    { number: '102', type: 'Single Room', price: 120, status: 'available', amenities: ['WiFi', 'TV', 'AC'] },
                    { number: '201', type: 'Double Room', price: 180, status: 'available', amenities: ['WiFi', 'TV', 'AC', 'Mini Bar'] },
                    { number: '202', type: 'Double Room', price: 180, status: 'maintenance', amenities: ['WiFi', 'TV', 'AC', 'Mini Bar'] },
                    { number: '301', type: 'Deluxe Room', price: 250, status: 'occupied', amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony'] },
                    { number: '302', type: 'Deluxe Room', price: 250, status: 'available', amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony'] },
                    { number: '401', type: 'Suite', price: 400, status: 'occupied', amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony', 'Jacuzzi'] },
                    { number: '402', type: 'Suite', price: 400, status: 'available', amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony', 'Jacuzzi'] }
                ];
                
                sampleServices = [
                    { id: 'SRV001', name: 'Room Service', description: '24/7 in-room dining service', price: 15, available: true },
                    { id: 'SRV002', name: 'Spa & Wellness', description: 'Relaxing spa treatments and massages', price: 80, available: true },
                    { id: 'SRV003', name: 'Airport Transfer', description: 'Complimentary airport pickup and drop-off', price: 0, available: true },
                    { id: 'SRV004', name: 'Laundry Service', description: 'Same-day laundry and dry cleaning', price: 25, available: true },
                    { id: 'SRV005', name: 'Business Center', description: 'Fully equipped business facilities', price: 10, available: true }
                ];
                
                sampleServiceRequests = [
                    { id: 'REQ001', guestName: 'John Smith', serviceType: 'Room Service', roomNo: '101', requestTime: '2023-06-15 19:30', status: 'completed' },
                    { id: 'REQ002', guestName: 'Maria Garcia', serviceType: 'Laundry Service', roomNo: '102', requestTime: '2023-06-16 10:15', status: 'in-progress' },
                    { id: 'REQ003', guestName: 'Ahmed Khan', serviceType: 'Spa & Wellness', roomNo: '301', requestTime: '2023-06-17 14:00', status: 'pending' }
                ];
                
                renderBookings();
                renderGuests();
                renderRooms();
                renderServices();
                renderReservations();
                renderAllGuests();
                renderOnlineRooms();
                updateDashboardStats();
                showToast('All data reset to default values!');
            }
        });
    }
}

// Setup responsive behavior
function setupResponsiveBehavior() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const toggleSidebarBtn = document.getElementById('toggleSidebar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    
    if (toggleSidebarBtn) {
        toggleSidebarBtn.addEventListener('click', function() {
            if (sidebar) sidebar.classList.toggle('collapsed');
            if (mainContent) mainContent.classList.toggle('expanded');
        });
    }
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            if (sidebar) sidebar.classList.toggle('show');
        });
    }
    
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768 && 
            sidebar && !sidebar.contains(event.target) && 
            mobileMenuBtn && !mobileMenuBtn.contains(event.target) && 
            sidebar.classList.contains('show')) {
            sidebar.classList.remove('show');
        }
    });
    
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && sidebar) {
            sidebar.classList.remove('show');
        }
        
        // Update responsive layout on resize
        updateResponsiveLayout();
    });
    
    // Initial responsive layout setup
    updateResponsiveLayout();
}

function updateResponsiveLayout() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    
    if (window.innerWidth <= 768) {
        if (sidebar && mainContent) {
            sidebar.classList.remove('collapsed');
            mainContent.classList.remove('expanded');
        }
    }
}

// Render functions with role-based access
function renderBookings() {
    const bookingsTable = document.getElementById('bookingsTable');
    if (!bookingsTable) return;
    
    bookingsTable.innerHTML = '';
    sampleBookings.forEach((booking, index) => {
        const row = document.createElement('tr');
        const actionsCell = isAdmin() ? `
            <td>
                <button class="btn btn-sm edit-booking" data-index="${index}" title="${translations[currentLanguage].edit}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm delete-booking" data-index="${index}" title="${translations[currentLanguage].delete}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        ` : '<td class="text-muted">View Only</td>';
        
        row.innerHTML = `
            <td>${booking.id}</td>
            <td>${booking.guestName}</td>
            <td>${booking.roomType}</td>
            <td>${booking.checkIn}</td>
            <td>${booking.checkOut}</td>
            <td><span class="status ${booking.status}">${booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span></td>
            ${actionsCell}
        `;
        bookingsTable.appendChild(row);
    });
    
    // Add event listeners only for admin
    if (isAdmin()) {
        document.querySelectorAll('.edit-booking').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.closest('button').dataset.index;
                editBooking(index);
            });
        });
        
        document.querySelectorAll('.delete-booking').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.closest('button').dataset.index;
                deleteBooking(index);
            });
        });
    }
}

function renderGuests() {
    const guestsTable = document.getElementById('guestsTable');
    if (!guestsTable) return;
    
    guestsTable.innerHTML = '';
    sampleGuests.forEach((guest, index) => {
        const row = document.createElement('tr');
        const actionsCell = isAdmin() ? `
            <td>
                <button class="btn btn-sm edit-guest" data-index="${index}" title="${translations[currentLanguage].edit}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm delete-guest" data-index="${index}" title="${translations[currentLanguage].delete}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        ` : '<td class="text-muted">View Only</td>';
        
        row.innerHTML = `
            <td>${guest.id}</td>
            <td>${guest.name}</td>
            <td>${guest.email}</td>
            <td>${guest.phone}</td>
            <td>${guest.country}</td>
            ${actionsCell}
        `;
        guestsTable.appendChild(row);
    });
    
    if (isAdmin()) {
        document.querySelectorAll('.edit-guest').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.closest('button').dataset.index;
                editGuest(index);
            });
        });
        
        document.querySelectorAll('.delete-guest').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.closest('button').dataset.index;
                deleteGuest(index);
            });
        });
    }
}

function renderAllGuests() {
    const allGuestsTable = document.getElementById('allGuestsTable');
    if (!allGuestsTable) return;
    
    allGuestsTable.innerHTML = '';
    
    sampleGuests.forEach((guest, index) => {
        const row = document.createElement('tr');
        const actionsCell = isAdmin() ? `
            <td>
                <button class="btn btn-sm edit-guest-all" data-index="${index}" title="${translations[currentLanguage].edit}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm delete-guest-all" data-index="${index}" title="${translations[currentLanguage].delete}">
                    <i class="fas fa-trash"></i>
                </button>
                <button class="btn btn-sm toggle-vip" data-index="${index}" title="${guest.vip ? 'Remove VIP' : 'Make VIP'}">
                    <i class="fas fa-crown"></i>
                </button>
            </td>
        ` : '<td class="text-muted">View Only</td>';
        
        row.innerHTML = `
            <td>${guest.id}</td>
            <td>${guest.name}</td>
            <td>${guest.email}</td>
            <td>${guest.phone}</td>
            <td>${guest.country}</td>
            <td><span class="status ${guest.vip ? 'confirmed' : 'pending'}">${guest.vip ? 'VIP' : 'Standard'}</span></td>
            ${actionsCell}
        `;
        allGuestsTable.appendChild(row);
    });
    
    if (isAdmin()) {
        document.querySelectorAll('.toggle-vip').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.closest('button').dataset.index;
                toggleVIP(index);
            });
        });
        
        document.querySelectorAll('.edit-guest-all').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.closest('button').dataset.index;
                editGuest(index);
            });
        });
        
        document.querySelectorAll('.delete-guest-all').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.closest('button').dataset.index;
                deleteGuest(index);
            });
        });
    }
}

function renderRooms() {
    const roomsContainer = document.getElementById('roomsContainer');
    const roomsTable = document.getElementById('roomsTable');
    
    if (!roomsContainer || !roomsTable) return;
    
    roomsContainer.innerHTML = '';
    roomsTable.innerHTML = '';
    
    sampleRooms.forEach((room, index) => {
        const roomCard = document.createElement('div');
        roomCard.className = 'room-card';
        const actionsHtml = isAdmin() ? `
            <div class="room-actions">
                <button class="btn btn-sm edit-room" data-index="${index}" title="${translations[currentLanguage].edit}">
                    <i class="fas fa-edit"></i> ${translations[currentLanguage].edit}
                </button>
                <button class="btn btn-sm delete-room" data-index="${index}" title="${translations[currentLanguage].delete}">
                    <i class="fas fa-trash"></i> ${translations[currentLanguage].delete}
                </button>
            </div>
        ` : '<div class="room-actions text-muted">View Only</div>';
        
        roomCard.innerHTML = `
            <div class="room-card-header">
                <h3>Room ${room.number}</h3>
                <span class="status ${room.status}">${room.status.charAt(0).toUpperCase() + room.status.slice(1)}</span>
            </div>
            <p><strong>Type:</strong> ${room.type}</p>
            <p><strong>Amenities:</strong> ${room.amenities.join(', ')}</p>
            <div class="room-price">${formatPrice(room.price)}/night</div>
            ${actionsHtml}
        `;
        roomsContainer.appendChild(roomCard);
        
        const row = document.createElement('tr');
        const tableActionsHtml = isAdmin() ? `
            <td>
                <button class="btn btn-sm edit-room" data-index="${index}" title="${translations[currentLanguage].edit}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm delete-room" data-index="${index}" title="${translations[currentLanguage].delete}">
                    <i class="fas fa-trash"></i>
                </button>
                <button class="btn btn-sm change-status" data-index="${index}" title="Change Status">
                    <i class="fas fa-sync"></i>
                </button>
            </td>
        ` : '<td class="text-muted">View Only</td>';
        
        row.innerHTML = `
            <td>${room.number}</td>
            <td>${room.type}</td>
            <td>${formatPrice(room.price)}</td>
            <td><span class="status ${room.status}">${room.status.charAt(0).toUpperCase() + room.status.slice(1)}</span></td>
            <td>${room.amenities.join(', ')}</td>
            ${tableActionsHtml}
        `;
        roomsTable.appendChild(row);
    });
    
    if (isAdmin()) {
        document.querySelectorAll('.edit-room').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.closest('button').dataset.index;
                editRoom(index);
            });
        });
        
        document.querySelectorAll('.delete-room').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.closest('button').dataset.index;
                deleteRoom(index);
            });
        });
        
        document.querySelectorAll('.change-status').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.closest('button').dataset.index;
                changeRoomStatus(index);
            });
        });
    }
}

function renderReservations() {
    const reservationsTable = document.getElementById('reservationsTable');
    if (!reservationsTable) return;
    
    reservationsTable.innerHTML = '';
    
    sampleBookings.forEach((booking, index) => {
        const room = sampleRooms.find(r => r.type === booking.roomType) || { price: 150 };
        const checkIn = new Date(booking.checkIn);
        const checkOut = new Date(booking.checkOut);
        const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
        const totalAmount = nights * room.price;
        
        const row = document.createElement('tr');
        const actionsCell = isAdmin() ? `
            <td>
                <button class="btn btn-sm edit-booking-res" data-index="${index}" title="${translations[currentLanguage].edit}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm delete-booking-res" data-index="${index}" title="${translations[currentLanguage].delete}">
                    <i class="fas fa-trash"></i>
                </button>
                <button class="btn btn-sm check-in" data-index="${index}" title="Check In">
                    <i class="fas fa-sign-in-alt"></i>
                </button>
            </td>
        ` : '<td class="text-muted">View Only</td>';
        
        row.innerHTML = `
            <td>${booking.id}</td>
            <td>${booking.guestName}</td>
            <td>${sampleRooms.find(r => r.type === booking.roomType)?.number || 'N/A'}</td>
            <td>${booking.checkIn}</td>
            <td>${booking.checkOut}</td>
            <td>${formatPrice(totalAmount)}</td>
            <td><span class="status ${booking.status}">${booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span></td>
            ${actionsCell}
        `;
        reservationsTable.appendChild(row);
    });
    
    if (isAdmin()) {
        document.querySelectorAll('.check-in').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.closest('button').dataset.index;
                checkInBooking(index);
            });
        });
        
        document.querySelectorAll('.edit-booking-res').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.closest('button').dataset.index;
                editBooking(index);
            });
        });
        
        document.querySelectorAll('.delete-booking-res').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.closest('button').dataset.index;
                deleteBooking(index);
            });
        });
    }
}

function renderServices() {
    const servicesContainer = document.getElementById('servicesContainer');
    const serviceRequestsTable = document.getElementById('serviceRequestsTable');
    
    if (!servicesContainer || !serviceRequestsTable) return;
    
    servicesContainer.innerHTML = '';
    serviceRequestsTable.innerHTML = '';
    
    sampleServices.forEach((service, index) => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card';
        const actionsHtml = isAdmin() ? `
            <div class="service-actions">
                <button class="btn btn-sm edit-service" data-index="${index}" title="${translations[currentLanguage].edit}">
                    <i class="fas fa-edit"></i> ${translations[currentLanguage].edit}
                </button>
                <button class="btn btn-sm toggle-service" data-index="${index}" title="${service.available ? 'Disable' : 'Enable'} Service">
                    <i class="fas ${service.available ? 'fa-pause' : 'fa-play'}"></i> ${service.available ? 'Disable' : 'Enable'}
                </button>
            </div>
        ` : '<div class="service-actions text-muted">View Only</div>';
        
        serviceCard.innerHTML = `
            <div class="service-card-header">
                <h3>${service.name}</h3>
                <span class="status ${service.available ? 'available' : 'maintenance'}">${service.available ? 'Available' : 'Unavailable'}</span>
            </div>
            <p>${service.description}</p>
            <p><strong>Price:</strong> ${formatPrice(service.price)}</p>
            ${actionsHtml}
        `;
        servicesContainer.appendChild(serviceCard);
    });
    
    sampleServiceRequests.forEach((request, index) => {
        const row = document.createElement('tr');
        const actionsCell = isAdmin() ? `
            <td>
                <button class="btn btn-sm complete-request" data-index="${index}" title="Complete Request">
                    <i class="fas fa-check"></i>
                </button>
                <button class="btn btn-sm cancel-request" data-index="${index}" title="Cancel Request">
                    <i class="fas fa-times"></i>
                </button>
            </td>
        ` : '<td class="text-muted">View Only</td>';
        
        row.innerHTML = `
            <td>${request.id}</td>
            <td>${request.guestName}</td>
            <td>${request.serviceType}</td>
            <td>${request.roomNo}</td>
            <td>${request.requestTime}</td>
            <td><span class="status ${request.status}">${request.status.charAt(0).toUpperCase() + request.status.slice(1)}</span></td>
            ${actionsCell}
        `;
        serviceRequestsTable.appendChild(row);
    });
    
    if (isAdmin()) {
        document.querySelectorAll('.edit-service').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.closest('button').dataset.index;
                editService(index);
            });
        });
        
        document.querySelectorAll('.toggle-service').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.closest('button').dataset.index;
                toggleService(index);
            });
        });
        
        document.querySelectorAll('.complete-request').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.closest('button').dataset.index;
                completeRequest(index);
            });
        });
        
        document.querySelectorAll('.cancel-request').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.closest('button').dataset.index;
                cancelRequest(index);
            });
        });
    }
}

function renderPerformance() {
    const performanceTable = document.getElementById('performanceTable');
    if (!performanceTable) return;
    
    performanceTable.innerHTML = '';
    
    samplePerformance.forEach(month => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${month.month}</td>
            <td>${formatPrice(month.revenue)}</td>
            <td>${month.occupancy}%</td>
            <td>${month.newGuests}</td>
            <td>${formatPrice(month.servicesRevenue)}</td>
            <td>${month.rating}/5</td>
        `;
        performanceTable.appendChild(row);
    });
}

function renderServiceRequests() {
    // Handled in renderServices()
}

function renderOnlineRooms() {
    const onlineRoomsContainer = document.getElementById('onlineRoomsContainer');
    if (!onlineRoomsContainer) return;
    
    onlineRoomsContainer.innerHTML = '';
    
    const availableRooms = sampleRooms.filter(room => room.status === 'available');
    
    if (availableRooms.length === 0) {
        onlineRoomsContainer.innerHTML = '<p>No rooms available for online booking at the moment.</p>';
        return;
    }
    
    availableRooms.forEach((room, index) => {
        const roomCard = document.createElement('div');
        roomCard.className = 'online-room-card';
        const bookButtonHtml = isAdmin() ? `
            <button class="btn btn-primary book-room-btn" data-room-number="${room.number}">
                <i class="fas fa-calendar-check"></i> Book This Room
            </button>
        ` : '<button class="btn btn-secondary" disabled>Contact Front Desk</button>';
        
        roomCard.innerHTML = `
            <div class="room-card-header">
                <h3>Room ${room.number}</h3>
                <span class="status ${room.status}">${room.status.charAt(0).toUpperCase() + room.status.slice(1)}</span>
            </div>
            <p><strong>Type:</strong> ${room.type}</p>
            <p><strong>Amenities:</strong> ${room.amenities.join(', ')}</p>
            <div class="room-price">${formatPrice(room.price)}/night</div>
            ${bookButtonHtml}
        `;
        onlineRoomsContainer.appendChild(roomCard);
    });
    
    if (isAdmin()) {
        document.querySelectorAll('.book-room-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const roomNumber = e.target.closest('button').dataset.roomNumber;
                selectRoomForBooking(roomNumber);
            });
        });
    }
}

// Action functions with admin checks
function editBooking(index) {
    if (!isAdmin()) {
        showToast('Only administrators can edit bookings', 'error');
        return;
    }
    const booking = sampleBookings[index];
    showToast(`Editing booking: ${booking.id}`, 'warning');
    // Actual edit implementation would go here
}

function deleteBooking(index) {
    if (!isAdmin()) {
        showToast('Only administrators can delete bookings', 'error');
        return;
    }
    const booking = sampleBookings[index];
    if (confirm(`Are you sure you want to delete booking ${booking.id}?`)) {
        sampleBookings.splice(index, 1);
        renderBookings();
        renderReservations();
        updateDashboardStats();
        showToast(`Booking ${booking.id} deleted successfully`);
    }
}

function checkInBooking(index) {
    if (!isAdmin()) {
        showToast('Only administrators can check in guests', 'error');
        return;
    }
    const booking = sampleBookings[index];
    if (booking.status === 'confirmed') {
        booking.status = 'checked-in';
        renderReservations();
        updateDashboardStats();
        showToast(`Guest ${booking.guestName} checked in successfully`);
    } else {
        showToast('Booking is not confirmed yet', 'warning');
    }
}

function editGuest(index) {
    if (!isAdmin()) {
        showToast('Only administrators can edit guests', 'error');
        return;
    }
    const guest = sampleGuests[index];
    showToast(`Editing guest: ${guest.name}`, 'warning');
}

function deleteGuest(index) {
    if (!isAdmin()) {
        showToast('Only administrators can delete guests', 'error');
        return;
    }
    const guest = sampleGuests[index];
    if (confirm(`Are you sure you want to delete guest ${guest.name}?`)) {
        sampleGuests.splice(index, 1);
        renderGuests();
        renderAllGuests();
        updateDashboardStats();
        showToast(`Guest ${guest.name} deleted successfully`);
    }
}

function toggleVIP(index) {
    if (!isAdmin()) {
        showToast('Only administrators can modify VIP status', 'error');
        return;
    }
    const guest = sampleGuests[index];
    guest.vip = !guest.vip;
    renderAllGuests();
    updateDashboardStats();
    showToast(`${guest.name} ${guest.vip ? 'added to' : 'removed from'} VIP list`);
}

function editRoom(index) {
    if (!isAdmin()) {
        showToast('Only administrators can edit rooms', 'error');
        return;
    }
    const room = sampleRooms[index];
    showToast(`Editing room: ${room.number}`, 'warning');
}

function deleteRoom(index) {
    if (!isAdmin()) {
        showToast('Only administrators can delete rooms', 'error');
        return;
    }
    const room = sampleRooms[index];
    if (confirm(`Are you sure you want to delete room ${room.number}?`)) {
        sampleRooms.splice(index, 1);
        renderRooms();
        updateDashboardStats();
        showToast(`Room ${room.number} deleted successfully`);
    }
}

function changeRoomStatus(index) {
    if (!isAdmin()) {
        showToast('Only administrators can change room status', 'error');
        return;
    }
    const room = sampleRooms[index];
    const statuses = ['available', 'occupied', 'maintenance'];
    const currentIndex = statuses.indexOf(room.status);
    room.status = statuses[(currentIndex + 1) % statuses.length];
    renderRooms();
    updateDashboardStats();
    showToast(`Room ${room.number} status changed to ${room.status}`);
}

function editService(index) {
    if (!isAdmin()) {
        showToast('Only administrators can edit services', 'error');
        return;
    }
    const service = sampleServices[index];
    showToast(`Editing service: ${service.name}`, 'warning');
}

function toggleService(index) {
    if (!isAdmin()) {
        showToast('Only administrators can toggle services', 'error');
        return;
    }
    const service = sampleServices[index];
    service.available = !service.available;
    renderServices();
    showToast(`Service ${service.name} ${service.available ? 'enabled' : 'disabled'} successfully`);
}

function completeRequest(index) {
    if (!isAdmin()) {
        showToast('Only administrators can complete service requests', 'error');
        return;
    }
    const request = sampleServiceRequests[index];
    request.status = 'completed';
    renderServices();
    showToast(`Service request ${request.id} marked as completed`);
}

function cancelRequest(index) {
    if (!isAdmin()) {
        showToast('Only administrators can cancel service requests', 'error');
        return;
    }
    const request = sampleServiceRequests[index];
    if (confirm(`Are you sure you want to cancel service request ${request.id}?`)) {
        sampleServiceRequests.splice(index, 1);
        renderServices();
        showToast(`Service request ${request.id} cancelled successfully`);
    }
}

function addNewRoom() {
    if (!isAdmin()) {
        showToast('Only administrators can add rooms', 'error');
        return;
    }
    const roomNumber = prompt('Enter room number:', `${Math.floor(Math.random() * 900) + 100}`);
    if (!roomNumber) return;
    
    const roomType = prompt(`Enter room type:\n1. Single Room ($120/night)\n2. Double Room ($180/night)\n3. Deluxe Room ($250/night)\n4. Suite ($400/night)\n\nEnter 1-4:`, '1');
    
    let selectedType, price;
    switch(roomType) {
        case '1': selectedType = 'Single Room'; price = 120; break;
        case '2': selectedType = 'Double Room'; price = 180; break;
        case '3': selectedType = 'Deluxe Room'; price = 250; break;
        case '4': selectedType = 'Suite'; price = 400; break;
        default: selectedType = 'Single Room'; price = 120;
    }
    
    const newRoom = {
        number: roomNumber,
        type: selectedType,
        price: price,
        status: 'available',
        amenities: ['WiFi', 'TV', 'AC']
    };
    
    if (selectedType === 'Double Room' || selectedType === 'Deluxe Room' || selectedType === 'Suite') {
        newRoom.amenities.push('Mini Bar');
    }
    if (selectedType === 'Deluxe Room' || selectedType === 'Suite') {
        newRoom.amenities.push('Balcony');
    }
    if (selectedType === 'Suite') {
        newRoom.amenities.push('Jacuzzi');
    }
    
    sampleRooms.push(newRoom);
    renderRooms();
    renderOnlineRooms();
    updateDashboardStats();
    showToast(`Room ${roomNumber} (${selectedType}) added successfully`);
}

function addNewService() {
    if (!isAdmin()) {
        showToast('Only administrators can add services', 'error');
        return;
    }
    const serviceName = prompt('Enter service name:', 'New Service');
    if (!serviceName) return;
    
    const serviceDescription = prompt('Enter service description:', 'Service description');
    if (!serviceDescription) return;
    
    const servicePrice = prompt('Enter service price ($):', '0');
    
    const newService = {
        id: `SRV${String(sampleServices.length + 1).padStart(3, '0')}`,
        name: serviceName,
        description: serviceDescription,
        price: parseFloat(servicePrice) || 0,
        available: true
    };
    sampleServices.push(newService);
    renderServices();
    showToast(`Service "${serviceName}" added successfully`);
}

function generateReport() {
    if (!isAdmin()) {
        showToast('Only administrators can generate reports', 'error');
        return;
    }
    const reportData = {
        generatedDate: new Date().toISOString(),
        hotelName: 'Grand International Hotel',
        summary: {
            totalRooms: sampleRooms.length,
            occupiedRooms: sampleRooms.filter(r => r.status === 'occupied').length,
            availableRooms: sampleRooms.filter(r => r.status === 'available').length,
            totalBookings: sampleBookings.length,
            totalGuests: sampleGuests.length,
            vipGuests: sampleGuests.filter(g => g.vip).length
        },
        rooms: sampleRooms,
        bookings: sampleBookings,
        guests: sampleGuests,
        services: sampleServices,
        serviceRequests: sampleServiceRequests,
        performance: samplePerformance
    };

    try {
        const dataStr = JSON.stringify(reportData, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `hotel_report_${new Date().toISOString().slice(0,10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast('Report generated and downloaded successfully');
    } catch (err) {
        console.error('Failed to generate report', err);
        showToast('Failed to generate report', 'error');
    }
}

function processOnlineBooking(bookingData) {
    if (!isAdmin()) {
        showToast('Please contact hotel administration for booking', 'info');
        return;
    }
    
    const newBooking = {
        id: `BK${String(sampleBookings.length + 1).padStart(3, '0')}`,
        guestName: `${bookingData.firstName} ${bookingData.lastName}`,
        roomType: bookingData.roomType,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        status: 'confirmed'
    };
    
    sampleBookings.push(newBooking);
    
    if (selectedRoomForBooking) {
        const room = sampleRooms.find(r => r.number === selectedRoomForBooking);
        if (room) {
            room.status = 'occupied';
        }
    }
    
    const guestExists = sampleGuests.some(g => g.email === bookingData.email);
    if (!guestExists) {
        const newGuest = {
            id: `GU${String(sampleGuests.length + 1).padStart(3, '0')}`,
            name: `${bookingData.firstName} ${bookingData.lastName}`,
            email: bookingData.email,
            phone: bookingData.phone,
            country: 'Online Booking',
            vip: false
        };
        sampleGuests.push(newGuest);
    }
    
    renderBookings();
    renderReservations();
    renderAllGuests();
    renderRooms();
    renderOnlineRooms();
    updateDashboardStats();
    
    showToast('Online booking completed successfully! A confirmation email has been sent.');
    
    selectedRoomForBooking = null;
    document.getElementById('onlineBookingForm').reset();
    document.querySelectorAll('.online-room-card').forEach(card => {
        card.classList.remove('selected');
    });
}

function selectRoomForBooking(roomNumber) {
    if (!isAdmin()) {
        showToast('Please contact hotel administration for booking', 'info');
        return;
    }
    
    selectedRoomForBooking = roomNumber;
    
    document.querySelectorAll('.online-room-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    const selectedCard = document.querySelector(`.book-room-btn[data-room-number="${roomNumber}"]`)?.closest('.online-room-card');
    if (selectedCard) {
        selectedCard.classList.add('selected');
    }
    
    const room = sampleRooms.find(r => r.number === roomNumber);
    if (room) {
        document.getElementById('onlineRoomType').value = room.type;
    }
    
    showToast(`Room ${roomNumber} selected for booking`, 'success');
}

function updateDashboardStats() {
    const totalRooms = sampleRooms.length;
    const occupiedRooms = sampleRooms.filter(r => r.status === 'occupied').length;
    const availableRooms = sampleRooms.filter(r => r.status === 'available').length;
    const occupancyRate = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;
    
    const totalRoomsEl = document.getElementById('totalRooms');
    const occupiedRoomsEl = document.getElementById('occupiedRooms');
    const availableRoomsEl = document.getElementById('availableRooms');
    const occupancyRateEl = document.getElementById('occupancyRate');
    
    if (totalRoomsEl) totalRoomsEl.textContent = totalRooms;
    if (occupiedRoomsEl) occupiedRoomsEl.textContent = occupiedRooms;
    if (availableRoomsEl) availableRoomsEl.textContent = availableRooms;
    if (occupancyRateEl) occupancyRateEl.textContent = `${occupancyRate}%`;
    
    const totalBookingsEl = document.getElementById('totalBookings');
    const activeBookingsEl = document.getElementById('activeBookings');
    const pendingBookingsEl = document.getElementById('pendingBookings');
    const cancelledBookingsEl = document.getElementById('cancelledBookings');
    
    if (totalBookingsEl) totalBookingsEl.textContent = sampleBookings.length;
    if (activeBookingsEl) activeBookingsEl.textContent = sampleBookings.filter(b => b.status === 'confirmed' || b.status === 'checked-in').length;
    if (pendingBookingsEl) pendingBookingsEl.textContent = sampleBookings.filter(b => b.status === 'pending').length;
    if (cancelledBookingsEl) cancelledBookingsEl.textContent = sampleBookings.filter(b => b.status === 'cancelled').length;
    
    const totalGuestsEl = document.getElementById('totalGuests');
    const currentGuestsEl = document.getElementById('currentGuests');
    const vipGuestsEl = document.getElementById('vipGuests');
    const intlGuestsEl = document.getElementById('intlGuests');
    
    if (totalGuestsEl) totalGuestsEl.textContent = sampleGuests.length;
    if (currentGuestsEl) currentGuestsEl.textContent = sampleBookings.filter(b => b.status === 'confirmed' || b.status === 'checked-in').length;
    if (vipGuestsEl) vipGuestsEl.textContent = sampleGuests.filter(g => g.vip).length;
    if (intlGuestsEl) intlGuestsEl.textContent = sampleGuests.filter(g => g.country !== 'USA').length;
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    if (!toast || !toastMessage) return;
    
    toastMessage.textContent = message;
    toast.className = 'toast';
    toast.classList.add(type);
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function toggleOnlineBooking(enabled) {
    onlineBookingEnabled = enabled;
    const onlineBookingNav = document.getElementById('onlineBookingNav');
    
    if (onlineBookingNav) {
        if (enabled) {
            onlineBookingNav.style.display = 'flex';
        } else {
            onlineBookingNav.style.display = 'none';
            
            const activeSection = document.querySelector('.content-section.active');
            if (activeSection && activeSection.id === 'online-booking') {
                document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
                const dashboardSection = document.getElementById('dashboard');
                if (dashboardSection) dashboardSection.classList.add('active');
                
                document.querySelectorAll('.sidebar-menu li').forEach(item => {
                    item.classList.remove('active');
                    if (item.dataset.section === 'dashboard') {
                        item.classList.add('active');
                    }
                });
                
                const pageTitle = document.getElementById('pageTitle');
                if (pageTitle) pageTitle.textContent = 'Hotel Management Dashboard';
            }
        }
    }
}