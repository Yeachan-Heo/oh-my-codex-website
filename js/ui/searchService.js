/**
 * SearchService - lightweight client-side search for the static docs page.
 */
class SearchService {
  constructor(options = {}) {
    this.content = document.querySelector(options.contentSelector || '.docs-content');
    this.input = document.querySelector(options.searchInput || '#search-input');
    this.results = document.querySelector(options.results || '#search-results');
    this.overlay = document.querySelector(options.overlay || '#search-overlay');
    this.minLength = options.minLength || 2;
    this.maxResults = options.maxResults || 8;

    if (!this.content || !this.input || !this.results) return;

    this.index = this.buildIndex();
    this.input.addEventListener('input', () => this.search(this.input.value));
    this.input.addEventListener('keydown', event => {
      if (event.key === 'Escape') this.close();
    });
    this.results.addEventListener('click', event => this.onResultClick(event));
    this.overlay?.addEventListener('click', () => this.close());
  }

  buildIndex() {
    return Array.from(this.content.querySelectorAll('[data-section]')).map(section => {
      const heading = section.querySelector('h1, h2, h3, h4');
      const title = heading?.textContent?.replace(/^#\s*/, '').trim() || section.id;
      const text = section.textContent?.replace(/\s+/g, ' ').trim() || '';

      return {
        id: section.id,
        title,
        text,
        haystack: `${title} ${text}`.toLowerCase()
      };
    }).filter(item => item.id && item.text);
  }

  search(query) {
    const normalized = query.trim().toLowerCase();
    if (normalized.length < this.minLength) {
      this.close();
      return;
    }

    const matches = this.index
      .filter(item => item.haystack.includes(normalized))
      .slice(0, this.maxResults);

    this.render(matches, normalized);
  }

  render(matches, query) {
    if (!matches.length) {
      this.results.innerHTML = '<div class="search-result search-result--empty">No matches found</div>';
    } else {
      this.results.innerHTML = matches.map(item => {
        const excerpt = this.excerpt(item.text, query);
        return `
          <a class="search-result" href="#${item.id}" data-search-result>
            <strong>${this.escapeHtml(item.title)}</strong>
            <span>${this.escapeHtml(excerpt)}</span>
          </a>
        `;
      }).join('');
    }

    this.results.style.display = 'block';
    if (this.overlay) this.overlay.style.display = 'block';
  }

  excerpt(text, query) {
    const lower = text.toLowerCase();
    const index = Math.max(0, lower.indexOf(query));
    const start = Math.max(0, index - 48);
    const end = Math.min(text.length, index + query.length + 96);
    const prefix = start > 0 ? '…' : '';
    const suffix = end < text.length ? '…' : '';

    return `${prefix}${text.slice(start, end)}${suffix}`;
  }

  onResultClick(event) {
    const result = event.target.closest('[data-search-result]');
    if (!result) return;

    this.close();
    this.input.blur();
  }

  close() {
    this.results.style.display = 'none';
    this.results.innerHTML = '';
    if (this.overlay) this.overlay.style.display = 'none';
  }

  escapeHtml(value) {
    return value.replace(/[&<>"']/g, char => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[char]));
  }
}

export { SearchService };
export default SearchService;
