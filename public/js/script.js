
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



