// client의 browser에서 사용할 JavaScript -> head.ejs
// date function
$(function(){
  function get2digits (num){
    return ('0' + num).slice(-2);
  }

  function getDate(dateObj){
    if(dateObj instanceof Date)
      return dateObj.getFullYear() + '-' + get2digits(dateObj.getMonth()+1)+ '-' + get2digits(dateObj.getDate());
  }

  function getTime(dateObj){
    if(dateObj instanceof Date)
      return get2digits(dateObj.getHours()) + ':' + get2digits(dateObj.getMinutes())+ ':' + get2digits(dateObj.getSeconds());
  }

  // html element중에 date-date 탐색
  function convertDate(){
    $('[data-date]').each(function(index,element){
      //console.log(element)
      var dateString = $(element).data('date');
      if(dateString){
        var date = new Date(dateString);
        $(element).html(getDate(date));
      }
    });
  }

  function convertDateTime(){
    $('[data-date-time]').each(function(index,element){
      var dateString = $(element).data('date-time');
      if(dateString){
        var date = new Date(dateString);
        $(element).html(getDate(date)+' '+getTime(date));
      }
    });
  }

  convertDate();
  convertDateTime();
});

// 게시글의 width가 매우 긴 경우 comment count를 ...으로
$(function(){
  function resetTitleEllipsisWidth(){
    $('.board-table .title-text').each(function(i,e){
      var $text = $(e);
      var $ellipsis = $(e).closest('.title-ellipsis');
      var $comment = $(e).closest('.title-container').find('.title-comments');

      if($comment.length == 0) return;

      var textWidth = $text.width();
      var ellipsisWidth = $ellipsis.outerWidth();
      var commentWidth = $comment.outerWidth();
      var padding = 1;

      if(ellipsisWidth <= (textWidth+commentWidth+padding)){
        $ellipsis.width(ellipsisWidth-(commentWidth+padding));
      }
      else {
        $ellipsis.width(textWidth+padding);
      }
    });
  }
  $(window).resize(function(){
    $('.board-table .title-ellipsis').css('width','');
    resetTitleEllipsisWidth();
  });
  resetTitleEllipsisWidth();
});