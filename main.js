$(function() {
    // hide danger upon page load
   $('.alert-danger').hide()
   $('.alert-warning').hide()

  // perfrom search, append results
  $("form#get-zip").submit(function() {

  if($("input, textarea").val() === ""){
    $('.alert-danger').show()  
    return false;
  }
  $("input").removeClass("error");

    //clear previous search results (if applicable)
    $("#legislators").empty()

    // grab value from form, call api, apend results
    var zip = $("input#zip").val();
    $.get("http://congress.api.sunlightfoundation.com/legislators/locate?apikey=ba4d76d2f7ab45a5a08a28f3b7b42a94&zip=" + zip)
    .done(function(responseJSON) {
      $('.alert-danger').hide() 
        if(responseJSON.results.length === 0) {
          $('.alert-warning').show() 
        } else {

          $('.alert-warning').hide() 

          responseJSON.results.forEach(function(legislator) {


        $("#legislators").append(
          "<tr>" + 
            "<td id='myAnchor'>" + legislator.first_name + "</td>" + 
            "<td>" + legislator.last_name + "</td>" +
            "<td>" + capitalize(legislator.chamber) + "</td>" + 
            "<td>" + partyConvert(legislator.party) + "</td>" +
            "<td>" +
            "<div class='btn-group'>" +
            "<button type='button' class='btn btn-default dropdown-toggle btn-xs' data-toggle='dropdown'>" +
            "Contact <span class='caret'></span>" +
            "</button>" +
              "<ul class='dropdown-menu' role='menu'>" +
                "<li><a href='" + legislator.contact_form + "'</a>Email</a></li>" +
                "<li><a href='" + legislator.website + "'</a>Website</a></li>" +
                "<li class='divider'></li>" +
                "<li><a href='http://www.facebook.com/" + legislator.facebook_id + "'</a>Facebook</a></li>" +
                "<li><a href='http://www.twitter.com/" + legislator.twitter_id + "'</a>Twitter</a></li>" +
              "</ul>" +
            "</div>" +
            "</td>" +
          "</tr>"
          )
        })
      }
    })
    return false;
  })




  //capitalize text for legislature chamber
  function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  //Convert D to Democrat and R to Republican
  function partyConvert(text) {
    return (text === "D") ? "Democrat" : "Republican"
  }

})