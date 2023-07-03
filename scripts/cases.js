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
            $('.product-video__player').addClass('is-play');
            $('.product-video__player')[0].play();
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

        //var $videoBox = $('.js-product-media');
        var $videoPoster = $('.js-video-poster');
        var $videoBox = $videoPoster.closest('.js-product-media');
        var $videoPlayer = $videoBox.find('video');
        
        $videoPoster.on('click', function(){
            $videoPoster.addClass('is-hidden');            
            $videoPlayer.trigger('play');
        }) 
        
        $videoPlayer.on('click', function(){
            this[this.paused ? 'play' : 'pause']();
        })
    }

    $('video').each(function () {
        this.load();
    });

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

        /*$('.js-product-carousel').on('afterChange', function(event, slick, currentSlide, nextSlide){
            $('.js-product-media').find('video').trigger('play');
            $('.js-product-media').find('.js-video-poster').hide();
        });*/

        $('.js-product-carousel').on('afterChange', function(event, slick, currentSlide, nextSlide){
            $(this).find('.js-product-media').find('video').trigger('play');
            $(this).find('.js-product-media').find('.js-video-poster').hide();
        });
    }

    /* before After slider*/
    if( $('.js-comparison').length ) {
        $('.js-comparison').beforeAfter();

        if($('.handle').css('left') < '1.04%') {
            $(this).addClass('left')
        } 
        else {
            $(this).removeClass('left')
        }
    }

    /* slider swiper */
    if( $('.js-product-slider').length ) {
        const swiper = new Swiper('.js-product-slider', {
            spaceBetween: 20,
            slidesPerView: 1,
            mousewheel: false,
            preloadImages: true,
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true
            },            
            breakpoints: {
                769: {
                    spaceBetween: 60,
                },
                1400: {
                    spaceBetween: 80,
                },
            },
        });
    }

    if( $('.product-slider--biodive .swiper').length ) {
        const swiper1 = new Swiper('.product-slider--biodive .swiper', {
            spaceBetween: 20,
            slidesPerView: 1,
            mousewheel: false,
            preloadImages: true,
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true
            },            
            breakpoints: {
                769: {
                    spaceBetween: 30,
                },
                1400: {
                    spaceBetween: 30,
                },
            },
        });
    }

    /* js-media-autoplay */
    if( $('.js-media-autoplay').length ) {
        
        $(window).scroll(function () {
            var $sections = $('.js-media-autoplay');
            $sections.each(function (i, el) {
                var top = $(el).offset().top - 300;
                var bottom = top + $(el).height();
                var scroll = $(window).scrollTop();

                if (scroll > top && scroll < bottom) {
                    $('video', this).get(0).play();
                } else {
                    $('video', this).get(0).pause();
                }
            })
        });
    }

    if( $('.js-media-side-autoplay').length ) {
        
        $(window).scroll(function () {
            var $sections = $('.js-media-side-autoplay');            

            $sections.each(function (i, el) {
                var top = $(el).offset().top - 500;
                var bottom = top + $(el).height();
                var scroll = $(window).scrollTop();

                $('video', this).get(0).stop();

                if (scroll > top && scroll < bottom) {
                    $('video', this).get(0).play();
                }
            })
        });
    }

    if( $('.js-panzoom').length ) {

        const elem = document.getElementById('panzoom-element')

        const panzoom = Panzoom(elem, {
            maxScale: 1.35,
            minScale: 1,
            contain: 'outside',
            startScale: 1.35,       
            cursor: 'move', 
            startX: '-50',
            startY: '200',
        })       
    }

});

$(window).on("load", function(){

    //Paralax elements
    if ($('.js-parallax').length) {

        if( $(window).width() > 1024 ) {
            $(window).enllax();
        }
    }

    /* paralax cursor */
    if($('.js-image-paralax').length && ( $(window).width() > 1250 )) {
        $(function() {
            var $el = $('.js-image-paralax');
            $(window).on('scroll', function () {
                var scroll = $(window).scrollTop();
                $el.css({
                    'background-position':'0%'+(-35+.01*scroll)+'%'
                });
            });
        });
    }

    if( $('.product--dar .product-cards__item').length && $('html').hasClass('no-touchevents')) {

        var tweenDesign = TweenMax.from('.product-cards__item--design', 1, {width:"100%"});
        var tweenSelection = TweenMax.from('.product-cards__item--selection', 1, {width:"100%"});
        var tweenChecking = TweenMax.from('.product-cards__item--checking', 1, {width:"100%"});

        var controller = new ScrollMagic.Controller();

        var scene = new ScrollMagic.Scene({
            triggerElement: '.product-info--tasks',
            offset: 100,
            duration: 300,
        }).setTween(tweenDesign)
        .setClassToggle(".product-cards__item", "is-visible");

        var scene2 = new ScrollMagic.Scene({
            triggerElement: '.product-cards__item--selection',
            offset: 1,
            duration: 200,
        }).setTween(tweenSelection)
        .setClassToggle(".product-cards__item", "is-visible");

        var scene3 = new ScrollMagic.Scene({
            triggerElement: '.product-cards__item--checking',
            offset: 1,
            duration: 200,
        }).setTween(tweenChecking)
        .setClassToggle(".product-cards__item", "is-visible");

        controller.addScene([scene, scene2, scene3]);
    }

    if ($('.js-plans').length) {

        var $plans = $('.js-plans');

        function slickStart() {

            $plans.slick({
                centerMode: true,
                variableWidth: true,
                arrows: false,
                dots: true,
                infinite: false,
                slide: '.plan-benefits--normal',
            });
        }

        if (( $(window).width() < 768 ) && $plans.not('.slick-initialized')) {
            slickStart();
        }

        $(window).resize(function () {

            setTimeout(function () {
                var smallscreen = ( $(window).width() < 768 )
                var slickInit = $plans.hasClass("slick-initialized");

                if (!smallscreen && slickInit) {
                    $plans.slick("unslick");
                }

                if (smallscreen && !slickInit) {
                    slickStart();
                }
            }, 100);
        })
    }
});
