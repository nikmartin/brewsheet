'use strict';

/*
The brew day code.
*/

//a recipe object to be stored in localstorage

var recipe = {};
recipe.name = "StrangeBrew";
recipe.mashTime = 60;
recipe.boilTime = 60;
recipe.numAdds = 1;

// The clock
function update() {
  $('#clock').html(moment().format('MMMM Do YYYY H:mm:ss'));
}

setInterval(update, 1000);

//handle multiple additions

/*
MIT Lincense
Idea from: http://tristandenyer.com/demos/dynamic-form-bootstrap-3-0.html
Copyright (c) 2011 Tristan Denyer
*/

$(function() {
  $('#btnAdd').click(function() {
    // Check to see how many additions we currently have
    var numAdds = $('.clonedAddition').length;

    // increment
    var newNum = numAdds + 1;

    // create the new element via clone(), and manipulate it's ID using newNum value
    var newElem = $('#addition' + numAdds).clone().attr('id', 'addition' + newNum).fadeIn('slow');

    // Set the panel title
    newElem.find('.panel-heading').html('Addition #' + newNum);

    // Addition Name
    newElem.find('.add-name')
      .attr('id', 'additionName' + newNum)
      .attr('name', 'additionName' + newNum)
      .val('');

    // Addition Time
    newElem.find('.add-time')
      .attr('id', 'additionTime' + newNum)
      .attr('name', 'additionTime' + newNum)
      .val('');

    // Insert the new element after the last "duplicatable" Addition Group
    $('#addition' + numAdds).after(newElem);
    $('#additionName' + newNum).focus();

    // Enable the "remove" button. This only shows once you have a duplicated section.
    $('#btnDel').attr('disabled', false);

    //max 10 additions (arbitrary)
    if (newNum == 10)
      $('#btnAdd').attr('disabled', true).prop('value', "You've reached the limit"); // value here updates the text in the 'add' button when the limit is reached
  });

  $('#btnDel').click(function() {
    // Confirmation dialog box. Works on all desktop browsers and iPhone.
    if (confirm("Are you sure you wish to remove this section? This cannot be undone.")) {
      // how many cloned additions we currently have
      var num = $('.clonedAddition').length;

      $('#addition' + num).slideUp('slow', function() {
        $(this).remove();
        // if only one element remains, disable the "remove" button
        if (num - 1 === 1)
          $('#btnDel').attr('disabled', true);
        // enable the "add" button
        $('#btnAdd').attr('disabled', false).prop('value', "add addition");
      });
    }
    return false; // Removes the last section you added
  });
  // Enable the "add" button
  $('#btnAdd').attr('disabled', false);
  // Disable the "remove" button
  $('#btnDel').attr('disabled', true);
});
