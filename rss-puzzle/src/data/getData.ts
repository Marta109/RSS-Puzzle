export function getData(
  url: string = 'https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/data/wordCollectionLevel1.json',
): Promise<any> {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch((error) => {
      console.error('There has been a problem with your fetch operation:', error);
    });
}

// const baseUrl =
//   'https://github.com/rolling-scopes-school/rss-puzzle-data/blob/main/data/wordCollectionLevel1.json';

// getData(baseUrl).then((data) => {
//   console.log('ADDADADA');

//   console.log(data);
// });
