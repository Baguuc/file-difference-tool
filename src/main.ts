// When using the Tauri API npm package:
import { invoke } from "@tauri-apps/api/tauri";

const scanBtn = document.getElementById("scan-btn");
const f1 = document.getElementById("f1") as any;
const f2 = document.getElementById("f2") as any;
const f1_diff_elem = document.getElementById("f1_diff");
const f2_diff_elem = document.getElementById("f2_diff");

// Invoke the command
async function scan() {
  f1_diff_elem!.innerHTML = "";
  f2_diff_elem!.innerHTML = "";

  if (!f1.value || !f2.value) {
    return;
  }

  const differences: string[][] = await invoke("get_differences", {
    directories: [f1.value, f2.value],
  });

  const f1_diff = differences[0] || [];
  const f2_diff = differences[1] || [];

  f1_diff.forEach((filename: string) => {
    const listitem = document.createElement("li");
    listitem.textContent = filename;
    f1_diff_elem?.appendChild(listitem);
  });

  f2_diff.forEach((filename: string) => {
    const listitem = document.createElement("li");
    listitem.textContent = filename;
    f2_diff_elem?.appendChild(listitem);
  });
}

scanBtn?.addEventListener("click", scan);
