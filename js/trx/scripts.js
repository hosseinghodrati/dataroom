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
  document.getElementById("dark-mode-4").classList.toggle("sun-mode-4");
  document.getElementById("dark-mode-4").classList.toggle("dark-mode-4");
  document.getElementById("dark-mode-5").classList.toggle("sun-mode-1");
  document.getElementById("dark-mode-5").classList.toggle("dark-mode-1");
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

var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var walletAddress = urlParams.get("address");
var baseApi = "https://api.covalenthq.com/v1";
var apiKey = "key=ckey_f7d4e45474a24603bb7c90e100b";
$("#wallet-address").text(walletAddress);
var lastTransactionsEndpoint =
  baseApi +
  "/1/address/" +
  walletAddress +
  "/transactions_v2/?quote-currency=USD&format=JSON&block-signed-at-asc=false&no-logs=false&" +
  apiKey;
$.get(lastTransactionsEndpoint)
  .done(function (lastTransactionsData) {
    // console.log(lastTransactionsData);
    // Add elements from template
    var transactionTemplate = document.getElementById("transaction-template");
    var transactionContainer = document.getElementById(
      "transactions-container"
    );
    // Remove loading animation
    $("#transactions-spinner").addClass("d-none");
    lastTransactionsData.data.items.forEach(function (item) {
      var clone = transactionTemplate.content.cloneNode(true);
      // Convert datetime to days ago format
      var date = new Date(item.block_signed_at);
      var daysAgo = Math.floor((new Date() - date) / (1000 * 60 * 60 * 24));
      clone.querySelector(".trx-value").textContent =
        (item.value * 0.000000000000000001).toFixed(4) + " ETH";
      clone.querySelector(".trx-block").textContent = item.block_height;
      clone.querySelector(".trx-time").textContent = daysAgo + "d";
      clone.querySelector(".trx-to").href =
        "https://etherscan.io/address/" + item.to_address;
      clone.querySelector(".trx-hash").href =
        "https://etherscan.io/tx/" + item.tx_hash;
      clone.querySelector(".trx-status").textContent =
        item.successful == true ? "Successful" : "Failed";
      transactionContainer.appendChild(clone);
    });
  })
  .fail(function (error) {
    // console.log(error);
  });
