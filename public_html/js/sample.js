
//Command to trigger Jenkins
//curl http://52.11.228.37:8080/git/notifyCommit?url=https://github.com/kishorgutte/kishorproject.git
//client id=954570292134-r2u7o4our3i3kv7meoj569ga30j17qvf.apps.googleusercontent.com
//key =SGiPBvEwW7uVQbvKA1Bxr_0b
var tag = document.createElement('script');
var player;
var totalcount = 0;
var viewmodel;
var kendodatasource;
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//function onYouTubeIframeAPIReady() {
//    player = new YT.Player('player', {
//        height: '480',
//        width: '854',
//        videoId: 'R8rNw0bGOBA',
//        playerVars: {'autoplay': 1},
//        events: {
//            'onReady': onPlayerReady,
//            'onStateChange': onPlayerStateChange
//        }
//    });
//}
//// 4. The API will call this function when the video player is ready.
//function onPlayerReady(event) {
//    player.loadPlaylist(viewmodel.Hindivideolist());
//    //player.loadPlaylist(viewmodel.Englishvideolist());
//
//    player.setShuffle(true);
//    player.setLoop(true);
//    //event.target.playVideo();
//}
//// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        if (viewmodel.templistmode()) {
            viewmodel.currentsongsindex(viewmodel.currentsongsindex() + 1);
            player.loadVideoById(viewmodel.tempplaylist()[viewmodel.currentsongsindex()]);
        }
    }
    if (event.data == YT.PlayerState.PAUSED) {
        $("#playvideo").show();
        $("#pausevideo").hide();
    }
    if (event.data == YT.PlayerState.PLAYING) {
        $("#pausevideo").show();
        $("#playvideo").hide();
    }
}
function YouTubeGetID(url) {
    var ID = '';
    url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if (url[2] !== undefined) {
        ID = url[2].split(/[^0-9a-z_\-]/i);
        ID = ID[0];
    }
    else {
        ID = url;
    }
    return ID;
}

$(document).ready(function () {
    viewmodel = new viewmodeldata();
    viewmodel.init();

    $(".ui-autocomplete").css({"z-index": "1052"});
    $(".youtubesearchfield").autocomplete({
        source: function (request, response) {
            $.getJSON("http://suggestqueries.google.com/complete/search?callback=?",
                    {
                        "hl": "en", // Language
                        "ds": "yt", // Restrict lookup to youtube
                        "jsonp": "suggestCallBack", // jsonp callback function name
                        "q": $(".youtubesearchfield").val(), // query term
                        "client": "youtube" // force youtube style response, i.e. jsonp
                    }
            );
            suggestCallBack = function (data) {
                var suggestions = [];
                $.each(data[1], function (key, val) {
                    suggestions.push({"value": val[0]});
                });
                suggestions.length = 10; // prune suggestions list to only 5 items
                response(suggestions);
            };
        },
        select: function (event, ui) {
            $("#goforsearch").trigger("click");
        },
    });
    
});

var viewmodeldata = function () {
    var self = this;

    self.isvideohidden = ko.observable(true);
    self.Hindivideolist = ko.observableArray();
    self.Englishvideolist = ko.observableArray();
    self.videolistmix = ko.observableArray();
    self.youtubesearchedlist = ko.observableArray();
    self.responseresult = ko.observableArray([]);
    self.tempplaylist = ko.observableArray();
    self.templistlength = ko.observable();
    self.templistmode = ko.observable(false);
    self.currentsongsindex = ko.observable(0);
    self.showvideo = function () {
        // $("#player").show();
    };
    self.nextvideo = function () {
        if (self.templistmode) {
            self.currentsongsindex(self.currentsongsindex() + 1);
            player.loadVideoById(self.tempplaylist()[self.currentsongsindex()]);
        } else {
            player.nextVideo();
        }
    };
    self.previousvideo = function () {
        if (self.templistmode) {
            self.currentsongsindex(self.currentsongsindex() - 1);
            player.loadVideoById(self.tempplaylist()[self.currentsongsindex()]);
        } else {
            player.previousVideo();
        }

    };
    self.Playvideo = function () {
        $("#pausevideo").show();
        $("#playvideo").hide();
        player.playVideo();
    }
    self.Pausevideo = function () {
        $("#playvideo").show();
        $("#pausevideo").hide();
        player.pauseVideo();
    };
    self.stopvideo = function () {
        player.stopVideo();
    };
    self.closecurrentdiv = function ()
    {
        console.log("Hi");
    };
    self.Searchonyoutube = function ()
    {
        self.youtubesearchedlist.removeAll();
        var q = $(".youtubesearchfield").val();
        console.log(q);

        var request = gapi.client.youtube.search.list({
            part: "snippet",
            safeSearch: "strict",
            q: encodeURIComponent($(".youtubesearchfield").val()).replace(/%20/g, "+"),
            maxResults: 50,
            order: "relevance",
            regionCode: "IN"
        });

        request.execute(function (response) {
            var results = response.result;
            $.each(results.items, function (index, item) {
                self.youtubesearchedlist.push(new FormatToDisplay(item));
            });
        });
    };
    self.makemodalready = function () {

        $(".ui-autocomplete").css({"z-index": "1052"});

        if (self.tempplaylist().length === 0) {
            self.templistlength(0);
            $(".youtubesearchfield").val("top 100 songs of  Bollywood 2015");
            $("#goforsearch").trigger("click");
            $(".youtubesearchfield").val("");
        }
    },
            self.init = function () {
                ko.applyBindings(self);
            };

//    self.renderhandler = function (element, data) {
//        if ($('#mycontainerid').children().length == 16) {
//            $(".searchedcheckbox input").click(function () {
//                $("#addvideotemplist").attr("disabled", false);
//
//                if ($(".searchedcheckbox input:checked").length == 0) {
//                    $("#addvideotemplist").attr("disabled", true);
//                }
//            })
//
//        }
//    }

};

