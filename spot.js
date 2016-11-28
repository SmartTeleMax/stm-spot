/*global console: true */
;(function (global, factory) {
    if ( typeof define === 'function' && define.amd ) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object' && typeof module !== 'undefined') {
        // XXX debug
        // Node/CommonJS style for Browserify
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(global.jQuery);
    }
}(this, function ($) {
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
        if (e.pageX === 0 && e.pageY === 0) {
            return;
        }

        $('body').append($spot);

        // через добавление класса сделать
        setTimeout(function() {
            $spot
                .stop()
                .css({
                    display: 'block',
                    left: e.pageX - 8 + 'px',
                    top: e.pageY - 8 + 'px',
                    width: this.options.width,
                    height: this.options.height,
                    opacity: this.options.opacity
                })
                .animate({
                    opacity: 0,
                    width: this.options.newWidth,
                    height: this.options.newHeight,
                    left: '-=3px',
                    top: '-=4px'
                }, 300, function() {
                    $spot.css('display', 'none');
                });
        }.bind(this), 150);
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
