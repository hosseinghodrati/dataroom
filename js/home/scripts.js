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
  document.getElementById("dark-mode-3").classList.toggle("sun-mode-2");
  document.getElementById("dark-mode-3").classList.toggle("dark-mode-2");
  document.getElementById("dark-mode-4").classList.toggle("sun-mode-2");
  document.getElementById("dark-mode-4").classList.toggle("dark-mode-2");
  document.getElementById("dark-mode-5").classList.toggle("sun-mode-3");
  document.getElementById("dark-mode-5").classList.toggle("dark-mode-3");
  document.getElementById("dark-mode-6").classList.toggle("sun-mode-3");
  document.getElementById("dark-mode-6").classList.toggle("dark-mode-3");
  document.getElementById("dark-mode-7").classList.toggle("sun-mode-2");
  document.getElementById("dark-mode-7").classList.toggle("dark-mode-2");
  //   document.getElementById("dark-mode-8").classList.toggle("sun-mode-3");
  //   document.getElementById("dark-mode-8").classList.toggle("dark-mode-3");
  //   document.getElementById("dark-mode-9").classList.toggle("sun-mode-2");
  //   document.getElementById("dark-mode-9").classList.toggle("dark-mode-2");
  //   document.getElementById("dark-mode-10").classList.toggle("sun-mode-3");
  //   document.getElementById("dark-mode-10").classList.toggle("dark-mode-3");
  //   document.getElementById("dark-mode-11").classList.toggle("sun-mode-4");
  //   document.getElementById("dark-mode-11").classList.toggle("dark-mode-4");
  //   document.getElementById("dark-mode-12").classList.toggle("sun-mode-4");
  //   document.getElementById("dark-mode-12").classList.toggle("dark-mode-4");
  //   document.getElementById("dark-mode-13").classList.toggle("sun-mode-1");
  //   document.getElementById("dark-mode-13").classList.toggle("dark-mode-1");
  //   document.getElementById("dark-mode-14").classList.toggle("sun-mode-1");
  //   document.getElementById("dark-mode-14").classList.toggle("dark-mode-1");
  //   document.getElementById("dark-mode-15").classList.toggle("sun-mode-1");
  //   document.getElementById("dark-mode-15").classList.toggle("dark-mode-1");
  document.getElementById("home1").classList.toggle("d-none");
  document.getElementById("home2").classList.toggle("d-none");
  document.getElementById("about1").classList.toggle("d-none");
  document.getElementById("about2").classList.toggle("d-none");
  document.getElementById("history1").classList.toggle("d-none");
  document.getElementById("history2").classList.toggle("d-none");
  document.getElementById("chart1").classList.toggle("d-none");
  document.getElementById("chart2").classList.toggle("d-none");
  if ($("#dark-mode-1").hasClass("sun-mode-1")) {
    $("#flexSwitchCheckDefault").prop("checked", true);
    document.getElementById("moon").classList.remove("d-none");
    document.getElementById("sun").classList.add("d-none");
  } else {
    $("#flexSwitchCheckDefault").prop("checked", false);
    document.getElementById("moon").classList.add("d-none");
    document.getElementById("sun").classList.remove("d-none");
  }
}
