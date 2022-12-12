import { naverQuery } from './NaverHelper';

import Tooltip from '../Tooltip';

class Scraper {
  static baseUrl: string;

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

        return null;
      })
      .catch(() => {
        Tooltip.addNoResultDOM();
      });
  }
}

export default Scraper;
