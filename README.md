## Algorithm
This library is an implementation of the approach described in ['An Efficient Algorithm for Line Clipping in Computer Graphics Programming'](http://www.academia.edu/2491960/An_Efficient_Algorithm_for_Line_Clipping_in_Computer_Graphics_Programming) by Kodituwakka, Wijeweera & Chamikara.

## Performance
I've checked the performance of this algorithm against implementations of the Cohen-Sutherland and a Liang-barsky algorithms for clipping just one segment. 
````
kwc-lineclip x 7,195,163 ops/sec ±1.89% (91 runs sampled)
liang-barsky x 6,299,746 ops/sec ±1.73% (97 runs sampled)
mapbox/lineclip x 2,781,324 ops/sec ±1.57% (82 runs sampled)
- Fastest is kwc
````

## Future plan
Implement a sub-routine for polylines. Loop through pairs, tracking in-out transitions.