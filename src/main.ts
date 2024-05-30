import { invoke } from "@tauri-apps/api/tauri";

const f1 = document.getElementById("f1") as HTMLInputElement;
const f2 = document.getElementById("f2") as HTMLInputElement;
const differencesListElement = document.getElementById(
  "differences"
) as HTMLUListElement;
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
  // make sure to remove previous results list
  differencesListElement.innerHTML = "";

  // make sure both fields are filled
  if (!f1.value || !f2.value) {
    return;
  }

  const folders = [f1.value, f2.value];

  // scan the folders for differences
  const differences: FileListItem[] = await invoke("get_differences", {
    directories: folders,
  });

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

  console.log(differences);

  // display the results in the list
  differences.forEach((item) => {
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

    differencesListElement?.appendChild(listitem);
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
  const isInputEmpty = inputElement.value === "";

  if (isInputEmpty) {
    inputElement.style.borderColor = "var(--color-error)";

    return false;
  } else {
    inputElement.style.borderColor = "var(--color-text)";
  }

  const valid = await invoke("dir_exists", {
    directory: inputElement.value,
  });

  if (!valid) {
    inputElement.style.borderColor = "var(--color-error)";

    return false;
  } else {
    inputElement.style.borderColor = "var(--color-text)";
  }

  return true;
}

scanPathsForm.querySelectorAll('input[type="text"]').forEach((input) => {
  input.addEventListener("input", async (event: Event) => {
    event.preventDefault();
    const target = event.target as HTMLInputElement;

    await validatePath(target);
  });
});

scanPathsForm?.addEventListener("submit", async (event: SubmitEvent) => {
  event.preventDefault();

  for (let inputElement of [f1, f2]) {
    if (!(await validatePath(inputElement))) {
      return;
    }
  }

  scan();
});
