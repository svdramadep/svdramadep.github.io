var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { bios, getBioInfo, initializePage } from "../utils.js";
let peopleList;
window.onload = () => {
    peopleList = document.getElementById("people_list");
    initializePage();
    getBioInfo("actors").then(() => __awaiter(void 0, void 0, void 0, function* () {
        parsePeopleEntries();
    }));
};
function parsePeopleEntries() {
    const personTemplate = peopleList.children[0];
    bios["actors"].forEach((element) => {
        var _a, _b;
        let curEntry;
        curEntry = personTemplate.cloneNode(true);
        curEntry.getElementsByClassName("headshot").item(0).src = `./headshots/${element.name.toLowerCase().replace(" ", "")}.jpg`;
        ((_a = curEntry.getElementsByClassName("person_name").item(0)) !== null && _a !== void 0 ? _a : document.createElement("div")).textContent = element.name;
        (_b = peopleList.lastElementChild) === null || _b === void 0 ? void 0 : _b.after(curEntry);
    });
    personTemplate.remove();
}
