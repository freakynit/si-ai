(() => {
  "use strict";

  const excluded = "script, style, noscript, textarea, input, [contenteditable]:not([contenteditable='false'])";
  const attributes = ["title", "alt", "placeholder", "aria-label"];
  // Unicode letters, combining marks, numbers and underscores count as word characters.
  const shortForm = /(?<![\p{L}\p{M}\p{N}_])si(?![\p{L}\p{M}\p{N}_])/giu;

  function replace(text) {
    return text.replace(/super\s+intelligence/gi, "Artifical Intelligence")
      .replace(shortForm, "ai");
  }

  function updateText(node) {
    if (node.parentElement?.closest(excluded)) return;
    const updated = replace(node.data);
    if (updated !== node.data) node.data = updated;
  }

  function updateAttributes(element) {
    if (element.closest(excluded)) return;
    for (const attribute of attributes) {
      const current = element.getAttribute(attribute);
      if (current === null) continue;
      const updated = replace(current);
      if (updated !== current) element.setAttribute(attribute, updated);
    }
  }

  function visit(root) {
    if (root.nodeType === Node.TEXT_NODE) {
      updateText(root);
      return;
    }
    if (root.nodeType === Node.ELEMENT_NODE) {
      if (root.closest(excluded)) return;
      updateAttributes(root);
    }
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        return node.nodeType === Node.ELEMENT_NODE && node.matches(excluded)
          ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      }
    });
    let node;
    while ((node = walker.nextNode())) {
      if (node.nodeType === Node.TEXT_NODE) updateText(node);
      else updateAttributes(node);
    }
  }

  visit(document);
  new MutationObserver(records => {
    for (const record of records) {
      if (record.type === "characterData") updateText(record.target);
      else if (record.type === "attributes") visit(record.target);
      else for (const node of record.addedNodes) visit(node);
    }
  }).observe(document, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: [...attributes, "contenteditable"]
  });
})();
