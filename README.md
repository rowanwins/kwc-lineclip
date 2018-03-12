## kwc-lineclip
A small javascript lib for clipping polylines by a bounding box.

### API
```js
lineclip(
    [[-10, 10], [10, 10], [10, -10]], // polyline
    [0, 0, 20, 20]); // bbox
// returns [[[0, 10], [10, 10], [10, 0]]]
```

### Algorithm
This library is an implementation of the approach described in ['An Efficient Algorithm for Line Clipping in Computer Graphics Programming'](http://www.academia.edu/2491960/An_Efficient_Algorithm_for_Line_Clipping_in_Computer_Graphics_Programming) by Kodituwakka, Wijeweera & Chamikara. Some adjustments have been made to the algorithm in the paper to cater for lines with multiple segments.

### Performance
I've checked the performance of this algorithm against implementations of the [Cohen-Sutherland](https://github.com/mapbox/lineclip) and a [Liang-barsky](https://github.com/w8r/liang-barsky) algorithms for clipping just one segment. Liang-barsky currently only supports a single segment clip.
````
SINGLE SEGMENT TEST
kwc x 7,865,473 ops/sec ±2.59% (102 runs sampled)
liang-barsky (non-destructive) x 14,621,410 ops/sec ±3.53% (97 runs sampled)
mapbox/lineclip x 6,228,820 ops/sec ±0.78% (105 runs sampled)
- Fastest is liang-barsky (non-destructive)

MULTIPLE SEGMENT MULTIPLE OUTPUT TEST
kwc x 5,203,392 ops/sec ±0.52% (107 runs sampled)
mapbox/lineclip x 2,908,637 ops/sec ±3.81% (88 runs sampled)
- Fastest is kwc

LONGER LINE
kwc x 679,875 ops/sec ±0.83% (104 runs sampled)
mapbox/lineclip x 604,637 ops/sec ±0.67% (108 runs sampled)
- Fastest is kwc
````

kwc-lineclip was initially faster than liang-barsky until I amended the algorithm to support multiple segments.

Memory usage is also slightly less in with this module compared with `lineclip`.
