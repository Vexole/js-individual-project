"use strict";

/**
 * None of the codes were copied from the text book. I coded the script file from the scratch
 */

$('document').ready(function () {
    // Declaring constant conversion rates
    const conversionRates =
        [
            { "currency": "CAD", "rate": 98.25 },
            { "currency": "USD", "rate": 129.5 },
            { "currency": "INR", "rate": 1.6 }
        ];

    let images = [];
    // Preload the images for the hero banner slider
    $("#hero_banner").children().each(function (index, value) {
        let image = new Image();
        image.src = value.src;
        images.push(image);
    });

    /**
     * When user clicks on the convert button, get the conversion rate based on the selected 
     * currency, convert it round off to 2 digits.
     * 
     * If the currency to convert is not entered, display an alert box.
     */
    $("#convert_currency").click(e => {
        e.preventDefault();
        let rate = 0;
        let enteredAmount = $("#nepalese_rupees").val();

        if (enteredAmount) {
            for (let conversionRate of conversionRates) {
                if (conversionRate.currency === $("#to_currency").val().toUpperCase()) {
                    rate = conversionRate.rate;
                }
            }

            let convertedValue = parseFloat(enteredAmount / rate).toFixed(2);
            $("#to_amount").val(convertedValue);
        } else {
            alert("Please enter the value for conversion!");
        }
    });


    /**
     * Change the image in the hero banner using fadeOut and fadeIn functions.
     * Cycle through the preloaded images using the counter.
     */
    let count = 1;
    setInterval(() => {
        count++;
        $(".active").fadeOut('fast', function () {
            $(".active").attr("src", images[count % images.length].src);
            $(".active").fadeIn('fast');
        });
    }, 2500);


    /**
     * Validate the contact form for missing values.
     * If required values are missing, then display errors; else give the feedback to user using
     * an alert dialog to know that form has been submitted.
     * Once submitted, reset the form fields.
     */
    $('#contact_us_container form button').click(e => {
        e.preventDefault();
        let hasErrors = false;

        if (!$("form #name").val().trim()) {
            $("form #name").next().text("This field is required!");
            hasErrors = true;
        }

        if (!$("form #email").val().trim()) {
            $("form #email").next().text("This field is required!");
            hasErrors = true;
        }

        if (!$("form #message").val().trim()) {
            $("form #message").next().text("This field is required!");
            hasErrors = true;
        }

        if (!hasErrors) {
            alert("Thank you for your message. We will reach out to you as soon as possible with all the answers.");
            document.querySelector("#inquiry_form").reset();
            $("form #name").next().text("");
            $("form #email").next().text("");
            $("form #message").next().text("");
        }
    });


    // Move the page back to the top when user clicks on the "Go To Top" icon.
    $("#go_to_top").click(() => {
        $("html, body").animate({ scrollTop: 0 }, "slow");
    });


    /** 
    * The "Go To Top" button is initially hidden and displayed only when user scrolls. 
    * If user returns to top of the screen, hide the button.
    */
    let goToTopBtn = document.getElementById("go_to_top");
    window.onscroll = () => {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            goToTopBtn.style.display = "block";
        } else {
            goToTopBtn.style.display = "none";
        }
    }


    /**
     * When user submits the bucket lsit, validate the form and
     * Dynamically add the html content with new entered information to the DOM
     * Scroll the page to the Recent Bucket List section
     */
    $('#bucket_list_submit').click(e => {
        e.preventDefault();

        let errors = '';
        let fullName = document.getElementById('fullname').value;
        let isAnonymous = document.getElementById('post_anonymously').checked;
        let bucketListDescription = $('#bucket_list_form #description').val();

        if (!fullName && !isAnonymous) {
            errors += "<p><span class='red'>*</span>You need to provide your name or post anonymously!</p>"
        }

        if (!bucketListDescription) {
            errors += "<p><span class='red'>*</span>You need to provide your bucket list description!</p>"
        }

        $('#bucket_list_errors')[0].innerHTML = errors;

        if (errors.length == 0) {
            let date = new Date();
            let bucketLists = document.getElementById('bucket_lists');

            document.getElementById('bucket_lists').innerHTML = `
                    <div class="bucket_list">
                        <img src="./images/default_user.png" alt="Default Photo">
                        <div class="content_wrapper">
                            <p class="name"><strong>${isAnonymous ? "Anonymous" : fullName}</strong></p>
                            <p class="bucket_list_description">${bucketListDescription}</p>
                            <p class="posted_date">Posted on: ${date.getFullYear()}-${date.getMonth()}-${date.getDay()}</p>
                        </div>
                    </div>` + bucketLists.innerHTML;

            document.getElementById('fullname').value = '';
            document.getElementById('post_anonymously').checked = false;
            $('#bucket_list_form #description').val('');
            alert('Your bucket list has been added!');
            $("html, body").animate({ scrollTop: 280 }, "slow");
        }
    });
});