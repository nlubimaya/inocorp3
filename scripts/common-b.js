function getScreenName() {
    return window.getComputedStyle(document.getElementsByClassName('page-b')[0], ':after').content.replace(/"/g,'');
}

svg4everybody(); // Run it now or whenever you are ready

if($('.js-textarea').length) {
    autosize($('.js-textarea'));
}

$(document).ready(function(){

    var notouch = $('html').hasClass('no-touchevents') ? true : false
    var touch = $('html').hasClass('touchevents') ? true : false
    var currentScreen = getScreenName()
    var headerFolded;

    function setHeaderMods() {
        if(currentScreen == "XS" || currentScreen == "S" || currentScreen == "M") {
            headerFolded = true
        } else {
            headerFolded = false
        }
    }

    setHeaderMods();

    var $cheeseburger = $('.js-cheeseburger-b');
    var $header = $('.header-b');
    var $navItems = $header.find('.nav-b__item');

    $cheeseburger.on('click', function(){
        var $this = $(this);

        if(!$this.hasClass('is-active')) {
            $this.addClass('is-active');
            $this.find('.cheeseburger-b__text').text($this.data('close'));
            $header.addClass('is-open');
        } else {
            $this.removeClass('is-active');
            $this.find('.cheeseburger-b__text').text($this.data("open"));
            $header.removeClass('is-open');
        }
    })

    function hideDropdownMenu() {
        $navItems.filter('.is-hover').removeClass('is-hover');
    }

    /*if(notouch) {

        $navItems.on('mouseover', function(){

            if(!headerFolded) {
                $(this).addClass('is-hover');
            }
        });

        $navItems.on('mouseout', function(){

            if(!headerFolded) {
                $(this).removeClass('is-hover');
            }
        });
    }*/

    if(touch || headerFolded) {

        $navItems.on('click', '.nav-b__link', function(){

            var $parentLink = $(this).parent();

            if(!$parentLink.hasClass('is-hover')) {
                hideDropdownMenu();
                $(this).parent().addClass('is-hover');
            } else {
                hideDropdownMenu();
                $(this).parent().removeClass('is-hover');
            }
        });

    }

    $(window).resize(function(){

        setTimeout(function(){

            currentScreen = getScreenName()

            setHeaderMods();

            if($header.hasClass('is-open') && !headerFolded) {
                hideDropdownMenu();
                $header.removeClass('is-open');
                $cheeseburger.removeClass('is-active');
            }
        }, 100);
    });

    $(window).scroll(function(){

        setTimeout(function(){
            hideDropdownMenu();
        }, 100);
    });

    if($('.js-filter').length) {

        var $filter = $('.js-filter');
        var $filterToggle = $filter.find('.filter-b__button-toggle');
        var $filterToggleText = $filterToggle.find('.ctrl-button-b__text');
        var $filterElements = $filter.find('.filter-b__item');
        var $filterButtons = $filter.find('.filter-b__button');

        $filterToggle.on('click', function(){
            $(this).toggleClass('is-active');
        });

        $filterButtons.on('click', function(){
            var $this = $(this);
            $filterToggle.removeClass('is-active');
            $filterToggleText.text($this.find('.ctrl-button-b__text').text());
            $filterElements.filter('.is-active').removeClass('is-active');
            $filterButtons.filter('.is-active').removeClass('is-active');
            $this.addClass('is-active').closest('.filter-b__item').addClass('is-active');
        });
    }

    //Scroll
    var $window = $(window);
    var windowTop;
    var windowTopOld = windowTop;
    var windowBottom;
    var $page = $('.page-b');
    var $footer = $('.footer-b');
    var footerTop;
    var scrollDirectionUp = false;
    var scrollDirectionDown = false;
    var clearZone = 300;
    var clearScreen = 1400;
    var $scrollBox = $('.scroll-b');
    var scrollBoxOriginalBottom = parseInt($scrollBox.css('bottom'));
    var $scrollButtonUp = $('.scroll-b__button--up');
    var autoScroll = false

    function getActualSizes() {
        windowHeight = $window.outerHeight();
        windowTop = $window.scrollTop();
        windowBottom = windowTop + windowHeight;
        footerTop = $footer.position().top;
    }

    function scrollTo(position) {

        if(!autoScroll) {
            autoScroll = true;

            $('html, body').animate({
                scrollTop: position
            }, 600, function(){
                autoScroll = false;
            });
        }
    }

    $scrollButtonUp.on('click', function(){
        scrollTo(0);
    });

    $window.scroll(function(){
        windowTopOld = windowTop;
        getActualSizes();

        if (windowTopOld < windowTop && windowTop > clearZone) {
            $page.removeClass('scroll-to-up').addClass('scroll-to-down');
        } else {
            $page.removeClass('scroll-to-down').addClass('scroll-to-up');
        }

        if (windowTopOld > windowTop) {
            scrollDirectionUp = true
            scrollDirectionDown = false
        } else {
            scrollDirectionUp = false
            scrollDirectionDown = true
        }

        if(!$header.data('filled') && windowTop > 0) {
            $header.addClass('is-filled');
        }

        if(!$header.data('filled') && windowTop == 0) {
            $header.removeClass('is-filled');
        }

        if( windowTop > clearScreen) {
            $scrollButtonUp.removeClass('is-hidden');
        } else {
            $scrollButtonUp.addClass('is-hidden');
        }

        if(windowBottom > footerTop) {
            $scrollBox.css('bottom', scrollBoxOriginalBottom + (windowBottom - footerTop));

        } else {
            $scrollBox.removeAttr('style');
        }
    }).trigger("scroll");

    $window.resize(function(){
        getActualSizes();
    })

    if($('.js-recommended-b-slider').length) {

        $('.js-recommended-b-slider').slick({
            centerMode: false,
            variableWidth: true,
            dots: true
        });
    }

    if($('.js-stages-b-slider').length) {

        $('.js-stages-b-slider').slick({
            centerMode: true,
            variableWidth: true,
            dots: true
        });
    }

    if($('.js-tooltip-b-sign').length) {

        $('.js-tooltip-b-sign').on('click', function(){
            $('.tooltip-b__box').addClass('is-active');
        });
        
        $('.js-tooltip-b-button-close').on('click', function(){
            $('.tooltip-b__box').removeClass('is-active');
        });
    }

    // Support old articles
    if ($('.blog-video').length) {

        var videoParent = $('.blog-video');

        videoParent.each(function (i, e) {

            var $this = $(this),
                $videoIframe = $this.find('iframe'),
                videoWidth = $videoIframe.attr('width'),
                videoHeight = $videoIframe.attr('height');

            $videoIframe.wrap('<div class="blog-video_wrapper"></div>');

            var $videoIframeWrapper = $videoIframe.closest('.blog-video_wrapper');

            $videoIframeWrapper.css({
                'padding-top': (videoHeight * 100 / videoWidth) + '%'
            });

        });
    }

    if($('.blog-slider').length) {

        $('.blog-slider').find('.item').unwrap()

        $('.blog-slider').slick({
            arrows: false,
            dots: true
        });
    }

    if($('.slide-photo').length) {

        $('.slide-photo').find('img').unwrap()

        $('.slide-photo').slick({
            arrows: false,
            dots: true
        });
    }

    if($('.contents').length) {

        var pageLang = $('html').attr('lang');
        var openText = pageLang === 'en' ? 'Open contents' : 'Развернуть оглавление'
        var closeText = pageLang === 'en' ? 'Close contents' : 'Свернуть оглавление'

        $('.contents ul li:gt(2)').hide();

        if($(".contents ul li").length > 3) {
            $('.contents').append('<button type="button">' + openText + '</button>');
        }

        $('.contents button').on('click', function(event) {

            var $button = $(this);
            var $list = $('.contents ul li:gt(2)');

            if ($list.is(':visible')) {
                $list.hide(250);
                $button.html(openText);
            } else {
                $list.show(250);
                $button.html(closeText);
            }
        });

        $('.contents ul li a').on('click', function(event) {
            event.preventDefault();

            var headerHeight = 0;

            var currentAncorPosition = $($(this).attr('href')).offset().top;

            $('html, body').animate({
                scrollTop: (currentAncorPosition - headerHeight)
            }, 1100);
        });
    }
    //END  Support old articles

    if($('.js-action-video-about').length) {

        $('.js-action-video-about').on('click', function(){
            $('.about-video-b').addClass('is-active');
        });
        
        $('.js-about-video-b-close').on('click', function(){
            $('.about-video-b').removeClass('is-active');
            $('.about-video-b__item').each(function() {
                $(this)[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
            });
        });
    }

    if($('.js-vacancy-description-slider').length) {

        $('.js-vacancy-description-slider').slick({
            arrows: false,
            dots: true
        });
    }

    if($('.js-mask-image-b-parallax').length && ( $(window).width() > 1250 )) {
        $(function() {
            var $el = $('.js-mask-image-b-parallax');
            $(window).on('scroll', function () {
                var scroll = $(window).scrollTop();
                $el.css({
                    'background-position':'0%'+(25+.1*scroll)+'%'
                });
            });
        });
    }

    // faq
    if( $(".js-faq-item-b-question").length ) {
        
        var questionItem = $('.js-faq-item-b-question');
        
        questionItem.each(function(){
            $(this).on('click', function(){
                if($(this).hasClass('is-active')){
                        $(this).removeClass('is-active');
            
                } else{
                    $(this).addClass('is-active');
                }
            });
        });
    }

    // for portrait cards in longrid
    if( $(".js-longrid-portrait-b-group").length && ( $(window).width() > 767 )) {
        
        $('.js-longrid-portrait-b-group').masonry({
            itemSelector: '.longrid-portrait-b__card',
        });
    }   
    
    // show project-stages on scroll
    if( $(".js-project-stages-b").length) {
        
        AOS.init({
            offset: 250,
            delay: 200,
            disable: 'phone',
            disable: 'tablet',
            once: true
        });
    } 


    // js-longrid-b
    if( $(".js-longrid-b").length) {

        var $window = $(window);
        var windowScroll = $window.scrollTop();
        var windowHeight = $window.height();
        var document = $(document).height();  
        var $longridItem = $(".longrid-b__item");
        var longridItemTop = []

        function getSizes() {
            windowScroll = $window.scrollTop();
            windowHeight = $window.height();
            longridItemTop = []

            $longridItem.each(function(){
                longridItemTop.push($(this).offset().top)
            })
        }

        if( $(window).width() > 1024 ) {

            $window.scroll(function(){
                getSizes();

                longridItemTop.forEach(function(el, index){

                    var $currentLongridItem = $longridItem.eq(index);
                    var currentLongridItemHeight = $currentLongridItem.outerHeight()
                    var currentLongridItemOffset = $currentLongridItem.offset().top;

                    if(windowScroll + windowHeight >= currentLongridItemOffset + 200 || windowHeight + windowScroll == document || currentLongridItemHeight + currentLongridItemOffset < windowHeight) {

                        $currentLongridItem.addClass('is-visible')
                    }
                })
            });
        }

        $window.resize(function(){
            getSizes();
        });
    } 

    
    // sticky contents in article
    if( $(".js-article-contents-b").length) {

        $stick = $('.js-article-contents-b');
        $foot = $('.recommended-b');
        margin = 120;
        offtop = $stick.offset().top - margin;
        offbtm = $foot.offset().top - ( margin*2 + $stick.height() );

        $(window).scroll(function () {
            scrtop = $(window).scrollTop();
            if (scrtop > offtop && $stick.hasClass('is-natural')) {
                $stick.removeClass('is-natural').addClass('is-fixed').css('top', margin);
            }
            if (offtop > scrtop && $stick.hasClass('is-fixed')) {
                $stick.removeClass('is-fixed').addClass('is-natural').css('top', 'auto');
            }
            if (scrtop > offbtm && $stick.hasClass('is-fixed')) {
                $stick.removeClass('is-fixed').addClass('is-bottom').css('top', offbtm+margin);
            }
            if (offbtm > scrtop && $stick.hasClass('is-bottom')) {
                $stick.removeClass('is-bottom').addClass('is-fixed').css('top', margin);
            }
        });
    }

});
