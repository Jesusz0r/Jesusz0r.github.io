$(document).ready(function() {
    $("#submit_btn").click(function() { 
        var proceed = true;
        
        $("#contact_form input[required=true], #contact_form textarea[required=true]").each(function() {
            $(this).css('border-color',''); 
            if (!$.trim($(this).val())) {
                $(this).css('border-color','red'); 
                proceed = false
            }
            
            var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; 
            if ($(this).attr("type")=="email" && !email_reg.test($.trim($(this).val()))) {
                $(this).css('border-color','red');  
                proceed = false;             
            }   
        });

        if (proceed) {
            var post_data = {
                'user_name'     : $('input[name=name]').val(), 
                'user_email'    : $('input[name=email]').val(), 
                'subject'       : $('select[name=subject]').val(), 
                'msg'           : $('textarea[name=message]').val()
            };
            
            $.post('send.php', post_data, function(response) {  
                if (response.type == 'error') {     
                    output = '<div class="error">'+response.text+'</div>';
                } else {
                    output = '<div class="success">'+response.text+'</div>';
                    
                    $("#contact_form  input[required=true], #contact_form textarea[required=true]").val(''); 
                    $("#contact_form #contact_body").slideUp();
                }

                $("#contact_form #contact_results").hide().html(output).slideDown();
            }, 'json');
        }
    });

    //reset previously set border colors and hide all message on .keyup()
    $("#contact_form  input[required=true], #contact_form textarea[required=true]").keyup(function() { 
        $(this).css('border-color',''); 
        $("#result").slideUp();
    });
    
    removeHashFromUrlAndAnimate();
    fixedMenu();
    burgerMenu();
    writingEffect();
    loadParticles();
});

function writingEffect() {
    const phraseContainer = $('#phrase');
    const phrase = 'Me dedico al desarrollo de páginas y aplicaciones web';
    let newWord = '';
    let index = 0;

    setTimeout(function() {
        var intervalID = setInterval(function() {
            newWord += phrase[index];
            phraseContainer.html(newWord);
            index++;

            if (newWord.length === phrase.length) {
                window.clearInterval(intervalID);
            }
        }, 90);
    }, 500);
}

function fixedMenu() {
    $(window).scroll(function() {
        var homeHeight = $('#home').outerHeight();
        var scrollTop  = $(this).scrollTop();
        
        if (scrollTop > homeHeight) $('#menu').addClass('fixed-menu');
        else                        $('#menu').removeClass('fixed-menu');
    });
}

function burgerMenu() {
    $('#burger').click(function() {
        $('#menu').toggleClass('open');
        $('#burger i').toggleClass('open');
        
        $('#menu.open a').click(function() {
           $('#menu').removeClass('open');            
            $('#burger i').removeClass('open');
        });
    });
}

function removeHashFromUrlAndAnimate() {
    $(function() {
        $('a[href*=#]:not([href=#])').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
                }
            }
        });
    });
}

function loadParticles() {
    particlesJS.load('particles-js', './js/particles.json');
}