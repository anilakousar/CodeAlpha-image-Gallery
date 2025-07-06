document.addEventListener('DOMContentLoaded', () => {
      const filterButtons = document.querySelectorAll('.filter-btn');
      const galleryItems = document.querySelectorAll('.gallery-item');
      const previewOverlay = document.getElementById('previewOverlay');
      const previewImg = document.getElementById('previewImg');
      const prevBtn = document.getElementById('prevBtn');
      const nextBtn = document.getElementById('nextBtn');
      const closeBtn = document.getElementById('closeBtn');

      let currentItems = [];
      let currentIndex = 0;

      /* ---------- FILTERING ---------- */
      filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const filter = btn.dataset.filter;

          // Toggle active button styling
          filterButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          // Show / hide gallery items
          galleryItems.forEach(item => {
            const show = filter === 'all' || item.dataset.category === filter;
            item.style.display = show ? 'block' : 'none';
          });

          // Update currentItems list for preview navigation
          setCurrentItems();
        });
      });

      // Build initial list of visible items
      setCurrentItems();

      function setCurrentItems() {
        currentItems = Array.from(galleryItems).filter(item => item.style.display !== 'none');
      }

      /* ---------- OPEN PREVIEW ---------- */
      galleryItems.forEach(item => {
        const img = item.querySelector('img');
        img.addEventListener('click', () => {
          setCurrentItems();
          currentIndex = currentItems.indexOf(item);
          openPreview();
        });
      });

      function openPreview() {
        updatePreview();
        previewOverlay.classList.add('show');
      }

      function updatePreview() {
        previewImg.src = currentItems[currentIndex].querySelector('img').src;

        // Hide prev button at first image and next at last image
        prevBtn.style.display = currentIndex === 0 ? 'none' : 'block';
        nextBtn.style.display = currentIndex === currentItems.length - 1 ? 'none' : 'block';
      }

      /* ---------- NAVIGATION BUTTONS ---------- */
      prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
          currentIndex--;
          updatePreview();
        }
      });

      nextBtn.addEventListener('click', () => {
        if (currentIndex < currentItems.length - 1) {
          currentIndex++;
          updatePreview();
        }
      });

      /* ---------- CLOSE PREVIEW ---------- */
      closeBtn.addEventListener('click', closePreview);
      previewOverlay.addEventListener('click', e => {
        if (e.target === previewOverlay) closePreview();
      });
      document.addEventListener('keyup', e => {
        if (!previewOverlay.classList.contains('show')) return;
        if (e.key === 'Escape') closePreview();
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'ArrowRight') nextBtn.click();
      });

      function closePreview() {
        previewOverlay.classList.remove('show');
      }

      /* ---------- HANDLE WINDOW RESIZE (optional) ---------- */
      window.addEventListener('resize', setCurrentItems);
    });