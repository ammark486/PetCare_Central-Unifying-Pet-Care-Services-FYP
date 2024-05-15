// SIDEBAR TOGGLE

let sidebarOpen = false;
let year = "2024"
let monthSales;
const sidebar = document.getElementById("sidebar");

function openSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add("sidebar-responsive");
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove("sidebar-responsive");
    sidebarOpen = false;
  }
}

// ---------- CHARTS ----------

// AREA CHART
const areaChartOptions = {
  series: [
    {
      name: "Purchase Orders",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: "Sales Orders",
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ],
  chart: {
    height: 350,
    type: "area",
    toolbar: {
      show: false,
    },
  },
  colors: ["#4f35a1", "#246dec"],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  markers: {
    size: 0,
  },
  yaxis: [
    {
      title: {
        text: "Purchase Orders",
      },
    },
    {
      opposite: true,
      title: {
        text: "Sales Orders",
      },
    },
  ],
  tooltip: {
    shared: true,
    intersect: false,
  },
};

const areaChart = new ApexCharts(
  document.querySelector("#area-chart"),
  areaChartOptions
);
areaChart.render();

// AREA CHART 2
const areaChartOptions2 = {
  series: [
    {
      name: "Revenue",
      data: [120, 150, 135, 180, 120, 160, 200],
    },
    {
      name: "Expenses",
      data: [80, 100, 90, 110, 80, 95, 120],
    },
  ],
  chart: {
    height: 350,
    type: "area",
    toolbar: {
      show: false,
    },
  },
  colors: ["#ff9900", "#d9534f"],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  markers: {
    size: 0,
  },
  yaxis: [
    {
      title: {
        text: "Revenue",
      },
    },
    {
      opposite: true,
      title: {
        text: "Expenses",
      },
    },
  ],
  tooltip: {
    shared: true,
    intersect: false,
  },
};

const areaChart2 = new ApexCharts(
  document.querySelector("#area-chart-2"),
  areaChartOptions2
);
areaChart2.render();

// AREA CHART 3
// const areaChartOptions3 = {
//   series: [
//     {
//       name: "Profit",
//       data: [40, 60, 45, 80, 50, 70, 90],
//     },
//   ],
//   chart: {
//     height: 350,
//     type: "area",
//     toolbar: {
//       show: false,
//     },
//   },
//   colors: ["#5cb85c"],
//   dataLabels: {
//     enabled: false,
//   },
//   stroke: {
//     curve: "smooth",
//   },
//   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
//   markers: {
//     size: 0,
//   },
//   yaxis: [
//     {
//       title: {
//         text: "Profit",
//       },
//     },
//   ],
//   tooltip: {
//     shared: true,
//     intersect: false,
//   },
// };

// const areaChart3 = new ApexCharts(
//   document.querySelector("#area-chart-3"),
//   areaChartOptions3
// );
// areaChart3.render();

function generateAreaChartData() {

  var data = [];
  
  for (const month in monthSales) {
    data.push(monthSales[month]);
  }

  return {
    series: [
      {
        name: "Profit",
        data: data,
      },
    ],
    chart: {
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    colors: ["#5cb85c"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "AUG", "SEP", "OCT", "NOV", "DEC"],
    markers: {
      size: 0,
    },
    yaxis: [
      {
        title: {
          text: "Profit",
        },
      },
    ],
    tooltip: {
      shared: true,
      intersect: false,
    },
  };
}


function renderAreaChart() {
  console.log(monthSales);
  const areaChartOptions = generateAreaChartData();
  const areaChart = new ApexCharts(document.querySelector("#area-chart-3"), areaChartOptions);
  areaChart.render();
}

// -------------------------------PERMISSION-----------------------------------//
// Add this to your existing JavaScript

function handleRoleChange() {
  var selectedRole = document.getElementById("role-dropdown").value;
  console.log("Selected Role: " + selectedRole);
  // You can add more logic based on the selected role if needed
}

getAllData();
getYearlyData();

async function getAllData() {
  const token = localStorage.getItem("jwt");
  let response = await fetch("http://localhost:8080/api/dashboard/all-data", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  response = await response.json();

  if (response.status === 403) {
    window.location.href = "customersignin.html";
    alert("Forbidden: You do not have permission to access this resource.");
  }
  if (response.status === 401) {
    window.location.href = "customersignin.html";
  } else if (response.status == 200) {
    var totalUser = `  <span>Total: </span><span style="padding-left: 4px;" class="text-primary font-weight-bold">${response.data.userCount}</span>`;
    var totalSales = `  <span>Total: </span><span style="padding-left: 4px;" class="text-primary font-weight-bold">${response.data.totalSales}</span>`;



    document.getElementById("user-data-all").innerHTML = totalUser;
    document.getElementById("total-sales-all").innerHTML = totalSales;
  } else {
    console.error("Error:", response.message);
  }
}

async function getYearlyData(){
  const token = localStorage.getItem("jwt");
  let response = await fetch(`http://localhost:8080/api/dashboard/by-year?year=${year}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  response = await response.json();

  if (response.status === 403) {
    window.location.href = "customersignin.html";
    alert("Forbidden: You do not have permission to access this resource.");
  }
  if (response.status === 401) {
    window.location.href = "customersignin.html";
  } else if (response.status == 200) {
    monthSales = response.data.monthlySales;
    var totalUser = `<span>Yearly: </span>
    <span style="padding-left: 4px;" class="text-primary font-weight-bold">${response.data.userAndSales.userCount}</span>`;
    var totalSales = ` <span>Yearly: </span>
    <span style="padding-left: 4px;" class="text-primary font-weight-bold">${response.data.userAndSales.totalSales}</span>`;


    document.getElementById("user-data-yearly").innerHTML = totalUser;
    document.getElementById("sales-data-yearly").innerHTML = totalSales;
    
    renderAreaChart();

  } else {
    console.error("Error:", response.message);
  }
}


function selectedYear(){
  year = document.getElementById("yearSelect").value;
  getYearlyData();
  renderAreaChart();
}