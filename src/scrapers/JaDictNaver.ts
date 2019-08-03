import request from 'request';
import cheerio from 'cheerio';

import Tooltip from '../Tooltip';
import Scraper from './Scraper';
import { Selector } from '../models';

class JaDictNaver extends Scraper {
  static baseUrl: string = 'https://ja.dict.naver.com/search.nhn?range=all&m=mini&q=';

  static load(word: string) {
    const url = `${this.baseUrl}${word}`;
    let index: number = 1;

    request(url, (err, res, body) => {
      const $: CheerioStatic = cheerio.load(body);
      const baseSelector: string = '#content > .section_word';

      do {
        const selector: Selector = {
          title: `.srch_box:nth-child(${index + 1}) > .srch_top > .entry > a`,
          pronounce: `.srch_box:nth-child(${index + 1}) > .srch_top > .entry > .sw`,
          part: `.srch_box:nth-child(${index + 1}) > .srch_top > .entry > .pin`,
          description: [
            `.srch_box:nth-child(${index + 1}) > .lst`,
            `.srch_box:nth-child(${index + 1}) > .pin > .lst_txt`,
          ],
        };

        this.content.title = $(`${baseSelector} > ${selector.title}`).html();
        if (!this.content.title) {
          if (index === 1) {
            Tooltip.addNoResultDOM();
          }
          break;
        }

        this.content.pronounce = $(`${baseSelector} > ${selector.pronounce}`).text();
        this.content.part = $(`${baseSelector} > ${selector.part}`).text();

        this.content.description = $(`${baseSelector} > ${selector.description[0]}`).text();
        if (!this.content.description) {
          this.content.description = $(`${baseSelector} > ${selector.description[1]}`).text();
        }

        Tooltip.addContentDOM(this.content);

        index += 2;
      } while (this.content.title);
    });
  }
}

export { JaDictNaver };
