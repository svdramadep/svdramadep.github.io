export interface IBioStructure {
  [dept: string]: [
    {
      name: string;
      pronouns?: string;
      role: string;
      bio: string;
    }
  ];
}

export async function initializePage(): Promise<any> {
  getPaletteVars("https://raw.githubusercontent.com/catppuccin/palette/main/palette.json").then(
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
