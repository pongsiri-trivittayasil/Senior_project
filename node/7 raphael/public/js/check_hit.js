

paper = Raphael("map", 500, 500);
var c1 = paper.circle(50, 50, 20).attr({
    'fill': 'red'
}),
    c2 = paper.circle(100, 100, 20).attr({
    'fill': 'green'
});


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

c1.drag(move,start,up).onDragOver( function(a) { collide(a);});
c2.drag(move,start,up).onDragOver( function(a) { collide(a);});

function collide(a) {
  hitFill = a.attr("fill");
  console.log(hitFill);
  //alert("A "+dragFill+" circle was dragged into a "+hitFill+" circle");
};




