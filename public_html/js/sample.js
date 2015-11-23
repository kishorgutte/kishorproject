
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

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '480',
        width: '854',
        videoId: 'R8rNw0bGOBA',
        playerVars: {'autoplay': 1},
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}
// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    player.loadPlaylist(viewmodel.Hindivideolist());
    player.setShuffle(true);
    player.setLoop(true);
    //event.target.playVideo();
}
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
    self.youtubesearchedlist = ko.observableArray();
    self.responseresult = ko.observableArray([]);
    self.tempplaylist = ko.observableArray();
    self.templistlength = ko.observable(0);
    self.templistmode = ko.observable(false);
    self.currentsongsindex = ko.observable(0);
    self.bollywoodsuperhitlist = ko.observable("0pehqPZuB8A");
    self.Englishsongslist = ko.observable("3x2ABSAMVno");
    self.Marathisongslist = ko.observable("0FBzaGdtzCs");
    self.RemixandDjsongslist = ko.observable("Dq64_9NCv1o");
    self.Romancesongslist = ko.observable("K_uXbheO3qU");
    self.Workoutsongslist = ko.observable("69CEiHfS_mc");
    self.bollywoodsuperhitReady = ko.observableArray();
    self.englishsongsReady = ko.observableArray();
    self.RomanceReady = ko.observableArray();
    self.DardeDilReady = ko.observableArray();
    self.RockReady = ko.observableArray();
    self.ArtistsReady = ko.observableArray();
    self.WorkoutReady = ko.observableArray();
    self.RemixDjReady = ko.observableArray();
    self.MarathiReady = ko.observableArray();
    self.showvideo = function () {
        // $("#player").show();
    };
    self.nextvideo = function () {
        if (self.templistmode()) {
            self.currentsongsindex(self.currentsongsindex() + 1);
            player.loadVideoById(self.tempplaylist()[self.currentsongsindex()]);
        } else {
            player.nextVideo();
        }
    };
    self.previousvideo = function () {
        if (self.templistmode()) {
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

            $("#mycontainerid .thumbnail").addClass("animated rotateInDownLeft");
            //$("#mycontainerid .thumbnail").addClass("animated flip");
        });
    };
    self.makemodalready = function () {

        $(".ui-autocomplete").css({"z-index": "1052"});
        if ($(".youtubesearchfield").val() === "") {
            $(".youtubesearchfield").val("top 100 songs of  Bollywood 2015");
            $("#goforsearch").trigger("click");
            $(".youtubesearchfield").val("");
        }
    },
            self.init = function () {
                ko.applyBindings(self);
                getvideolistready();
            };
    self.bollywoodsuperhit = function () {
        self.bollywoodsuperhitReady.removeAll();
        $("#catagories").css({"display": "none"});
        $("#bollywoodsuperhits").css({"display": "initial"});
        $(".preloader").show();
        $.ajax({
            method: 'get',
            url: "https://crossorigin.me/https://www.youtube.com/list_ajax?style=json&action_get_templist=1",
            dataType: "json",
            data: {video_ids: viewmodel.bollywoodsuperhitlist()},
        })
                .done(function (data) {
                    for (var i = 0; i < data.video.length; i++)
                    {
                        self.bollywoodsuperhitReady.push(new FormatToCategories(data.video[i]));
                    }
                })
                .complete(function () {
                    $(".preloader").hide();
                });
    };
    self.englishsongs = function () {
        self.englishsongsReady.removeAll();
        $("#catagories").css({"display": "none"});
        $("#englishsongs").css({"display": "initial"});
        $(".preloader").show();
        $.ajax({
            method: 'get',
            url: "https://crossorigin.me/https://www.youtube.com/list_ajax?style=json&action_get_templist=1",
            dataType: "json",
            data: {video_ids: viewmodel.Englishsongslist()},
        })
                .done(function (data) {
                    for (var i = 0; i < data.video.length; i++)
                    {
                        self.englishsongsReady.push(new FormatToCategories(data.video[i]));
                    }
                })
                .complete(function () {
                    $(".preloader").hide();
                });
    };
    self.Romance = function () {
        self.RomanceReady.removeAll();
        $("#catagories").css({"display": "none"});
        $("#romance").css({"display": "initial"});
        $(".preloader").show();
        $.ajax({
            method: 'get',
            url: "https://crossorigin.me/https://www.youtube.com/list_ajax?style=json&action_get_templist=1",
            dataType: "json",
            data: {video_ids: viewmodel.Romancesongslist()}
        })
                .done(function (data) {
                    for (var i = 0; i < data.video.length; i++)
                    {
                        self.RomanceReady.push(new FormatToCategories(data.video[i]));
                    }
                })
                .complete(function () {
                    $(".preloader").hide();
                });

    };
    self.Artists = function () {
        alert("Songs Comming Soon, Please Select Other Catagories");
        return false;
        self.ArtistsReady.removeAll();
        $("#catagories").css({"display": "none"});
        $("#artists").css({"display": "initial"});
        $(".preloader").show()
        $.ajax({
            method: 'get',
            url: "https://crossorigin.me/https://www.youtube.com/list_ajax?style=json&action_get_templist=1",
            dataType: "json",
            data: {video_ids: "3x2ABSAMVno,t4H_Zoh7G5A,SmM0653YvXU,EPo5wWmKEaI,_Z5-P9v3F8w,uelHwf8o7_U"}
        })
                .done(function (data) {
                    for (var i = 0; i < data.video.length; i++)
                    {
                        self.ArtistsReady.push(new FormatToCategories(data.video[i]));
                    }
                })
                .complete(function () {
                    $(".preloader").hide();
                });
    };
    self.Workout = function () {
        self.WorkoutReady.removeAll();
        $("#catagories").css({"display": "none"});
        $("#workout").css({"display": "initial"});
        $(".preloader").show();
        $.ajax({
            method: 'get',
            url: "https://crossorigin.me/https://www.youtube.com/list_ajax?style=json&action_get_templist=1",
            dataType: "json",
            data: {video_ids: viewmodel.Workoutsongslist()}
        })
                .done(function (data) {
                    for (var i = 0; i < data.video.length; i++)
                    {
                        self.WorkoutReady.push(new FormatToCategories(data.video[i]));
                    }
                })
                .complete(function () {
                    $(".preloader").hide();
                });
    };
    self.RemixDj = function () {
        self.RemixDjReady.removeAll();
        $("#catagories").css({"display": "none"});
        $("#remixdj").css({"display": "initial"});
        $(".preloader").show();
        $.ajax({
            method: 'get',
            url: "https://crossorigin.me/https://www.youtube.com/list_ajax?style=json&action_get_templist=1",
            dataType: "json",
            data: {video_ids: viewmodel.RemixandDjsongslist()}
        })
                .done(function (data) {
                    for (var i = 0; i < data.video.length; i++)
                    {
                        self.RemixDjReady.push(new FormatToCategories(data.video[i]));
                    }
                })
                .complete(function () {
                    $(".preloader").hide();
                });

    };
    self.Marathisongs = function () {
        self.MarathiReady.removeAll();
        $("#catagories").css({"display": "none"});
        $("#marathi").css({"display": "initial"});
        $(".preloader").show();
        $.ajax({
            method: 'get',
            url: "https://crossorigin.me/https://www.youtube.com/list_ajax?style=json&action_get_templist=1",
            dataType: "json",
            data: {video_ids: viewmodel.Marathisongslist()}
        })
                .done(function (data) {
                    for (var i = 0; i < data.video.length; i++)
                    {
                        self.MarathiReady.push(new FormatToCategories(data.video[i]));
                    }
                })
                .complete(function () {
                    $(".preloader").hide();
                });
    };
};
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
        $("#animate_" + data.videoId).removeClass("animated rotateInDownLeft");
        $("#animate_" + data.videoId).css({"animation-duration":"0.65s"});
        $("#animate_" + data.videoId).addClass("animated rotateOutDownLeft");
        var monkey = document.querySelector("#animate_" + data.videoId);
