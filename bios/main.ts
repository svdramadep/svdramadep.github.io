import {
  loadBioInfo,
  initializePage,
  IBioStructure,
  peopleInfo,
} from "../utils.js";

let departmentMode = "actor";
let peopleListElement: HTMLDivElement;

window.onload = () => {
  peopleListElement = document.getElementById("people_list") as HTMLDivElement;
  const deptOptionInputElements = document.getElementsByClassName(
    "dept_option"
  ) as HTMLCollectionOf<HTMLInputElement>;

  for (let i = 0; i < deptOptionInputElements.length; i++) {
    (deptOptionInputElements.item(i) ?? new HTMLInputElement()).onclick = (
      ev
    ) => handleDepartmentClick(ev.target as HTMLInputElement);
  }

  initializePage();

  loadBioInfo().then(async () => {
    parsePeopleEntries();
  });
};

function parsePeopleEntries() {
  const personTemplate = peopleListElement.children[0] as HTMLDivElement;
  peopleListElement.textContent = "";
  peopleListElement.appendChild(personTemplate);

  peopleInfo.order[departmentMode as keyof typeof peopleInfo.order].forEach(
    (person) => {
      let curEntry: HTMLElement;

      curEntry = personTemplate.cloneNode(true) as HTMLDivElement;
      curEntry.style.display = "flex";
      (
        curEntry.getElementsByClassName("headshot").item(0) as HTMLImageElement
      ).src = `./headshots/${person}.jpg`;

      for (let key in peopleInfo.people[person]) {
        let value = peopleInfo.people[person][key as keyof IBioStructure];
        console.log(`${typeof value}, ${person}`);
        (
          curEntry
            .getElementsByClassName(`person_${key}`)
            .item(0) as HTMLElement
        ).textContent =
          typeof value === "object"
            ? value[departmentMode as keyof typeof value]
            : value;
      }

      peopleListElement.appendChild(curEntry);
    }
  );
}

function handleDepartmentClick(inputPressed: HTMLElement) {
  if (inputPressed.previousElementSibling?.classList.contains("selected"))
    return;
  let selectedThingies = document.getElementsByClassName("selected");
  for (let i = 0; i < selectedThingies.length; i++) {
    selectedThingies.item(i)?.classList.remove("selected");
  }

  departmentMode = inputPressed.id.substring(5);
  parsePeopleEntries();

  inputPressed.previousElementSibling?.classList.add("selected");
}
