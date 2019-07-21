import request from 'request';
import cheerio from 'cheerio';

import Tooltip from '../Tooltip';
import Scraper from './Scraper';

class EngNaver extends Scraper {
  static baseUrl: string = 'https://endic.naver.com/popManager.nhn?sLn=kr&m=search&query=';

  static load(word: string) {
    const url = `${this.baseUrl}${word}`;
    let index: number = 1;

    request(url, (err, res, body) => {
      const $: CheerioStatic = cheerio.load(body);
      const baseSelector: string = 'div.word_num:nth-child(3) > .list_e2';

      do {
        const titleSelector = `dt:nth-child(${index}) > span.fnt_e30 > a`;
        const pronounceSelector = `dt:nth-child(${index}) > .fnt_e25`;
        const partSelector = `dt:nth-child(${index}) + dd > div > p > .fnt_k09:first-child`;
        const descriptionSelector1 = `dt:nth-child(${index}) + dd > div:nth-child(2) > p > span.fnt_k05`;
        const descriptionSelector2 = `dd:nth-child(${index + 1}) > div:nth-child(1) > p > span.fnt_k05`;
        const exampleSelector = `dd:nth-child(${index + 1}) > div:nth-child(1) > p.bg > span.fnt_e07`;
        const exampleMeaningSelector = `dd:nth-child(${index + 1}) > div:nth-child(1) > p.pad_left > span.fnt_k10`;

        this.content.title = $(`${baseSelector} > ${titleSelector}`).html();
        if (!this.content.title) {
          break;
        }

        this.content.pronounce = $(`${baseSelector} > ${pronounceSelector}`).text();
        this.content.part = $(`${baseSelector} > ${partSelector}`).text();
        this.content.description = $(`${baseSelector} > ${descriptionSelector1}`).text();
        if (!this.content.description) {
          this.content.description = $(`${baseSelector} > ${descriptionSelector2}`).text();
        }
        this.content.example = $(`${baseSelector} > ${exampleSelector}`).text();
        this.content.exampleMeaning = $(`${baseSelector} > ${exampleMeaningSelector}`).text();

        Tooltip.addContentDOM(this.content);

        index += 2;
      } while (this.content.title);
    });
  }
}

export { EngNaver };
