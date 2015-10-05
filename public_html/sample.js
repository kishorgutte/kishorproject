/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//$(document).ready(function () {
//   
// ko.applyBindings(new AppViewModel());
// 
//});
$("#myvideo").attr("src","https://www.youtube.com/v/R8rNw0bGOBA");
var self = {
    isvideohidden: ko.observable(true),
    hidevideo: function () {
        this.isvideohidden(false);
    },
    showvideo: function () {
        this.isvideohidden(true);
    },
};

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

