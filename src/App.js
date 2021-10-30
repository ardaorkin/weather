import React from "react";
import "./App.css";

function App() {
  const [geo, setGeo] = React.useState({});
  const [unit, setUnit] = React.useState("metric");
  const [textDecoration, setTextDecoration] = React.useState("none");
  const [weatherHTML, setWeatherHTML] = React.useState("");

  React.useEffect(() => {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos) {
      var crd = pos.coords;
      setGeo({ latitude: crd.latitude, longitude: crd.longitude });
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  React.useEffect(() => {
    if (Object.keys(geo).length > 0) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${geo.latitude}&lon=${geo.longitude}&units=${unit}&mode=html&appid=cf372a8d905ea26fa72bd3f0e709ddb9`
      )
        .then(function (response) {
          return response.text();
        })
        .then(function (data) {
          setWeatherHTML(data);
        })
        .catch((error) => console.log(error));
    }
  }, [geo, unit]);

  const handleUnit = () => {
    if (unit === "metric") {
      setUnit("imperial");
    } else {
      setUnit("metric");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {weatherHTML.length === 0 ? null : (
          <>
            <div dangerouslySetInnerHTML={{ __html: weatherHTML }}></div>
            <button
              onClick={handleUnit}
              onMouseEnter={() => setTextDecoration("underline")}
              onMouseLeave={() => setTextDecoration("none")}
              style={{ textDecoration }}
            >
              Convert to {unit === "imperial" ? "Fahrenheit" : "Celsius"}
            </button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
