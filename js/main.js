(function () {

    'use strict';



    var isMobile = {

        Android: function () {

            return navigator.userAgent.match(/Android/i);

        },

        BlackBerry: function () {

            return navigator.userAgent.match(/BlackBerry/i);

        },

        iOS: function () {

            return navigator.userAgent.match(/iPhone|iPad|iPod/i);

        },

        Opera: function () {

            return navigator.userAgent.match(/Opera Mini/i);

        },

        Windows: function () {

            return navigator.userAgent.match(/IEMobile/i);

        },

        any: function () {

            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());

        }

    };



    // Preloader

    $(window).on('load', function() {

        $('.preloader').fadeOut("slow");

    });



    // Animations with Waypoint

    var contentWayPoint = function () {

        var i = 0;

        $('.animate-box').waypoint(function (direction) {

            if (direction === 'down' && !$(this.element).hasClass('animated')) {

                i++;

                $(this.element).addClass('item-animate');

                setTimeout(function () {

                    $('body .animate-box.item-animate').each(function (k) {

                        var el = $(this);

                        setTimeout(function () {

                            var effect = el.data('animate-effect');

                            if (effect === 'fadeIn') {

                                el.addClass('fadeIn animated');

                            } else if (effect === 'fadeInLeft') {

                                el.addClass('fadeInLeft animated');

                            } else if (effect === 'fadeInRight') {

                                el.addClass('fadeInRight animated');

                            } else {

                                el.addClass('fadeInUp animated');

                            }

                            el.removeClass('item-animate');

                        }, k * 200, 'easeInOutExpo');

                    });

                }, 100);

            }

        }, {

            offset: '85%'

        });

    };



    // Burger Menu 

    var burgerMenu = function () {

        $('.js-oliven-nav-toggle').on('click', function (event) {

            event.preventDefault();

            var $this = $(this);

            if ($('body').hasClass('offcanvason')) {

                $this.removeClass('active');

                $('body').removeClass('offcanvason');

            } else {

                $this.addClass('active');

                $('body').addClass('offcanvason');

            }

        });

    };



    // Click outside of offcanvason

    var mobileMenuOutsideClick = function () {

        $(document).click(function (e) {

            var container = $("#oliven-aside, .js-oliven-nav-toggle");

            if (!container.is(e.target) && container.has(e.target).length === 0) {

                if ($('body').hasClass('offcanvason')) {

                    $('body').removeClass('offcanvason');

                    $('.js-oliven-nav-toggle').removeClass('active');

                }

            }

        });

        $(window).scroll(function () {

            if ($('body').hasClass('offcanvason')) {

                $('body').removeClass('offcanvason');

                $('.js-oliven-nav-toggle').removeClass('active');

            }

        });

    };



    // Document on load

    $(function () {

        contentWayPoint();

        burgerMenu();

        mobileMenuOutsideClick();

    });



    // Sections background image from data background

    var pageSection = $(".bg-img, section");

    pageSection.each(function () {

        if ($(this).attr("data-background")) {

            $(this).css("background-image", "url(" + $(this).data("background") + ")");

        }

    });



    // Friends owlCarousel

    if ($('.friends .owl-carousel').length) {

        $('.friends .owl-carousel').owlCarousel({

            loop: true,

            margin: 30,

            mouseDrag: true,

            autoplay: false,

            dots: true,

            responsiveClass: true,

            responsive: {

                0: { items: 1 },

                600: { items: 2 },

                1000: { items: 2 }

            }

        });

    }



    // When & Where owlCarousel

    if ($('.whenwhere .owl-carousel').length) {

        $('.whenwhere .owl-carousel').owlCarousel({

            loop: true,

            margin: 30,

            mouseDrag: true,

            autoplay: false,

            dots: true,

            responsiveClass: true,

            responsive: {

                0: { items: 1 },

                600: { items: 1 },

                1000: { items: 3 }

            }

        });

    }



    // Gift Registry owlCarousel

    if ($('.gift .owl-carousel').length) {

        $('.gift .owl-carousel').owlCarousel({

            loop: true,

            margin: 30,

            mouseDrag: true,

            autoplay: true,

            dots: false,

            responsiveClass: true,

            responsive: {

                0: { margin: 10, items: 2 },

                600: { items: 3 },

                1000: { items: 4 }

            }

        });

    }



    // Smooth Scrolling & close menu on mobile

    $(document).on('click', 'a[href^="#"]', function (event) {

        var hash = this.getAttribute('href');

        if (hash === '#' || hash === '#0') return;

        var target = $(hash);

        if (target.length) {

            event.preventDefault();

            $('html, body').stop().animate({

                scrollTop: target.offset().top

            }, 900);

            if ($('body').hasClass('offcanvason')) {

                $('body').removeClass('offcanvason');

                $('.js-oliven-nav-toggle').removeClass('active');

            }

        }

    });



    // Gallery Isotope

    $(window).on("load", function () {

        var e = $(".gallery-filter"),

            a = $("#gallery-filter");

        if (e.length && typeof e.isotope === 'function') {

            e.isotope({

                filter: "*",

                layoutMode: "masonry",

                animationOptions: {

                    duration: 750,

                    easing: "linear"

                }

            });

            a.find("a").on("click", function () {

                var o = $(this).attr("data-filter");

                a.find("a").removeClass("active");

                $(this).addClass("active");

                e.isotope({

                    filter: o,

                    animationOptions: {

                        animationDuration: 750,

                        easing: "linear",

                        queue: false

                    }

                });

                return false;

            });

        }

    });



    // Magnific Popup

    if ($('.img-zoom').length && typeof $.fn.magnificPopup === 'function') {

        $(".img-zoom").magnificPopup({

            type: "image",

            closeOnContentClick: true,

            mainClass: "mfp-fade",

            gallery: {

                enabled: true,

                navigateByImgClick: true,

                preload: [0, 1]

            }

        });

    }



    // RSVP Form with Google Sheets Database & WhatsApp connection

    var form = $('.contact__form'),

        message = $('.contact__msg'),

        submitBtn = form.find('input[type="submit"]');



    var SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbypN4741Yh0CYn1vX5axTid-S616A9cPplMZsbReHZnpW9iqqCehd7F7It4B8oXL5Uu/exec';



    function showConfirmationSuccess(name, guests, attendance, note) {

        message.fadeIn().removeClass('alert-danger').addClass('alert-success');

        message.html('<strong>¡Muchas gracias, ' + name + '!</strong> Tu confirmación ha sido registrada con éxito en nuestra lista.');



        var waText = "¡Hola Joselyn y Edson! Confirmo mi asistencia para su boda:\n" +

                     "👤 Nombre: " + name + "\n" +

                     "🎟️ Invitados: " + guests + "\n" +

                     "✨ Asistencia: " + attendance;

        if (note.trim() !== '') {

            waText += "\n💌 Mensaje: " + note;

        }



        var waUrl = "https://api.whatsapp.com/send?text=" + encodeURIComponent(waText);

        

        if (!$('#btn-wa-direct').length) {

            var waBtn = $('<div id="btn-wa-direct" class="mt-3 text-center">' +

                          '<a href="' + waUrl + '" target="_blank" class="btn btn-success" style="background-color:#25D366;border-color:#25D366;color:#fff;padding:12px 24px;border-radius:30px;font-weight:600;box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);">' +

                          '<i class="ti-check" style="margin-right:8px;"></i>Enviar también por WhatsApp</a>' +

                          '</div>');

            message.after(waBtn);

        } else {

            $('#btn-wa-direct a').attr('href', waUrl);

        }



        setTimeout(function () {

            form.find('input:not([type="submit"]):not([type="radio"]), textarea').val('');

        }, 4000);

    }



    form.on('submit', function (e) {

        e.preventDefault();

        var name = form.find('input[name="name"]').val() || '';

        var guests = form.find('select[name="guests"], input[name="guests"]').val() || '1';

        var attendance = form.find('input[name="attendance"]:checked').val() || '¡Sí, asistiré con alegría!';

        var note = form.find('textarea[name="message"]').val() || '';



        var originalBtnVal = submitBtn.val();

        submitBtn.prop('disabled', true).val('GUARDANDO CONFIRMACIÓN...');



        var params = new URLSearchParams();

        params.append('Fecha', new Date().toLocaleString('es-CL'));

        params.append('Nombre', name);

        params.append('Invitados', guests);

        params.append('Asistencia', attendance);

        params.append('Mensaje', note);

        params.append('name', name);

        params.append('guests', guests);

        params.append('attendance', attendance);

        params.append('message', note);



        fetch(SCRIPT_URL, {

            method: 'POST',

            body: params

        })

        .then(function (response) {

            return response.json().catch(function () { return { result: 'success' }; });

        })

        .then(function (data) {

            showConfirmationSuccess(name, guests, attendance, note);

        })

        .catch(function (error) {

            console.warn('Aviso conexión:', error);

            showConfirmationSuccess(name, guests, attendance, note);

        })

        .finally(function () {

            submitBtn.prop('disabled', false).val(originalBtnVal);

        });

    });



}());



