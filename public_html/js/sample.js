
//Command to trigger Jenkins
//curl http://52.11.228.37:8080/git/notifyCommit?url=https://github.com/kishorgutte/kishorproject.git
//client id=954570292134-r2u7o4our3i3kv7meoj569ga30j17qvf.apps.googleusercontent.com
//key =SGiPBvEwW7uVQbvKA1Bxr_0b
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
    player.loadPlaylist(self.Hindivideolist());

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
    Hindivideolist: ko.observableArray(),
    Englishvideolist: ko.observableArray(),
    videolistmix: ko.observableArray(),
    youtubesearchedlist : ko.observableArray(),
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
    closecurrentdiv: function ()
    {
        console.log("Hi");
    },
    Searchonyoutube : function ()
    {
        self.youtubesearchedlist.removeAll();
        var q =$(".youtubesearchfield").val();
        console.log(q);
        
        var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            safeSearch:"strict",
            q: encodeURIComponent($(".youtubesearchfield").val()).replace(/%20/g, "+"),
            maxResults: 16,
            order: "viewCount",
       }); 

       request.execute(function(response) {
          var results = response.result;
          $.each(results.items, function(index, item) {
            self.youtubesearchedlist.push(new FormatToDisplay(item));
          });
       });
 
    },
    
    init:function ()
    {
    gapi.client.setApiKey("AIzaSyAqLM3LNORiFcgNv7UykOACQl82Rr4f2B4");
    gapi.client.load("youtube", "v3", function() {
       console.log("Youtube Api is ready");
    });
    },
};
$('.make-switch').bootstrapSwitch('setSizeClass', 'switch-large');
ko.applyBindings(self);


$.getJSON("Hindivideolist.json", function (data) {
    for (var i = 0; i < data.url.length; i++) {
        self.Hindivideolist.push(YouTubeGetID(data.url[i]));
        self.videolistmix.push(YouTubeGetID(data.url[i]));
    }
});
$.getJSON("Englishvideolist.json", function (data) {
    for (var i = 0; i < data.url.length; i++) {
        self.Englishvideolist.push(YouTubeGetID(data.url[i]));
        self.videolistmix.push(YouTubeGetID(data.url[i]));
    }
});

$('#catagories :checkbox').click(function () {
    var $this = $(this);
    if ($("input:checkbox:checked").length === 1) {

        if ($this.is(':checked')) {
            if (this.value == "hindi") {
                player.loadPlaylist(self.Hindivideolist());
                player.setShuffle(true);
            }
            if (this.value == "english") {
                player.loadPlaylist(self.Englishvideolist());
                player.setShuffle(true);
            }
        } else {
            if (this.value == "hindi") {
                player.loadPlaylist(self.Englishvideolist());
                player.setShuffle(true);
            }
            if (this.value == "english") {
                player.loadPlaylist(self.Hindivideolist());
                player.setShuffle(true);
            }

        }
    }

    if ($("input:checkbox:checked").length === 2) {
        player.loadPlaylist(self.videolistmix());
        player.setShuffle(true);
    }
    if ($("input:checkbox:checked").length === 0) {
        alert("Please select one categories otherwise default categories will be played")
        player.loadPlaylist(self.Hindivideolist());
        player.setShuffle(true);
    }

});

function FormatToDisplay(item){
   
   var temp=item.snippet.title;
    if(temp.length > 59){
        temp=temp.trim().substring(0,50)+"...";
    }
    if(temp.length < 27){
        temp=temp+"                  ";
    }
   
    this.ellipsedtitle=temp;
    this.videoId=item.id.videoId;
    this.title=item.snippet.title;
    this.videothumbnail = item.snippet.thumbnails.medium.url;
    this.youtubelink="https://www.youtube.com/watch?v="+this.videoId;
}

$(".youtubesearchfield").keypress(function(event) {
    if (event.which == 13) {
      $( "#goforsearch" ).trigger( "click" );
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

