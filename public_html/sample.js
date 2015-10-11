/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//Command to trigger Jenkins
//curl http://52.11.228.37:8080/git/notifyCommit?url=https://github.com/kishorgutte/kishorproject.git

$("#myvideo").attr("src","https://www.youtube.com/v/R8rNw0bGOBA?autoplay=1");
var totalcount=0;
var self = {
    isvideohidden: ko.observable(true),
    videolist:ko.observableArray(),
    hidevideo: function () {
        this.isvideohidden(false);
    },
    showvideo: function () {
        this.isvideohidden(true);
    },
    nextvideo:function (){
      totalcount = totalcount + 1;  
     $("#myvideo").attr("src",this.videolist()[totalcount]);
    },
    previousvideo:function (){
      totalcount = totalcount - 1;
      $("#myvideo").attr("src",this.videolist()[totalcount]);
    },
};

$.getJSON("videolist.json", function(data) { 
   for(var i=0 ; i <data.url.length;i++  ){ 
    self.videolist.push(data.url[i]); 
   }
});

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

