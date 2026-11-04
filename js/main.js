// --- Portfolio Data ---
const galleryItems = [
  {
    id: 1,
    title: "Ethereal Linen Campaign",
    category: "editorial",
    categoryLabel: "Editorial",
    year: "2026",
    client: "Maison V",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
    description: "Soft ambient daylight study with monochrome textures and natural drapery."
  },
  {
    id: 2,
    title: "Portrait of Solitude",
    category: "portrait",
    categoryLabel: "Portrait",
    year: "2026",
    client: "Private Collection",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=80",
    description: "Contemplative low-key black and white portrait on medium format film."
  },
  {
    id: 3,
    title: "Brutalist Pavilion",
    category: "architecture",
    categoryLabel: "Architecture",
    year: "2025",
    client: "Atelier Koma",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80",
    description: "Linear concrete symmetry under sharp winter sunlight in Copenhagen."
  },
  {
    id: 4,
    title: "Autumn Lookbook 08",
    category: "editorial",
    categoryLabel: "Editorial",
    year: "2025",
    client: "Nordic Atelier",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80",
    description: "High-fashion lookbook spotlighting minimal silhouettes and natural movement."
  },
  {
    id: 5,
    title: "Kinetic Essence Fragrance",
    category: "commercial",
    categoryLabel: "Commercial",
    year: "2026",
    client: "Odeur Studio",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80",
    description: "Still-life commercial campaign exploring glass refraction and water ripples."
  },
  {
    id: 6,
    title: "Monochrome Study III",
    category: "portrait",
    categoryLabel: "Portrait",
    year: "2025",
    client: "Vogue Talents",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
    description: "A nuanced inspection of facial harmony captured through shallow depth."
  },
  {
    id: 7,
    title: "Cantilever Villa",
    category: "architecture",
    categoryLabel: "Architecture",
    year: "2026",
    client: "Studio Arch",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
    description: "Golden hour interplay between cedar slats and polished aggregate stone."
  },
  {
    id: 8,
    title: "Ceramics & Stillness",
    category: "commercial",
    categoryLabel: "Commercial",
    year: "2026",
    client: "Kanso Wares",
    image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1000&q=80",
    description: "Quiet tabletop commercial showcase for handmade Japanese stoneware."
  },
  {
    id: 9,
    title: "The Artist in Studio",
    category: "portrait",
    categoryLabel: "Portrait",
    year: "2025",
    client: "Art Review",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80",
    description: "Environmental documentary portrait celebrating tactile artisan craftsmanship."
  }
];

let currentFilter = 'all';
let filteredItems = [...galleryItems];
let currentLightboxIndex = 0;

// --- Render Gallery Function ---
function renderGallery() {
  const grid = document.getElementById('gallery-grid');
  grid.innerHTML = '';

  filteredItems = currentFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === currentFilter);

  filteredItems.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = "gallery-card group cursor-pointer relative bg-sand-200/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-sand-200";
    card.onclick = () => openLightbox(index);

    card.innerHTML = `
      <div class="gallery-img-container aspect-[3/4] relative w-full bg-sand-200">
        <img 
          src="${item.image}" 
          alt="${item.title}" 
          class="gallery-img w-full h-full object-cover" 
          loading="lazy"
          onerror="this.src='https://placehold.co/800x1060/232220/FAF8F5?text=${encodeURIComponent(item.title)}'"
        >
        <div class="fade-overlay absolute inset-0 bg-charcoal-950/60 opacity-0 group-hover:opacity-100 flex flex-col justify-between p-6 sm:p-8 text-sand-50">
          <div class="flex justify-between items-center text-[10px] uppercase tracking-widest text-sand-300">
            <span>${item.categoryLabel}</span>
            <span>${item.year}</span>
          </div>
          <div>
            <h4 class="font-serif text-xl sm:text-2xl font-light text-sand-50">${item.title}</h4>
            <p class="text-xs text-sand-300/90 mt-1 font-light tracking-wide">${item.client}</p>
            <div class="mt-4 inline-flex items-center gap-2 text-[10px] tracking-widest uppercase text-accent-bronze font-medium">
              <span>View Artwork</span>
              <i class="fa-solid fa-expand text-[10px]"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="p-4 sm:p-5 flex justify-between items-baseline md:hidden">
        <div>
          <h4 class="font-serif text-base text-charcoal-950">${item.title}</h4>
          <span class="text-[10px] uppercase tracking-wider text-charcoal-800/60">${item.categoryLabel} • ${item.client}</span>
        </div>
        <span class="text-xs font-serif text-charcoal-800/80">${item.year}</span>
      </div>
    `;
    grid.appendChild(card);
  });
}

