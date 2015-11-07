/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$("#carousel").Cloud9Carousel( {
  buttonLeft: $("#buttons > .left"),
  buttonRight: $("#buttons > .right"),
  autoPlay: 0,
  bringToFront: true,
  farScale: 0.5, 

  xRadius:400,
  yRadius:30,
} );

$("#carousel").css({"overflow":"visible"})