// Countdown Wedding - 21 de Noviembre 2026, 18:00

(function () {

    const second = 1000,

          minute = second * 60,

          hour = minute * 60,

          day = hour * 24;



    // Fecha de la boda: 21 de Noviembre 2026, 18:00

    let weddingDate = "Nov 21, 2026 18:00:00",

        countDown = new Date(weddingDate).getTime();



    let x = setInterval(function () {

        let now = new Date().getTime(),

            distance = countDown - now;



        var elDays = document.getElementById("days"),

            elHours = document.getElementById("hours"),

            elMinutes = document.getElementById("minutes"),

            elSeconds = document.getElementById("seconds");



        if (elDays && elHours && elMinutes && elSeconds) {

            elDays.innerText = Math.max(0, Math.floor(distance / day));

            elHours.innerText = Math.max(0, Math.floor((distance % day) / hour));

            elMinutes.innerText = Math.max(0, Math.floor((distance % hour) / minute));

            elSeconds.innerText = Math.max(0, Math.floor((distance % minute) / second));

        }



        if (distance < 0) {

            var headline = document.getElementById("headline");

            if (headline) headline.innerText = "¡Llegó el gran día!";

            clearInterval(x);

        }

    }, 1000);

}());



// Background Music Player Control
(function () {
    var audio = document.getElementById("bg-music");
    var control = document.getElementById("music-control");

    if (!audio || !control) return;

    var isPlaying = false;

    function playAudio() {
        var promise = audio.play();
        if (promise !== undefined) {
            promise.then(function () {
                isPlaying = true;
                control.classList.remove("paused");
                control.classList.add("playing");
            }).catch(function (error) {
                console.log("Autoplay blocked until user interaction:", error);
                isPlaying = false;
                control.classList.add("paused");
                control.classList.remove("playing");
            });
        }
    }

    function pauseAudio() {
        audio.pause();
        isPlaying = false;
        control.classList.add("paused");
        control.classList.remove("playing");
    }

    // Toggle button click
    control.addEventListener("click", function (e) {
        e.stopPropagation();
        if (isPlaying) {
            pauseAudio();
        } else {
            playAudio();
        }
    });

    // Attempt to play on the first touch, click or scroll
    function onFirstInteraction() {
        if (!isPlaying) {
            playAudio();
        }
        document.removeEventListener("click", onFirstInteraction);
        document.removeEventListener("touchstart", onFirstInteraction);
        document.removeEventListener("scroll", onFirstInteraction);
    }

    document.addEventListener("click", onFirstInteraction, { passive: true });
    document.addEventListener("touchstart", onFirstInteraction, { passive: true });
    document.addEventListener("scroll", onFirstInteraction, { passive: true, once: true });
}());
