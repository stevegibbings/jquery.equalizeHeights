/** @cc_on
 * jquery.equalizeheights
 * version 1.0;
 * Requires jQuery 1.7.0 or higher
 * https://github.com/stevegibbings/jquery.equalizeHeights
 */

!function (global) {
    'use strict';

    var instanceId = 0;
    var defaults = {
        numberInRow: 4,
        css: {
            active: 'is-active'
        },
        selectors: {
            item: '.js-list-item'
        }
    };

    // Wrap is used for AMD support
    var wrap = function ($) {

        var Equalizeheights = function (container, options) {
            this.container = container;
            this.options = options;
            this._instanceId = ++instanceId;

            this._getDOMElements();

            // Equalise the rows
            this.render();

            container.addClass(options.css.active);
        };

        Equalizeheights.prototype = {
            constructor: Equalizeheights,

            // Public Methods
            // ---------------------------------------

            render: function () {
                var largestHeight, row;
                var that = this;
                this.container.find(this.options.selectors.item).each(
                    function (index) {
                        var article = $(this);
                        article.css('height', 'auto');
                        if ((index % that.options.numberInRow) == 0) {
                            that._equalize(row, largestHeight);
                            largestHeight = 0;
                            row = [];
                        }
                        largestHeight = article.outerHeight(true) > largestHeight ? article.outerHeight(true) : largestHeight;
                        row.push(article);
                    });
                that._equalize(row, largestHeight);
            },


            // Private Methods
            // ---------------------------------------

            _getDOMElements: function () {
                var selectors = this.options.selectors;

                for (var element in selectors) {
                    this[element] = this.container.find(selectors[element]);
                }
            },

            _equalize: function (row, height) {
                if (row) {
                    $.each(row,
                        function (index, articleToResize) {
                            $(articleToResize).css('height', height + 'px');
                        }
                    );
                }
            }
        };

        $.fn.equalizeheights = function (options) {
            options = $.extend(true, {}, defaults, options);

            return this.each(function () {
                var $this = $(this);
                $this.data('equalizeheights', new Equalizeheights($this, options));
            });
        };

        $.fn.equalizeheights.defaults = defaults;
        $.fn.equalizeheights.Herotabs = Equalizeheights;
    };

    if (typeof define == 'function' && define.amd) {
        define(['jquery'], wrap);
    } else {
        wrap(global.jQuery);
    }
}(this);

