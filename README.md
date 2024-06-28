## Setup Instructions
Follow these steps to set up and run the project

## Clone the Repository
```$ git clone https://github.com/Rajon-Dash/REACT-CHART-APP.git```

## Navigate to the project directory
```$ cd REACT-CHART-APP```

## Install the dependencies
```$ npm install highcharts highcharts-react-official react-router-dom```

## Run the Development Server
```$ npm run dev```
## Open your web browser and go to the URL provided by the development server
```http://localhost:5173 or  http://localhost:3000```


## Authentication
use this  API to login 

```POST https://reqres.in/api/login
{
    "email": "eve.holt@reqres.in",
    "password": "cityslicka"
}
```

## File structure

```
project-root/
│
├── public/
│   ├── index.html
│   └── ...
│
├── src/
│   ├── components/              # Reusable components
│   │   ├── HighChart/           # HighChart component
│   │   │   ├── HighChart.jsx
│   │   │   ├── HighChart.css
│   └── └──...
│   │   ├── Login/               # Login component
│   │   │   ├── Login.jsx
│   │   │   ├── Login.css
│   └── ...
│   ├── App.js                   # Main app component
│   ├── index.js                 
│   └── ...
│
├── package.json
├── README.md
└── ...
```

