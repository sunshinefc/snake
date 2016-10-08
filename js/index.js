$(function(){
	  function tanchishe(){
		  for (var i = 0; i <20; i++) {
			  for (var j = 0; j < 20; j++) {
				  $('<div>')
					  .attr('id',i+'_'+j)
					  .addClass('block')
					  .appendTo('.scene')
			  };
		  }
		  var she=[{x:0,y:0},{x:0,y:1},{x:0,y:2}];
		  var shebiao={'0_0':true,'0_1':true,'0_2':true};
		  function findDiv(x,y){
			  return $('#' +x+'_'+y);
		  }
		  $.each(she,function(i,v){
			  findDiv(v.x,v.y).addClass('she');
		  })

		  //放食物
		  function fangshiwu(){
			  do{
				  var x=Math.floor(Math.random()*19);
				  var y=Math.floor(Math.random()*19);
			  }while(shebiao[x+'_'+y]);

			  findDiv(x,y).addClass('shiwu');
			  return {x:x,y:y};
		  }
		  var shiwu=fangshiwu();

		  direction='you';

		  var score=0;
		  move=function(){
			  var jiutou=she[she.length-1];
			  if(direction==='you'){
				  var xintou={x:jiutou.x,y:jiutou.y+1};
			  }
			  if(direction==='zuo'){
				  var xintou={x:jiutou.x,y:jiutou.y-1};
			  }
			  if(direction==='shang'){
				  var xintou={x:jiutou.x-1,y:jiutou.y};
			  }
			  if(direction==='xia'){
				  var xintou={x:jiutou.x+1,y:jiutou.y};
			  }

			  if(shebiao[xintou.x+'_'+xintou.y]){
				  clearInterval(timeId);
				  $('.gameover').addClass('ani fade-in-down')
				  $('.gameover').css('display','block')
				  return;
			  }


			  if(xintou.x<0||xintou.x>19||xintou.y<0||xintou.y>19){
				  clearInterval(timeId);
				  $('.gameover').addClass('ani fade-in-down')
				  $('.gameover').css('display','block')
				  return;
			  }



			  she.push(xintou);

			  shebiao[xintou.x+'_'+xintou.y]=true;

			  findDiv(xintou.x,xintou.y).addClass('she');


			  if(xintou.x===shiwu.x && xintou.y===shiwu.y){
				  findDiv(shiwu.x,shiwu.y).removeClass('shiwu');
				  shiwu=fangshiwu();
				  $('.score').text('长度:'+(++score));
			  }else{
				  var weiba=she.shift();
				  delete shebiao[weiba.x+'_'+weiba.y];
				  findDiv(weiba.x,weiba.y).removeClass('she');
			  }
		  }
		  var timeId=setInterval(move,200)

		  $(document).on('keyup',function(e){
			  var biao={37:'zuo',38:'shang',39:'you',40:'xia'}
			  var fanbiao={'zuo':37,'shang':38,'you':39,'xia':40};
			  if(Math.abs(e.keyCode-fanbiao[direction])===2){
				  return;
			  }
			  if(biao[e.keyCode]){
				  direction=biao[e.keyCode]
			  }
		  })


		  $('.start').on('click',function () {
			  clearInterval(timeId);
			  $('.start').toggleClass('pause')
			  $('.pause').on('click',function () {
				  timeId=setInterval(move,200);
			  })
		  })

	  }


	$('.next').on('mousedown',false);
	$('.score').on('mousedown',false);
	$('.reset').on('mousedown',false);
	
	$('.begin').addClass('ani elastic-in-down')
	$('.enter').on('click',function(){
		$('.begin').css('display','none');
		$('.bigbox').css('display','block');
		tanchishe();
		$('.reset').on('click',function () {
			$('.scene').empty();
			$('.gameover').css('display','none')
			tanchishe();
		})
	})

	  
})