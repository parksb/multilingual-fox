import request from 'request';
import cheerio from 'cheerio';

import Tooltip from '../Tooltip';
import Scraper from './Scraper';
import { Selector } from '../models';

class EngNaver extends Scraper {
  static baseUrl: string = 'https://endic.naver.com/popManager.nhn?sLn=kr&m=search&query=';

  static load(word: string) {
    const url = `${this.baseUrl}${word}`;
    let index: number = 1;

    request(url, (err, res, body) => {
      const $: CheerioStatic = cheerio.load(body);
      const baseSelector: string = 'div.word_num:nth-child(3) > .list_e2';

      do {
        const selector: Selector = {
          title: `dt:nth-child(${index}) > span.fnt_e30 > a`,
          pronounce: `dt:nth-child(${index}) > .fnt_e25`,
          part: `dt:nth-child(${index}) + dd > div > p > .fnt_k09:first-child`,
          description: [
            `dt:nth-child(${index}) + dd > div:nth-child(2) > p > span.fnt_k05`,
            `dd:nth-child(${index + 1}) > div:nth-child(1) > p > span.fnt_k05`,
          ],
          example: {
            sentence: `dd:nth-child(${index + 1}) > div:nth-child(1) > p.bg > span.fnt_e07`,
            meaning: `dd:nth-child(${index + 1}) > div:nth-child(1) > p.pad_left > span.fnt_k10`,
          },
        };

        this.content.title = $(`${baseSelector} > ${selector.title}`).html();
        if (!this.content.title) {
          break;
        }

        this.content.pronounce = $(`${baseSelector} > ${selector.pronounce}`).text();
        this.content.part = $(`${baseSelector} > ${selector.part}`).text();

        this.content.description = $(`${baseSelector} > ${selector.description[0]}`).text();
        if (!this.content.description) {
          this.content.description = $(`${baseSelector} > ${selector.description[1]}`).text();
        }

        this.content.example = {
          sentence: $(`${baseSelector} > ${selector.example.sentence}`).text(),
          meaning: $(`${baseSelector} > ${selector.example.meaning}`).text(),
        };

        Tooltip.addContentDOM(this.content);

        index += 2;
      } while (this.content.title);
    });
  }
}

export { EngNaver };
