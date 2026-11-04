/**
 * Lume Design — Studio Logic & Interactive Behaviors
 */
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initGalleryFilter();
  initLightbox();
  initInquiryModal();
});

/* --------------------------------------------------
 * 1. Mobile Menu Toggle
 * -------------------------------------------------- */
function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navLinks');
  const links = menu.querySelectorAll('.nav-link, .nav-btn');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
    });
  });
}

/* --------------------------------------------------
 * 2. Portfolio Category Filtering
 * -------------------------------------------------- */
function initGalleryFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.gallery-item');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filter = button.getAttribute('data-filter');

      items.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (filter === 'all' || itemCat === filter) {
          item.style.display = 'block';
          item.style.opacity = '0';
          setTimeout(() => {
            item.style.opacity = '1';
          }, 40);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------
 * 3. Lightbox Modal with Keyboard Navigation
 * -------------------------------------------------- */
function initLightbox() {
  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const title = document.getElementById('lightboxTitle');
  const meta = document.getElementById('lightboxMeta');
  const counter = document.getElementById('lightboxCounter');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  const items = Array.from(document.querySelectorAll('.gallery-item'));
  let currentIndex = 0;

  function renderItem(index) {
    if (index < 0) index = items.length - 1;
    if (index >= items.length) index = 0;
    currentIndex = index;

    const targetItem = items[currentIndex];
    const imageEl = targetItem.querySelector('.gallery-img');
    const itemTitle = targetItem.getAttribute('data-title');
    const itemTag = targetItem.getAttribute('data-tag');
    const itemYear = targetItem.getAttribute('data-year');

    img.src = imageEl.src;
    img.alt = imageEl.alt;
    title.textContent = itemTitle;
    meta.textContent = `${itemTag} — ${itemYear}`;
    counter.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
  }

  items.forEach((item, idx) => {
    item.addEventListener('click', () => {
      renderItem(idx);
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (prevBtn) prevBtn.addEventListener('click', () => renderItem(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => renderItem(currentIndex + 1));

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') renderItem(currentIndex - 1);
    if (e.key === 'ArrowRight') renderItem(currentIndex + 1);
  });
}

/* --------------------------------------------------
 * 4. Booking Inquiry Modal & Package Pre-Select
 * -------------------------------------------------- */
function initInquiryModal() {
  const modal = document.getElementById('inquiryModal');
  const closeBtn = document.getElementById('inquiryClose');
  const openButtons = document.querySelectorAll('.open-modal-btn');
  const packageSelect = document.getElementById('servicePackage');
  const form = document.getElementById('inquiryForm');
  const status = document.getElementById('formStatus');

  const openModal = (pkgName = null) => {
    if (pkgName && packageSelect) {
      packageSelect.value = pkgName;
    }
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pkg = btn.getAttribute('data-package');
      openModal(pkg);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Simulating successful dispatch or endpoint hook
      if (status) {
        status.textContent = 'Inquiry dispatched. We will be in touch within 24 hours.';
        status.className = 'form-status success';
        form.reset();
        setTimeout(() => {
          closeModal();
          status.style.display = 'none';
        }, 2500);
      }
    });
  }
}