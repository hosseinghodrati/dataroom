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
  document.getElementById("dark-mode-8").classList.toggle("sun-mode-3");
  document.getElementById("dark-mode-8").classList.toggle("dark-mode-3");
  document.getElementById("dark-mode-9").classList.toggle("sun-mode-2");
  document.getElementById("dark-mode-9").classList.toggle("dark-mode-2");
  document.getElementById("dark-mode-10").classList.toggle("sun-mode-3");
  document.getElementById("dark-mode-10").classList.toggle("dark-mode-3");
  document.getElementById("dark-mode-11").classList.toggle("sun-mode-4");
  document.getElementById("dark-mode-11").classList.toggle("dark-mode-4");
  document.getElementById("dark-mode-12").classList.toggle("sun-mode-4");
  document.getElementById("dark-mode-12").classList.toggle("dark-mode-4");
  document.getElementById("dark-mode-13").classList.toggle("sun-mode-1");
  document.getElementById("dark-mode-13").classList.toggle("dark-mode-1");
  document.getElementById("dark-mode-14").classList.toggle("sun-mode-1");
  document.getElementById("dark-mode-14").classList.toggle("dark-mode-1");
  document.getElementById("dark-mode-15").classList.toggle("sun-mode-1");
  document.getElementById("dark-mode-15").classList.toggle("dark-mode-1");
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

// Get wallet address from query string
var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var walletAddress = urlParams.get("address");
var baseApi = "https://api.covalenthq.com/v1";
var apiKey = "key=ckey_f7d4e45474a24603bb7c90e100b";
var myChart = echarts.init(document.getElementById("main"));
var chartOption = {
  tooltip: {
    trigger: "item",
  },
  legend: {
    top: "0%",
    left: "center",
    color: "black"
  },
  series: [
    {
      name: "Tokens",
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2,
      },
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: "17",
          fontWeight: "bold",
          color: "white",
        },
      },
      labelLine: {
        show: false,
      },
      data: [],
    },
  ],
};
$(".see-all-trx").click(function () {
  // Redirect to the transaction page
  window.location.href = "trx.html?address=" + walletAddress;
});
// Get token price
function getTokenPrice(token) {
  var tokenPriceEndpoint =
    baseApi +
    "/pricing/tickers/?quote-currency=USD&format=JSON&tickers=" +
    token +
    "&" +
    apiKey;
  return new Promise(function (resolve, reject) {
    $.get(tokenPriceEndpoint)
      .done(function (data) {
        resolve(data);
      })
      .fail(function (error) {
        reject(error);
      });
  });
}
// Get wallet tokens from covalent API
var tokenBalanceEndpoint =
  baseApi + "/1/address/" + walletAddress + "/balances_v2/?" + apiKey;
$.get(tokenBalanceEndpoint)
  .done(function (allTokensData) {
    $("#token-count").text(allTokensData.data.items.length);
    var totalBalance = 0;
    var itemsProcessed = 0;
    getTokenPrice("btc")
      .then(function (btcData) {
        var btcPrice = btcData.data.items[0].quote_rate;
        allTokensData.data.items.forEach(function (item) {
          itemsProcessed++;
          totalBalance += item.quote;
          // Add token element from template
          var tokenTemplate = document.getElementById("token-template");
          var clone = tokenTemplate.content.cloneNode(true);
          var tokenContainer = document.getElementById("token-container");
          clone.querySelector(".coin-logo").src = item.logo_url;
          clone.querySelector(".token-name").textContent = item.contract_name;
          clone.querySelector(".total-balance").textContent =
            "$" + item.quote.toFixed(2);
          clone.querySelector(".btc-balance").textContent = (
            item.quote / btcPrice
          ).toFixed(8);
          clone.querySelector('.coin-logo').addEventListener('error', function (e) {
            this.remove()
          }, true)
          tokenContainer.appendChild(clone);
          // Add token to chart
          chartOption.series[0].data.push({
            value: item.quote.toFixed(2),
            name: item.contract_ticker_symbol.toUpperCase(),
          });
          if (
            chartOption.series[0].data.length == allTokensData.data.items.length
          ) {
            myChart.setOption(chartOption);
            $("#chart-spinner").addClass("d-none");
            $("#chart-container").removeClass("d-none");
          }
          // Calculate total balance
          if (itemsProcessed === allTokensData.data.items.length) {
            var totalBalanceFormatted = totalBalance.toFixed(2);
            $("#total-balance").text("$" + totalBalanceFormatted);
            // Calculate total value of all tokens in BTC
            var totalValue = totalBalance / btcPrice;
            var totalValueFormatted = totalValue.toFixed(8);
            $("#total-value-btc").text(totalValueFormatted + " BTC");
          }
          // Remove loading animation
          $("#main-data-spinner").addClass("d-none");
          $("#main-data").removeClass("d-none");
        });
      })
      .catch(function (error) {
        // console.log(error);
      });
  })
  .fail(function (error) {
    // console.log(error);
  });
// Get last 3 transactions
var lastTransactionsEndpoint =
  baseApi +
  "/1/address/" +
  walletAddress +
  "/transactions_v2/?quote-currency=USD&format=JSON&block-signed-at-asc=false&no-logs=false&page-size=3&" +
  apiKey;
$.get(lastTransactionsEndpoint)
  .done(function (lastTransactionsData) {
    // Add elements from template
    var transactionTemplate = document.getElementById("transaction-template");
    var transactionContainer = document.getElementById("transaction-container");
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
      clone.querySelector(".trx-status").textContent =
        item.successful == true ? "Successful" : "Failed";
      transactionContainer.appendChild(clone);
    });
  })
  .fail(function (error) {
    // console.log(error);
  });
// Add searched wallet address to history in local storage
var searchHistory = JSON.parse(localStorage.getItem("history"));
if (searchHistory == null) {
  searchHistory = [];
}
if (searchHistory.indexOf(walletAddress) == -1) {
  searchHistory.push(walletAddress);
}
localStorage.setItem("history", JSON.stringify(searchHistory));
