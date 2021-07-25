import React, { useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';
import Webcam from 'react-webcam';
import './App.css';
import { drawHand, drawRect} from './utils';

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runHandpose = async () => {
    const net = await handpose.load();
    
    console.log("Init.");
    setInterval(() => {
      detect(net);
    }, 15);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const hand = await net.estimateHands(video);
      // console.log(hand);

      const ctx = canvasRef.current.getContext("2d");
      const fetchData = () => {
        return fetch("http://127.0.0.1:8080/bbox")
              .then((response) => response.json());}

      const bbox = await fetchData();
      console.log(bbox.bbox);

      drawHand(hand, ctx);
      drawRect([bbox.bbox], [1], [0.99], 0.8, videoWidth, videoHeight, ctx);

    }
  };

  runHandpose()

  return (
    <div className="App">
      <h1>Hand Pose</h1>
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}

export default App;
