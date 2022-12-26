document.getElementById("text").addEventListener("input", function () {
    console.log("called")
    document.getElementById("chars").innerText = document.getElementById("text").value.length;

})