// --- Filter Handlers ---
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => {
      b.classList.remove('bg-charcoal-900', 'text-sand-50');
      b.classList.add('text-charcoal-800');
    });
    btn.classList.add('bg-charcoal-900', 'text-sand-50');
    btn.classList.remove('text-charcoal-800');

    currentFilter = btn.getAttribute('data-filter');
    renderGallery();
  });
});

// --- Lightbox Logic ---
const lightboxModal = document.getElementById('lightbox-modal');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxMeta = document.getElementById('lightbox-meta');
const lightboxCounter = document.getElementById('lightbox-counter');

function openLightbox(index) {
  currentLightboxIndex = index;
  updateLightboxContent();
  lightboxModal.classList.remove('hidden');
  setTimeout(() => {
    lightboxModal.classList.remove('opacity-0');
  }, 20);
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightboxModal.classList.add('opacity-0');
  setTimeout(() => {
    lightboxModal.classList.add('hidden');
    document.body.style.overflow = '';
  }, 300);
}

function updateLightboxContent() {
  const item = filteredItems[currentLightboxIndex];
  if (!item) return;
  lightboxImg.src = item.image;
  lightboxTitle.textContent = item.title;
  lightboxMeta.textContent = `${item.categoryLabel} • ${item.client} • ${item.year} — ${item.description}`;
  lightboxCounter.textContent = `${String(currentLightboxIndex + 1).padStart(2, '0')} / ${String(filteredItems.length).padStart(2, '0')}`;
}

function navigateLightbox(step) {
  currentLightboxIndex = (currentLightboxIndex + step + filteredItems.length) % filteredItems.length;
  updateLightboxContent();
}

// Keyboard support for Lightbox
window.addEventListener('keydown', (e) => {
  if (!lightboxModal.classList.contains('hidden')) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') navigateLightbox(1);
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
  }
  if (e.key === 'Escape' && !bookingModal.classList.contains('hidden')) {
    closeBookingModal();
  }
});

// Close lightbox when clicking outer backdrop
lightboxModal.addEventListener('click', (e) => {
  if (e.target === lightboxModal) {
    closeLightbox();
  }
});

// --- Booking Modal Logic ---
const bookingModal = document.getElementById('booking-modal');
const bookingForm = document.getElementById('booking-form');
const bookingSuccess = document.getElementById('booking-success');
const serviceSelect = document.getElementById('booking-service-select');

function openBookingModal() {
  bookingForm.reset();
  bookingForm.classList.remove('hidden');
  bookingSuccess.classList.add('hidden');
  bookingModal.classList.remove('hidden');
  setTimeout(() => {
    bookingModal.classList.remove('opacity-0');
  }, 20);
  document.body.style.overflow = 'hidden';
}

function selectPackageAndOpen(packageName) {
  openBookingModal();
  if (serviceSelect) {
    serviceSelect.value = packageName;
  }
}

function closeBookingModal() {
  bookingModal.classList.add('opacity-0');
  setTimeout(() => {
    bookingModal.classList.add('hidden');
    document.body.style.overflow = '';
  }, 300);
}

bookingModal.addEventListener('click', (e) => {
  if (e.target === bookingModal) {
    closeBookingModal();
  }
});

function handleBookingSubmit(e) {
  e.preventDefault();
  const submitBtn = document.getElementById('booking-submit-btn');
  submitBtn.disabled = true;
  submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-2"></i> Transmitting...`;

  // Simulating graceful submission
  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<span>Send Booking Request</span><i class="fa-solid fa-arrow-right text-[10px]"></i>`;
    bookingForm.classList.add('hidden');
    bookingSuccess.classList.remove('hidden');
  }, 700);
}

// --- Mobile Menu Toggle ---
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');

function toggleMobileMenu() {
  mobileMenu.classList.toggle('hidden');
  if (mobileMenu.classList.contains('hidden')) {
    menuIcon.className = 'fa-solid fa-bars';
  } else {
    menuIcon.className = 'fa-solid fa-xmark';
  }
}

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', toggleMobileMenu);
}

// --- Newsletter Form Submission ---
function handleNewsletter(e) {
  e.preventDefault();
  const feedback = document.getElementById('newsletter-feedback');
  const input = document.getElementById('newsletter-email');
  feedback.classList.remove('hidden');
  input.value = '';
  setTimeout(() => {
    feedback.classList.add('hidden');
  }, 5000);
}

// Initial setup on load
window.addEventListener('DOMContentLoaded', () => {
  renderGallery();
  const yearSpan = document.getElementById('year-span');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
