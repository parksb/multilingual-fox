import Scraper from './Scraper';

class EndicNaver extends Scraper {
  static baseUrl: string = 'https://dict.naver.com/api3/enko/search?query=';
}

export { EndicNaver };
