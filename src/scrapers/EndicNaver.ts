import { naverQuery } from './NaverHelper';

import Tooltip from '../Tooltip';
import Scraper from './Scraper';

class EndicNaver extends Scraper {
  static baseUrl: string = 'https://dict.naver.com/api3/enko/search?query=';

  static load(word: string) {
    const url = `${this.baseUrl}${encodeURIComponent(word)}`;

    naverQuery(url)
      .then((results) => {
        if (results.length === 0) {
          return Promise.reject();
        }

        results.forEach((content) => {
          Tooltip.addContentDOM(content);
        });
      })
      .catch(() => {
        Tooltip.addNoResultDOM();
      });
  }
}

export { EndicNaver };
