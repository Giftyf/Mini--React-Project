import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  //initialize neccessary varialbes
  let [elementIndex,setElementIndex] =useState(0);
  const [elements, setElements] =useState([]);

  let [twilightIndex,setTwilightIndex] =useState(0);
  const [twilights, settwilights] =useState([]);

  const [qualityIndexes, setQualityIndexes] = useState([]); 
  const [qualities, setQualities] =useState([]);

  const [planetResult, setPlanetResult] = useState("");

  //read the json file into the array
  useEffect(() =>{
    fetch("http://localhost:3000/data/planet.json")
    .then(res=> {
      return res.json()
    })
    .then(data =>{
      setQualities(data["qualities"]);
      setElements(data["element"]);
      settwilights(data["twilight"]);
      console.log(data['twilight'][0]);
    })
  }, []);

  //handle changes 
  const handleElementChange = (e) => {
    setElementIndex(parseInt(e.target.value, 10));
  };

  const handleTwilightChange = (e) => {
    setTwilightIndex(parseInt(e.target.value, 10));
  };

  const handleQualityToggle = (i) => {
    setQualityIndexes(prev => 
      prev.includes(i) ? prev.filter(index => index !== i) : [...prev, i]
    );
  };

  //this counts the number of occurances of the planets from the labels of the userchoice
  const getPlanetResult = () => {
    let venus = 0, neptune = 0, uranus = 0, earth = 0;
    //this function handles incrementing the counts based on the planet
    const addPlanet = (planet) => {
      if (planet === "Venus") {
        venus++;
      }
      else if (planet === "Neptune") {
        neptune++;
      }
      else if (planet === "Uranus") {
        uranus++;
      }
      else if (planet === "Earth") {
        earth++;
      }
    };
    //this get the picked radiobutton element
    if (elements[elementIndex]) {
      addPlanet(elements[elementIndex].planet);
    }
    //this gets the selected twilight
    if (twilights[twilightIndex]) {
      addPlanet(twilights[twilightIndex].planet);
    }
    //this handles the boxes selected from the checkboxes
    qualityIndexes.forEach(i => {
      if (qualities[i]) addPlanet(qualities[i].planet);
    });
  

    //get the max count
    const max = Math.max(venus, neptune, uranus, earth);
    

    //get the first element that has the same count as the maximum count and assign it to planet result
    let result = "";
    if (venus === max) {
      result = "Venus";
    }
    else if (neptune === max) {
      result = "Neptune";
    }
    else if (uranus === max) {
       result = "Uranus";
    }
    else if (earth === max) 
      {
        result = "Earth";
      }
  
    setPlanetResult(result);  
  };
  

  return (

    <div>
      <h2>What Kind of Planet are You?</h2>
      <h3>Take the quiz to get the answer.</h3>
      <a href="pages/quiz.html" target="_blank" rel="noopener noreferrer">Take Space Quize</a>
      <br/>
      <a href="pages/explore.html" target="_blank" rel="noopener noreferrer">Click Here to Explore more about Space</a>
      <div className="wrapper">
      <div className="box">
        <h3>Element</h3>
        {elements.map((element, i) => (
          <div key={i}>
            <input id={`element_${i}`} type="radio" name="element"value={i}checked={elementIndex === i} onChange={handleElementChange}/>
            <label htmlFor={`element_${i}`}>{element.label}</label>
          </div>
        ))}
      </div>
      <div className="box">
        <h3>Qualities</h3>
        {qualities.map((quality, i) => (
          <div key={i}>
            <input
              id={`quality_${i}`}
              type="checkbox"
              value={i}
              checked={qualityIndexes.includes(i)}
              onChange={() => handleQualityToggle(i)}
            />
            <label htmlFor={`quality_${i}`}>{quality.label}</label>
          </div>
        ))}
      </div>

      <div className="box">
        <h3>Twilight</h3>
        <select value={twilightIndex} onChange={handleTwilightChange}>
          {twilights.map((twilight, i) => (
            <option key={i} value={i}>
              {twilight.label}
            </option>
          ))}
        </select>
      </div>

        <div className="box" style={{ gridColumn: "1 / span 3" }}>
        <button onClick={getPlanetResult}>Get Your Planet</button>
        <p>You are most like <strong>{planetResult}</strong>! </p>
        </div>
      </div>
      <footer>
        <address>Mady by:Nigist Legesse (05/02/2025)</address>
      </footer>
    </div>
  );
}

export default App;
