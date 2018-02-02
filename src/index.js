export default function (points, bbox) {
  let pi, m, c, i, x, y, out, xCoords, yCoords;
  const len = points.length
  let part = [];
  const result = [];

  for (pi = 1; pi < len; pi++) {

    xCoords = [points[pi - 1][0], points[pi][0]]
    yCoords = [points[pi - 1][1], points[pi][1]]
    // non-vertical
    if (xCoords[0] !== xCoords[1]) {  
     
      // non-vertical & non-horizontal
      if (yCoords[0] !== yCoords[1]) {
        m = (yCoords[0] - yCoords[1]) / (xCoords[0] - xCoords[1])
        c = (xCoords[0] * yCoords[1] - xCoords[1] * yCoords[0]) / (xCoords[0] - xCoords[1])
        
        for (i = 0; i < 2; i++) {

          if (xCoords[i] < bbox[0]) {
            xCoords[i] = bbox[0]
            yCoords[i] = m * bbox[0] + c
          } else if (xCoords[i] > bbox[2]) {
            xCoords[i] = bbox[2]
            yCoords[i] = m * bbox[2] + c         
          }

          if (yCoords[i] < bbox[1]) {
            xCoords[i] = (bbox[1] - c) / m
            yCoords[i] = bbox[1]
          } else if (yCoords[i] > bbox[3]) {
            xCoords[i] = (bbox[3] - c) / m
            yCoords[i] = bbox[3]          
          }
        }

        if ((xCoords[0] - xCoords[1] < 1) && (xCoords[1] - xCoords[0] < 1)) {
          if (part.length === 0) result.push(part)
          part = []
        } else {
          if (part.length === 0) {
            part = [[xCoords[0], yCoords[0]], [xCoords[1], yCoords[1]]]
          } else if (part[1][0] !== xCoords[0] || part[1][1] !== yCoords[0]) {
            result.push(part)
            part = [[xCoords[0], yCoords[0]], [xCoords[1], yCoords[1]]]
          } else {
            part.push([xCoords[1], yCoords[1]])
          }
        }

      } else { // non-vertical but horizontal segment
        if (a[1] <= bbox[1] || a[1] >= bbox[3]) {
          if (part.length === 0) result.push(part)
          part = []
        } else {
          const out = [a, b]

           for (i = 0; i < 2; i++) {
            if (i === 0) x = a[0], y = a[1]
            else x = b[0], y = b[1]
            if (x[0] < bbox[0]) { 
              x[0] = bbox[0]
            } else if (x[0] > bbox[2]) {
              x[0] = bbox[2]
            }
            out[i][0] = x
            out[i][1] = y
          }

          if ((a[0] - b[0] < 1) && (b[0] - a[0] < 1)) {
            result.push(part)
          } else {
            if (part.length === 0) {
              part = [[xCoords[0], yCoords[0]], [xCoords[1], yCoords[1]]]
            } else if (part[1][0] !== xCoords[0] || part[1][1] !== yCoords[0]) {
              result.push(part)
              part = [[xCoords[0], yCoords[0]], [xCoords[1], yCoords[1]]]
            } else {
              part.push([xCoords[1], yCoords[1]])
            }
          }
        }
      }
    } else { 
      if (a[1] === b[1]) {
        if (a[1] <= bbox[1] || a[1] >= bbox[3]) {
          if (part.length === 0) result.push(part)
          part = []
        } else if (a[0] <= bbox[0] || a[0] >= bbox[2]) {
          if (part.length === 0) result.push(part)
          part = []
        } else {
          part.push([a, b])
        }
      } else if (a[0] <= bbox[0] || a[0] >= bbox[2]) {
        if (part.length === 0) result.push(part)
        part = []
      } else {
          const out = [a, b]
          for (i = 0; i < 2; i++) {
            if (i === 0) x = a[0], y = a[1]
            else x = b[0], y = b[1]
            if (y[1] < bbox[1]) { 
              y[1] = bbox[1]
            } else if (y[1] > bbox[3]) {
              y[1] = bbox[3]
            }
            out[i][0] = x
            out[i][1] = y
          }
          if (a[1] - b[1] < 1 && b[1] - a[1] < 1) {
            if (part.length === 0) result.push(part)
            part = []
          } else {
            part.push(out)
          }
      }
    }

  }
  result.push(part)
  return result
}

