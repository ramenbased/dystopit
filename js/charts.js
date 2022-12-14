var linecolor = "lightblue"

const dataPlayerFunds = {
    labels: fundsHistory,
    datasets: [{
    borderColor: linecolor,
    borderWidth: 1.7,
    data: fundsHistory,
    }]
};
const dataCorpo0 = {
    labels: Corpos[0].pricehistory,
    datasets: [{
    borderColor: linecolor,
    borderWidth: 1.2,
    data: Corpos[0].pricehistory,
    }]
};

const dataCorpo1 = {
    labels: Corpos[1].pricehistory,
    datasets: [{
    borderColor: linecolor,
    borderWidth: 1.2,
    data: Corpos[1].pricehistory,
    }]
};

const dataCorpo2 = {
    labels: Corpos[2].pricehistory,
    datasets: [{
    borderColor: linecolor,
    borderWidth: 1.2,
    data: Corpos[2].pricehistory,
    }]
};

const dataCorpo3 = {
    labels: Corpos[3].pricehistory,
    datasets: [{
    borderColor: linecolor,
    borderWidth: 1.2,
    data: Corpos[3].pricehistory,
    }]
};

const dataCorpo4 = {
    labels: Corpos[4].pricehistory,
    datasets: [{
    borderColor: linecolor,
    borderWidth: 1.2,
    data: Corpos[4].pricehistory,
    }]
};

const dataCorpo5 = {
    labels: Corpos[5].pricehistory,
    datasets: [{
    borderColor: linecolor,
    borderWidth: 1.2,
    data: Corpos[5].pricehistory,
    }]
};

const options = {
        animation: false,
        responsive: true,
        maintainAspectRatio: false,
        elements: {
            point: {
                radius: 0,
            }
        },
        scales: {
            x: {
                ticks: false, 
            },
            y: {
                position: "right",
                ticks: {
                    color: linecolor,
                }
            }   
        },
        plugins: {
            legend: {
                display: false,
            }
        },
};

const configPlayerFunds = {
    type: 'line',
    data: dataPlayerFunds,
    options: options,
};

const chartFunds = new Chart(
document.getElementById('chartfunds'),
configPlayerFunds
);

const configCorpo0 = {
    type: 'line',
    data: dataCorpo0,
    options: options,
};

const chartCorpo0 = new Chart(
document.getElementById(Corpos[0].name),
configCorpo0
);

const configCorpo1 = {
    type: 'line',
    data: dataCorpo1,
    options: options,
};

const chartCorpo1 = new Chart(
document.getElementById(Corpos[1].name),
configCorpo1
);

const configCorpo2 = {
    type: 'line',
    data: dataCorpo2,
    options: options,
};

const chartCorpo2 = new Chart(
document.getElementById(Corpos[2].name),
configCorpo2
)

const configCorpo3 = {
    type: 'line',
    data: dataCorpo3,
    options: options,
};

const chartCorpo3 = new Chart(
document.getElementById(Corpos[3].name),
configCorpo3
)

const configCorpo4 = {
type: 'line',
data: dataCorpo4,
options: options,
};

const chartCorpo4 = new Chart(
document.getElementById(Corpos[4].name),
configCorpo4
)

const configCorpo5 = {
type: 'line',
data: dataCorpo5,
options: options,
};

const chartCorpo5 = new Chart(
document.getElementById(Corpos[5].name),
configCorpo5
)
