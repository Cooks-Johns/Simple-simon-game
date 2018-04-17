'use strict';

//based on menu at http://mic.com. only works in chrome

(function($){

    var Menu = function(){
        this.$nav = $('.nav');
        this.$stories = $('.stories');
    }

    Menu.prototype.init = function(){
        this.initialState();
        this.ui();
    }

    Menu.prototype.initialState = function() {
        var i = 0,
            $img = $('.category').eq(0).find('img');

        $img.load(function () {
            i++;
            //wait for all images to load
            if (i === $img.length) {
                $(this).parent().parent().addClass('show');
            }
        });
    }


//     for $i from 1 through 4 {
//     .show figure:nth-child(#{$i}) {
//             transition-delay: $i * .12s;
//         }
//     }
//
// .category.show {
//         opacity: 1;
//         figure {
//             opacity: 1;
//             left: 0;
//             transition-duration: .2s;


            // $('most-viewed').onmouseenter() {
    //
    // }

    Menu.prototype.ui = function(){
        var self = this;

        //show recent articles on hover
        self.$nav.on('mouseenter', 'li', function(){
            var $this = $(this);

            $('.category')
                .removeClass('show')
                .eq($this.index())
                .css('left', 0)
                .stop(true, true)
                .addClass('show');

            self.$stories
                .find('span')
                .text(
                    $this.attr('data-menu')
                );
        });
    }

    //go go go!
    var menu = new Menu().init();

}(jQuery))