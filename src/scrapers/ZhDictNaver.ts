import { request } from '../request';
import cheerio from 'cheerio';

import Tooltip from '../Tooltip';
import Scraper from './Scraper';
import { Selector } from '../models';

class ZhDictNaver extends Scraper {
  static baseUrl: string = 'https://zh.dict.naver.com/mini/search/all?q=';

  static load(word: string) {
    const url = `${this.baseUrl}${word}`;
    let index: number = 1;

    request(url, (err, res, body) => {
      const $: CheerioStatic = cheerio.load(body);
      const baseSelector: string = '.word_result > dl';

      do {
        const selector: Selector = {
          title: `dt:nth-child(${index}) > a`,
          pronounce: `dt:nth-child(${index}) > span.py`,
          description: [`dt:nth-child(${index}) + dd > ol`],
        };

        this.content.title = $(`${baseSelector} > ${selector.title}`).html();
        if (!this.content.title) {
          if (index === 1) {
            Tooltip.addNoResultDOM();
          }
          break;
        }

        this.content.pronounce = $(`${baseSelector} > ${selector.pronounce}`).text();
        this.content.description = $(`${baseSelector} > ${selector.description[0]}`).text();

        Tooltip.addContentDOM(this.content);

        index += 2;
      } while (this.content.title);
    });
  }
}

export { ZhDictNaver };
