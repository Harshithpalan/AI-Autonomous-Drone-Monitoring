const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());
app.use(express.json());

// Store connected clients
const clients = new Set();

// Mock drone data storage
const drones = new Map();

// Initialize mock drones
function initializeDrones() {
  const mockDrones = [
    { id: 'DRONE-001', name: 'Alpha', status: 'active', battery: 85, altitude: 120, speed: 15, latitude: 37.7749, longitude: -122.4194 },
    { id: 'DRONE-002', name: 'Beta', status: 'active', battery: 92, altitude: 95, speed: 12, latitude: 37.7849, longitude: -122.4094 },
    { id: 'DRONE-003', name: 'Gamma', status: 'idle', battery: 100, altitude: 0, speed: 0, latitude: 37.7649, longitude: -122.4294 }
  ];

  mockDrones.forEach(drone => {
    drones.set(drone.id, drone);
  });
}

// Update drone positions (simulating movement)
function updateDronePositions() {
  drones.forEach((drone, id) => {
    if (drone.status === 'active') {
      // Simulate movement
      drone.latitude += (Math.random() - 0.5) * 0.001;
      drone.longitude += (Math.random() - 0.5) * 0.001;
      drone.altitude += (Math.random() - 0.5) * 5;
      drone.battery -= Math.random() * 0.1;
      drone.speed = 10 + Math.random() * 10;

      // Keep altitude realistic
      drone.altitude = Math.max(50, Math.min(200, drone.altitude));

      // Return to charging if battery low
      if (drone.battery < 20) {
        drone.status = 'returning';
      }
    } else if (drone.status === 'returning') {
      drone.altitude -= 5;
      if (drone.altitude <= 0) {
        drone.altitude = 0;
        drone.status = 'charging';
        drone.speed = 0;
      }
    } else if (drone.status === 'charging') {
      drone.battery += 0.5;
      if (drone.battery >= 100) {
        drone.battery = 100;
        drone.status = 'idle';
      }
    }
  });
}

// Broadcast drone data to all connected clients
function broadcastDroneData() {
  const droneData = Array.from(drones.values());
  const message = JSON.stringify({
    type: 'drone_update',
    data: droneData,
    timestamp: new Date().toISOString()
  });

  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// WebSocket connection handler
wss.on('connection', (ws) => {
  console.log('New client connected');
  clients.add(ws);

  // Send initial drone data
  const initialData = JSON.stringify({
    type: 'initial_data',
    data: Array.from(drones.values()),
    timestamp: new Date().toISOString()
  });
  ws.send(initialData);

  ws.on('close', () => {
    console.log('Client disconnected');
    clients.delete(ws);
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
    clients.delete(ws);
  });
});

// REST API endpoints
app.get('/api/drones', (req, res) => {
  res.json(Array.from(drones.values()));
});

app.get('/api/drones/:id', (req, res) => {
  const drone = drones.get(req.params.id);
  if (drone) {
    res.json(drone);
  } else {
    res.status(404).json({ error: 'Drone not found' });
  }
});

app.post('/api/drones/:id/command', (req, res) => {
  const drone = drones.get(req.params.id);
  if (drone) {
    const { command } = req.body;
    // Handle drone commands (takeoff, land, return, etc.)
    drone.lastCommand = command;
    drone.lastCommandTime = new Date().toISOString();
    res.json({ success: true, message: `Command ${command} sent to ${drone.name}` });
  } else {
    res.status(404).json({ error: 'Drone not found' });
  }
});

// Initialize and start updates
initializeDrones();

// Update drone positions every second
setInterval(updateDronePositions, 1000);

// Broadcast updates every second
setInterval(broadcastDroneData, 1000);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
