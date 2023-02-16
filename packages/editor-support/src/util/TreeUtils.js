export class TreeUtils {
  static findParent(pt, type) {
    let el = pt;
    while (true) {
      // eslint-disable-line no-constant-condition
      if (el == null) {
        return null;
      }
      if (el instanceof type) {
        return el;
      }
      el = el.parentCtx;
    }
  }

  static findAnyParent(pt, types = []) {
    let el = pt;
    while (true) {
      // eslint-disable-line no-constant-condition
      if (el == null) {
        return null;
      }
      for (let type of types) {
        if (el instanceof type) {
          return el;
        }
      }

      el = el.parentCtx;
    }
  }

  static findChild(element, type) {
    if (element == null) {
      return null;
    }

    if (element instanceof type) {
      return element;
    }

    if (element.children != null) {
      for (let i = 0; i < element.children.length; i += 1) {
        const e = element.children[i];
        const result = TreeUtils.findChild(e, type);
        if (result != null) {
          return result;
        }
      }
    }

    return null;
  }

  static getPosition(el) {
    if (el != null) {
      const { start, stop, symbol } = el;
      if (symbol != null) {
        return {
          start: symbol.start,
          stop: symbol.stop
        };
      } else if (start != null && stop != null) {
        return {
          start: start.start,
          stop: stop.stop
        };
      }
    }

    return null;
  }

  static hasErrorNode(element) {
    if (element == null) {
      return false;
    }

    if (element.isErrorNode && element.isErrorNode()) {
      return true;
    }

    if (element.children != null) {
      for (let i = 0; i < element.children.length; i += 1) {
        const e = element.children[i];
        const childHasErrorNode = TreeUtils.hasErrorNode(e);
        if (childHasErrorNode) {
          return true;
        }
      }
    }

    return false;
  }
}
