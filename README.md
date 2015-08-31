# Introduction
Abstract svg path from TTF and response JSON. You are able to generate the glys of TTF via these APIs. Also, the TypefaceJS like data is being served as well now.

# Online API
## Get a feed of glys path by a character.
URI - https://jsgao0-3d-font-feeder.herokuapp.com/getGlyfPathByChar/:char<br/>
You must set the character 'b' and you will get [the feed as JSON](https://jsgao0-3d-font-feeder.herokuapp.com/getGlyfPathByChar/b) of character 'b' from this URI.<br/>
You will get the reponse as below:
```
{"char":"b","glyfPath":"M25,40   L25,125   Q25,141  13,150   Q7,155  7,159   Q7,164  19,169   Q24,171  25,172   Q25,172  27,173   Q28,173  34,177   Q44,184  51,184   Q69,186  67,160   L67,30   Q66,18  82,19   Q114,21  114,55   Q114,84  86,93   Q74,98  74,103   Q77,120  108,123   Q153,120  156,69   Q151,6  86,0   Q73,0  56,1   L42,1   Q36,1  26,0   L17,0   Q6,0  6,8   Q6,14  14,19   Q26,27  25,40   Z "}
```

## Get the data of TypefaceJS by a character.
URI - https://jsgao0-3d-font-feeder.herokuapp.com/serveTypefaceJS/:char<br/>
You must set the character 'b' and you will get [the TypefaceJS data as JSON](https://jsgao0-3d-font-feeder.herokuapp.com/serveTypefaceJS/b) of character 'b' from this URI.
You will get the reponse as below:
```
{"x_min":6,"x_max":156,"ha":186,"o":"m 25 40 l 25 125 q 25 141 13 150 q 7 155 7 159 q 7 164 19 169 q 24 171 25 172 q 25 172 27 173 q 28 173 34 177 q 44 184 51 184 q 69 186 67 160 l 67 30 q 66 18 82 19 q 114 21 114 55 q 114 84 86 93 q 74 98 74 103 q 77 120 108 123 q 153 120 156 69 q 151 6 86 0 q 73 0 56 1 l 42 1 q 36 1 26 0 l 17 0 q 6 0 6 8 q 6 14 14 19 q 26 27 25 40 "}
```

## Cautions
* You will get the data of only one single character even if you send above one character.
* You will receive the data of the first character.
* Reponse content type is JSONP.
