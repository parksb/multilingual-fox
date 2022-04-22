import { Content } from './models';
import Utils from './Utils';

class Tooltip {
  private static dom: HTMLElement;
  private static isOpen: boolean;

  public static show() {
    this.dom = document.createElement('div');

    Utils.set([this.dom])
      .style('position', 'fixed')
      .style('display', 'block')
      .style('top', '5px')
      .style('right', '5px')
      .style('width', 'auto')
      .style('height', 'auto')
      .style('max-width', '250px')
      .style('max-height', '120px')
      .style('z-index', '99999')
      .style('margin', '0')
      .style('padding', '3px')
      .style('padding-right', '30px')
      .style('border', '1px #000000 solid')
      .style('background-color', '#ffffff')
      .style('overflow-y', 'auto')
      .style('opacity', '0.9');
    document.body.appendChild(this.dom);

    this.isOpen = true;
  }

  public static hide() {
    if (this.dom) {
      document.body.removeChild(this.dom);
      this.isOpen = false;
    }
  }

  public static addContentDOM(content: Content) {
    const titleDOM = document.createElement('h1');
    const descriptionDOM = document.createElement('p');
    const exampleDOM = document.createElement('p');
    const exampleMeaningDOM = document.createElement('p');
    const seperatorDOM = document.createElement('div');

    Utils.set([
      titleDOM,
      descriptionDOM,
      exampleDOM,
      exampleMeaningDOM,
      seperatorDOM,
    ]).style('line-height', '15px');
    Utils.set([
      descriptionDOM,
      exampleDOM,
      exampleMeaningDOM,
    ]).style('font-size', '12px')
      .style('margin-top', '3px')
      .style('margin-bottom', '3px')
      .style('color', '#000000')
      .style('text-align', 'left');
    Utils.set([
      exampleDOM,
      exampleMeaningDOM,
    ]).style('font-style', 'italic')
      .style('color', '#777777')
      .style('text-align', 'left');
    Utils.set([titleDOM])
      .style('font-size', '14px')
      .style('font-weight', 'normal')
      .style('margin-top', '3px')
      .style('margin-bottom', '3px')
      .style('color', '#000000')
      .style('text-align', 'left');
    Utils.set([seperatorDOM])
      .style('margin-top', '10px')
      .style('margin-bottom', '10px')
      .style('text-align', 'left');

    const title = `${content.title || ''} ${content.pronounce || ''}`;
    const description = `${content.part || ''} ${content.description || ''}`;

    Utils.appendHTML(this.dom, titleDOM, title);
    Utils.appendHTML(this.dom, descriptionDOM, description);
    Utils.appendText(this.dom, exampleDOM, content.example?.sentence);
    Utils.appendText(this.dom, exampleMeaningDOM, content.example?.meaning);

    this.dom.appendChild(seperatorDOM);
  }

  public static addNoResultDOM() {
    const textDOM = document.createElement('p');
    const text = '검색결과가 없습니다.';

    Utils.set([textDOM])
      .style('font-size', '12px')
      .style('font-weight', 'normal')
      .style('line-height', '15px')
      .style('margin-top', '3px')
      .style('margin-bottom', '3px')
      .style('color', '#000000')
      .style('text-align', 'left');

    Utils.appendText(this.dom, textDOM, text);
  }

  public static getIsOpen() {
    return this.isOpen;
  }

  public static getDOM() {
    return this.dom;
  }
}

export default Tooltip;
