import { useState } from "react";
import "./App.css";
import CatCard from "./Components/CatCard";
const API_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

const App = () => {
  const [url, setUrl] = useState("");
  // name of the cat
  const [name, setName] = useState("");
  // refactor into multiple state variables
  const [attributes, setAttributes] = useState([]);

  const [banList, setBanList] = useState([]);

  const makeQuery = () => {
    // let wait_until = "network_idle";
    // let response_type = "json";
    // let fail_on_status = "400%2C404%2C500-511";
    // let url_starter = "https://";
    // let fullURL = url_starter + inputs.url;
    let query = `https://api.thecatapi.com/v1/images/search?limit=1&has_breeds=1&api_key=${API_KEY}`;
    callAPI(query).catch(console.error);
  };

  const callAPI = async (query) => {
    const response = await fetch(query);
    const json = await response.json();
    if (json && json[0].url == null) {
      alert("Oops! Something went wrong with that query, let's try again!");
    } else {
      setUrl(json[0].url);
      setName(json[0].breeds[0].name);
      setAttributes([
        ...[],
        json[0].breeds[0].life_span + " years",
        json[0].breeds[0].origin,
        json[0].breeds[0].weight.imperial + " lbs",
      ]);
    }
  };

  const submitForm = () => {
    makeQuery();
  }

  const handleBan = (name) => {
    if (!banList.includes(name)) {
      setBanList([...banList, name]);
    }
    makeQuery();
  };

  return (
    <div className="background-image">
      <div>
        <h1 className="title"> Cat Explorer </h1>
        <h2>Discovering the world of cats, one click at a time!</h2>
        <h3>Enjoy Discovering :)</h3>
        <div className="ban-list">
          <h4>Ban List:</h4>
          <ul>
            {banList.map((bannedCat) => (
              <li key={bannedCat}>{bannedCat}</li>
            ))}
          </ul>
        </div>
        {url &&!banList.includes(name) && (
          <CatCard catname={name} attributes={attributes} image={url}/>
        )}
        <button onClick={submitForm}> Click Me 🔥!</button>
        <button onClick={() => handleBan(name)}>Ban ❌ </button>
      </div>
      <h4>Note: banning the cat, will prevent it from showing up again.</h4>
    </div>
  );
};

export default App;