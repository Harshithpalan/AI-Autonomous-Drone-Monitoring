import React, { useState } from 'react';
import './DroneDetails.css';

function DroneDetails({ drone, onSendCommand }) {
  const [selectedCommand, setSelectedCommand] = useState('');

  const commands = [
    { value: 'takeoff', label: 'Takeoff' },
    { value: 'land', label: 'Land' },
    { value: 'return_to_base', label: 'Return to Base' },
    { value: 'hover', label: 'Hover' },
    { value: 'emergency_stop', label: 'Emergency Stop' },
  ];

  const handleCommandSend = () => {
    if (selectedCommand && drone) {
      onSendCommand(drone.id, selectedCommand);
      setSelectedCommand('');
    }
  };

  if (!drone) {
    return (
      <div className="drone-details">
        <p>Select a drone to view details</p>
      </div>
    );
  }

  return (
    <div className="drone-details">
      <h2>Drone Details</h2>
      <div className="details-content">
        <div className="detail-section">
          <h3>{drone.name}</h3>
          <p>ID: {drone.id}</p>
          <p>Status: <span className="status-text">{drone.status}</span></p>
        </div>

        <div className="detail-section">
          <h4>Telemetry</h4>
          <div className="telemetry-grid">
            <div className="telemetry-item">
              <span className="telemetry-label">Latitude</span>
              <span className="telemetry-value">{drone.latitude.toFixed(6)}</span>
            </div>
            <div className="telemetry-item">
              <span className="telemetry-label">Longitude</span>
              <span className="telemetry-value">{drone.longitude.toFixed(6)}</span>
            </div>
            <div className="telemetry-item">
              <span className="telemetry-label">Altitude</span>
              <span className="telemetry-value">{drone.altitude.toFixed(1)}m</span>
            </div>
            <div className="telemetry-item">
              <span className="telemetry-label">Speed</span>
              <span className="telemetry-value">{drone.speed.toFixed(1)} m/s</span>
            </div>
            <div className="telemetry-item">
              <span className="telemetry-label">Battery</span>
              <span className="telemetry-value">{drone.battery.toFixed(1)}%</span>
            </div>
          </div>
        </div>

        <div className="detail-section">
          <h4>Object Detection</h4>
          <div className="detection-status">
            <span className="detection-indicator active"></span>
            <span>AI Detection Active</span>
          </div>
          <div className="detection-info">
            <p>Objects detected: 3</p>
            <p>Confidence: 94%</p>
          </div>
        </div>

        <div className="detail-section">
          <h4>Send Command</h4>
          <div className="command-controls">
            <select
              value={selectedCommand}
              onChange={(e) => setSelectedCommand(e.target.value)}
              className="command-select"
            >
              <option value="">Select command...</option>
              {commands.map((cmd) => (
                <option key={cmd.value} value={cmd.value}>
                  {cmd.label}
                </option>
              ))}
            </select>
            <button
              onClick={handleCommandSend}
              disabled={!selectedCommand}
              className="command-button"
            >
              Send
            </button>
          </div>
        </div>

        {drone.lastCommand && (
          <div className="detail-section">
            <h4>Last Command</h4>
            <p>{drone.lastCommand}</p>
            <p className="command-time">
              {new Date(drone.lastCommandTime).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DroneDetails;
