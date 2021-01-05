// ==UserScript==
// @name         SporEkrani Local Time and Reminder
// @namespace    http://keewy.com/
// @version      20201201
// @description  Local time and reminder for sporekrani.com
// @author       You
// @match        https://www.sporekrani.com/home*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    $(".mobile-team").removeAttr("onClick").off("click");

    $(".match-time").each(function() {
        $(this).append($(this).children("a").children());
        $(this).children("a").remove();
    });

    $(".match-time span").each(function() {
        var time = $(this).text().split(":");
        time[0] = (parseInt(time[0]) < 3 ? time[0] = parseInt(time[0]) + 21 : ((parseInt(time[0]) - 3) % 24));

        var utcTime = new Date($(this).attr("content"));
        var name = $(this).parent().parent().siblings(".game").find("span").text().trim();

        var link = "<input type=\"button\" style=\"font-size:8px\" value=\"Hatırlat\" onClick=\"window.open('https://calendar.google.com/calendar/render?action=TEMPLATE&dates=" + utcTime.toISOString().split(".")[0].replaceAll("-","").replaceAll(":","") + "Z/" + utcTime.toISOString().split(".")[0].replaceAll("-","").replaceAll(":","") + "Z&details=&location=&text=" + name + "','_blank')\" >";
        $(this).html("<span style='color:red !important'>" + (parseInt(time[0]) < 10 ? "0" : "") + time[0] + ":" + time[1] + "</span></br>" + link);
    });

})();