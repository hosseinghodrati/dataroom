// Check for darkmode
if (localStorage.getItem("darkMode") == "true") {
  toggleMode();
}

document
  .getElementById("flexSwitchCheckDefault")
  .addEventListener("change", function () {
    // Save dark mode state
    var darkMode = document.getElementById("flexSwitchCheckDefault").checked;
    localStorage.setItem("darkMode", darkMode);
  });

document
  .getElementById("flexSwitchCheckDefault")
  .addEventListener("click", function () {
    toggleMode();
  });

function toggleMode() {
  document.getElementById("dark-mode-1").classList.toggle("sun-mode-1");
  document.getElementById("dark-mode-1").classList.toggle("dark-mode-1");
  document.getElementById("dark-mode-2").classList.toggle("sun-mode-1");
  document.getElementById("dark-mode-2").classList.toggle("dark-mode-1");
  document.getElementById("dark-mode-3").classList.toggle("sun-mode-1");
  document.getElementById("dark-mode-3").classList.toggle("dark-mode-1");
  document.getElementById("dark-mode-4").classList.toggle("sun-mode-1");
  document.getElementById("dark-mode-4").classList.toggle("dark-mode-1");
  document.getElementById("dark-mode-5").classList.toggle("sun-mode-4");
  document.getElementById("dark-mode-5").classList.toggle("dark-mode-4");
  document.getElementById("dark-mode-6").classList.toggle("sun-mode-1");
  document.getElementById("dark-mode-6").classList.toggle("dark-mode-1");
  document.getElementById("dark-mode-7").classList.toggle("sun-mode-2");
  document.getElementById("dark-mode-7").classList.toggle("dark-mode-2");

  document.getElementById("home1").classList.toggle("d-none");
  document.getElementById("home2").classList.toggle("d-none");
  document.getElementById("about1").classList.toggle("d-none");
  document.getElementById("about2").classList.toggle("d-none");
  document.getElementById("history1").classList.toggle("d-none");
  document.getElementById("history2").classList.toggle("d-none");
  document.getElementById("chart1").classList.toggle("d-none");
  document.getElementById("chart2").classList.toggle("d-none");
  if ($("#dark-mode-1").hasClass("sun-mode-1")) {
    $("#flexSwitchCheckDefault").prop("checked", false);
    document.getElementById("moon").classList.add("d-none");
    document.getElementById("sun").classList.remove("d-none");
  } else {
    $("#flexSwitchCheckDefault").prop("checked", true);
    document.getElementById("moon").classList.remove("d-none");
    document.getElementById("sun").classList.add("d-none");
  }
}
// Get address history from local storage
var addressHistory = JSON.parse(localStorage.getItem("history"));
// If there is no history, remove empty history div
if (addressHistory === null) {
  $("#empty-state").removeClass("d-none");
} else {
  // If there is history, add it to the history div
  var addressTemplate = document.getElementById("address-item");
  var addressContainer = document.getElementById("address-container");
  for (var i = 0; i < addressHistory.length; i++) {
    $("#empty-state").remove();
    // Add history from template
    var addressClone = addressTemplate.content.cloneNode(true);
    addressClone.querySelector(".valuetrx1").innerHTML = addressHistory[i];
    addressClone.querySelector(".valuetrx1").href =
      "search.html?address=" + addressHistory[i];
    addressContainer.appendChild(addressClone);
  }
}
