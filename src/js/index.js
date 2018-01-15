$(function () {
    FastClick.attach(document.body);
    var main = {};
    main.init = function () {
        main.page1();
        main.loadLine();
        // main.initSwipper();
    }
    main.initSwipper = function () {
        main.mainSwiper = new Swiper('.swiper-container-main', {
            direction: 'vertical',
            pagination : '.swiper-pagination',
            onInit: function (opt) { },
            onSlideChangeEnd: function (opt) {
            }
        })
    }
    main.loadLine = function () {
        var wid = 0;
        main.timer = setInterval(function () {
            if (wid >= 170) {
                clearInterval(main.timer);
                main.tryNow();
                // main.page2();
            }
            $('.load-line-inner').width(wid);
            wid++
        }, 15)
    }
    main.page1 = function () {
        $('.page1').css('opacity', 1).show();
        $('.page2').show();
    }
    main.tryNow = function() {
        $('.load-line').hide();
        $('.try-now').show();
        var introVideo = $('#start-video')[0];
        $(document).on('click', '.try-now', function(){
            introVideo.load();
            introVideo.play();
            main.page2();
            setTimeout(function () {
                $('#start-video-jump').fadeIn();
            }, 2000)
        })
    }
    main.page2 = function () {
        $('.page1').hide();
        $('.page2').show();
        var introVideo = $('#start-video')[0];
        setTimeout(function () {
            $('.page3').css({
                'display': 'block',
                'z-index': '-10'
            })
        }, 2000)
        introVideo.addEventListener("ended", function () {
            $('.page2').hide();
            main.page3();
        })
        $(document).on('click', '#start-video-jump', function () {
            introVideo.pause();
            $('.page2').hide();
            main.page3();
        })
    }
    main.page3 = function() {
        $('.page3').css('z-index', 1).show();
        $(document).on('click', '#intro-btn', function () {
            $('.page3').hide();
            main.page4();
        })
    }
    main.page4 = function () {
        $('.page4').css('z-index', 1).show();
        main.initSwipper();
        $.each($('.video-full'), function(k, v){
            v.addEventListener("ended", function () {
                $(v).parents('.video-full-container').hide();
            })
        })
        $(document).on('click', '.video-pic', function () {
            var index = $(this).index('.video-pic');
            $('.video-full-container').eq(index).show().find('.video-full')[0].play();
        })
        $(document).on('click', '.video-close', function () {
            $(this).siblings('.video-box').find('.video-full')[0].pause();
            $(this).parents('.video-full-container').hide();
        })
        $(document).on('click', '#to-remote', function () {
            window.location.href = 'https://cloud.tencent.com/act/event/wx-video.html'
        })
    }
    main.init();
})