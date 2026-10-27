import React, { useState, useEffect } from 'react';
import DroneMap from './components/DroneMap';
import DroneList from './components/DroneList';
import DroneDetails from './components/DroneDetails';
import './App.css';

function App() {
  const [drones, setDrones] = useState([]);
  const [selectedDrone, setSelectedDrone] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // WebSocket connection for real-time updates
    const ws = new WebSocket('ws://localhost:5000');

    ws.onopen = () => {
      console.log('Connected to WebSocket');
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'initial_data' || message.type === 'drone_update') {
        setDrones(message.data);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setIsConnected(false);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleDroneSelect = (drone) => {
    setSelectedDrone(drone);
  };

  const handleSendCommand = async (droneId, command) => {
    try {
      const response = await fetch(`/api/drones/${droneId}/command`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ command }),
      });
      const data = await response.json();
      console.log('Command response:', data);
    } catch (error) {
      console.error('Error sending command:', error);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>AI Autonomous Drone Monitoring</h1>
        <div className="connection-status">
          <span className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}></span>
          {isConnected ? 'Connected' : 'Disconnected'}
        </div>
      </header>

      <div className="app-content">
        <div className="map-section">
          <DroneMap drones={drones} selectedDrone={selectedDrone} onDroneSelect={handleDroneSelect} />
        </div>

        <div className="sidebar">
          <DroneList drones={drones} selectedDrone={selectedDrone} onDroneSelect={handleDroneSelect} />
          {selectedDrone && (
            <DroneDetails drone={selectedDrone} onSendCommand={handleSendCommand} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
