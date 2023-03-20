$(document).ready(function () {
    // Checks once website is loaded
    // If a user is already looking at a hidden section show it
    scrollAnimation();

    // Add smooth scrolling to all links
    $("a").on('click', function (event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (600) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({scrollTop: $(hash).offset().top - 50}, 600, null);

            // Close the hamburger menu
            if (document.getElementById("hamburgerButton").getAttribute("aria-expanded") == 'true') {
                document.getElementById("hamburgerButton").click();
            }
        } // End if
    });

    // Every time the window is scrolled...
    $(window).scroll(function () {
        scrollAnimation();
    });

    // Change contact text and color back to normal
    $("input, textarea").on('click', function (event) {
        contactResetColorAndText(this.id);
    });
    // This is a fix for when a user clicks on the label
    $("label").on('click', function (event) {
        id = this.id.replace('Label', '');
        document.getElementById(id).focus();
        contactResetColorAndText(id);
    });

    // Screenshots section
    var view = $("#screenshots-show");
    var move = $("#carousel-first-item").outerWidth(true); // Gets the width and margin of the first image
    var sliderLimit = -move * ($('.carousel-items').length - 1); // Move is the width of each image then we multiple by the number of images

    $("#rightArrow").click(function() {
        carouselLeft()
    });

    $("#leftArrow").click(function() {
        carouselRight()
    });

    function carouselLeft() {
        var currentPosition = parseInt(view.css("left"));
        if (currentPosition > sliderLimit) view.stop(false,true).animate({left:"-="+move+"px"},{ duration: 400})
    }

    function carouselRight() {
        var currentPosition = parseInt(view.css("left"));
        if (currentPosition <= -move) view.stop(false,true).animate({left:"+="+move+"px"},{ duration: 400})
    }

    // Adding touch swipes for carousel
    var carouselWindow = document.getElementById('screenshots-window');
    var carouselHammer = new Hammer(carouselWindow);
    carouselHammer.on("swipeleft", function() {
        carouselLeft();
    });

    carouselHammer.on("swiperight", function() {
        carouselRight();
    });

    // Lightbox options
    lightbox.option({
        'albumLabel': "Screenshot %1 of %2",
        'disableScrolling': true,
        'fadeDuration': 300,
        'imageFadeDuration': 300,
        'resizeDuration': 0
    })

    // Adding touch swipes for lightbox
    var lightboxContainer = lightbox.$container[0];
    var lightboxHammer = new Hammer(lightboxContainer);
    lightboxHammer.on("swipeleft", function() {
        document.getElementsByClassName('lb-next')[0].click()
    });

    lightboxHammer.on("swiperight", function() {
        document.getElementsByClassName('lb-prev')[0].click()
    });
    // END Screenshots section

    // Staring
    var oneStar = document.getElementById('oneStar');
    var twoStar = document.getElementById('twoStar');
    var threeStar = document.getElementById('threeStar');
    var fourStar = document.getElementById('fourStar');
    var fiveStar = document.getElementById('fiveStar');
    oneStar.addEventListener('click', () => {
        oneStar.classList.remove('checked');
        twoStar.classList.remove('checked');
        threeStar.classList.remove('checked');
        fourStar.classList.remove('checked');
        fiveStar.classList.remove('checked');

        oneStar.classList.add('checked');
    });
    twoStar.addEventListener('click', () => {
        oneStar.classList.remove('checked');
        twoStar.classList.remove('checked');
        threeStar.classList.remove('checked');
        fourStar.classList.remove('checked');
        fiveStar.classList.remove('checked');

        oneStar.classList.add('checked');
        twoStar.classList.add('checked');
    });
    threeStar.addEventListener('click', () => {
        oneStar.classList.remove('checked');
        twoStar.classList.remove('checked');
        threeStar.classList.remove('checked');
        fourStar.classList.remove('checked');
        fiveStar.classList.remove('checked');

        oneStar.classList.add('checked');
        twoStar.classList.add('checked');
        threeStar.classList.add('checked');
    });
    fourStar.addEventListener('click', () => {
        oneStar.classList.remove('checked');
        twoStar.classList.remove('checked');
        threeStar.classList.remove('checked');
        fourStar.classList.remove('checked');
        fiveStar.classList.remove('checked');

        oneStar.classList.add('checked');
        twoStar.classList.add('checked');
        threeStar.classList.add('checked');
        fourStar.classList.add('checked');
    });
    fiveStar.addEventListener('click', () => {
        oneStar.classList.remove('checked');
        twoStar.classList.remove('checked');
        threeStar.classList.remove('checked');
        fourStar.classList.remove('checked');
        fiveStar.classList.remove('checked');

        oneStar.classList.add('checked');
        twoStar.classList.add('checked');
        threeStar.classList.add('checked');
        fourStar.classList.add('checked');
        fiveStar.classList.add('checked');
    });
});

