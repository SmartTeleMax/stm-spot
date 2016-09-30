/*global jQuery: true, $: true, console: true */
;(function (factory) {
	if ( typeof define === 'function' && define.amd ) {
		// AMD. Register as an anonymous module.
		define(['jquery', 'jquery-mousewheel'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS style for Browserify
		module.exports = factory;
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {
    'use strict';

    var $spot = $('<div/>');
    $spot.addClass('spot');

    var SpotEffect = function(element, options) {
        this.$element = $(element);
        this.options = $.extend({
            width: '15px',
            newWidth: '20px',
            height: '15px',
            newHeight: '20px',
            opacity: 0.4
        }, options);

        $(this.$element).on('click', this.show.bind(this));
    };

    SpotEffect.prototype.show = function(e) {
        var self = this;

        $('body').append($spot);
        // через добавление класса сделать
        setTimeout(function() {
            $spot
                .stop()
                .css({
                    display: 'block',
                    left: e.pageX - 8 + 'px',
                    top: e.pageY - 8 + 'px',
                    width: self.options.width,
                    height: self.options.height,
                    opacity: self.options.opacity
                })
                .animate({
                    opacity: 0,
                    width: self.options.newWidth,
                    height: self.options.newHeight,
                    left: '-=3px',
                    top: '-=4px'
                }, 300, function() {
                    $spot.css('display', 'none');
                });
        }, 150);
    };

    $.fn.spotted = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('spot');
            var options = typeof option === 'object' && option;

            if (!data) {
                $this.data('spot', (data = new SpotEffect(this, options)));
            }
        });
    };
}));
