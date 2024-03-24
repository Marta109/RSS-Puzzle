export interface PuzzleData {
  rounds: {
    levelData: {
      author: string;
      cutSrc: string;
      id: string;
      imageSrc: string;
      name: string;
      year: string;
    };
    words: {
      audioExample: string;
      textExample: string;
      textExampleTranslate: string;
      id: number;
      word: string;
      wordTranslate: string;
    }[];
  }[];
}

export function getData(
  url: string = 'https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/data/wordCollectionLevel1.json',
): Promise<PuzzleData> {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network Error');
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Fetch error:', error);
    });
}
