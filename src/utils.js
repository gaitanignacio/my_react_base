const labelMap = {
  1:{name:'Class1', color:'blue'},
  2:{name:'Class2', color:'yellow'},
  3:{name:'Class3', color:'lime'},
  4:{name:'Class4', color:'red'},
  5:{name:'Class5', color:'purple'},
}

export const drawRect = (boxes, classes, scores, threshold, imgWidth, imgHeight, ctx)=>{
  for(let i=0; i<=boxes.length; i++){
      if(boxes[i] && classes[i] && scores[i]>threshold){
          const [y,x,height,width] = boxes[i]
          const text = classes[i]

          ctx.strokeStyle = labelMap[text]['color']
          ctx.lineWidth = 10
          ctx.fillStyle = 'white'
          ctx.font = '30px Arial'         

          ctx.beginPath()
          ctx.fillText(labelMap[text]['name'] + ' - ' + Math.round(scores[i]*100)/100, x*imgWidth, y*imgHeight-10)
          ctx.rect(x*imgWidth, y*imgHeight, width*imgWidth/2, height*imgHeight/1.5);
          ctx.stroke()
      }
  }
}

const fingerJoints = {
  thumb: [0, 1, 2, 3, 4],
  indexFinger: [0, 5, 6, 7, 8],
  middleFinger: [0, 9, 10, 11, 12],
  ringFinger: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20],
};

const style = {
  0: { color: "blue", size:8},
  1: { color: "blue", size:8},
  2: { color: "blue", size:8},
  3: { color: "blue", size:8},
  4: { color: "blue", size:8},
  5: { color: "blue", size:8},
  6: { color: "blue", size:8},
  7: { color: "blue", size:8},
  8: { color: "blue", size:8},
  9: { color: "blue", size:8},
  10: { color: "blue", size:8},
  11: { color: "blue", size:8},
  12: { color: "blue", size:8},
  13: { color: "blue", size:8},
  14: { color: "blue", size:8},
  15: { color: "blue", size:8},
  16: { color: "blue", size:8},
  17: { color: "blue", size:8},
  18: { color: "blue", size:8},
  19: { color: "blue", size:8},
  20: { color: "blue", size:8},
};

export const drawHand = (predictions, ctx) => {
  if (predictions.length > 0) {
    predictions.forEach((prediction) => {
      const landmarks = prediction.landmarks;

      for (let j = 0; j < Object.keys(fingerJoints).length; j++) {
        let finger = Object.keys(fingerJoints)[j];
        for (let k = 0; k < fingerJoints[finger].length - 1; k++) {
          const firstJointIndex = fingerJoints[finger][k];
          const secondJointIndex = fingerJoints[finger][k + 1];

          ctx.beginPath();
          ctx.moveTo(
            landmarks[firstJointIndex][0],
            landmarks[firstJointIndex][1]
          );
          ctx.lineTo(
            landmarks[secondJointIndex][0],
            landmarks[secondJointIndex][1]
          );
          ctx.strokeStyle = "blue";
          ctx.lineWidth = 4;
          ctx.stroke();
        }
      }

      for (let i = 0; i < landmarks.length; i++) {
        const x = landmarks[i][0];
        const y = landmarks[i][1];
        ctx.beginPath();
        ctx.arc(x, y, style[i]["size"], 0, 3 * Math.PI);
        ctx.fillStyle = style[i]["color"];
        ctx.fill();
      }
    });
  }
};
