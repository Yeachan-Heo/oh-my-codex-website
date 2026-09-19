/** Docs sidebar search. Results are created with DOM APIs so document text is never parsed as HTML. */
import { buildSidebarTargetGraph } from './sidebarSpy.js';

export class SearchService {
  constructor(options = {}) {
    this.input = document.querySelector(options.searchInput || '#search-input');
    this.results = document.querySelector(options.results || '#search-results');
    this.overlay = document.querySelector(options.overlay || '#search-overlay');
    this.sidebar = document.querySelector(options.sidebar || '.docs-sidebar');
    this.graph = buildSidebarTargetGraph(this.sidebar);
    this.records = this.graph.records;
    this.onInput = () => this.search(this.input.value);
    this.input?.addEventListener('input', this.onInput);
    this.input?.addEventListener('keydown', event => {
      if (event.key === 'Escape') this.hide();
    });
    this.overlay?.addEventListener('click', () => this.hide());

    if (window.__DOCS_LAYOUT_TEST__) {
      window.__docsLayoutSearchService = this;
      this.rebuildIndexForTest = extraRecords => {
        this.records = [...this.graph.records, ...(extraRecords || [])];
      };
    }
  }

  search(query) {
    const needle = query.trim().toLocaleLowerCase();
    if (!needle) return this.hide();
    const matches = this.records.filter(record =>
      `${record.title} ${record.text}`.toLocaleLowerCase().includes(needle),
    ).slice(0, 8);
    this.results.replaceChildren();
    matches.forEach(record => {
      const result = document.createElement('a');
      result.href = `#${encodeURIComponent(record.id)}`;
      result.className = 'search-result';
      result.textContent = record.title;
      result.addEventListener('click', () => this.hide());
      this.results.append(result);
    });
    this.results.style.display = matches.length ? 'block' : 'none';
    if (this.overlay) this.overlay.style.display = matches.length ? 'block' : 'none';
    return matches;
  }

  hide() {
    if (this.results) {
      this.results.replaceChildren();
      this.results.style.display = 'none';
    }
    if (this.overlay) this.overlay.style.display = 'none';
  }
}

export default SearchService;
