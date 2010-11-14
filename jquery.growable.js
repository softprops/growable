/*
 * Growable
 * version: 1.0
 *
 * Licensed under the MIT:
 *   http://www.opensource.org/licenses/mit-license.php
 * 
 * Doug Tangren [ softprops ]
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
(function($) {
  $.fn.growable = function(o) {
    return this.each(function() {
      new jQuery.growable(this, o);
    });
  };
  $.growable = function (e, o) { 
    this.options = o || { min_height:2 };
    this.textarea = jQuery(e);
    this.org_rows = e.rows;
    this.el = e;
    this.init();
  };
  /*
  * Public, $.growable methods
  */
  $.growable.fn = jQuery.growable.prototype = {};
  $.growable.fn.extend = jQuery.growable.extend = jQuery.extend;
  $.growable.fn.extend({
    init: function() {
      var self = this;
      $(this.textarea).css({'overflow':'hidden'});
      this.textarea.keyup(function(e) {
        self.grow(this);
      });
      self.grow(self.el);
    },
    grow: function(ta) {
      var lines = ta.value.split('\n'), new_rows = lines.length;
      if(lines[new_rows-1].length > 0) new_rows++;
      if (new_rows > ta.rows) { ta.rows = (this.options.max_height != "undefined" && new_rows > this.options.max_height) ? this.options.max_height : new_rows; }
      if (new_rows < ta.rows) { ta.rows = Math.max(Math.max(this.org_rows,1), new_rows); }
    }
  });
})(jQuery);