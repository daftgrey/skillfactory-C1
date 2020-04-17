
window.onload = function() {
function jQuery (selector, context = document){
  this.elements = Array.from(context.querySelectorAll(selector));
  return this
}

jQuery.prototype.each = function (fn){
  this.elements.forEach((element, index) => fn.call(element, element, index));
  return this;
}

jQuery.prototype.click = function(fn){
  this.each(element => element.addEventListener('click', fn))
  return this
}

jQuery.prototype.hide = function(){
  this.each(element => element.style.display = 'none')
  return this;
}

jQuery.prototype.show = function(){
  this.each(element => element.style.display = '')
  return this;
}

jQuery.prototype.html = function(html){
    this.each(element => element.innerHTML = html)
  return this;
  }


  const $ = (e) => new jQuery(e);

  let countSec = 0;
  let countMin = 0;

  $('.reloadTimer').hide();
  
  const updateText = () =>{
    if (countSec >= 10 ){
      $('.seconds').html(String(countSec));
    }
    else{
      $('.seconds').html(0 + (String(countSec)).slice(-2));
    } 
    if (countMin >= 10 ){
      $('.minutes').html(String(countMin));
    }
    else{
      $('.minutes').html(0 + (String(countMin)).slice(-2));
    }  
    
  }

  updateText();

  const countDown = () => {   
    let total = countSec + countMin * 60;
    const timeinterval = setTimeout(countDown, 1000);
    if (total <= 0) {
      clearInterval(timeinterval);
      $('.countdown').hide();
      $('.message').html("<p>I am done...</p><br>");
      $('.reloadTimer').show();
      $('.controller').hide();
      $('.groupButton').hide();
    }
    if(countSec > 0) countSec--;
    else{
      countSec = 59;
      countMin--;
    } 
    updateText();
  }

  $('.plus').click(e=>{
    if(countSec < 59) ++countSec;
    else{
      countSec = 0;
      ++countMin;
    }
    updateText()
  })

  $('.minus').click(e=>{
      if(countMin <= 0 && countSec===0){
      countSec = 0;
      countMin = 0;
      return;
    }
    if(countSec > 0) --countSec;
    else{
      countSec = 59;
      --countMin;
    }
    updateText();
  })

  $('.start').click(e=>{
    countDown();  
  })

  $('.manuallyImput').click(e=>{
    let a = $('.input_minutes').elements[0].value;
    let b = $('.input_seconds').elements[0].value;
    if(a < 60 && b < 60){
      $('.minutes').html(String(a));
      $('.seconds').html(String(b));
      countMin = (String(a)).slice(-2);
      countSec = (String(b)).slice(-2);
    }
    else{
      alert('Введите корректные данные');
      $('.input_minutes').elements[0].value = "0";
      $('.input_seconds').elements[0].value = "0";
    }
    updateText()
  })

  $('.reloadTimer').click(e=> {
    location.href = location.href;  
  })

  $('.stop').click(e=> {
      $('.countdown').hide();
      $('.message').html("<p>I am done...</p><br>");
      $('.reloadTimer').show();
      $('.controller').hide();
      $('.groupButton').hide(); 
  })
}