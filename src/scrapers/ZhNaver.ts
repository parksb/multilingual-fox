import request from 'request';
import cheerio from 'cheerio';

import Tooltip from '../Tooltip';
import Scraper from '../Scraper';

class ZhNaver extends Scraper {
  static baseUrl: string = 'https://zh.dict.naver.com/mini/search/all?q=';

  static load(word: string) {
    const url = `${this.baseUrl}${word}`;
    let index: number = 1;

    request(url, (err, res, body) => {
      const $: CheerioStatic = cheerio.load(body);
      const baseSelector: string = '.word_result > dl';

      do {
        const titleSelector = `dt:nth-child(${index}) > a`;
        const pronounceSelector = `dt:nth-child(${index}) > span.py`;
        const descriptionSelector = `dt:nth-child(${index}) + dd > ol`;

        this.content.title = $(`${baseSelector} > ${titleSelector}`).html();
        if (!this.content.title) {
          break;
        }

        this.content.pronounce = $(`${baseSelector} > ${pronounceSelector}`).text();
        this.content.description = $(`${baseSelector} > ${descriptionSelector}`).text();

        Tooltip.addContentDOM(this.content);

        index += 2;
      } while (this.content.title);
    });
  }
}

export { ZhNaver };
