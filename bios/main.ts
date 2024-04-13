import {
  loadBioInfo,
  initializePage,
  IBioStructure,
  peopleInfo,
} from "../utils.js";

let peopleList: HTMLDivElement;

window.onload = () => {
  peopleList = document.getElementById("people_list") as HTMLDivElement;

  initializePage();

  loadBioInfo().then(async () => {
    parsePeopleEntries();
  });
};

function parsePeopleEntries() {
  const personTemplate = peopleList.children[0] as HTMLDivElement;

  peopleInfo.order.actor.forEach((person) => {
    let curEntry: HTMLElement;

    curEntry = personTemplate.cloneNode(true) as HTMLDivElement;
    (
      curEntry.getElementsByClassName("headshot").item(0) as HTMLImageElement
    ).src = `./headshots/${person}.jpg`;

    for (let key in peopleInfo.people[person]) {
      let value = peopleInfo.people[person][key as keyof IBioStructure];
      console.log(`${typeof value}, ${person}`);
      (
        curEntry.getElementsByClassName(`person_${key}`).item(0) as HTMLElement
      ).textContent =
        typeof value === "object"
          ? value["actor" as keyof typeof value]
          : value;
    }

    peopleList.lastElementChild?.after(curEntry);
  });

  personTemplate.remove();
}