$.getJSON("Hindivideolist.json", function (data) {
    for (var i = 0; i < data.url.length; i++) {
        viewmodel.Hindivideolist.push(YouTubeGetID(data.url[i]));
        viewmodel.videolistmix.push(YouTubeGetID(data.url[i]));
    }
    viewmodel.Hindivideolist.reverse();
});
$.getJSON("Englishvideolist.json", function (data) {
    for (var i = 0; i < data.url.length; i++) {
        viewmodel.Englishvideolist.push(YouTubeGetID(data.url[i]));
        viewmodel.videolistmix.push(YouTubeGetID(data.url[i]));
    }
});

$('#catagories :checkbox').click(function () {
    var $this = $(this);
    if ($("#catagories input:checkbox:checked").length === 1) {

        if ($this.is(':checked')) {
            if (this.value == "hindi") {
                viewmodel.templistmode(false);
                player.loadPlaylist(viewmodel.Hindivideolist());
                player.setShuffle(true);
            }
            if (this.value == "english") {
                viewmodel.templistmode(false);
                player.loadPlaylist(viewmodel.Englishvideolist());
                player.setShuffle(true);
            }
        } else {
            if (this.value == "hindi") {
                viewmodel.templistmode(false);
                player.loadPlaylist(viewmodel.Englishvideolist());
                player.setShuffle(true);
            }
            if (this.value == "english") {
                viewmodel.templistmode(false);
                player.loadPlaylist(viewmodel.Hindivideolist());
                player.setShuffle(true);
            }

        }
    }

    if ($("#catagories input:checkbox:checked").length === 2) {
        player.loadPlaylist(viewmodel.videolistmix());
        player.setShuffle(true);
    }
    if ($("#catagories input:checkbox:checked").length === 0) {
        alert("Please select one categories otherwise default categories will be played")
        player.loadPlaylist(viewmodel.Hindivideolist());
        player.setShuffle(true);
    }

});

function FormatToDisplay(item) {

    var temp = item.snippet.title;
//    if (temp.length > 59) {
//        temp = temp.trim().substring(0, 50) + "...";
//    }
//    if (temp.length < 27) {
//        temp = temp + "                  ";
//    }

    this.ellipsedtitle = temp;
    this.videoId = item.id.videoId;
    this.title = item.snippet.title;
    this.videothumbnail = item.snippet.thumbnails.medium.url;
    this.youtubelink = "https://www.youtube.com/watch?v=" + this.videoId;
    this.playselectedvideo = function (data) {
        viewmodel.templistmode(false);
        player.loadVideoById(data.videoId);
        player.setPlaybackQuality("small");
    };
    this.closecurrentdiv = function (data) {
        viewmodel.youtubesearchedlist.remove(data);
    };
    this.playaddedsongs = function (data) {
        $("#" + data.videoId).hide();
        $("#ok" + data.videoId).show();
        var temp = viewmodel.tempplaylist().length;
        var id = data.videoId;
        var itempresent = false;
        for (var j = 0; j < temp; j++) {
            if (id == viewmodel.tempplaylist()[j]) {
                itempresent = true;
            }
        }
        if (itempresent == false) {
            viewmodel.tempplaylist().push(id)
        }
        if (temp === 0) {
            player.loadVideoById(id);
            viewmodel.templistmode(true);
            viewmodel.currentsongsindex(0);
        }
        viewmodel.templistlength(viewmodel.tempplaylist().length);
    };
    this.removefromtemplist = function (data) {
        $("#" + data.videoId).show();
        $("#ok" + data.videoId).hide();
        viewmodel.tempplaylist.remove(data.videoId);
        viewmodel.templistlength(viewmodel.tempplaylist().length);
    };
}
;

$(".youtubesearchfield").keypress(function (event) {
    if (event.which == 13) {
        $("#goforsearch").trigger("click");
    }

});

function init() {
    gapi.client.setApiKey("AIzaSyAqLM3LNORiFcgNv7UykOACQl82Rr4f2B4");
    gapi.client.load("youtube", "v3", function () {
        console.log("Youtube Api is ready");
    });
}
;


//ko.bindingHandlers.kendoDropDownList.options={
//    optionLabel : "Choose a School...",
//    filter :"startswith",
//    enable:true, 
//}
//
//ko.bindingHandlers.kendoNotification.options = {
//    height: 100,
//    width: 200,
//    position: {
//        top: 10,
//        right: 10
//    },
//    autoHideAfter: 6000,
//     hideOnClick: true
//};

