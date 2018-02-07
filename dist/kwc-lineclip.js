'use strict';

function index (points, bbox) {
  let pi, m, c, i, xCoords, yCoords;
  const len = points.length;
  let part = [];
  const result = [];

  const minx = bbox[0];
  const maxx = bbox[2];
  const miny = bbox[1];
  const maxy = bbox[3];

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
          if (xCoords[i] < minx) {
            xCoords[i] = minx;
            yCoords[i] = m * minx + c;
          } else if (xCoords[i] > maxx) {
            xCoords[i] = maxx;
            yCoords[i] = m * maxx + c;
          }

          if (yCoords[i] < miny) {
            xCoords[i] = (miny - c) / m;
            yCoords[i] = miny;
          } else if (yCoords[i] > maxy) {
            xCoords[i] = (maxy - c) / m;
            yCoords[i] = maxy;
          }
        }
        if ((xCoords[0] - xCoords[1] === 0) && (xCoords[1] - xCoords[0] === 0)) {
          part = finishLine(result, part);
        } else {
          part = includeInResult(result, part, xCoords, yCoords, bbox);
        }

      } else { // non-vertical but horizontal segment
        if (yCoords[0] < miny || yCoords[0] > maxy) {
          part = finishLine(result, part);
        } else {
          for (i = 0; i < 2; i++) {
            if (xCoords[i] < minx) {
              xCoords[i] = minx;
            } else if (xCoords[i] > maxx) {
              xCoords[i] = maxx;
            }
          }
          if ((xCoords[0] - xCoords[1] === 0) && (xCoords[1] - xCoords[0] === 0)) {
            part = finishLine(result, part);
          } else {
            part = includeInResult(result, part, xCoords, yCoords, bbox);
          }
        }
      }
    } else {
      if (yCoords[0] === yCoords[1]) {
        if (yCoords[0] < miny || yCoords[0] > maxy) {
          part = finishLine(result, part);
        } else if (xCoords[0] < minx || xCoords[0] > maxx) {
          part = finishLine(result, part);
        } else {
          part = includeInResult(result, part, xCoords, yCoords, bbox);
        }
      } else if (xCoords[0] < minx || xCoords[0] > maxx) {
        part = finishLine(result, part);
      } else {
        for (i = 0; i < 2; i++) {
          if (yCoords[i] < miny) {
            yCoords[i]  = miny;
          } else if (yCoords[i] > maxy) {
            yCoords[i]  = maxy;
          }
        }
        if (yCoords[0] - yCoords[1] === 0 && yCoords[1] - yCoords[0] === 0) {
          part = finishLine(result, part);
        } else {
          part = includeInResult(result, part, xCoords, yCoords, bbox);
        }
      }
    }
  }
  if (part.length > 0) result.push(part);
  return result
}

function includeInResult(result, part, xCoords, yCoords) {
  if (part.length === 0) {
    return [[xCoords[0], yCoords[0]], [xCoords[1], yCoords[1]]]
  } else if (part[part.length - 1][0] !== xCoords[0] || part[part.length - 1][1] !== yCoords[0]) {
    result.push(part);
    return [[xCoords[0], yCoords[0]], [xCoords[1], yCoords[1]]]
  } else {
    part.push([xCoords[1], yCoords[1]]);
  }
  return part
}

function finishLine(result, part) {
  if (part.length > 0) result.push(part);
  return []
}

module.exports = index;