//        monkey.addEventListener("animationstart", function (e) {
//            console.log("log at beginning of monkey animation");
//        }, false);
//        monkey.addEventListener("animationiteration", function (e) {
//            console.log("log at beginning of each subsequent iteration");
//        }, false);
        monkey.addEventListener("animationend", function (e) {
            viewmodel.youtubesearchedlist.remove(data);
        }, false);

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
function  FormatToCategories(item) {

    this.VideoId = item.encrypted_id;
    this.videotitle = item.title;
    this.duration = item.duration;
    this.imgsrc = "https://i.ytimg.com/vi/" + item.encrypted_id + "/mqdefault.jpg";
    this.playselectedvideo = function (data) {
        viewmodel.templistmode(false);
        player.loadVideoById(data.VideoId);
        player.setPlaybackQuality("small");
    };
    this.closecurrentdiv = function (data) {
        viewmodel.bollywood90songsReady.remove(data);
    };
    this.playaddedsongs = function (data) {
        $("#" + data.VideoId).hide();
        $("#ok" + data.VideoId).show();
        var temp = viewmodel.tempplaylist().length;
        var id = data.VideoId;
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
        $("#" + data.VideoId).show();
        $("#ok" + data.VideoId).hide();
        viewmodel.tempplaylist.remove(data.VideoId);
        viewmodel.templistlength(viewmodel.tempplaylist().length);
    };
}


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

