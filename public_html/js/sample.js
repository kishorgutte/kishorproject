
//Command to trigger Jenkins
//curl http://52.11.228.37:8080/git/notifyCommit?url=https://github.com/kishorgutte/kishorproject.git
//client id=954570292134-r2u7o4our3i3kv7meoj569ga30j17qvf.apps.googleusercontent.com
//key =SGiPBvEwW7uVQbvKA1Bxr_0b
var tag = document.createElement('script');
var player;
var totalcount = 0;
var viewmodel;
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '480',
        width: '854',
        videoId: 'R8rNw0bGOBA',
        playerVars: {'autoplay': 0},
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}
// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    //player.loadPlaylist(self.Hindivideolist());
    player.loadPlaylist(viewmodel.Englishvideolist());

    player.setShuffle(true);
    player.setLoop(true);
    //event.target.playVideo();
}
// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
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
});

var viewmodeldata = function () {
    var self = this;

    self.isvideohidden = ko.observable(true);
    self.Hindivideolist = ko.observableArray();
    self.Englishvideolist = ko.observableArray();
    self.videolistmix = ko.observableArray();
    self.youtubesearchedlist = ko.observableArray()

    self.showvideo = function () {
        // $("#player").show();
    };
    self.nextvideo = function () {
        player.nextVideo();
    };
    self.previousvideo = function () {
        player.previousVideo();
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
            type: "video",
            safeSearch: "strict",
            q: encodeURIComponent($(".youtubesearchfield").val()).replace(/%20/g, "+"),
            maxResults: 16,
            order: "viewCount",
        });

        request.execute(function (response) {
            var results = response.result;
            $.each(results.items, function (index, item) {
                self.youtubesearchedlist.push(new FormatToDisplay(item));
            });
        });
    };
    
     self.init = function ()
            {
                ko.applyBindings(self);
            };
};

$.getJSON("Hindivideolist.json", function (data) {
    for (var i = 0; i < data.url.length; i++) {
        viewmodel.Hindivideolist.push(YouTubeGetID(data.url[i]));
        viewmodel.videolistmix.push(YouTubeGetID(data.url[i]));
    }
});
$.getJSON("Englishvideolist.json", function (data) {
    for (var i = 0; i < data.url.length; i++) {
        viewmodel.Englishvideolist.push(YouTubeGetID(data.url[i]));
        viewmodel.videolistmix.push(YouTubeGetID(data.url[i]));
    }
});

$('#catagories :checkbox').click(function () {
    var $this = $(this);
    if ($("input:checkbox:checked").length === 1) {

        if ($this.is(':checked')) {
            if (this.value == "hindi") {
                player.loadPlaylist(viewmodel.Hindivideolist());
                player.setShuffle(true);
            }
            if (this.value == "english") {
                player.loadPlaylist(viewmodel.Englishvideolist());
                player.setShuffle(true);
            }
        } else {
            if (this.value == "hindi") {
                player.loadPlaylist(viewmodel.Englishvideolist());
                player.setShuffle(true);
            }
            if (this.value == "english") {
                player.loadPlaylist(viewmodel.Hindivideolist());
                player.setShuffle(true);
            }

        }
    }

    if ($("input:checkbox:checked").length === 2) {
        player.loadPlaylist(viewmodel.videolistmix());
        player.setShuffle(true);
    }
    if ($("input:checkbox:checked").length === 0) {
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
        player.loadVideoById(data.videoId);
        player.setPlaybackQuality("small");
    };
    
    
};

$(".youtubesearchfield").keypress(function (event) {
    if (event.which == 13) {
        $("#goforsearch").trigger("click");
    }
});

 function init () {
    gapi.client.setApiKey("AIzaSyAqLM3LNORiFcgNv7UykOACQl82Rr4f2B4");
    gapi.client.load("youtube", "v3", function () {
        console.log("Youtube Api is ready");
    });
  };

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

