import { Content } from '../models';

type Response =
  | typeof import('./naver-helper-responses/enko.0.json')
  | typeof import('./naver-helper-responses/enko.1.json')
  | typeof import('./naver-helper-responses/enko.2.json');

export const naverQuery = async (url: string): Promise<Content[]> => {
  const data: Response = await fetch(url).then((v) => v.json());

  const listMap = data.searchResultMap.searchResultListMap;

  return listMap.WORD.items.flatMap((item) => {
    const title = item.expEntry;

    const pronounce = item.searchPhoneticSymbolList
      .map(({ symbolType, symbolValue }) => {
        if (symbolValue == null) return null;
        if (symbolType == null) return `[${symbolValue}]`;
        return `${symbolType} [${symbolValue}]`;
      })
      .filter((v): v is Exclude<typeof v, null> => v != null)
      .join(' / ');

    return item.meansCollector.flatMap((item) => {
      const part = item.partOfSpeech ? `(${item.partOfSpeech})` : undefined;

      return item.means.map((mean) => {
        const description = mean.value ? stripHTMLTags(mean.value) : null;
        const sentence = mean.exampleOri ? stripHTMLTags(mean.exampleOri) : null;
        const meaning = mean.exampleTrans ? stripHTMLTags(mean.exampleTrans) : null;
        const example = sentence != null && meaning != null ? { sentence, meaning } : undefined;

        return { title, part, pronounce, description, example };
      });
    });
  });
};

function stripHTMLTags(html: string){
   return new DOMParser().parseFromString(html, 'text/html').body.textContent || null;
}
