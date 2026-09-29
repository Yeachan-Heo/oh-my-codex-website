/**
 * Accordion - accessible toggles for collapsible sidebar groups.
 */
class Accordion {
  constructor(options = {}) {
    this.selector = options.selector || '.collapsible';
    this.items = Array.from(document.querySelectorAll(this.selector));
    this.items.forEach((item, index) => this.setupItem(item, index));
  }

  setupItem(item, index) {
    const toggle = item.querySelector('.collapsible-toggle');
    const panel = item.querySelector('.submenu');
    if (!toggle || !panel) return;

    const panelId = panel.id || `collapsible-panel-${index + 1}`;
    panel.id = panelId;
    toggle.setAttribute('type', 'button');
    toggle.setAttribute('aria-controls', panelId);
    toggle.setAttribute('aria-expanded', 'true');

    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      panel.hidden = expanded;
    });
  }
}

export { Accordion };
export default Accordion;
