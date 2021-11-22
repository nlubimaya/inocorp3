$(document).ready(function(){

    //Animations numbers
    if($(".js-product-statistics").length) {

        var $window = $(window);
        var windowScroll = $window.scrollTop();
        var windowHeight = $window.height();
        var $numbersBoxs = $(".js-product-statistics");
        var numbersBoxsTop = []
        var animationNumbers = []

        $numbersBoxs.each(function(){
            animationNumbers.push(false);
        })

        function getSizes() {
            windowScroll = $window.scrollTop();
            windowHeight = $window.height();
            numbersBoxsTop = []

            $numbersBoxs.each(function(){
                numbersBoxsTop.push($(this).offset().top)
            })
        }

        if( $(window).width() > 1024 ) {

            $window.scroll(function(){
                getSizes();

                numbersBoxsTop.forEach(function(el, index){

                    var $currentNumbersBox = $numbersBoxs.eq(index);
                    var currentNumbersBoxHeight = $currentNumbersBox.outerHeight()

                    if((el + currentNumbersBoxHeight / 2) < (windowScroll + windowHeight) && !animationNumbers[index]) {
                        animationNumbers[index] = true;

                        $currentNumbersBox.find('.product-statistics__number-box').css('opacity', '1');
                        $currentNumbersBox.find('.product-statistics__number').spincrement({
                            thousandSeparator: ' ',
                            duration: 2000
                        });
                    }
                })
            });
        }

        $window.resize(function(){
            getSizes();
        });
    }

    //Case video
    if ($('.js-product-video').length) {

        var $videoBox = $('.js-product-video');
        var $videoButton = $videoBox.find('.product-video__button');
        var $videoPlaceholder = $videoBox.find('.product-video__placeholder');
        var $videoPlayer = $videoBox.find('.product-video__player');

        $videoButton.on('click', function(){
            $videoPlaceholder.addClass('product-video__is-hidden');
            $videoPlayer.addClass('is-play');
            $videoPlayer[0].play();
        })

        $videoPlayer.on('click', function(){
            $videoPlaceholder.removeClass('product-video__is-hidden');
            $(this).get(0).pause();
            $(this).removeClass('is-play');
        })
    }

    //Case video on hover
    if ($('.js-product-media').length && $('html').hasClass('no-touchevents')) {

        var $videoBox = $('.js-product-media');
        var hover = $videoBox.hover( hoverVideo, hideVideo );

        function hoverVideo(e) {
            $('video', this).get(0).play();
        }

        function hideVideo(e) {
            $('video', this).get(0).pause();
        }        
    }

    if ($('.js-product-media').length && $('html').hasClass('touchevents')) {

        var $videoBox = $('.js-product-media');
        var $videoPlayer = $videoBox.find('video');
        var $videoPoster = $videoBox.find('.js-video-poster');

        $videoPoster.on('click', function(){
            $videoPoster.hide();
            $videoPlayer.trigger('play');
            $videoPlayer[0].autoplay = true;
            $videoBox.css('border-top', '5px solid red');
        }) 
        
        $videoPlayer.on('click', function(){
            this[this.paused ? 'play' : 'pause']();
        })
    }

    //Escape from cursor
    if ($('.js-icons-group').length) {
        $('.js-icons-group svg').springyElement(30);
    }

    //Paralax elements
    if ($('.js-parallax').length) {

        if( $(window).width() > 1024 ) {
            $(window).enllax();
        }
    }

    // Projects Nav
    if($('.js-projects-nav').length && $('html').hasClass('no-touchevents')) {

        var $projectsNav = $('.js-projects-nav');
        var $projectsLinks = $projectsNav.find('.projects-nav__item--one .projects-nav__link');
        var $projectsBgs = $projectsNav.find('.projects-nav__bg--other');

        $projectsLinks.on('mouseenter', function(e){
            var $this = $(this);
            var thisTarget = $this.data('target');
            $projectsBgs.addClass('is-transparent');
            $projectsBgs.filter('[data-bg="' + thisTarget + '"]').removeClass('is-transparent');
        });

        $projectsLinks.on('mouseleave', function(e){
            $projectsBgs.addClass('is-transparent');
        });
    }

    // Product carousel
    if($('.js-product-carousel').length) {

        $('.js-product-carousel').slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3,
            dots: true,
            centerMode: true,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        centerMode: true,
                        arrows: false,
                        centerPadding: '0',
                    }
                }
            ]
        });
    }
});

$(window).on("load", function(){

    //Paralax elements
    if ($('.js-parallax').length) {

        if( $(window).width() > 1024 ) {
            $(window).enllax();
        }
    }
});
