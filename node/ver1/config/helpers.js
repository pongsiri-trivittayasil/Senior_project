function hbsHelpers(hbs) {
  return hbs.create({
    helpers: { // This was missing
      	inc: function(value, options) {
	        console.log('reading it');
	        return parseInt(value) + 1;
	    },
    	times:function(n, block) {
		    var accum = '';
		    for(var i = 0; i < n; ++i)
		        accum += block.fn(i);
		    return accum;
		},
		for:function(from, to, incr, block) {
		    var accum = '';
		    for(var i = from; i < to; i += incr)
		        accum += block.fn(i);
		    return accum;
		}
      // More helpers...
    }

  });
}

module.exports = hbsHelpers;