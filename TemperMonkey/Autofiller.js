// ==UserScript==
// @name         Autofiller
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Handles autofill in variuous forms
// @author       You
// @match        https://*/*
// @grant        none
// @run-at       document-end
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==


// helper functions
function is_AM_loginpage()
{
    var login_elem_present = !!document.getElementsByClassName("login-container")[0];
    var registration_elem_present = !!document.getElementById("terms_of_use");

    if(login_elem_present && !registration_elem_present)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function perform_AM_login()
{
    var uname_n = document.getElementsByName("username")[0];
    var passw_n = document.getElementsByName("password")[0];

    uname_n.value = "ubnt";
    passw_n.value = "mindaugas1!";
    document.getElementsByName("login")[0].click();
}

function is_ES_loginpage()
{
    var login_elem_present = !!document.getElementsByClassName("logintable")[0];
    return login_elem_present;
}

function perform_ES_login()
{
    var uname_n = document.getElementsByName("username")[0];
    var passw_n = document.getElementsByName("password")[0];

    uname_n.value = "ubnt";
    passw_n.value = "ubnt";
    document.querySelectorAll("input[value=Login]")[0].click();
}

function is_AM_initPage()
{
    if(document.getElementById("terms_of_use"))
    {
        return true;
    }
    else
    {
        return false;
    }
}

function perform_AM_init()
{
    var uname_n = document.getElementById("loginform-username");
    uname_n.value = "ubnt";

    var passw_n = document.getElementById("loginform-password");
    passw_n.value = "ubnt";

    // get all the countries and decide what to
    // choose based on whether it is the world or fcc
    var country_dropdown = document.getElementById("loginform-country");

    if(country_dropdown.length == 4)
    {
        // US == "3"
        country_dropdown.options[3].selected = true;
        country_dropdown.options[3].dispatchEvent(new Event('change', { 'bubbles': true }));
    }
    else
    {
        country_dropdown.selectedIndex = "15";
    }

    document.getElementById("loginform-language").selectedIndex = "1";
    document.getElementById("loginform-agreed").click();
    document.getElementsByName("login")[0].click();
}

function is_speedtest_modal_open()
{
    // id="ui-id-1" should have a text value "Speed Test"
    if(document.querySelector('[id^="ui-id-"]'))
    {
        return (document.querySelector('[id^="ui-id-"]').textContent === "Speed Test" ? true : false);
    }
    else
    {
        return false;
    }
}

function autofill_spdtst()
{
    if(document.getElementById("st_user").value === "" &&
       document.getElementById("st_password").value === "")
    {
        document.getElementById("st_user").value = "ubnt";
        document.getElementById("st_password").value = "mindaugas1!";
    }
}

// entrance point
$(window).load(function(){

    GLOBAL_PAUSE = 800;

    setTimeout(function(){
        // handle AirMAX login
        if(is_AM_loginpage())
        {
            console.log("AM login");
            setTimeout(function(){
                perform_AM_login();
                // handle case when default password "ubnt" used, instread of expected one
            }, 1);
        }

        // handle EdgeSwitch login
        if(is_ES_loginpage())
        {
            console.log("ES login");
            setTimeout(function(){
                perform_ES_login();
            }, 1);
        }

        // handle AirMAX initial setup
        if(is_AM_initPage())
        {
            console.log("AM init page");
            perform_AM_init();
        }

        // handle AirMAX initial password change
        if(false)
        {
            // autofill_spdtst();
        }

        // cointinuously check if SpeedTest is open
        setInterval(
            function()
            {
                if(is_speedtest_modal_open())
                {
                    console.log("Speed Test Detected!");
                    autofill_spdtst();
                }
            }, 200);

    }, GLOBAL_PAUSE);
});
