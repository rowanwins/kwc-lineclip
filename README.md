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
kwc x 6,917,341 ops/sec ±8.76% (68 runs sampled)
liang-barsky (non-destructive) x 11,150,680 ops/sec ±12.46% (56 runs sampled)
mapbox/lineclip x 3,627,952 ops/sec ±15.14% (63 runs sampled)
- Fastest is liang-barsky (non-destructive)

MULTIPLE SEGMENT MULTIPLE OUTPUT TEST
kwc x 4,050,016 ops/sec ±8.64% (67 runs sampled)
mapbox/lineclip x 3,214,591 ops/sec ±6.04% (84 runs sampled)
- Fastest is kwc

LONGER LINE
kwc x 669,633 ops/sec ±5.99% (84 runs sampled)
mapbox/lineclip x 634,331 ops/sec ±4.26% (89 runs sampled)
- Fastest is kwc
````

kwc-lineclip was initially faster than liang-barsky until I amended the algorithm to support multiple segments.
