/**
 * Created by Brad on 2016-03-15.
 */
var SQ      = 25;   // square side in pixels
var HCOUNT  = 16;   // horizontal width in squares
var VCOUNT  = 26;   // vertical width in squares
var WIDTH   = SQ * HCOUNT;
var HEIGHT  = SQ * VCOUNT;

var canvas = document.getElementById("game");
canvas.width = WIDTH;
canvas.height = HEIGHT;
var ctx = canvas.getContext('2d');

// Object definitions
// Bridge, Cube, Left L, Right L, S shape, Z shape, T shape, Pipe (I)
// '0' is the normal orientation
// '1' is the object rotated 90 degrees clockwise
// '2' is the object rotated 180 degrees clockwise
// '3' is the object rotated 270 degrees clockwise

var objects = [
    {//Bridge
        fill: '#FFBF00',
        0:[[0,0],[1,0],[2,0],[0,1],[2,1]], 1:[[0,0],[1,0],[1,1],[0,2],[1,2]],
        2:[[0,0],[0,1],[2,0],[0,1],[2,1]], 3:[[0,0],[1,0],[0,1],[0,2],[1,2]]
    },
    {//Cube
        fill: '#000000',
        0:[[0,0],[1,1],[1,0],[0,1]], 1:[[0,0],[1,1],[0,1],[1,0]],
        2:[[0,0],[1,1],[1,0],[0,1]], 3:[[0,0],[1,1],[0,1],[1,0]]
    }

];
