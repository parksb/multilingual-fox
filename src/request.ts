export const request = (url: string, callback: (err: any, res: any, body: string) => void) =>
  fetch(url, { redirect: 'follow' })
    .then((res) => res.text())
    .then((body) => callback(null, null, body));
