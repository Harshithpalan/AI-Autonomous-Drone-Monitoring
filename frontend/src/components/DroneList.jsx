import React from 'react';
import './DroneList.css';

function DroneList({ drones, selectedDrone, onDroneSelect }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return '#4CAF50';
      case 'idle':
        return '#FFC107';
      case 'charging':
        return '#2196F3';
      case 'returning':
        return '#FF9800';
      default:
        return '#9E9E9E';
    }
  };

  const getBatteryColor = (battery) => {
    if (battery > 50) return '#4CAF50';
    if (battery > 20) return '#FFC107';
    return '#F44336';
  };

  return (
    <div className="drone-list">
      <h2>Active Drones</h2>
      <div className="drone-cards">
        {drones.map((drone) => (
          <div
            key={drone.id}
            className={`drone-card ${selectedDrone?.id === drone.id ? 'selected' : ''}`}
            onClick={() => onDroneSelect(drone)}
          >
            <div className="drone-card-header">
              <h3>{drone.name}</h3>
              <span
                className="status-badge"
                style={{ backgroundColor: getStatusColor(drone.status) }}
              >
                {drone.status}
              </span>
            </div>
            <div className="drone-card-body">
              <div className="drone-metric">
                <span className="metric-label">Battery</span>
                <div className="battery-bar">
                  <div
                    className="battery-fill"
                    style={{
                      width: `${drone.battery}%`,
                      backgroundColor: getBatteryColor(drone.battery),
                    }}
                  />
                  <span className="battery-value">{drone.battery.toFixed(1)}%</span>
                </div>
              </div>
              <div className="drone-metric">
                <span className="metric-label">Altitude</span>
                <span className="metric-value">{drone.altitude.toFixed(1)}m</span>
              </div>
              <div className="drone-metric">
                <span className="metric-label">Speed</span>
                <span className="metric-value">{drone.speed.toFixed(1)} m/s</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DroneList;
