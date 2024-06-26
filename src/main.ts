import { invoke } from "@tauri-apps/api/tauri";

const f1 = document.getElementById("f1") as HTMLInputElement;
const f2 = document.getElementById("f2") as HTMLInputElement;
const [differencesListElement, differencesPreviewList] =
  document.querySelectorAll(".differences");
const differencesContainerSmall = document.getElementById(
  "differences-container-small"
);
const differencesContainerSmallButton = document.getElementById(
  "differences-container-small-button"
);
const differencesContainerSmallCloseButton = document.getElementById(
  "differences-container-small-close-btn"
);
/*
############################
#                          #
#   Function definitions   #
#                          #
############################
*/

interface FileListItem {
  filename: string;
  exclusive_to: "f1" | "f2" | null;
}

async function scan() {
  // make sure both fields are filled
  if (!f1.files || !f2.files) {
    return;
  }

  const f1Value = [...f1.files].map((file) => file.name);
  const f2Value = [...f2.files].map((file) => file.name);
  const filesToScan = [f1Value, f2Value];

  // scan the folders for differences
  const differences: FileListItem[] = await invoke("get_differences", {
    files: filesToScan,
  });

  await showScannedDifferences(differences);
}

async function showScannedDifferences(differences: FileListItem[]) {
  // make sure to remove previous results list
  differencesListElement.innerHTML = "";
  differencesPreviewList.innerHTML = "";

  differences.sort((prev, current) => {
    // just so you dont have to read:
    // this code just sorts the list with this priority:
    //
    // files that are exclusive to f1 < this is most prioritized
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // files that are exclusive to f2
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // files that are not exclusive to any folder

    if (prev.exclusive_to && current.exclusive_to) {
      if (prev.exclusive_to === "f2" && current.exclusive_to === "f1") {
        return 1;
      } else {
        return -1;
      }
    } else if (prev.exclusive_to) {
      return -1;
    } else {
      return 1;
    }
  });

  if (differences.length === 0) {
    const listitem = document.createElement("li");
    listitem.textContent = "No files found";
    listitem.className = "file-difference-item";
    listitem.style.border = "1px solid var(--color-error)";
    listitem.style.background = "none";
    listitem.style.justifyContent = "center";

    return;
  }

  appendDifferenceItemsToList(differences, differencesListElement);
  appendDifferenceItemsToList(differences, differencesPreviewList);

  if (window.innerWidth < 550) {
    openDifferenceContainerSmall();
  }
}

function appendDifferenceItemsToList(items: FileListItem[], list: Element) {
  items.forEach((item) => {
    const listitem = document.createElement("li");
    listitem.className = "file-difference-item";

    const filenameElement = document.createElement("span");
    filenameElement.textContent = item.filename;
    listitem.appendChild(filenameElement);

    const exclusiveToElement = document.createElement("span");
    exclusiveToElement.className = "folder-icon folder-icon-text";

    // if item is exclusive to some folder, then add a folder mark for user to know where it belongs
    if (item.exclusive_to) {
      exclusiveToElement.className +=
        item.exclusive_to === "f1" ? " folder1-icon" : " folder2-icon";
    } else {
      exclusiveToElement.className += " folder-both-icon";
    }

    listitem.appendChild(exclusiveToElement);

    list?.appendChild(listitem);
  });
}

/*
#####################################
#                                   #
#   Form validation and handling    #
#                                   #
#####################################
*/

const scanPathsForm = document.getElementById(
  "scan-paths-form"
) as HTMLFormElement;

async function validatePath(inputElement: HTMLInputElement): Promise<boolean> {
  if (!inputElement) {
    return false;
  }

  if (!inputElement.files) {
    inputElement.style.borderColor = "var(--color-error)";

    return false;
  }

  const value = inputElement.value;

  if (value.length <= 0) {
    inputElement.style.borderColor = "var(--color-error)";

    return false;
  } else {
    inputElement.style.borderColor = "var(--color-text)";
  }

  const valid = await invoke("dir_exists", {
    directory: value,
  });

  if (!valid) {
    inputElement.style.borderColor = "var(--color-error)";

    return false;
  } else {
    inputElement.style.borderColor = "var(--color-text)";
  }

  return true;
}

scanPathsForm.querySelectorAll(".finput-native-w").forEach((input) => {
  input.addEventListener("input", async (event: Event) => {
    event.preventDefault();
    const target = event.target as HTMLInputElement;

    await validatePath(target);
  });
});

scanPathsForm?.addEventListener("submit", async (event: SubmitEvent) => {
  event.preventDefault();

  await scan();

  [f1, f2].forEach((el) => {
    const target = el as HTMLElement;
    const id = target.id;
    const targetCorrespondingButton = document.querySelector(
      `label[for="${id}"] .finput-button`
    ) as HTMLElement;

    targetCorrespondingButton.textContent = "Choose";
    targetCorrespondingButton.style.borderColor = "var(--color-text)";
  });
});

function openDifferenceContainerSmall() {
  differencesContainerSmall!.style.display = "flex";
}

function cloeDifferenceContainerSmall() {
  differencesContainerSmall!.style.display = "none";
}

differencesContainerSmallButton?.addEventListener("click", async () => {
  openDifferenceContainerSmall();
});

differencesContainerSmallCloseButton?.addEventListener("click", async () => {
  cloeDifferenceContainerSmall();
});

[f1, f2].forEach((el) =>
  el.addEventListener("input", async (event) => {
    const target = event.target as HTMLElement;
    const id = target.id;
    const targetCorrespondingButton = document.querySelector(
      `label[for="${id}"] .finput-button`
    ) as HTMLElement;

    targetCorrespondingButton.textContent = "Choosen";
    targetCorrespondingButton.style.borderColor = "var(--color-tetiary)";
  })
);
