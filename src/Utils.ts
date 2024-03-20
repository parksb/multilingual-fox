class Utils {
  private static elements: HTMLElement[];

  public static set(elements: HTMLElement[]) {
    this.elements = elements;
    return Utils;
  }

  public static style(key: string, value: string) {
    this.elements.forEach((element: HTMLElement) => {
      element.style.setProperty(key, value, 'important');
    });

    return Utils;
  }

  public static styleNonImportant(key: string, value: string) {
    this.elements.forEach((element: HTMLElement) => {
      element.style.setProperty(key, value);
    });

    return Utils;
  }

  public static appendHTML(parent: HTMLElement, child: HTMLElement, content: string) {
    if (content) {
      const { body } = new DOMParser().parseFromString(content, 'text/html');
      child.append(...Array.from(body.childNodes));
      parent.appendChild(child);
    }
  }

  public static appendText(parent: HTMLElement, child: HTMLElement, content: string) {
    if (content) {
      // eslint-disable-next-line no-param-reassign
      child.innerText = content;
      parent.appendChild(child);
    }
  }

  public static prependText(parent: HTMLElement, child: HTMLElement, content: string) {
    if (content) {
      // eslint-disable-next-line no-param-reassign
      child.innerText = content;
      parent.prepend(child);
    }
  }
}

export default Utils;
