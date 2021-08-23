# Mapping & General Check-In  
#meeting 

**Date**::  2021-08-13  
**Attendees**:: Graven & Vishal   

---

* Vishal's demo - https://codepen.io/10dimensions/pen/gOWEjLo
* Which projection are we using for the map?
    * Mercator - https://docs.mapbox.com/help/glossary/projection/
* Talked through grid size targets
    * Consider UX of claim + the practicality of displaying all the grid lines
    * Smaller grid necessitates tighter zoom or the grid overwhelms the view
    * There will be a hard limit on the number of coordinates a claim can include (path length) due to block size
    * Soft economic limitiations due to increased gas cost for every coordinate claimed
    * Likely land somewhere between 1 m^2 and 10 m^2
* Like in other areas, utilizing existing libraries and tools is best. In this case, we can try to utilize Mapbox's free from drawing library as much as possible
    * Start with rectangles (round to certain decimal lat/long)
        * Can draw multiple overlapping rectangles
        * Free form retangle "rounds up" to include any partial coordinates overlapped by shape
    * Eventually could add other shapes or free polygon drawing 
        * Requires more work on the front end to translate a complex shape to a path on our fixed grid, so will just start with rectangles only