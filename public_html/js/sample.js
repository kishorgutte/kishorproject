
//Command to trigger Jenkins
//curl http://52.11.228.37:8080/git/notifyCommit?url=https://github.com/kishorgutte/kishorproject.git

var tag = document.createElement('script');
var player;
var totalcount = 0;
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
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
    player.loadPlaylist(self.videolist());

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
var self = {
    isvideohidden: ko.observable(true),
    videolist: ko.observableArray(),
//    hidevideo: function () {
//        $("#showbutton").show();
//        $("#hidebutton").hide();
//        $("#player").hide();
//    },
    showvideo: function () {
       // $("#player").show();
    },
    nextvideo: function () {
        player.nextVideo();
    },
    previousvideo: function () {
        player.previousVideo();
    },
    Playvideo: function () {
        $("#pausevideo").show();
        $("#playvideo").hide();
        player.playVideo();
    },
    Pausevideo: function () {
        $("#playvideo").show();
        $("#pausevideo").hide();
        player.pauseVideo();
    },
    stopvideo: function () {
        player.stopVideo();
    },
};
$('.make-switch').bootstrapSwitch('setSizeClass', 'switch-large');
ko.applyBindings(self);


$.getJSON("Hindivideolist.json", function (data) {
    for (var i = 0; i < data.url.length; i++) {
        self.videolist.push(YouTubeGetID(data.url[i]));
    }
});

$('#catagories :checkbox').click(function() {
    var $this = $(this);
    // $this will contain a reference to the checkbox   
    if ($this.is(':checked')) {
        alert("ck");
    } else {
        alert("un");
    }
});



















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

