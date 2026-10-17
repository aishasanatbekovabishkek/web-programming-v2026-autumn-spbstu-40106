export class Game {
  constructor(title, platforms = [], releaseYear) {
    this.title = title;
    this.platforms = [...platforms];
    this.releaseYear = releaseYear;
  }

  get platformCount() {
    return this.platforms.length;
  }

  addPlatform(platform) {
    if (!this.platforms.includes(platform)) {
      this.platforms.push(platform);
    }
  }

  removePlatform(platform) {
    this.platforms = this.platforms.filter((item) => item !== platform);
  }
}

export function groupGamesByReleaseYear(games) {
  const result = new Map();

  for (const game of games) {
    if (!result.has(game.releaseYear)) {
      result.set(game.releaseYear, []);
    }
    result.get(game.releaseYear).push(game);
  }

  return result;
}

export function getUniquePlatforms(games) {
  const platforms = new Set();

  for (const game of games) {
    for (const platform of game.platforms) {
      platforms.add(platform);
    }
  }

  return [...platforms];
}

export function findGamesByPlatform(games, platform) {
  return games.filter((game) => game.platforms.includes(platform));
}

export function groupGamesByPlatformCount(games) {
  const result = new Map();

  for (const game of games) {
    const count = game.platformCount;
    if (!result.has(count)) {
      result.set(count, []);
    }
    result.get(count).push(game);
  }

  return result;
}

export function findGamesReleasedAfter(games, year) {
  return games.filter((game) => game.releaseYear > year);
}
