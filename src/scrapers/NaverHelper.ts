import { Content } from '../models';

type Response =
  | typeof import('./naver-helper-responses/enko.0.json')
  | typeof import('./naver-helper-responses/enko.1.json')
  | typeof import('./naver-helper-responses/enko.2.json');

function stripHTMLTags(html: string) {
  return new DOMParser().parseFromString(html, 'text/html').body.textContent || null;
}

export const naverQuery = async (url: string): Promise<Content[]> => {
  const data: Response = await fetch(url, { referrer: url }).then((v) => v.json());

  const listMap = data.searchResultMap.searchResultListMap;

  const contents: Content[] = [];
  const contentsWithoutDescription: Content[] = [];

  listMap.WORD.items.forEach((word) => {
    const title = word.expEntry;

    const pronounce = word.searchPhoneticSymbolList
      .map(({ symbolType, symbolValue }) => {
        if (symbolValue == null) return null;
        if (symbolType == null) return `[${symbolValue}]`;
        return `${symbolType} [${symbolValue}]`;
      })
      .filter((v): v is Exclude<typeof v, null> => v != null)
      .join(' / ');

    word.meansCollector.forEach((collected) => {
      const part = collected.partOfSpeech ? `(${collected.partOfSpeech})` : undefined;

      collected.means.forEach((mean) => {
        const description = mean.value ? stripHTMLTags(mean.value) : null;
        const sentence = mean.exampleOri ? stripHTMLTags(mean.exampleOri) : null;
        const meaning = mean.exampleTrans ? stripHTMLTags(mean.exampleTrans) : null;
        const example = sentence != null && meaning != null ? { sentence, meaning } : undefined;

        const content = {
          title,
          part,
          pronounce,
          description: description || undefined,
          example,
        };

        if (description == null) {
          contentsWithoutDescription.push(content);
        } else {
          contents.push(content);
        }
      });
    });
  });

  return contents.concat(contentsWithoutDescription);
};
