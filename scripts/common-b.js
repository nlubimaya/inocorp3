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

    if(notouch) {

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
    }

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
    var $scrollBox = $('.scroll');
    var scrollBoxOriginalBottom = parseInt($scrollBox.css('bottom'));
    var $scrollButtonUp = $('.scroll__button--up');
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
});
