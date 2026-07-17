/** Accessible sidebar accordion controls. */
export class Accordion {
  constructor(options = {}) {
    const root = options.root || document;
    root.querySelectorAll(options.selector || '.collapsible').forEach((container, index) => {
      const button = container.querySelector('.collapsible-toggle');
      const panel = container.querySelector('.submenu');
      if (!button || !panel) return;
      const id = panel.id || `docs-accordion-panel-${index + 1}`;
      panel.id = id;
      button.type = 'button';
      button.setAttribute('aria-controls', id);
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(expanded));
      panel.hidden = !expanded;
      button.addEventListener('click', () => {
        const next = button.getAttribute('aria-expanded') !== 'true';
        button.setAttribute('aria-expanded', String(next));
        panel.hidden = !next;
      });
    });
  }
}

export default Accordion;
