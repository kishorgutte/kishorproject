/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

 $(function() {
                $('.kc-wrap').KillerCarousel({
                    // Default natural width of carousel.
                    width: 800,
                    // Item spacing in 3d (has CSS3 3d) mode.
                    spacing3d: 120,
                    // Item spacing in 2d (no CSS3 3d) mode. 
                    spacing2d: 120,
                    showShadow: false,
                    showReflection: false,
                    // Looping mode.
                    infiniteLoop: true,
                    // Scale at 75% of parent element.
                    autoScale: 75,
                });
            });           
 $('.kc-horizon').css({" perspective": "0px"});
 
 
 
 function backtohome(data){
     $("#"+$(data).attr("id")).css({"display":"none"});
     $("#body").css({"display":"initial"});
 };
 
 function getvideolistready() {
    $.getJSON("videolist/Hindivideolist.json", function (data) {
        for (var i = 0; i < data.url.length; i++) {
            viewmodel.Hindivideolist.push(YouTubeGetID(data.url[i]));
        }
        viewmodel.Hindivideolist.reverse();
    });
    $.getJSON("videolist/bollywoodsuperhit.json", function (data) {
        for (var i = 0; i < data.url.length; i++) {
            viewmodel.bollywoodsuperhitlist(viewmodel.bollywoodsuperhitlist() + "," + YouTubeGetID(data.url[i]));
        }
    });
    $.getJSON("videolist/Englishsongslist.json", function (data) {
        for (var i = 0; i < data.url.length; i++) {
            viewmodel.Englishsongslist(viewmodel.Englishsongslist() + "," + YouTubeGetID(data.url[i]));
        }
    });
    
    $.getJSON("videolist/Marathisongslist.json", function (data) {
        for (var i = 0; i < data.url.length; i++) {
            viewmodel.Marathisongslist(viewmodel.Marathisongslist() + "," + YouTubeGetID(data.url[i]));
        }
    });
    
    $.getJSON("videolist/RemixandDjsongslist.json", function (data) {
        for (var i = 0; i < data.url.length; i++) {
            viewmodel.RemixandDjsongslist(viewmodel.RemixandDjsongslist() + "," + YouTubeGetID(data.url[i]));
        }
    });
    
    $.getJSON("videolist/Romancesongslist.json", function (data) {
        for (var i = 0; i < data.url.length; i++) {
            viewmodel.Romancesongslist(viewmodel.Romancesongslist() + "," + YouTubeGetID(data.url[i]));
        }
    });
    
    $.getJSON("videolist/Workoutsongslist.json", function (data) {
        for (var i = 0; i < data.url.length; i++) {
            viewmodel.Workoutsongslist(viewmodel.Workoutsongslist() + "," + YouTubeGetID(data.url[i]));
        }
    });

};