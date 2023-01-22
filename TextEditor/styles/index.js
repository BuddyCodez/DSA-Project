function countWords(str) {
        str = str.replace(/(^\s*)|(\s*$)/gi,"");
         str = str.replace(/[ ]{2,}/gi," ");
         str = str.replace(/ /," ");
         return str.split(' ').length;
}

function Change() {
  count = document.getElementById("count");
  val = document.getElementById("text").value;
  count.innerText = countWords(val);
  
}

function toggleMode() {
  if (document.documentElement.style.getPropertyValue("--bg") == "white") {
    document.documentElement.style.setProperty("--bg", "black");
    document.documentElement.style.setProperty("--clr", "white");
  } else {
    document.documentElement.style.setProperty("--bg", "white");
    document.documentElement.style.setProperty("--clr", "black");
  }
}
function HandleValue() {
  val = document.getElementById("text").value;
  append = eel.append(val)();
  console.log(append);
  Change();
  // console.log("hello")
}

async function Undo() {
  let undo = eel.undo()();
  console.log(undo);
  if (undo) {
    document.getElementById("text").value = await undo;
  }
  Change();
}
let value = 1;
window.addEventListener("keypress", (e) => {
  console.log(e.key);
  if (e.key == "backspace") {
    val = document.getElementById("text").value;
    value += 1;
    del = eel.delete(String(value))();
    console.log(del);
  }
});
window.addEventListener("keydown", (e) => {
  if (e.key == "z" && e.altKey) {
    console.log("Pressed Alt + Z");
    Undo();
  } else if (e.key == "x" && e.altKey) {
    console.log("Pressed Alt + x");
    Redo();
  }
});
async function Redo() {
  let redo = await eel.redo()();
  console.log(redo);
  if (redo) {
    document.getElementById("text").value = redo;
  }
  Change();
}

let fileHandle;
const options = {
  types: [
    {
      description: "Text File",
      accept: {
        "text/plain": [".txt"],
      },
    },
  ],
};
async function Save() {
  console.log(window);
  fileHandle = await window.showSaveFilePicker(options);
  const writable = await fileHandle.createWritable();
  await writable.write(document.getElementById("text").value);
  await writable.close();
  console.log(fileHandle);
  title = document.getElementById("fname");
  if (title.innerText.length > 10) {
    title.innerText = title.innerText.slice(0, 10) + "...";
  } else {
    title.innerText = filename.value || "Untitled";
  }
  document.getElementById("text").disabled = false;
  Change();
}
async function NewFile() {
  document.getElementById("text").value = "";
  document.getElementById("fname").innerText = "Untitled File";
  document.getElementById("text").disabled = false;
  document.getElementById("text").placeholder = "Type Here...";
  Change();
}

let file;
async function PickFile() {
  document.getElementById("text").value = "";
  [file] = await window.showOpenFilePicker(options);
  const fileHandle = await file.getFile();
  let text = await fileHandle.text();
  console.log(text);
  document.getElementById("text").value = text;
  document.getElementById("text").innerText = "";
  document.getElementById("text").innerText = text;
  document.getElementById("text").disabled = false;
  if (file.name.length > 20) {
    document.getElementById("fname").innerText = file.name.slice(0, 20) + "...";
  } else {
    document.getElementById("fname").innerText = file.name;
  }
  Change();
}
