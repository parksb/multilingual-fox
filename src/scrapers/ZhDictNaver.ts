import Scraper from './Scraper';

class ZhDictNaver extends Scraper {
  static baseUrl: string = 'https://dict.naver.com/api3/zhko/search?query=';
}

export { ZhDictNaver };
