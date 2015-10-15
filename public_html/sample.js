
//Command to trigger Jenkins
//curl http://52.11.228.37:8080/git/notifyCommit?url=https://github.com/kishorgutte/kishorproject.git

    var tag = document.createElement('script');
    var player;
    var totalcount=0;
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '390',
          width: '640',
          videoId: 'R8rNw0bGOBA',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }
      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        player.loadPlaylist(self.videolist());
        event.target.playVideo();
      }
      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.ENDED) {
          alert("Song is stopped");
        }
      }

function YouTubeGetID(url){
  var ID = '';
  url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if(url[2] !== undefined) {
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
    videolist:ko.observableArray(),
    hidevideo: function () {
        $("#player").hide();
    },
    showvideo: function () {
        $("#player").show();
    },
    nextvideo:function (){
      player.nextVideo();
    },
    previousvideo:function (){
      player.previousVideo();
    },
    Playvideo:function (){
        $("#playvideo").hide();
        player.playVideo();
    },
    Pausevideo:function (){
       player.pauseVideo();
    },
    stopvideo:function (){
        player.stopVideo();
    },
};

$.getJSON("videolist.json", function(data) { 
   for(var i=0 ; i <data.url.length;i++  ){ 
    self.videolist.push(YouTubeGetID(data.url[i])); 
   }
});
player.pauseVideo();
ko.applyBindings(self);

















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

