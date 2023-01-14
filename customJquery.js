$(function () {
  console.log("Page is Loaded");

  function validateFourFileds() {
    //  id [ Nubmer and Unique]
    // Age [ 20-60]
    // Name [ Letters and Space Only ]
    // Salary [ 0 or More ]
    let allIds = getAlliDs() ; 
    let idInput = $("#id").val();
    let ageInput = $("#age").val();
    let nameInput = $("#name").val();
    let salaryInput = $("#salary").val();
    if ()
    { }
    else if() 
    {}
    else if ()
    {}
    else if ()
    {}
    else 
    {}


  }

  function getAlliDs()
  {
    $.ajax({
      type: "get",
      url: "http://localhost:3000/Users",
      success: function (response) {
        let idArray = [] ; 
        let allData = response;
        for (const eachObject of allData) {
          idArray.push(eachObject.Id) ; 
        }
      },
    });
    return idArray ; 
  } // Get all IDs 

  $("#loadData").on("click", function () {
    // TODO we will use Trigger to it when adding new Record
    $.ajax({
      type: "get",
      url: "http://localhost:3000/Users",
      success: function (response) {
        $("#tableContent").empty();
        // This to Clear Old Data and Refresh with New Data
        console.log("Done");
        console.log(response);
        let allData = response;
        for (const eachObject of allData) {
          $("#tableContent").append(`<tr>
          <td>${eachObject.Id}</td>
          <td>${eachObject.Age}</td>
          <td>${eachObject.Name}</td>
          <td>${eachObject.Salary}</td>
          <td>
            *<a href="#">Edit</a>|<a href="#">Delete</a>*
          </td>
        </tr>`);
        }
      },
    });
  }); // Loading all JSON data , READ

  $("#addRecord").on("click", function () {
    $(".addRecord").toggleClass("adaptive");
  }); // Toggling Button for adding new Record

  $("#postData").on("click", function () {
    console.log("Posting Data ");
    // Validate Form Fields
    // If Everything OK , Make a Post Request
    //
  }); // Adding New Record

}); // End Of Loading Function
