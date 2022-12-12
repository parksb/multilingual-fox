import { EndicNaver, ZhDictNaver, JaDictNaver } from './scrapers';
import { Languages } from './models';

class Dictionary {
  private static detectLanguage(word: string) {
    const englishRegex = /[a-z]|[A-Z]/u;
    // eslint-disable-next-line max-len
    const chineseRegex = /[\u4e00-\u9fff]|[\u3400-\u4dbf]|[\u{20000}-\u{2a6df}]|[\u{2a700}-\u{2b73f}]|[\u{2b740}-\u{2b81f}]|[\u{2b820}-\u{2ceaf}]|[\uf900-\ufaff]|[\u3300-\u33ff]|[\ufe30-\ufe4f]|[\uf900-\ufaff]|[\u{2f800}-\u{2fa1f}]/u;
    // eslint-disable-next-line max-len
    const japaneseRegex = /[\u3000-\u303f]|[\u3040-\u309f]|[\u30a0-\u30ff]|[\uff00-\uff9f]|[\u4e00-\u9faf]|[\u3400-\u4dbf]/;

    if (englishRegex.test(word)) {
      return Languages.English;
    }

    if (chineseRegex.test(word)) {
      return Languages.Chinese;
    }

    if (japaneseRegex.test(word)) {
      return Languages.Japanese;
    }

    return Languages.Undefined;
  }

  public static load(word: string) {
    const language: Languages = this.detectLanguage(word);

    switch (language) {
      case Languages.English:
        EndicNaver.load(word);
        break;
      case Languages.Chinese:
        ZhDictNaver.load(word);
        break;
      case Languages.Japanese:
        JaDictNaver.load(word);
        break;
      default:
        break;
    }

    return language;
  }
}

export default Dictionary;
