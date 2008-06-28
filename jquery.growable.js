/*
 * Growable
 * version: 1.0
 *
 * Licensed under the MIT:
 *   http://www.opensource.org/licenses/mit-license.php
 * 
 * Doug Tangren [ d.tangren@gmail.com ]
 *
 * Usage:
 *  
 *  jQuery(document).ready(function() {
 *    jQuery('textarea.growable').growable() 
 *  })
 *
 *  <form action="someAction" method="post">
 *    <textarea class="growable">I can grow.</textArea>
 *  </form>
 *    
 */
(function(jQuery) {
  jQuery.fn.growable = function(o) {	
		return this.each(function() {
			new jQuery.growable(this, o);
		});
	};
	jQuery.growable = function (e, o) { 
	  this.options = o || { min_height:2 };
	  this.textarea = jQuery(e);
	  this.org_rows = e.rows;
		this.init();
	};
	/*
  * Public, $.growable methods
  */
	jQuery.growable.fn = jQuery.growable.prototype = {};
 	jQuery.growable.fn.extend = jQuery.growable.extend = jQuery.extend;
	jQuery.growable.fn.extend({
		init: function() {	
		  var self = this;			
		  this.textarea.keyup( function(e) {
		    self.grow(this);
      });
		},
		grow: function(ta) {
		    var lines = ta.value.split('\n');
		    if(lines[lines.length-1].length > 0) lines++;
		    var new_rows = lines.length;
		     for (var i = 0; i <lines.length; i++) {
             var line = lines[i];
             if (line.length>= ta.cols) { new_rows += Math.ceil(line.length / ta.cols)-1;}// div line if longer
         }
         if (new_rows > ta.rows) { ta.rows = (this.options.max_height != "undefined" && new_rows > this.options.max_height) ? this.options.max_height : new_rows; }
         if (new_rows < ta.rows) { ta.rows = Math.max(Math.max(this.org_rows,1), new_rows); }
  	}
	});
})(jQuery);