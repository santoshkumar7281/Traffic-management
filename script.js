// Connect to WebSocket for real-time updates
const socket = io.connect('http://localhost:5000');

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('traffic_update', function(data) {
    updateTrafficDisplay(data.traffic, data.timings);
});

// Function to start simulation via API
function startSimulation() {
    fetch('http://localhost:5000/api/simulation/start', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
    });
}

// Function to stop simulation via API
function stopSimulation() {
    fetch('http://localhost:5000/api/simulation/stop', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
    });
}

// Function to update the traffic display with received data
function updateTrafficDisplay(trafficData, timingData) {
    const trafficDataDiv = document.getElementById("traffic-data");
    
    let html = "<h3>Traffic Data:</h3><ul>";
    for (const [direction, density] of Object.entries(trafficData)) {
        html += `<li>${direction}: ${density} vehicles</li>`;
    }
    html += "</ul><h3>Adjusted Traffic Light Timings:</h3><ul>";
    
    for (const [direction, timing] of Object.entries(timingData)) {
        html += `<li>${direction}: ${timing} seconds</li>`;
    }
    html += "</ul>";
    
    trafficDataDiv.innerHTML = html;
}
