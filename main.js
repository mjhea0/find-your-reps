$(function() {

    // hide danger upon page load
   $('.alert-danger').hide()

  // perfrom search, append results
  $("form#get-zip").submit(function() {

    //clear previous search results (if applicable)
    $("#legislators").empty()

    // grab value from form, call api, apend results
    var zip = $("input#zip").val();
    $.get("http://congress.api.sunlightfoundation.com/legislators/locate?apikey=ba4d76d2f7ab45a5a08a28f3b7b42a94&zip=" + zip)
    .done(function(responseJSON) {
      responseJSON.results.forEach(function(legislator) {
        $("#legislators").append("<tr>" + 
          "<td>" + legislator.first_name + "</td>" + 
          "<td>" + legislator.last_name + "</td>" + 
          "<td>" + capitalize(legislator.chamber) + "</td>" + 
          "<td>" + partyConvert(legislator.party) + "</td>" +
          "<td>" + legislator.phone + "</td>" + 
          "<td>" + "<a href='" + legislator.contact_form + "'</a>Email</td>" +
          "<td>" + "<a href='" + legislator.website + "'</a>Website</td>" +  
          "<td>" + "<a href='http://www.facebook.com/" + legislator.facebook_id + "'</a>Link</td>" +
          "<td>" + "<a href='http://www.twitter.com/" + legislator.twitter_id + "'</a>Link</td>" +
          "</tr>")
      })
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