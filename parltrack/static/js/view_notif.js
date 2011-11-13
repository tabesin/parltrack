$(document).ready(function() {
  $( "#tabs" ).tabs();
  $('#notif_form').submit(function() {
       $.ajax({url: '{{group.id}}', success: function(data) {
           $.ajax({url: '{{group.id}}/add/emails/'+$('#notif_form').children('input:first').attr('value'), success: function(data) { $('#notif_subscr h3').html(data); }});
           $.ajax({url: '{{group.id}}/add/dossiers/'+$('#content > h2:first').html()});
       }});
       return false;
  });
$("#sortedlist").tablesorter({
    sortList: [[1,0],[0,0]],
    textExtraction: function(node) {
       var max='2020/12/31'
       var tmp=null;
       var d=$(node).find('abbr');
       if(d.length==0) {
          if($(node).text().trim()=='') {
             return '99999999';
          }
          return $(node).text().trim();
       }
       var now=new Date();
       now=now.getFullYear()+'/'+zeroPad((1+now.getMonth()),2)+'/'+zeroPad(now.getDate(),2);
       for(var i=0; i<d.length; i++) {
          tmp=$(d[i]).text().trim();
          //console.log([d, now,tmp,max]);
          if(tmp.split('/').length==3) {
             if(now<tmp && tmp<max) {
                //console.log('adf '+tmp);
                max=tmp;
             }
          }
       }
       //console.log(max.split('/').join(''));
       return max.split('/').join('');
    }
  });
});
if(typeof(String.prototype.trim) === "undefined") { String.prototype.trim = function() {
      return String(this).replace(/^\s+|\s+$/g, '').replace(/\s+/,' ');
   };
}
function zeroPad(num,count) {
   var numZeropad = num + '';
   while(numZeropad.length < count) {
      numZeropad = "0" + numZeropad;
   }
   return numZeropad;
}