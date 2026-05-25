/**
 * SidebarSpy - keeps docs sidebar links in sync with the visible section.
 */
class SidebarSpy {
  constructor(options = {}) {
    this.sidebar = document.querySelector(options.sidebar || '.docs-sidebar');
    const linkSelector = options.links || '.sidebar-link';
    this.links = Array.from(document.querySelectorAll(linkSelector));
    this.sections = Array.from(document.querySelectorAll(options.sections || '[data-section]'))
      .filter(section => section.id && !section.matches(linkSelector));
    this.activeClass = options.activeClass || 'active';
    this.offset = options.offset || 160;
    this.ticking = false;

    if (!this.links.length || !this.sections.length) return;

    this.onScroll = this.onScroll.bind(this);
    this.onHashChange = this.onHashChange.bind(this);

    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('hashchange', this.onHashChange);
    this.links.forEach(link => {
      link.addEventListener('click', () => this.activate(link.dataset.section));
    });

    this.onHashChange();
    this.onScroll();
  }

  onHashChange() {
    const id = window.location.hash.slice(1);
    if (id) this.activate(id);
  }

  onScroll() {
    if (this.ticking) return;
    this.ticking = true;

    window.requestAnimationFrame(() => {
      const current = this.getCurrentSection();
      if (current) this.activate(current.id);
      this.ticking = false;
    });
  }

  getCurrentSection() {
    let current = this.sections[0];

    for (const section of this.sections) {
      const top = section.getBoundingClientRect().top;
      if (top <= this.offset) {
        current = section;
      } else {
        break;
      }
    }

    return current;
  }

  activate(sectionId) {
    if (!sectionId) return;

    this.links.forEach(link => {
      link.classList.toggle(this.activeClass, link.dataset.section === sectionId);
    });

    const activeLink = this.links.find(link => link.dataset.section === sectionId);
    if (!activeLink || !this.sidebar) return;

    const linkRect = activeLink.getBoundingClientRect();
    const sidebarRect = this.sidebar.getBoundingClientRect();
    const isVisible = linkRect.top >= sidebarRect.top && linkRect.bottom <= sidebarRect.bottom;

    if (!isVisible) {
      activeLink.scrollIntoView({ block: 'center', inline: 'nearest' });
    }
  }

  destroy() {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('hashchange', this.onHashChange);
  }
}

export { SidebarSpy };
export default SidebarSpy;
