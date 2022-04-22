import Scraper from './Scraper';

class JaDictNaver extends Scraper {
  static baseUrl: string = 'https://dict.naver.com/api3/jako/search?query=';
}

export { JaDictNaver };
