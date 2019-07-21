class Utils {
  private static elements: HTMLElement[];

  public static set(elements: HTMLElement[]) {
    this.elements = elements;
    return Utils;
  }

  public static style(key: string, value: string) {
    this.elements.map((element: HTMLElement) => {
      element.style.setProperty(key, value, 'important');
    });
    return Utils;
  }

  public static appendHTML(parent: HTMLElement, child: HTMLElement, content: string) {
    if (content) {
      child.innerHTML = content;
      parent.appendChild(child);
    }
  }

  public static appendText(parent: HTMLElement, child: HTMLElement, content: string) {
    if (content) {
      child.innerText = content;
      parent.appendChild(child);
    }
  }

  public static prependText(parent: HTMLElement, child: HTMLElement, content: string) {
    if (content) {
      child.innerText = content;
      parent.prepend(child);
    }
  }
}

export default Utils;
