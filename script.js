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
    { id: 'SRV003', name: 'Airport Transfer', description: 'Complimentary airport pickup and drop-off', price: 92, available: true },
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

// Track online booking status
let onlineBookingEnabled = false;
let selectedRoomForBooking = null;

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    init();
});

// Initialize the application
function init() {
    renderBookings();
    renderGuests();
    renderRooms();
    renderServices();
    renderServiceRequests();
    renderPerformance();
    renderReservations();
    renderAllGuests();
    renderOnlineRooms();
    setupEventListeners();
    updateDashboardStats();
    
    // Setup responsive behavior
    setupResponsiveBehavior();
}

// Setup responsive behavior
function setupResponsiveBehavior() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const toggleSidebarBtn = document.getElementById('toggleSidebar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    
    // Toggle sidebar on desktop
    if (toggleSidebarBtn) {
        toggleSidebarBtn.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('expanded');
        });
    }
    
    // Toggle sidebar on mobile
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            sidebar.classList.toggle('show');
        });
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768 && 
            !sidebar.contains(event.target) && 
            !mobileMenuBtn.contains(event.target) && 
            sidebar.classList.contains('show')) {
            sidebar.classList.remove('show');
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('show');
        }
    });
}

// Render bookings table
function renderBookings() {
    const bookingsTable = document.getElementById('bookingsTable');
    if (!bookingsTable) return;
    
    bookingsTable.innerHTML = '';
    sampleBookings.forEach((booking, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${booking.id}</td>
            <td>${booking.guestName}</td>
            <td>${booking.roomType}</td>
            <td>${booking.checkIn}</td>
            <td>${booking.checkOut}</td>
            <td><span class="status ${booking.status}">${booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span></td>
            <td>
                <button class="btn btn-sm edit-booking" data-index="${index}" style="background: #e3f2fd; color: var(--primary); margin-right: 5px;">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm delete-booking" data-index="${index}" style="background: #ffebee; color: var(--danger);">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        bookingsTable.appendChild(row);
    });
    
    // Add event listeners to action buttons
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

// Render guests table
function renderGuests() {
    const guestsTable = document.getElementById('guestsTable');
    if (!guestsTable) return;
    
    guestsTable.innerHTML = '';
    sampleGuests.forEach((guest, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${guest.id}</td>
            <td>${guest.name}</td>
            <td>${guest.email}</td>
            <td>${guest.phone}</td>
            <td>${guest.country}</td>
            <td>
                <button class="btn btn-sm edit-guest" data-index="${index}" style="background: #e3f2fd; color: var(--primary); margin-right: 5px;">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm delete-guest" data-index="${index}" style="background: #ffebee; color: var(--danger);">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        guestsTable.appendChild(row);
    });
    
    // Add event listeners to action buttons
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

// Render all guests table for Guests section
function renderAllGuests() {
    const allGuestsTable = document.getElementById('allGuestsTable');
    if (!allGuestsTable) return;
    
    allGuestsTable.innerHTML = '';
    
    sampleGuests.forEach((guest, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${guest.id}</td>
            <td>${guest.name}</td>
            <td>${guest.email}</td>
            <td>${guest.phone}</td>
            <td>${guest.country}</td>
            <td><span class="status ${guest.vip ? 'confirmed' : 'pending'}">${guest.vip ? 'VIP' : 'Standard'}</span></td>
            <td>
                <button class="btn btn-sm edit-guest-all" data-index="${index}" style="background: #e3f2fd; color: var(--primary); margin-right: 5px;">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm delete-guest-all" data-index="${index}" style="background: #ffebee; color: var(--danger);">
                    <i class="fas fa-trash"></i>
                </button>
                <button class="btn btn-sm toggle-vip" data-index="${index}" style="background: #fff3e0; color: var(--warning); margin-left: 5px;">
                    <i class="fas fa-crown"></i>
                </button>
            </td>
        `;
        allGuestsTable.appendChild(row);
    });
    
    // Add event listeners for VIP toggle
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

// Render rooms
function renderRooms() {
    const roomsContainer = document.getElementById('roomsContainer');
    const roomsTable = document.getElementById('roomsTable');
    
    if (!roomsContainer || !roomsTable) return;
    
    roomsContainer.innerHTML = '';
    roomsTable.innerHTML = '';
    
    sampleRooms.forEach((room, index) => {
        // Room card
        const roomCard = document.createElement('div');
        roomCard.className = 'room-card';
        roomCard.innerHTML = `
            <div class="room-card-header">
                <h3>Room ${room.number}</h3>
                <span class="status ${room.status}">${room.status.charAt(0).toUpperCase() + room.status.slice(1)}</span>
            </div>
            <p><strong>Type:</strong> ${room.type}</p>
            <p><strong>Amenities:</strong> ${room.amenities.join(', ')}</p>
            <div class="room-price">$${room.price}/night</div>
            <div>
                <button class="btn btn-sm edit-room" data-index="${index}" style="background: #e3f2fd; color: var(--primary); margin-right: 5px;">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-sm delete-room" data-index="${index}" style="background: #ffebee; color: var(--danger);">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `;
        roomsContainer.appendChild(roomCard);
        
        // Room table row
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${room.number}</td>
            <td>${room.type}</td>
            <td>$${room.price}</td>
            <td><span class="status ${room.status}">${room.status.charAt(0).toUpperCase() + room.status.slice(1)}</span></td>
            <td>${room.amenities.join(', ')}</td>
            <td>
                <button class="btn btn-sm edit-room" data-index="${index}" style="background: #e3f2fd; color: var(--primary); margin-right: 5px;">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm delete-room" data-index="${index}" style="background: #ffebee; color: var(--danger);">
                    <i class="fas fa-trash"></i>
                </button>
                <button class="btn btn-sm change-status" data-index="${index}" style="background: #e8f5e9; color: var(--success); margin-left: 5px;">
                    <i class="fas fa-sync"></i>
                </button>
            </td>
        `;
        roomsTable.appendChild(row);
    });
    
    // Add event listeners to room action buttons
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

// Render reservations table
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
        row.innerHTML = `
            <td>${booking.id}</td>
            <td>${booking.guestName}</td>
            <td>${sampleRooms.find(r => r.type === booking.roomType)?.number || 'N/A'}</td>
            <td>${booking.checkIn}</td>
            <td>${booking.checkOut}</td>
            <td>$${totalAmount}</td>
            <td><span class="status ${booking.status}">${booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span></td>
            <td>
                <button class="btn btn-sm edit-booking-res" data-index="${index}" style="background: #e3f2fd; color: var(--primary); margin-right: 5px;">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm delete-booking-res" data-index="${index}" style="background: #ffebee; color: var(--danger);">
                    <i class="fas fa-trash"></i>
                </button>
                <button class="btn btn-sm check-in" data-index="${index}" style="background: #e8f5e9; color: var(--success); margin-left: 5px;">
                    <i class="fas fa-sign-in-alt"></i>
                </button>
            </td>
        `;
        reservationsTable.appendChild(row);
    });
    
    // Add event listeners for check-in buttons
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

// Render services
function renderServices() {
    const servicesContainer = document.getElementById('servicesContainer');
    const serviceRequestsTable = document.getElementById('serviceRequestsTable');
    
    if (!servicesContainer || !serviceRequestsTable) return;
    
    servicesContainer.innerHTML = '';
    serviceRequestsTable.innerHTML = '';
    
    sampleServices.forEach((service, index) => {
        // Service card
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card';
        serviceCard.innerHTML = `
            <div class="service-card-header">
                <h3>${service.name}</h3>
                <span class="status ${service.available ? 'available' : 'maintenance'}">${service.available ? 'Available' : 'Unavailable'}</span>
            </div>
            <p>${service.description}</p>
            <p><strong>Price:</strong> $${service.price}</p>
            <div>
                <button class="btn btn-sm edit-service" data-index="${index}" style="background: #e3f2fd; color: var(--primary); margin-right: 5px;">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-sm toggle-service" data-index="${index}" style="background: ${service.available ? '#fff3e0' : '#e8f5e9'}; color: ${service.available ? 'var(--warning)' : 'var(--success)'};">
                    <i class="fas ${service.available ? 'fa-pause' : 'fa-play'}"></i> ${service.available ? 'Disable' : 'Enable'}
                </button>
            </div>
        `;
        servicesContainer.appendChild(serviceCard);
    });
    
    // Service requests table
    sampleServiceRequests.forEach((request, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${request.id}</td>
            <td>${request.guestName}</td>
            <td>${request.serviceType}</td>
            <td>${request.roomNo}</td>
            <td>${request.requestTime}</td>
            <td><span class="status ${request.status}">${request.status.charAt(0).toUpperCase() + request.status.slice(1)}</span></td>
            <td>
                <button class="btn btn-sm complete-request" data-index="${index}" style="background: #e3f2fd; color: var(--primary); margin-right: 5px;">
                    <i class="fas fa-check"></i>
                </button>
                <button class="btn btn-sm cancel-request" data-index="${index}" style="background: #ffebee; color: var(--danger);">
                    <i class="fas fa-times"></i>
                </button>
            </td>
        `;
        serviceRequestsTable.appendChild(row);
    });
    
    // Add event listeners to service action buttons
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

// Render performance data
function renderPerformance() {
    const performanceTable = document.getElementById('performanceTable');
    if (!performanceTable) return;
    
    performanceTable.innerHTML = '';
    
    samplePerformance.forEach(month => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${month.month}</td>
            <td>$${month.revenue.toLocaleString()}</td>
            <td>${month.occupancy}%</td>
            <td>${month.newGuests}</td>
            <td>$${month.servicesRevenue.toLocaleString()}</td>
            <td>${month.rating}/5</td>
        `;
        performanceTable.appendChild(row);
    });
}

// Render service requests
function renderServiceRequests() {
    // This is handled in renderServices()
}

// Render online booking rooms
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
        roomCard.innerHTML = `
            <div class="room-card-header">
                <h3>Room ${room.number}</h3>
                <span class="status ${room.status}">${room.status.charAt(0).toUpperCase() + room.status.slice(1)}</span>
            </div>
            <p><strong>Type:</strong> ${room.type}</p>
            <p><strong>Amenities:</strong> ${room.amenities.join(', ')}</p>
            <div class="room-price">$${room.price}/night</div>
            <button class="btn btn-primary book-room-btn" data-room-number="${room.number}">
                <i class="fas fa-calendar-check"></i> Book This Room
            </button>
        `;
        onlineRoomsContainer.appendChild(roomCard);
    });
    
    // Add event listeners to book buttons
    document.querySelectorAll('.book-room-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const roomNumber = e.target.closest('button').dataset.roomNumber;
            selectRoomForBooking(roomNumber);
        });
    });
}

// Select room for online booking
function selectRoomForBooking(roomNumber) {
    selectedRoomForBooking = roomNumber;
    
    // Update UI to show selected room
    document.querySelectorAll('.online-room-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    const selectedCard = document.querySelector(`.book-room-btn[data-room-number="${roomNumber}"]`).closest('.online-room-card');
    selectedCard.classList.add('selected');
    
    // Auto-fill room type in form
    const room = sampleRooms.find(r => r.number === roomNumber);
    if (room) {
        document.getElementById('onlineRoomType').value = room.type;
    }
    
    showToast(`Room ${roomNumber} selected for booking`, 'success');
}

// Edit booking function
function editBooking(index) {
    const booking = sampleBookings[index];
    showToast(`Editing booking: ${booking.id}`, 'warning');
}

// Delete booking function
function deleteBooking(index) {
    const booking = sampleBookings[index];
    if (confirm(`Are you sure you want to delete booking ${booking.id}?`)) {
        sampleBookings.splice(index, 1);
        renderBookings();
        renderReservations();
        updateDashboardStats();
        showToast(`Booking ${booking.id} deleted successfully`);
    }
}

// Check-in booking function
function checkInBooking(index) {
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

// Edit guest function
function editGuest(index) {
    const guest = sampleGuests[index];
    showToast(`Editing guest: ${guest.name}`, 'warning');
}

// Delete guest function
function deleteGuest(index) {
    const guest = sampleGuests[index];
    if (confirm(`Are you sure you want to delete guest ${guest.name}?`)) {
        sampleGuests.splice(index, 1);
        renderGuests();
        renderAllGuests();
        updateDashboardStats();
        showToast(`Guest ${guest.name} deleted successfully`);
    }
}

// Toggle VIP status function
function toggleVIP(index) {
    const guest = sampleGuests[index];
    guest.vip = !guest.vip;
    renderAllGuests();
    updateDashboardStats();
    showToast(`${guest.name} ${guest.vip ? 'added to' : 'removed from'} VIP list`);
}

// Edit room function
function editRoom(index) {
    const room = sampleRooms[index];
    showToast(`Editing room: ${room.number}`, 'warning');
}

// Delete room function
function deleteRoom(index) {
    const room = sampleRooms[index];
    if (confirm(`Are you sure you want to delete room ${room.number}?`)) {
        sampleRooms.splice(index, 1);
        renderRooms();
        updateDashboardStats();
        showToast(`Room ${room.number} deleted successfully`);
    }
}

// Change room status function
function changeRoomStatus(index) {
    const room = sampleRooms[index];
    const statuses = ['available', 'occupied', 'maintenance'];
    const currentIndex = statuses.indexOf(room.status);
    room.status = statuses[(currentIndex + 1) % statuses.length];
    renderRooms();
    updateDashboardStats();
    showToast(`Room ${room.number} status changed to ${room.status}`);
}

// Edit service function
function editService(index) {
    const service = sampleServices[index];
    showToast(`Editing service: ${service.name}`, 'warning');
}

// Toggle service function
function toggleService(index) {
    const service = sampleServices[index];
    service.available = !service.available;
    renderServices();
    showToast(`Service ${service.name} ${service.available ? 'enabled' : 'disabled'} successfully`);
}

// Complete request function
function completeRequest(index) {
    const request = sampleServiceRequests[index];
    request.status = 'completed';
    renderServices();
    showToast(`Service request ${request.id} marked as completed`);
}

// Cancel request function
function cancelRequest(index) {
    const request = sampleServiceRequests[index];
    if (confirm(`Are you sure you want to cancel service request ${request.id}?`)) {
        sampleServiceRequests.splice(index, 1);
        renderServices();
        showToast(`Service request ${request.id} cancelled successfully`);
    }
}

// Add new room function
function addNewRoom() {
    const roomNumber = prompt('Enter room number:', `${Math.floor(Math.random() * 900) + 100}`);
    if (!roomNumber) return;
    
    const roomType = prompt(`Enter room type:\n1. Single Room ($120/night)\n2. Double Room ($180/night)\n3. Deluxe Room ($250/night)\n4. Suite ($400/night)\n\nEnter 1-4:`, '1');
    
    let selectedType, price;
    switch(roomType) {
        case '1':
            selectedType = 'Single Room';
            price = 300;
            break;
        case '2':
            selectedType = 'Double Room';
            price = 800;
            break;
        case '3':
            selectedType = 'Deluxe Room';
            price = 350;
            break;
        case '4':
            selectedType = 'Suite';
            price = 500;
            break;
        default:
            selectedType = 'Single Room';
            price = 300;
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

// Add new service function
function addNewService() {
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

// Generate report function
function generateReport() {
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

// Process online booking
function processOnlineBooking(bookingData) {
    const newBooking = {
        id: `BK${String(sampleBookings.length + 1).padStart(3, '0')}`,
        guestName: `${bookingData.firstName} ${bookingData.lastName}`,
        roomType: bookingData.roomType,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        status: 'confirmed'
    };
    
    sampleBookings.push(newBooking);
    
    // Update room status to occupied
    if (selectedRoomForBooking) {
        const room = sampleRooms.find(r => r.number === selectedRoomForBooking);
        if (room) {
            room.status = 'occupied';
        }
    }
    
    // Add guest to guest list if not exists
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
    
    // Reset form and selection
    selectedRoomForBooking = null;
    document.getElementById('onlineBookingForm').reset();
    document.querySelectorAll('.online-room-card').forEach(card => {
        card.classList.remove('selected');
    });
}

// Update dashboard statistics
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

// Show toast notification
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

// Toggle online booking feature
function toggleOnlineBooking(enabled) {
    onlineBookingEnabled = enabled;
    const onlineBookingNav = document.getElementById('onlineBookingNav');
    
    if (onlineBookingNav) {
        if (enabled) {
            onlineBookingNav.style.display = 'flex';
        } else {
            onlineBookingNav.style.display = 'none';
            
            // If online booking section is active, switch to dashboard
            const activeSection = document.querySelector('.content-section.active');
            if (activeSection && activeSection.id === 'online-booking') {
                document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
                document.getElementById('dashboard').classList.add('active');
                
                document.querySelectorAll('.sidebar-menu li').forEach(item => {
                    item.classList.remove('active');
                    if (item.dataset.section === 'dashboard') {
                        item.classList.add('active');
                    }
                });
                
                document.getElementById('pageTitle').textContent = 'Hotel Management Dashboard';
            }
        }
    }
}

// Setup event listeners
function setupEventListeners() {
    const bookingModal = document.getElementById('bookingModal');
    const guestModal = document.getElementById('guestModal');
    const bookingForm = document.getElementById('bookingForm');
    const guestForm = document.getElementById('guestForm');
    const onlineBookingForm = document.getElementById('onlineBookingForm');
    const newBookingBtn = document.getElementById('newBookingBtn');
    const addGuestBtn = document.getElementById('addGuestBtn');
    const closeButtons = document.querySelectorAll('.close');
    const sidebarItems = document.querySelectorAll('.sidebar-menu li');
    const pageTitle = document.getElementById('pageTitle');
    const onlineBookingsToggle = document.getElementById('onlineBookings');
    
    // Online bookings toggle
    if (onlineBookingsToggle) {
        onlineBookingsToggle.addEventListener('change', function() {
            toggleOnlineBooking(this.checked);
            showToast(`Online bookings ${this.checked ? 'enabled' : 'disabled'}`);
        });
    }
    
    // Modal open buttons
    if (newBookingBtn) {
        newBookingBtn.addEventListener('click', () => {
            if (bookingModal) bookingModal.style.display = 'flex';
        });
    }

    if (addGuestBtn) {
        addGuestBtn.addEventListener('click', () => {
            if (guestModal) guestModal.style.display = 'flex';
        });
    }

    // Additional button listeners
    const addRoomBtn = document.getElementById('addRoomBtn');
    const newReservationBtn = document.getElementById('newReservationBtn');
    const addNewGuestBtn = document.getElementById('addNewGuestBtn');
    const addServiceBtn = document.getElementById('addServiceBtn');
    const generateReportBtn = document.getElementById('generateReportBtn');

    if (addRoomBtn) addRoomBtn.addEventListener('click', addNewRoom);
    if (newReservationBtn) {
        newReservationBtn.addEventListener('click', () => {
            if (bookingModal) bookingModal.style.display = 'flex';
        });
    }
    if (addNewGuestBtn) {
        addNewGuestBtn.addEventListener('click', () => {
            if (guestModal) guestModal.style.display = 'flex';
        });
    }
    if (addServiceBtn) addServiceBtn.addEventListener('click', addNewService);
    if (generateReportBtn) generateReportBtn.addEventListener('click', generateReport);

    // Modal close buttons
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (bookingModal) bookingModal.style.display = 'none';
            if (guestModal) guestModal.style.display = 'none';
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === bookingModal && bookingModal) {
            bookingModal.style.display = 'none';
        }
        if (event.target === guestModal && guestModal) {
            guestModal.style.display = 'none';
        }
    });

    // Form submissions
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
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
            if (bookingModal) bookingModal.style.display = 'none';
            bookingForm.reset();
        });
    }

    if (guestForm) {
        guestForm.addEventListener('submit', (e) => {
            e.preventDefault();
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
            if (guestModal) guestModal.style.display = 'none';
            guestForm.reset();
        });
    }
    
    // Online booking form submission
    if (onlineBookingForm) {
        onlineBookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
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
    sidebarItems.forEach(item => {
        item.addEventListener('click', () => {
            const section = item.dataset.section;
            
            // Update active state
            sidebarItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            // Show corresponding section
            const contentSections = document.querySelectorAll('.content-section');
            contentSections.forEach(s => s.classList.remove('active'));
            const targetSection = document.getElementById(section);
            if (targetSection) targetSection.classList.add('active');
            
            // Update page title
            if (pageTitle) {
                pageTitle.textContent = `${item.textContent.trim()}`;
            }
            
            // Close sidebar on mobile after selection
            if (window.innerWidth <= 768) {
                document.getElementById('sidebar').classList.remove('show');
            }
        });
    });

    // Settings buttons
    const backupBtn = document.getElementById('backupBtn');
    const clearDataBtn = document.getElementById('clearDataBtn');
    const resetBtn = document.getElementById('resetBtn');
    const darkModeToggle = document.getElementById('darkMode');

    if (backupBtn) {
        backupBtn.addEventListener('click', () => {
            showToast('Database backup created successfully!');
        });
    }
    
    // Dark mode toggle
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