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
let departmentMode = "cast";
let peopleListElement;
window.onload = () => {
    var _a;
    peopleListElement = document.getElementById("people_list");
    const deptOptionInputElements = document.getElementsByClassName("dept_option");
    for (let i = 0; i < deptOptionInputElements.length; i++) {
        ((_a = deptOptionInputElements.item(i)) !== null && _a !== void 0 ? _a : new HTMLInputElement()).onclick = (ev) => handleDepartmentClick(ev.target);
    }
    initializePage();
    loadBioInfo().then(() => __awaiter(void 0, void 0, void 0, function* () {
        parsePeopleEntries();
    }));
};
function parsePeopleEntries() {
    const personTemplate = peopleListElement.children[0];
    peopleListElement.textContent = "";
    peopleListElement.appendChild(personTemplate);
    peopleInfo.order[departmentMode].forEach((person) => {
        let curEntry;
        curEntry = personTemplate.cloneNode(true);
        curEntry.style.display = "flex";
        curEntry.getElementsByClassName("headshot").item(0).src = `./headshots/${person}.jpg`;
        for (let key in peopleInfo.people[person]) {
            let value = peopleInfo.people[person][key];
            console.log(`${typeof value}, ${person}`);
            curEntry
                .getElementsByClassName(`person_${key}`)
                .item(0).textContent =
                typeof value === "object"
                    ? value[departmentMode]
                    : value;
        }
        peopleListElement.appendChild(curEntry);
    });
}
function handleDepartmentClick(inputPressed) {
    var _a, _b, _c;
    if ((_a = inputPressed.previousElementSibling) === null || _a === void 0 ? void 0 : _a.classList.contains("selected"))
        return;
    let selectedThingies = document.getElementsByClassName("selected");
    for (let i = 0; i < selectedThingies.length; i++) {
        (_b = selectedThingies.item(i)) === null || _b === void 0 ? void 0 : _b.classList.remove("selected");
    }
    departmentMode = inputPressed.id.substring(5);
    parsePeopleEntries();
    (_c = inputPressed.previousElementSibling) === null || _c === void 0 ? void 0 : _c.classList.add("selected");
}
