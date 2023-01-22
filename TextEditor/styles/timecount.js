document.getElementById("text").addEventListener("input", function () {
  console.log("called");
  document.getElementById("chars").innerText =
    document.getElementById("text").value.length;
});

function Find() {
  document.getElementById("close").click();
  const SearchText = document.getElementById("textfind");
  const text = document.getElementById("text");
  const replaceText = document.getElementById("textreplace");
  const Str = text.value;
  const newStr = Str.replaceAll(SearchText.value, replaceText.value);
  text.value = newStr;
}
