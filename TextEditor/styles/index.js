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
  // console.log("hello")
}

async function  Undo() {
  let undo = eel.undo()();
  console.log(undo);
  if (undo) {  
    document.getElementById("text").value = await undo;
  }
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
  if (redo.length > 0) {
    document.getElementById("text").value = redo;
  }
}