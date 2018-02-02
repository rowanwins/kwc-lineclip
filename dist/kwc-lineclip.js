'use strict';

function index (points, bbox) {
  let pi, m, c, i, xCoords, yCoords;
  const len = points.length;
  let part = [];
  const result = [];

  for (pi = 1; pi < len; pi++) {

    xCoords = [points[pi - 1][0], points[pi][0]];
    yCoords = [points[pi - 1][1], points[pi][1]];

    // non-vertical
    if (xCoords[0] !== xCoords[1]) {

      // non-vertical & non-horizontal
      if (yCoords[0] !== yCoords[1]) {
        m = (yCoords[0] - yCoords[1]) / (xCoords[0] - xCoords[1]);
        c = (xCoords[0] * yCoords[1] - xCoords[1] * yCoords[0]) / (xCoords[0] - xCoords[1]);

        for (i = 0; i < 2; i++) {
          if (xCoords[i] < bbox[0]) {
            xCoords[i] = bbox[0];
            yCoords[i] = m * bbox[0] + c;
          } else if (xCoords[i] > bbox[2]) {
            xCoords[i] = bbox[2];
            yCoords[i] = m * bbox[2] + c;
          }

          if (yCoords[i] < bbox[1]) {
            xCoords[i] = (bbox[1] - c) / m;
            yCoords[i] = bbox[1];
          } else if (yCoords[i] > bbox[3]) {
            xCoords[i] = (bbox[3] - c) / m;
            yCoords[i] = bbox[3];
          }
        }
        if ((xCoords[0] - xCoords[1] < 1) && (xCoords[1] - xCoords[0] < 1)) {
          if (points[pi - 1][0] === xCoords[0]) finishLine(result, part);
          else part = includeInResult(result, part, xCoords, yCoords);
        } else {
          part = includeInResult(result, part, xCoords, yCoords);
        }

      } else { // non-vertical but horizontal segment
        if (yCoords[0] <= bbox[1] || yCoords[0] >= bbox[3]) {
          finishLine(result, part);
        } else {
          for (i = 0; i < 2; i++) {
            if (xCoords[0] < bbox[0]) {
              xCoords[0] = bbox[0];
            } else if (xCoords[0] > bbox[2]) {
              xCoords[0] = bbox[2];
            }
          }

          if ((xCoords[0] - xCoords[1] < 1) && (xCoords[1] - xCoords[0] < 1)) {
            finishLine(result, part);
          } else {
            part = includeInResult(result, part, xCoords, yCoords);
          }
        }
      }
    } else {
      if (yCoords[0] === yCoords[1]) {
        if (yCoords[0] <= bbox[1] || yCoords[0] >= bbox[3]) {
          finishLine(result, part);
        } else if (xCoords[0] <= bbox[0] || xCoords[0] >= bbox[2]) {
          finishLine(result, part);
        } else {
          part = includeInResult(result, part, xCoords, yCoords);
        }
      } else if (xCoords[0] <= bbox[0] || xCoords[0] >= bbox[2]) {
        finishLine(result, part);
      } else {

        for (i = 0; i < 2; i++) {
          if (yCoords[i] < bbox[1]) {
            yCoords[i]  = bbox[1];
          } else if (yCoords[i] > bbox[3]) {
            yCoords[i]  = bbox[3];
          }
        }
        if (yCoords[0] - yCoords[1] < 1 && yCoords[1] - yCoords[0] < 1) {
          finishLine(result, part);
        } else {
          part = [[xCoords[0], yCoords[0]], [xCoords[1], yCoords[1]]];
          result.push(part);
          part = [];
        }
      }
    }
  }
  result.push(part);
  return result
}

function includeInResult(result, part, xCoords, yCoords) {
  if (part.length === 0) {
    part = [[xCoords[0], yCoords[0]], [xCoords[1], yCoords[1]]];

  } else if (part[1][0] !== xCoords[0] || part[1][1] !== yCoords[0]) {
    result.push(part);
    part = [[xCoords[0], yCoords[0]], [xCoords[1], yCoords[1]]];
  } else {
    part.push([xCoords[1], yCoords[1]]);
  }
  return part
}

function finishLine(result, part) {
  if (part.length === 0) result.push(part);
  part = [];
}

module.exports = index;
