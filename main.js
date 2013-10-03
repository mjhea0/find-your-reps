$(function() {

  $("form#get-zip").submit(function() {
    var zip = $("input#zip").val();
    $.get("http://congress.api.sunlightfoundation.com/legislators/locate?apikey=ba4d76d2f7ab45a5a08a28f3b7b42a94&zip=" + zip)
    .done(function(responseJSON) {
      responseJSON.results.forEach(function(legislator) {
        $("#legislators").append("<tr><td>" + legislator.first_name + "</td><td>" + legislator.last_name + 
          "</td><td>" + legislator.chamber + "</td><td>" + legislator.party +"</td></tr>");
      })
    })

    return false;
  })
})