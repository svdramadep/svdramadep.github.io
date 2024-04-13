var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { loadBioInfo, initializePage, peopleInfo, } from "../utils.js";
let peopleList;
window.onload = () => {
    peopleList = document.getElementById("people_list");
    initializePage();
    loadBioInfo().then(() => __awaiter(void 0, void 0, void 0, function* () {
        parsePeopleEntries();
    }));
};
function parsePeopleEntries() {
    const personTemplate = peopleList.children[0];
    peopleInfo.order.actor.forEach((person) => {
        var _a;
        let curEntry;
        curEntry = personTemplate.cloneNode(true);
        curEntry.getElementsByClassName("headshot").item(0).src = `./headshots/${person}.jpg`;
        for (let key in peopleInfo.people[person]) {
            let value = peopleInfo.people[person][key];
            console.log(`${typeof value}, ${person}`);
            curEntry.getElementsByClassName(`person_${key}`).item(0).textContent =
                typeof value === "object"
                    ? value["actor"]
                    : value;
        }
        (_a = peopleList.lastElementChild) === null || _a === void 0 ? void 0 : _a.after(curEntry);
    });
    personTemplate.remove();
}
