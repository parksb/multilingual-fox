
import Content from '../models/Content';

class Scraper {
  static baseUrl: string;
  static content: Content = {
    title: '',
    part: '',
    pronounce: '',
    description: '',
    example: '',
    exampleMeaning: '',
  };

  static load(word: string) {
    throw new Error('It should be implemented');
  }
}

export default Scraper;
