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
kwc x 4,881,087 ops/sec ±10.38% (52 runs sampled)
liang-barsky (non-destructive) x 8,973,138 ops/sec ±7.87% (55 runs sampled)
mapbox/lineclip x 3,654,875 ops/sec ±12.99% (53 runs sampled)
- Fastest is liang-barsky

MULTIPLE SEGMENT MULTIPLE OUTPUT TEST
kwc x 3,402,363 ops/sec ±9.29% (63 runs sampled)
mapbox/lineclip x 2,344,608 ops/sec ±8.11% (64 runs sampled)
- Fastest is kwc

LONGER LINE
kwc x 586,941 ops/sec ±8.88% (66 runs sampled)
mapbox/lineclip x 357,906 ops/sec ±12.96% (50 runs sampled)
- Fastest is kwc
````

kwc-lineclip was initially faster than liang-barsky until I amended the algorithm to support multiple segments.
