# AI Autonomous Drone Monitoring System

A real-time web application for monitoring autonomous drones with AI-powered object detection capabilities.

## Features

- **Real-time Drone Tracking**: Live position updates via WebSocket
- **Interactive Map**: Google Maps integration for drone location visualization
- **Telemetry Dashboard**: Display of battery, altitude, speed, and status
- **AI Object Detection**: Structure for AI-powered object detection (placeholder)
- **Command Center**: Send commands to drones (takeoff, land, return, etc.)
- **Responsive UI**: Clean, modern interface built with React

## Tech Stack

### Frontend
- React 18
- Vite (build tool)
- @react-google-maps/api (Google Maps integration)

### Backend
- Node.js
- Express.js
- WebSocket (ws)
- CORS

## Project Structure

```
AI Autonomous Drone Monitoring/
├── backend/
│   ├── server.js           # Express server with WebSocket
│   ├── package.json        # Backend dependencies
│   └── .gitignore
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── DroneMap.jsx      # Google Maps component
│   │   │   ├── DroneList.jsx     # Drone list sidebar
│   │   │   └── DroneDetails.jsx  # Selected drone details
│   │   ├── App.jsx        # Main application component
│   │   ├── main.jsx       # React entry point
│   │   ├── App.css        # Main styles
│   │   ├── index.css      # Global styles
│   │   └── components/    # Component-specific styles
│   ├── index.html         # HTML template
│   ├── vite.config.js     # Vite configuration
│   ├── package.json       # Frontend dependencies
│   └── .gitignore
└── README.md
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Google Maps API Key

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Replace the Google Maps API key placeholder:
   - Open `frontend/src/components/DroneMap.jsx`
   - Replace `YOUR_GOOGLE_MAPS_API_KEY` with your actual API key

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Usage

1. Start the backend server (in one terminal):
```bash
cd backend
npm start
```

2. Start the frontend server (in another terminal):
```bash
cd frontend
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

4. You will see:
   - A map showing drone positions with colored markers
   - A sidebar listing all active drones with their telemetry
   - Click on a drone to view detailed information
   - Send commands to selected drones

## Drone Status Indicators

- **Green**: Active - Drone is flying
- **Yellow**: Idle - Drone is on standby
- **Blue**: Charging - Drone is recharging
- **Orange**: Returning - Drone is returning to base

## API Endpoints

### GET /api/drones
Returns all drone data

### GET /api/drones/:id
Returns data for a specific drone

### POST /api/drones/:id/command
Send a command to a drone

Body:
```json
{
  "command": "takeoff|land|return_to_base|hover|emergency_stop"
}
```

## WebSocket Events

### Connection
Connect to `ws://localhost:5000`

### Message Types

#### initial_data
Sent when client connects. Contains initial drone data.

#### drone_update
Sent every second with updated drone positions and telemetry.

## AI Object Detection

The application includes a placeholder structure for AI object detection. To implement actual object detection:

1. Set up an AI model (e.g., TensorFlow.js, OpenCV, or a cloud-based service)
2. Integrate the model in the backend or frontend
3. Process drone camera feeds
4. Update the detection status in the DroneDetails component

## Mock Data

The backend includes a mock data generator that simulates:
- Drone movement patterns
- Battery consumption
- Status changes (active → returning → charging → idle)
- Real-time telemetry updates

## Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-reload
```

### Frontend Development
```bash
cd frontend
npm run dev  # Vite dev server with hot reload
```

### Build for Production
```bash
cd frontend
npm run build
```

The built files will be in the `frontend/dist` directory.

## Future Enhancements

- [ ] Integrate real AI/ML model for object detection
- [ ] Add video streaming from drone cameras
- [ ] Implement route planning and waypoint management
- [ ] Add authentication and user management
- [ ] Database integration for historical data
- [ ] Alert system for anomalies and low battery
- [ ] Fleet management with multiple drone groups
- [ ] Weather integration for flight planning
- [ ] Export telemetry data
- [ ] Mobile app version

## Troubleshooting

### WebSocket Connection Issues
- Ensure the backend is running on port 5000
- Check firewall settings
- Verify CORS configuration

### Google Maps Not Loading
- Verify your API key is valid
- Check that Maps JavaScript API is enabled in Google Cloud Console
- Ensure billing is set up in Google Cloud Console

### Drone Data Not Updating
- Check browser console for WebSocket errors
- Verify backend is running and generating data
- Check network tab in browser DevTools

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
