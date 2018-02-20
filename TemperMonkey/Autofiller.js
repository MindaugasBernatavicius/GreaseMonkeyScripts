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
    return login_elem_present;
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

function is_AM_initPage(){}
function perform_AM_init(){}

function is_speedtest_modal_open(){}
function autofill_spdtst(){}

// entrance point
$(window).load(function(){

    GLOBAL_PAUSE = 150;

    setTimeout(function()
    {
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
            }, 500);
        }

        // handle AirMAX initial setup
        if(is_AM_initPage())
        {
            // perform_AM_init();
        }

        // handle AirMAX speed test autofill
        if(is_speedtest_modal_open())
        {
            // autofill_spdtst();
        }

        // handle AirMAX initial password change
        if(is_speedtest_modal_open())
        {
            // autofill_spdtst();
        }

    }, GLOBAL_PAUSE);
});
