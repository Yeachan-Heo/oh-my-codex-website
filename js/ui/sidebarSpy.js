/**
 * Sidebar navigation target graph and active-section tracking for docs.html.
 */
export function buildSidebarTargetGraph(sidebar = document.querySelector('.docs-sidebar')) {
  if (!sidebar) throw new Error('Sidebar target graph requires a sidebar element');

  const records = [];
  const byId = new Map();
  const ids = new Set();
  for (const element of document.querySelectorAll('[id]')) {
    if (ids.has(element.id)) throw new Error(`Duplicate document id: ${element.id}`);
    ids.add(element.id);
  }

  sidebar.querySelectorAll('.sidebar-link[href^="#"]').forEach((link, linkOrder) => {
    const encodedId = link.getAttribute('href').slice(1);
    const id = decodeURIComponent(encodedId);
    if (!id) throw new Error('Sidebar link has an empty fragment');
    const element = document.getElementById(id);
    if (!element) throw new Error(`Sidebar link target is missing: #${id}`);

    let record = byId.get(id);
    if (!record) {
      record = {
        id,
        element,
        links: [],
        title: link.textContent.trim(),
        text: element.textContent.trim(),
        linkOrder,
      };
      byId.set(id, record);
      records.push(record);
    }
    record.links.push(link);
  });

  return { records, byId };
}

function compareGeometry(left, right) {
  const leftTop = left.element.getBoundingClientRect().top + window.scrollY;
  const rightTop = right.element.getBoundingClientRect().top + window.scrollY;
  if (leftTop !== rightTop) return leftTop - rightTop;
  const position = left.element.compareDocumentPosition(right.element);
  if (position & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
  if (position & Node.DOCUMENT_POSITION_PRECEDING) return 1;
  return left.id.localeCompare(right.id);
}

export class SidebarSpy {
  constructor(options = {}) {
    this.sidebar = typeof options.sidebar === 'string'
      ? document.querySelector(options.sidebar)
      : options.sidebar || document.querySelector('.docs-sidebar');
    this.graph = buildSidebarTargetGraph(this.sidebar);
    this.selected = null;
    this.handleScroll = () => this.activate(this.selectByGeometry());
    this.handleHash = () => {
      const hashId = decodeURIComponent(window.location.hash.slice(1));
      this.activate(this.graph.byId.get(hashId) || this.selectByGeometry());
    };
    window.addEventListener('scroll', this.handleScroll, { passive: true });
    window.addEventListener('hashchange', this.handleHash);
    this.handleHash();
  }

  selectByGeometry() {
    const records = [...this.graph.records].sort(compareGeometry);
    const eligible = records.filter(record => record.element.getBoundingClientRect().top <= 160);
    return eligible.at(-1) || records[0] || null;
  }

  activate(record) {
    if (!record) return;
    this.graph.records.forEach(candidate => {
      candidate.links.forEach(link => link.classList.toggle('active', candidate === record));
    });
    if (this.selected !== record) {
      const firstLink = record.links[0];
      const sidebarBounds = this.sidebar.getBoundingClientRect();
      const linkBounds = firstLink.getBoundingClientRect();
      if (linkBounds.top < sidebarBounds.top) {
        this.sidebar.scrollTop += linkBounds.top - sidebarBounds.top;
      } else if (linkBounds.bottom > sidebarBounds.bottom) {
        this.sidebar.scrollTop += linkBounds.bottom - sidebarBounds.bottom;
      }
    }
    this.selected = record;
  }
}

export default SidebarSpy;
