import { bios, getBioInfo, initializePage } from "../utils.js";

let peopleList: HTMLDivElement;

window.onload = () => {
  peopleList = document.getElementById("people_list") as HTMLDivElement;

  initializePage();

  getBioInfo("actors").then(async () => {
    parsePeopleEntries();
  });
};

function parsePeopleEntries() {
  const personTemplate = peopleList.children[0] as HTMLDivElement;

  bios["actors"].forEach((element) => {
    let curEntry: HTMLElement;

    curEntry = personTemplate.cloneNode(true) as HTMLDivElement;
    (
      curEntry.getElementsByClassName("headshot").item(0) as HTMLImageElement
    ).src = `./headshots/${element.name.toLowerCase().replace(" ", "")}.jpg`;
    (
      curEntry.getElementsByClassName("person_name").item(0) ??
      document.createElement("div")
    ).textContent = element.name;

    peopleList.lastElementChild?.after(curEntry);
  });

  personTemplate.remove();
}
