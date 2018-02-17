// Global Character Counter :: jQuery plugin :: Author - Ben

(function($) {

    $.fn.charCount = function(userOptions) {

        var defaults = {
            limit       : 100,
            fieldClass  : 'char-count-field',
            countClass  : 'char-count',
            warning     : 25,
            danger      : 10,
            goneOver    : false,
            onEmpty     : function() {},
            onGoneOver  : function(count, ele) {},
            onBackUnder : function(count, ele) {}
        }

        var options = $.extend(defaults, userOptions);

        return this.each(function() {

            var maxLength = $(this).data('maxlength');

            if (typeof maxLength !== typeof undefined && maxLength !== false) {

                $.extend(defaults, {
                    limit: parseInt(maxLength)
                });
            }

            $(this).addClass(options.fieldClass);

            bindEvent(this);
            countChars(this);
        });

        function getColour(remaining) {

            var hex = '#BBB';

            if (remaining <= options.warning)
                hex = '#676A6C'; // F8AC59 ?

            if (remaining <= options.danger)
                hex = '#ED5565';

            return hex;
        }

        function generateCounterDOM(ele, remaining) {

            var counter = $('<span class="' + options.countClass + '">' + remaining + '</span>');

            counter.css({
                'display':    'block',
                'text-align': 'right',
                'margin-top': '5px',
                'transition': 'color .2s ease-in-out'
            });

            counter.insertAfter(ele);
        }

        function updateCounter(ele, remaining) {

            if ($(ele).next('.' + options.countClass).length == 0)
                generateCounterDOM(ele, remaining);

            $(ele).next('.' + options.countClass).css('color', getColour(remaining)).text(remaining);
        }

        function countChars(ele) {

            var count     = $(ele).val().length,
                remaining = options.limit - count;

            if (remaining < 0) {

                options.goneOver = true;
                options.onGoneOver(count, ele);

            } else {

                options.goneOver = false;
                options.onBackUnder(count, ele);
            }

            if (count == 0)
                options.onEmpty();

            updateCounter(ele, remaining);
        }

        function bindEvent(ele) {

            $(ele).on('input change keyup', function() {
                countChars(ele);
            });
        }
    };

})(jQuery);
