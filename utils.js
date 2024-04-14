var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export let peopleInfo;
export function initializePage() {
    return __awaiter(this, void 0, void 0, function* () {
        getPaletteVars("https://raw.githubusercontent.com/catppuccin/palette/main/palette.json").then((data) => __awaiter(this, void 0, void 0, function* () {
            for (let key in data) {
                document.documentElement.style.setProperty(key, data[key]);
            }
        }), (reason) => __awaiter(this, void 0, void 0, function* () {
            return Promise.reject(reason);
        }));
    });
}
export function getPaletteVars(uri) {
    return __awaiter(this, void 0, void 0, function* () {
        let paletteVars = {};
        const response = yield fetch(uri);
        const data = yield response.json();
        if (response.ok) {
            let themeColors = data["mocha"]["colors"];
            for (var key in themeColors) {
                paletteVars[`--${key}-hex`] = themeColors[key]["hex"];
            }
            return paletteVars;
        }
        else {
            return Promise.reject();
        }
    });
}
export function loadPeopleInfo() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("/bios/data/addams/data.json", {
            cache: "no-store",
        });
        const data = yield response.json();
        if (response.ok) {
            peopleInfo = data;
            return Promise.resolve(data);
        }
        else {
            return Promise.reject();
        }
    });
}
