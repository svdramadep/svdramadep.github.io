export interface IDataStructure {
  order: {
    cast: string[]
    crew: string[]
  },
  people: {
    [id: string]: IBioStructure
  }
}

export interface IBioStructure {
  name: string;
  pronouns: string;
  role: string | {cast: string, crew: string};
  bio: string | {cast: string, crew: string};
}

export let peopleInfo: IDataStructure;

export async function initializePage(): Promise<any> {
  getPaletteVars(
    "https://raw.githubusercontent.com/catppuccin/palette/main/palette.json"
  ).then(
    async (data) => {
      for (let key in data) {
        document.documentElement.style.setProperty(key, data[key]);
      }
    },
    async (reason) => {
      return Promise.reject(reason);
    }
  );
}

export async function getPaletteVars(uri: string): Promise<any> {
  let paletteVars: any = {};

  const response = await fetch(uri);

  const data = await response.json();
  if (response.ok) {
    let themeColors = data["mocha"]["colors"];
    for (var key in themeColors) {
      paletteVars[`--${key}-hex`] = themeColors[key]["hex"];
    }

    return paletteVars;
  } else {
    return Promise.reject();
  }
}

export async function loadBioInfo(): Promise<any> {
  const response = await fetch("/bios/data/addams/data.json", {
    cache: "no-store",
  });

  const data: IDataStructure = await response.json();
  if (response.ok) {
    peopleInfo = data;
    return Promise.resolve(data);
  } else {
    return Promise.reject();
  }
}