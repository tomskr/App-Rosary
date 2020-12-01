
$(function() {
    $('.toggle-act').bootstrapToggle({
      on: 'Aktywna',
      off: 'Nieaktywna',
      size: 'small',

    });
  })

  $('.toggle-act').on('change',function() { 
     $('.toggle-hid').val(this.checked ? 1 : 0)
 })


// $("#act-checkbox").is(':chected', function(){
//     $("#act-checkbox").attr('value', 'true');
// });

// let d = new Date();
// document.body.h1.innerHTML = "<h1>Today's date is " + d + "</h1>"
