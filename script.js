/* CLONEFLIX shared script
   1) Shows skeleton/placeholder cards for 3 seconds while "loading",
      then reveals the real movie cards with a fade-in.
   2) Powers the expandable navbar search bar (live title/genre filter).
*/

document.addEventListener('DOMContentLoaded', () => {
    initSkeletonLoading();
    initSearch();
});

/* ---------------- Skeleton / placeholder loading ---------------- */

function initSkeletonLoading() {
    const rows = document.querySelectorAll('.row.g-3');
    const placeholders = [];

    rows.forEach((row) => {
        // Only grid columns that actually hold a movie card.
        const cols = Array.from(row.children).filter((col) => col.querySelector('.movie-card'));
        if (cols.length === 0) return;

        cols.forEach((col) => {
            const originalClasses = col.className;

            // Hide the real card while "loading".
            col.classList.add('cf-content-hidden');

            // Build a same-sized skeleton placeholder in its place.
            const skeletonCol = document.createElement('div');
            skeletonCol.className = originalClasses;
            skeletonCol.setAttribute('data-skeleton', '');
            skeletonCol.innerHTML =
                '<div class="movie-card skeleton-card"><div class="skeleton-shimmer"></div></div>';

            row.insertBefore(skeletonCol, col);
            placeholders.push(skeletonCol);
        });
    });

    // Simulate a 3 second load, then swap skeletons for real content.
    setTimeout(() => {
        placeholders.forEach((placeholder) => placeholder.remove());

        document.querySelectorAll('.cf-content-hidden').forEach((col) => {
            col.classList.remove('cf-content-hidden');
            col.classList.add('cf-fade-in');
        });
    }, 3000);
}

/* ---------------- Search bar ---------------- */

function initSearch() {
    document.querySelectorAll('.cf-search-toggle').forEach((btn) => {
        const wrap = btn.closest('.cf-search-wrap');
        const input = wrap.querySelector('.cf-search-input');

        btn.addEventListener('click', () => {
            wrap.classList.toggle('active');
            if (wrap.classList.contains('active')) {
                input.focus();
            } else {
                input.value = '';
                filterCards('');
            }
        });

        input.addEventListener('input', (event) => filterCards(event.target.value));

        input.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                wrap.classList.remove('active');
                input.value = '';
                filterCards('');
                btn.focus();
            }
        });
    });
}

function filterCards(query) {
    const term = query.trim().toLowerCase();

    // Every grid column that holds a real (non-skeleton) movie card.
    const cols = Array.from(document.querySelectorAll('.row.g-3 > *')).filter(
        (col) => col.querySelector('.movie-card') && !col.hasAttribute('data-skeleton')
    );

    let totalVisible = 0;

    cols.forEach((col) => {
        const title = (col.querySelector('h3, h5')?.textContent || '').toLowerCase();
        const meta = (col.querySelector('.movie-meta')?.textContent || '').toLowerCase();
        const matches = term === '' || title.includes(term) || meta.includes(term);

        col.style.display = matches ? '' : 'none';
        if (matches) totalVisible++;
    });

    renderEmptyState(term, totalVisible);
}

function renderEmptyState(term, totalVisible) {
    let banner = document.getElementById('cf-search-empty');

    if (term !== '' && totalVisible === 0) {
        if (!banner) {
            banner = document.createElement('div');
            banner.id = 'cf-search-empty';
            banner.className = 'container-fluid px-4 px-lg-5 py-5 text-center text-secondary';
            banner.innerHTML =
                '<p class="h5 mb-1">No matches for &ldquo;<span></span>&rdquo;</p>' +
                '<p class="mb-0">Try a different title or genre.</p>';
            document.querySelector('main')?.prepend(banner);
        }
        banner.querySelector('span').textContent = term;
    } else if (banner) {
        banner.remove();
    }
}