(function($) {
    $(function() {

        $('.button-collapse').sideNav();
        $('.scrollspy').scrollSpy();

        /*** Animate word ***/

        //set animation timing
        var animationDelay = 250, //×–×ž×Ÿ ×©×”×ž×™×œ×” ×ž×•×¤×™×¢×” ×‘×©×œ×ž×•×ª×”
            //loading bar effect
            barAnimationDelay = 3800,
            barWaiting = barAnimationDelay - 3000, //3000 is the duration of the transition on the loading bar - set in the scss/css file
            //letters effect
            lettersDelay = 50,
            //type effect
            typeLettersDelay = 125,
            selectionDuration = 250,
            typeAnimationDelay = selectionDuration + 400,
            //clip effect 
            revealDuration = 600,
            revealAnimationDelay = 1500;

        initHeadline();


        function initHeadline() {
            singleLetters($('.cd-headline.letters').find('b'));
            animateHeadline($('.cd-headline'));
        }

        function singleLetters($words) {
            $words.each(function() {
                var word = $(this),
                    letters = word.text().split(''),
                    selected = word.hasClass('is-visible');
                for (i in letters) {
                    if (word.parents('.rotate-2').length > 0) letters[i] = '<em>' + letters[i] + '</em>';
                    letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>' : '<i>' + letters[i] + '</i>';
                }
                var newLetters = letters.join('');
                word.html(newLetters).css('opacity', 1);
            });
        }

        function animateHeadline($headlines) {
            var duration = animationDelay;
            $headlines.each(function() {
                var headline = $(this);

                if (headline.hasClass('loading-bar')) {
                    duration = barAnimationDelay;
                    setTimeout(function() {
                        headline.find('.cd-words-wrapper').addClass('is-loading')
                    }, barWaiting);
                } else if (headline.hasClass('clip')) {
                    var spanWrapper = headline.find('.cd-words-wrapper'),
                        newWidth = spanWrapper.width() + 10
                    spanWrapper.css('width', newWidth);
                } else if (!headline.hasClass('type')) {
                    //assign to .cd-words-wrapper the width of its longest word
                    var words = headline.find('.cd-words-wrapper b'),
                        width = 0;
                    words.each(function() {
                        var wordWidth = $(this).width();
                        if (wordWidth > width) width = wordWidth;
                    });
                    headline.find('.cd-words-wrapper').css('width', width);
                };

                //trigger animation
                setTimeout(function() {
                    hideWord(headline.find('.is-visible').eq(0))
                }, duration);
            });
        }

        function hideWord($word) {
            var nextWord = takeNext($word);

            if ($word.parents('.cd-headline').hasClass('type')) {
                var parentSpan = $word.parent('.cd-words-wrapper');
                parentSpan.addClass('selected').removeClass('waiting');
                setTimeout(function() {
                    parentSpan.removeClass('selected');
                    $word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
                }, selectionDuration);
                setTimeout(function() {
                    showWord(nextWord, typeLettersDelay)
                }, typeAnimationDelay);

            } else if ($word.parents('.cd-headline').hasClass('letters')) {
                var bool = ($word.children('i').length >= nextWord.children('i').length) ? true : false;
                hideLetter($word.find('i').eq(0), $word, bool, lettersDelay);
                showLetter(nextWord.find('i').eq(0), nextWord, bool, lettersDelay);

            } else if ($word.parents('.cd-headline').hasClass('clip')) {
                $word.parents('.cd-words-wrapper').animate({
                    width: '2px'
                }, revealDuration, function() {
                    switchWord($word, nextWord);
                    showWord(nextWord);
                });

            } else if ($word.parents('.cd-headline').hasClass('loading-bar')) {
                $word.parents('.cd-words-wrapper').removeClass('is-loading');
                switchWord($word, nextWord);
                setTimeout(function() {
                    hideWord(nextWord)
                }, barAnimationDelay);
                setTimeout(function() {
                    $word.parents('.cd-words-wrapper').addClass('is-loading')
                }, barWaiting);

            } else {
                switchWord($word, nextWord);
                setTimeout(function() {
                    hideWord(nextWord)
                }, animationDelay);
            }
        }

        function showWord($word, $duration) {
            if ($word.parents('.cd-headline').hasClass('type')) {
                showLetter($word.find('i').eq(0), $word, false, $duration);
                $word.addClass('is-visible').removeClass('is-hidden');

            } else if ($word.parents('.cd-headline').hasClass('clip')) {
                $word.parents('.cd-words-wrapper').animate({
                    'width': $word.width() + 10
                }, revealDuration, function() {
                    setTimeout(function() {
                        hideWord($word)
                    }, revealAnimationDelay);
                });
            }
        }

        function hideLetter($letter, $word, $bool, $duration) {
            $letter.removeClass('in').addClass('out');

            if (!$letter.is(':last-child')) {
                setTimeout(function() {
                    hideLetter($letter.next(), $word, $bool, $duration);
                }, $duration);
            } else if ($bool) {
                setTimeout(function() {
                    hideWord(takeNext($word))
                }, animationDelay);
            }

            if ($letter.is(':last-child') && $('html').hasClass('no-csstransitions')) {
                var nextWord = takeNext($word);
                switchWord($word, nextWord);
            }
        }

        function showLetter($letter, $word, $bool, $duration) {
            $letter.addClass('in').removeClass('out');

            if (!$letter.is(':last-child')) {
                setTimeout(function() {
                    showLetter($letter.next(), $word, $bool, $duration);
                }, $duration);
            } else {
                if ($word.parents('.cd-headline').hasClass('type')) {
                    setTimeout(function() {
                        $word.parents('.cd-words-wrapper').addClass('waiting');
                    }, 200);
                }
                if (!$bool) {
                    setTimeout(function() {
                        hideWord($word)
                    }, animationDelay)
                }
            }
        }

        function takeNext($word) {
            return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
        }

        function takePrev($word) {
            return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
        }

        function switchWord($oldWord, $newWord) {
            $oldWord.removeClass('is-visible').addClass('is-hidden');
            $newWord.removeClass('is-hidden').addClass('is-visible');
        }

        $('.button-collapse').sideNav({
            menuWidth: 240, // Default is 240
            closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
        });

        $('.parallax').parallax();

        /**#################### form ajax stuff ######################**/

        var form = $('#formy');

        // Get the messages div.
        var formMessages = $('#form_div');

        // Set up an event listener for the contact form.
        $(form).submit(function(event) {

            // Stop the browser from submitting the form.
            event.preventDefault();

            // Serialize the form data.
            var formData = $(form).serialize();

            // Submit the form using AJAX.
            $.ajax({
                type: 'POST',
                url: $(form).attr('action'),
                data: formData
            })

            .done(function(response) {
                // Make sure that the formMessages div has the 'success' class.
                $(formMessages).removeClass('error');
                $(formMessages).addClass('success');

                // Set the message text.
                $(formMessages).replaceWith('<h2 class="center header text_h2 white-text" dir="rtl" style="margin-bottom:5px; margin-top:10px; font-size:40px; line-height:43px;">תודה שיצרתם עימנו קשרת נחזור אליכם בקרוב!</h2>          <h2 class="center header text_h2 white-text" dir="rtl" style="font-size:35px; line-height:30px;">  ניתן לפנות אלינו גם דרך המייל: </h2>            <h5 class="center header text_h2 white-text" dir="rtl" style="font-size:30px; line-height:30px;"> Open.Mind@outlook.co.il </h5> ');

            })

            .fail(function(data) {
                // Make sure that the formMessages div has the 'error' class.
                $(formMessages).removeClass('success');
                $(formMessages).addClass('error');

                // Set the message text.
                if (data.responseText !== '') {
                    $(formMessages).text(data.responseText);
                } else {
                    $(formMessages).text('Oops! An error occured and your message could not be sent.');
                }
            });
        });
        /**#################### END OF form ajax stuff ######################**/

        var card = document.querySelectorAll('.card-work');
        var transEndEventNames = {
                'WebkitTransition': 'webkitTransitionEnd',
                'MozTransition': 'transitionend',
                'transition': 'transitionend'
            },
            transEndEventName = transEndEventNames[Modernizr.prefixed('transition')];

        function addDashes(name) {
            return name.replace(/([A-Z])/g, function(str, m1) {
                return '-' + m1.toLowerCase();
            });
        }

        function getPopup(id) {
            return document.querySelector('.popup[data-popup="' + id + '"]');
        }

        function getDimensions(el) {
            return el.getBoundingClientRect();
        }

        function getDifference(card, popup) {
            var cardDimensions = getDimensions(card),
                popupDimensions = getDimensions(popup);

            return {
                height: popupDimensions.height / cardDimensions.height,
                width: popupDimensions.width / cardDimensions.width,
                left: popupDimensions.left - cardDimensions.left,
                top: popupDimensions.top - cardDimensions.top
            }
        }

        function transformCard(card, size) {
            return card.style[Modernizr.prefixed('transform')] = 'translate(' + size.left + 'px,' + size.top + 'px)' + ' scale(' + size.width + ',' + size.height + ')';
        }

        function hasClass(elem, cls) {
            var str = " " + elem.className + " ";
            var testCls = " " + cls + " ";
            return (str.indexOf(testCls) != -1);
        }

        function closest(e) {
            var el = e.target || e.srcElement;
            if (el = el.parentNode)
                do { //its an inverse loop
                    var cls = el.className;
                    if (cls) {
                        cls = cls.split(" ");
                        if (-1 !== cls.indexOf("card-work")) {
                            return el;
                            break;
                        }
                    }
                } while (el = el.parentNode);
        }

        function scaleCard(e) {
            var el = closest(e);
            var target = el,
                id = target.getAttribute('data-popup-id'),
                popup = getPopup(id);

            var size = getDifference(target, popup);

            target.style[Modernizr.prefixed('transitionDuration')] = '0.5s';
            target.style[Modernizr.prefixed('transitionTimingFunction')] = 'cubic-bezier(0.4, 0, 0.2, 1)';
            target.style[Modernizr.prefixed('transitionProperty')] = addDashes(Modernizr.prefixed('transform'));
            target.style['borderRadius'] = 0;

            transformCard(target, size);
            onAnimated(target, popup);
            onPopupClick(target, popup);
        }

        function onAnimated(card, popup) {
            card.addEventListener(transEndEventName, function transitionEnded() {
                card.style['opacity'] = 0;
                popup.style['visibility'] = 'visible';
                popup.style['zIndex'] = 9999;
                card.removeEventListener(transEndEventName, transitionEnded);
            });
        }

        function onPopupClick(card, popup) {
            popup.addEventListener('click', function toggleVisibility(e) {
                var size = getDifference(popup, card);

                card.style['opacity'] = 1;
                card.style['borderRadius'] = '6px';
                hidePopup(e);
                transformCard(card, size);
            }, false);
        }


        function hidePopup(e) {
            e.target.style['visibility'] = 'hidden';
            e.target.style['zIndex'] = 2;
        }

        // [].forEach.call(card, function(card) {
        // 	card.addEventListener('click', scaleCard, false);
        // });


        // ************************* Back to top scroller **********************  
        // browser window scroll (in pixels) after which the "back to top" link is shown
        var offset = 300,
            //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
            offset_opacity = 1200,
            //duration of the top scrolling animation (in ms)
            scroll_top_duration = 700,
            //grab the "back to top" link
            $back_to_top = $('.cd-top');

        //hide or show the "back to top" link
        $(window).scroll(function() {
            ($(this).scrollTop() > offset) ? $back_to_top.addClass('cd-is-visible'): $back_to_top.removeClass('cd-is-visible cd-fade-out');
            if ($(this).scrollTop() > offset_opacity) {
                $back_to_top.addClass('cd-fade-out');
            }
        });

        //smooth scroll to top
        $back_to_top.on('click', function(event) {
            event.preventDefault();
            $('body,html').animate({
                scrollTop: 0,
            }, scroll_top_duration);
        });
        //form onsubmit function
        function dickUp() {
            alert("Ktnxbye");
        }

    }); // end of document ready
})(jQuery); // end of jQuery name space