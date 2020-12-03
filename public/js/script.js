
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

const divedit = document.getElementsByClassName("editmode")
 if(divedit[0].innerText === "single-edit-mode"){
    var ClassBtnEdit = document.getElementsByClassName("edit-blt");
    for (let item of ClassBtnEdit) {
      item.className = item.className + " edit-disable-btn"
  }
}