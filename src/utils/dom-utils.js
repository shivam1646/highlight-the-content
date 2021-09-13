const HIGHLIGHT_ICON = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path xmlns="http://www.w3.org/2000/svg" fill="white" d="M24.001 8.534l-11.103 11.218-5.898 1.248 1.361-5.784 11.104-11.216 4.536 4.534zm-24 10.466l-.001 2h5v-2h-4.999z"/></svg>';

const createHighlightMenu = range => {
  const highlightMenu = document.createElement('DIV');
  highlightMenu.id = 'highlight_menu';
  _append(highlightMenu);
  _attachListeners(highlightMenu);
  _setPosition(highlightMenu, range);
  return highlightMenu;
}

const createHighlightIcon = (highlightMenu, range, onClick) => {
  const highlightButton = document.createElement('DIV');
  highlightButton.id = 'h-btn';
  highlightButton.appendChild(
    new DOMParser().parseFromString(HIGHLIGHT_ICON, "image/svg+xml").childNodes[0]
  );
  highlightButton.onclick = (e) => onClick(e, range);
  highlightMenu.appendChild(highlightButton);
}

const createDownCarot = highlightMenu => {
  const downCarot = document.createElement('DIV');
  downCarot.id = 'dc';
  highlightMenu.appendChild(downCarot);
}

const createHighlight = (range) => {
  const highlights = [];

  let start = range.startContainer;
  let end = range.endContainer;
  let common = range.commonAncestorContainer;

  // if start and end is same
  if (start === end && common.nodeType === 3) {
    common.splitText(range.endOffset);
    common = common.splitText(range.startOffset);
    _insertAndWrap(common);
    highlights.push(common.textContent);
    return highlights;
  }

  // if not, begin traversing from start until we reach
  // to end and highlight every text element in between
  if (start.nodeType === 3 && range.startOffset > 0) {
    start = start.splitText(range.startOffset);
  }

  if (end.nodeType === 3 && range.endOffset < end.length) {
    end.splitText(range.endOffset);
  }

  let isHiglightCreated = false;
  let isEvaluated = false;
  const nodesToBeHighlighted = [];
  // travserse heuristics
  // 1. child nodes
  // 2. sibling
  // 3. parent
  while(!isHiglightCreated) {
    if (start.nodeType === 3 && !isEvaluated) {
      nodesToBeHighlighted.push(start);
      isEvaluated = true;
    }
    if (start === end && isEvaluated) {
      isHiglightCreated = true;
    }
    if (start.childNodes && start.childNodes.length && !isEvaluated) {
      start = start.firstChild;
    } else if (start.nextSibling) {
      start = start.nextSibling;
      isEvaluated = false;
    } else {
      start = start.parentNode;
    }
  }

  nodesToBeHighlighted.forEach(node => {
     _insertAndWrap(node);
    highlights.push(node.textContent);
  })

  return highlights;
}

const removeHighlightMenu = () => {
  const highlightMenu = document.getElementById('highlight_menu');
  if (highlightMenu) {
    highlightMenu.parentElement.removeChild(highlightMenu);
  }
}

const _append = highlightMenu => document.getElementById("content").appendChild(highlightMenu);

const _attachListeners = highlightMenu => {
  highlightMenu.onmousedown = (e) => e.stopPropagation();
  highlightMenu.onmouseup = (e) => e.stopPropagation();
}

const _setPosition = (highlightMenu, range) => {
  // get element size and position relative to the viewport
  const selectionRect = range.getBoundingClientRect();

  highlightMenu.style.left = `${selectionRect.left + window.scrollX - 12.5}px`;
  highlightMenu.style.top = `${selectionRect.top + window.scrollY - 48}px`;
}

const _createHighlightWrapper = () => {
  const highlightWrapper = document.createElement('span');
  highlightWrapper.classList.add('highlight');
  return highlightWrapper;
}

const _insertAndWrap = container => {
  const highlightWrapper = _createHighlightWrapper();
  container.parentNode.insertBefore(highlightWrapper, container);
  highlightWrapper.appendChild(container);
}

export {
  createHighlightMenu,
  createHighlightIcon,
  createDownCarot,
  createHighlight,
  removeHighlightMenu
}