// Scroll animation check. This animates in the section.
function scrollAnimation() {
    // Check the location of each desired element
    $('.hideme').each(function (i) {
        var bottom_of_object = $(this).offset().top + screen.height / 3;
        var bottom_of_window = $(window).scrollTop() + $(window).height();

        // If the object is 1/3 visible in the window based on screen height, fade it in
        if (bottom_of_window > bottom_of_object) {
            $(this).animate({ 'opacity': '1' }, 500);
        }
    });
}

// Send form validation
function validateForm() {
    // Reset all the inputs error check
    var contactInputs = ['contactEmail', 'contactSubject', 'contactMessage'];
    for (var i = 0; i < contactInputs.length; i++) {
        contactResetColorAndText(contactInputs[i]);
    }

    var email = document.getElementById('contactEmail').value;
    if (email == "") {
        document.getElementById('contactEmailLabel').innerHTML = "Email cannot be empty";
        $('#contactEmailLabel').addClass('error');
        return false;
    } else {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(email)) {
            document.getElementById('contactEmailLabel').innerHTML = "Email format invalid";
            $('#contactEmailLabel').addClass('error');
            return false;
        }
    }
    var subject = document.getElementById('contactSubject').value;
    if (subject == "") {
        document.getElementById('contactSubjectLabel').innerHTML = "Subject cannot be empty";
        $('#contactSubjectLabel').addClass('error');
        return false;
    }
    var message = document.getElementById('contactMessage').value;
    if (message == "") {
        document.getElementById('contactMessageLabel').innerHTML = "Message cannot be empty";
        $('#contactMessageLabel').addClass('error');
        return false;
    }

    var oneStar = document.getElementById('oneStar');
    var twoStar = document.getElementById('twoStar');
    var threeStar = document.getElementById('threeStar');
    var fourStar = document.getElementById('fourStar');
    var fiveStar = document.getElementById('fiveStar');
    var stars = 0;
    if (oneStar.classList.contains('checked')) ++stars;
    if (twoStar.classList.contains('checked')) ++stars;
    if (threeStar.classList.contains('checked')) ++stars;
    if (fourStar.classList.contains('checked')) ++stars;
    if (fiveStar.classList.contains('checked')) ++stars;

    // Start loading animation
    $('#sendFormButton').html('<span class="spinner-border spinner-border-sm">');

    alert(`email: ${email}
    subject: ${subject}
    message: ${message}
    stars: ${stars}`);

    document.getElementById('sentDiv').style.visibility = 'visible';
    $('#sentDiv').animate({ 'opacity': '1' }, 300);
    var el = document.querySelector(".div-bird");
    el.classList.toggle('active');

    // Reset form for another email
    $('#contactForm').closest('form').find("input[type=text], textarea").val("");
    setTimeout(function () {
        $('#sentDiv').animate({ 'opacity': '0' }, 300);
        setTimeout(function () {
            document.getElementById('sentDiv').style.visibility = 'hidden';
            document.getElementById('divBird').classList.remove('active');

            document.getElementById('contactEmail').focus();
            document.getElementById('contactSubject').focus();
            document.getElementById('contactMessage').focus();
            $(':focus').blur()
        }, 300);
    }, 2500);
    // Remove loading animation
    $('#sendFormButton').html('Send');

    // With no AJAX
    // document.getElementById('contactForm').submit();
}

//Changes the contact color and text back to normal on click
function contactResetColorAndText(id) {
    if (id == "contactEmail") {
        document.getElementById('contactEmailLabel').innerHTML = "Your email";
    } else if (id == "contactSubject") {
        document.getElementById('contactSubjectLabel').innerHTML = "Subject";
    } else if (id == "contactMessage") {
        document.getElementById('contactMessageLabel').innerHTML = "Your message";
    }
    $('#'.concat(id, 'Label')).removeClass('error');
}

// particlesJS.load(@dom-id, @path-json, @callback (optional));
particlesJS.load('particles-js', 'assets/particles.json', function () {});
