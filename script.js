// Gallery Data with cute placeholders
const mediaItems = [
    { type: 'image', src: 'foto/2.jpg', placeholder: 'Klik ya sayang 😘' },
    { type: 'image', src: 'https://via.placeholder.com/300x200/ff69b4/ffffff?text=💕' },
    { type: 'image', src: 'https://via.placeholder.com/300x200/e8f4fd/5a4a6a?text=🎁' },
    { type: 'image', src: 'https://via.placeholder.com/300x200/ffeef8/ff69b4?text=😊' },
    { type: 'image', src: 'https://via.placeholder.com/300x200/f3e8ff/ba55d3?text=💖' },
    { type: 'image', src: 'https://via.placeholder.com/300x200/e8f4fd/5a4a6a?text=🐰' },
    { type: 'image', src: 'https://via.placeholder.com/300x200/ff69b4/ffffff?text=✨' },
    { type: 'image', src: 'https://via.placeholder.com/300x200/ffeef8/ff69b4?text=💑' },
    { type: 'image', src: 'https://via.placeholder.com/300x200/f3e8ff/ba55d3?text=📸' },
    { type: 'image', src: 'https://via.placeholder.com/300x200/e8f4fd/5a4a6a?text=💕' },
    { type: 'image', src: 'https://via.placeholder.com/300x200/ff69b4/ffffff?text=😘' },
    { type: 'image', src: 'https://via.placeholder.com/300x200/ffeef8/ff69b4?text=🎉' }
];

let currentPage = 1;
const itemsPerPage = 6;
let totalPages = Math.ceil(mediaItems.length / itemsPerPage);

// Login Functionality
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const errorMessage = document.getElementById('error-message');

            if (username === 'user' && password === '12345') {
                // Hide login, show gallery
                document.getElementById('login-page').classList.add('hidden');
                document.getElementById('gallery-page').classList.remove('hidden');
                
                // Add fade-in animation to gallery
                document.getElementById('gallery-page').style.animation = 'fadeIn 1s ease';
                
                // Show confetti
                showConfetti();
                
                // Load gallery
                loadGallery();
            } else {
                errorMessage.classList.remove('hidden');
                // Shake error message
                errorMessage.style.animation = 'shake 0.5s ease';
                setTimeout(() => {
                    errorMessage.style.animation = '';
                }, 500);
            }
        });
    }
});

// Confetti Function
function showConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti';
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 50; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + 'vw';
        piece.style.backgroundColor = ['#ff69b4', '#ba55d3', '#ffb6c1', '#e6e6fa'][Math.floor(Math.random() * 4)];
        piece.style.animationDelay = Math.random() * 3 + 's';
        piece.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confettiContainer.appendChild(piece);
    }

    // Remove confetti after 5 seconds
    setTimeout(() => {
        if (confettiContainer.parentNode) {
            confettiContainer.parentNode.removeChild(confettiContainer);
        }
    }, 5000);
}

// Logout Function
function logout() {
    document.getElementById('gallery-page').classList.add('hidden');
    document.getElementById('login-page').classList.remove('hidden');
    
    // Clear form
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('error-message').classList.add('hidden');
    
    // Reset gallery
    currentPage = 1;
}

// Load Gallery
function loadGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    const pagination = document.getElementById('pagination');
    galleryGrid.innerHTML = '';
    pagination.innerHTML = '';

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageItems = mediaItems.slice(startIndex, endIndex);

    pageItems.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.dataset.src = item.src;
        galleryItem.innerHTML = `<span>${item.placeholder}</span>`;
        galleryItem.onclick = () => openModal(item.src);
        galleryGrid.appendChild(galleryItem);
    });

    // Pagination
    if (currentPage > 1) {
        const prevBtn = document.createElement('button');
        prevBtn.textContent = '←';
        prevBtn.onclick = () => { currentPage--; loadGallery(); };
        pagination.appendChild(prevBtn);
    }

    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = i === currentPage ? 'page-number active' : 'page-number';
        pageBtn.textContent = i;
        pageBtn.onclick = () => { currentPage = i; loadGallery(); };
        pagination.appendChild(pageBtn);
    }

    if (currentPage < totalPages) {
        const nextBtn = document.createElement('button');
        nextBtn.textContent = '→';
        nextBtn.onclick = () => { currentPage++; loadGallery(); };
        pagination.appendChild(nextBtn);
    }
}

// Open Modal
function openModal(src) {
    const modal = document.getElementById('media-modal');
    const modalImage = document.getElementById('modal-image');
    modalImage.src = src;
    modal.classList.remove('hidden');
    modal.classList.add('active');
}

// Close Modal
function closeModal() {
    const modal = document.getElementById('media-modal');
    modal.classList.add('hidden');
    modal.classList.remove('active');
}

// Close modal on outside click
document.getElementById('media-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// WhatsApp Number (replace with actual number in international format without + or 0)
const whatsappNumber = '6287869747628';

// Message Modal Functions
function openMessageModal() {
    const modal = document.getElementById('message-modal');
    modal.classList.remove('hidden');
    modal.classList.add('active');
}

function closeMessageModal() {
    const modal = document.getElementById('message-modal');
    modal.classList.add('hidden');
    modal.classList.remove('active');
}

function sendWhatsAppMessage() {
    const message = document.getElementById('message-text').value.trim();
    if (message === '') {
        alert('Hehe, jangan malu-malu dong 😝 tulis pesannya dulu ya sayang 💖');
        return;
    }

    // Show heart animation
    showHeartAnimation();

    // Encode message
    const encodedMessage = encodeURIComponent(message);

    // Redirect to WhatsApp
    setTimeout(() => {
        window.location.href = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    }, 1000); // Delay to show animation
}

function showHeartAnimation() {
    const heart = document.createElement('div');
    heart.textContent = '💖';
    heart.style.position = 'fixed';
    heart.style.top = '50%';
    heart.style.left = '50%';
    heart.style.transform = 'translate(-50%, -50%)';
    heart.style.fontSize = '5rem';
    heart.style.zIndex = '2000';
    heart.style.animation = 'heartPulse 1s ease';
    document.body.appendChild(heart);

    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 1000);
}

// Heart pulse animation
const style = document.createElement('style');
style.textContent = `
@keyframes heartPulse {
    0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
    50% { transform: translate(-50%, -50%) scale(1.5); opacity: 0.8; }
    100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
}
`;
document.head.appendChild(style);

// Close message modal on outside click
document.getElementById('message-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeMessageModal();
    }
});
