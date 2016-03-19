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
        fill: '#FFBF00',//orange
        0:[[0,0],[1,0],[2,0],[0,1],[2,1]], 1:[[0,0],[1,0],[1,1],[0,2],[1,2]],
        2:[[0,0],[0,1],[2,0],[0,1],[2,1]], 3:[[0,0],[1,0],[0,1],[0,2],[1,2]]
    },
    {//Cube
        fill: '#000000',//black
        0:[[0,0],[1,1],[1,0],[0,1]], 1:[[0,0],[1,1],[0,1],[1,0]],
        2:[[0,0],[1,1],[1,0],[0,1]], 3:[[0,0],[1,1],[0,1],[1,0]]
    },
    {//Line Piece!!!
        fill: '#00FFFF',//aqua blue
        0:[[0,0],[0,1],[0,2],[0,3]], 1:[[0,0],[1,0],[2,0],[3,0]],
        2:[[0,0],[0,1],[2,2],[0,3]], 3:[[0,0],[1,0],[2,0],[3,0]]
    },
    {//L Piece
        fill: '#FF0000',//red
        0:[[0,0],[1,1],[1,0],[0,1]], 1:[[0,0],[1,1],[0,1],[1,0]],
        2:[[0,0],[1,1],[1,0],[0,1]], 3:[[0,0],[1,1],[0,1],[1,0]]
    },
    {//Reverse L
        fill: '#FF00FF',//pink
        0: [[0,0],[1,0],[0,1],[0,2]], 1: [[0,0],[1,0],[2,0],[2,1]],
        2: [[1,0],[1,1],[1,2],[0,2]], 3: [[0,0],[0,1],[1,1],[2,1]]
    },
    {//T Piece
        fill: '#74DF00',//lime
        0:[[0,0],[1,1],[1,0],[0,1]], 1:[[0,0],[1,1],[0,1],[1,0]],
        2:[[0,0],[1,1],[1,0],[0,1]], 3:[[0,0],[1,1],[0,1],[1,0]]
    },
    {//S Piece
        fill: '##FFFF00',//lemon
        0: [[0,1],[1,1],[1,0],[2,0]], 1: [[0,0],[0,1],[1,1],[1,2]],
        2: [[0,1],[1,1],[1,0],[2,0]], 3: [[0,0],[0,1],[1,1],[1,2]]
    },
    {//Z Piece
        fill: '#0101DF',//blue
        0: [[0,0],[1,0],[1,1],[2,1]], 1: [[1,0],[1,1],[0,1],[0,2]],
        2: [[0,0],[1,0],[1,1],[2,1]], 3: [[1,0],[1,1],[0,1],[0,2]]
    }
];

// current object
var object = null;
// object's orientation
var orient = 2;
// last position of the object
var objectPos = [];
// horizontal position (offset) of the object
var hpos  = 4;
// vertical position (offset) of the object
var vpos  = 0;
// whether this is the first tick of a new object
var newOb = true;
// last tick's time
var t = new Date();
// If true the last object should be glued
var glue = false;

// The Map, Grid, Matrix .. whatever
// Note: The map has 3 types of fields (squares). Empty fields have
// value 1, fields that are occupied by the current moving object have value 2,
// and fields that are occupied by settled objects have a string value of the
// color in which they should be displayed (object's 'fill' property)
var Map = [];