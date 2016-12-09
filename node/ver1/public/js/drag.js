/*
var startPath = function () {
    // path coordinates are best kept as relative distances
    // so that you can use the built in translate method
    this.ox = 0;
    this.oy = 0;
  },
  movePath = function (dx, dy) {
    // move is called with dx and dy, which we convert
    // into translate values, which are reset at the end
    // of the function
    var trans_x = dx-this.ox;
    var trans_y = dy-this.oy;
    this.translate(trans_x,trans_y);
    this.ox = dx;
    this.oy = dy;
  },
  upPath = function () {
		// nothing special
  };
*/

start = function() {
    this.ox = this.attr("cx");
    this.oy = this.attr("cy");
    this.attr({
        opacity: 1
    });

},

move = function(dx, dy) {
    var att = {
        cx: this.ox + dx,
        cy: this.oy + dy
    };
    this.attr(att);
},
up = function() {
    this.attr({
        opacity: .5
    });
};


//check colide
function collide(a) {
  console.log(a.id);
  hitFill = a.attr("fill");
  //console.log(hitFill);
};


//----------------------------point drag--------------------------------------------//
/*
var drag_point = paper.circle(10,10,5);
  drag_point.attr({
    cursor:'point',
    fill:'black'
  });
  drag_point.toFront();
  drag_point.drag(move,start,up).onDragOver( function(a) { collide(a);});
*/

//----------------------------------------------------------------------------------//
