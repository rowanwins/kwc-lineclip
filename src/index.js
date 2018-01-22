export default function (lines, bbox) {
  let m, c, i;

  // non-vertical lines
  if (lines[0][0] !== lines[1][0]) {  
    
    // non-vertical & non-horizontal
    if (lines[0][1] !== lines[1][1]) {
      m = (lines[0][1] - lines[1][1]) / (lines[0][0] - lines[1][0])
      c = (lines[0][0] * lines[1][1] - lines[1][0] * lines[0][1]) / (lines[0][0] - lines[1][0])
      
      for (i = 0; i < 2; i++) {
        if (lines[i][0] < bbox[0]) { 
          lines[i][0] = bbox[0]
          lines[i][1] = m * bbox[0] + c
        } else if (lines[i][0] > bbox[2]) {
          lines[i][0] = bbox[2]
          lines[i][1] = m * bbox[2] + c         
        }

        if (lines[i][1] < bbox[1]) {
          lines[i][0] = (bbox[1] - c) / m
          lines[i][1] = bbox[1]
        } else if (lines[i][1] > bbox[3]) {
          lines[i][0] = (bbox[3] - c) / m
          lines[i][1] = bbox[3]          
        }
      }

      if ((lines[0][0] - lines[1][0] < 1) && (lines[1][0] - lines[0][0] < 1)) {
        console.log('completely outside')
      }

    } else { // non-vertical but horizontal lines
      if (lines[0][1] <= bbox[1] || lines[0][1] >= bbox[3]) {
        console.log('completely outside')
      } else {
         for (i = 0; i < 2; i++) {
          if (lines[i][0] < bbox[0]) { 
            lines[i][0] = bbox[0]
          } else if (lines[i][0] > bbox[2]) {
            lines[i][0] = bbox[2]
          }
        }

        if ((lines[0][0] - lines[1][0] < 1) && (lines[1][0] - lines[0][0] < 1)) {
          console.log('completely outside')
        }
      }
    }
  } else { //vertical lines
    if (lines[0][1] === lines[1][1]) {
      if (lines[0][1] <= bbox[1] || lines[0][1] >= bbox[3]) {
        console.log('do nothing')
      } else if (lines[0][0] <= bbox[0] || lines[0][0] >= bbox[2]) {
        console.log('do nothing')
      } else {
        console.log("part of result")
      }
    } else if (lines[0][0] <= bbox[0] || lines[0][0] >= bbox[2]) {
      console.log('do nothing')
    } else {
        for (i = 0; i < 2; i++) {
          if (lines[i][1] < bbox[1]) { 
            lines[i][1] = bbox[1]
          } else if (lines[i][1] > bbox[3]) {
            lines[i][1] = bbox[3]
          }
        }
    }
  }
}