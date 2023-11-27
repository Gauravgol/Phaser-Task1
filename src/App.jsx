import React, { useState, useRef, useEffect } from "react";
import "./index.css";
import ringtone from "./click.wav"; // Update with your actual file name

let date = new Date().toLocaleDateString();
let startTime = 0;
let endtime = 0;
let id = 1;
let clickbutton1 = "";

function App() {
  const [count, setCount] = useState(0);
  const [isBouncing, setIsBouncing] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Load and play the audio when the component mounts
    audioRef.current.src = ringtone;
    audioRef.current.loop = true;
    
  }, []);

  useEffect(() => {
    if (count > 0) {
      setIsBouncing(true); // Start bouncing when the count is greater than 0
    } else {
      setIsBouncing(false); // Stop bouncing when the count is 0
    }
  }, [count]);

  function onclickreset() {
    clickbutton1 = (document.getElementById("clickbutton").disabled = true);
    const num = Math.floor(Math.random() * (120 - 30 + 1)) + 30;
    startTime = new Date().toLocaleTimeString();
    setCount(num);
    startTimer(num);
  }

  const startTimer = (num) => {
    const Interval = setInterval(() => {
      setCount((count) => count - 1);
      num = num - 1;
      if (num === 0) {
        clearInterval(Interval);
        endtime = new Date().toLocaleTimeString();
        form();
        id = id + 1;
        clickbutton1 = (document.getElementById("clickbutton").disabled = false);
        audioRef.current.pause(); // Pause the audio when the countdown is completed
      }
    }, 1000);

    // Play the audio in a loop
    audioRef.current.play();
  };

  const form = () => {
    const tbodyEL = document.querySelector("tbody");
    tbodyEL.innerHTML += `
      <tr>
      <th> ${id}</th>
      <th>${date} ${startTime}</th>
      <th>${endtime}</th>
    </tr>
      `;
  };

  return (
    <>
      <div className="container">
      <h1>{count}</h1>
        <div className="counter">
          <div
            className={`count ${isBouncing ? "bounce" : ""}`}
            onClick={() => setIsBouncing(true)}
          >
           
          </div>
          <div className="btn">
            <button
              id="clickbutton"
              onClick={() => {
                onclickreset();
              }}
            >
              Start Session
            </button>
          </div>
        </div>
        <div className="circle">
          <div className={`ball ${isBouncing ? "bounce" : ""}`}></div>
        </div>
      </div>
      <form>
        <table>
          <thead>
            <tr>
              <th>Session Id</th>
              <th>Start Time</th>
              <th>End Time</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </form>
      {/* Audio element for playing the sound */}
      <audio ref={audioRef}></audio>
    </>
  );
}

export default App;
