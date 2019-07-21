import { EngNaver, ZhNaver } from './scrapers';
import Languages from './models/Languages';

class Dictionary {
  private static detectLanguage(word: string) {
    const englishRegex = /[a-z]|[A-Z]/u;
    // tslint:disable-next-line: max-line-length
    const chineseRegex = /[\u4e00-\u9fff]|[\u3400-\u4dbf]|[\u{20000}-\u{2a6df}]|[\u{2a700}-\u{2b73f}]|[\u{2b740}-\u{2b81f}]|[\u{2b820}-\u{2ceaf}]|[\uf900-\ufaff]|[\u3300-\u33ff]|[\ufe30-\ufe4f]|[\uf900-\ufaff]|[\u{2f800}-\u{2fa1f}]/u;

    if (englishRegex.test(word)) {
      return Languages.English;
    }

    if (chineseRegex.test(word)) {
      return Languages.Chinese;
    }

    return Languages.Undefined;
  }

  public static load(word: string) {
    const language: Languages = this.detectLanguage(word);

    switch (language) {
      case Languages.English:
        EngNaver.load(word);
        break;
      case Languages.Chinese:
        ZhNaver.load(word);
        break;
      default:
        break;
    }

    return language;
  }
}

export default Dictionary;
