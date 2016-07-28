$(function() {
  $(document).on('click', '.navbar-collapse.in', function(e) {
    if ($(e.target).is('a')) {
      $(this).collapse('hide');
    }
  });

  function clearForm() {
    document.getElementById("emailForm").reset();
  }

  function validateAndSubmit() {
    var name = (document.getElementById("name").value);
    var subject = (document.getElementById("subject").value);
    var message = (document.getElementById("message").value);
    if (name == "") {
      document.getElementById("name").focus();
      $("#name").addClass("animated shake");
      alert("Please provide your name!");
      setTimeout(function() {
        document.getElementById("name").focus();
        $("#name").removeClass("animated shake");
      }, 1);
      return false;
    }
    if (document.getElementById("message").value == "") {
      document.getElementById("message").focus();
      $("#message").addClass("animated shake");
      alert("Please provide a message!");
      setTimeout(function() {
        document.getElementById("message").focus();
        $("#message").removeClass("animated shake");
      }, 1);
      return false;
    }
    window.open('mailto:jdg99@live.com?subject=' + subject + '&body=' + message + '%0A%0A' + name);
  }
});