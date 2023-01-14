$(function () {
   function getAlliDs(allIds) {
     $.ajax({
      type: "get",
      url: "http://localhost:3000/Users",
      success: function (response) {
        let allData = response;
        for (const eachObject of allData) {
          allIds.push(Number(eachObject.id));
        }
      },
    });
  } // Get all IDs

   function validateFourFileds() {
    // id [ Nubmer and Unique]
    // Age [ 20-60]
    // Name [ Letters and Space Only ]
    // Salary [ 0 or More ]
    var allIds = [];
     getAlliDs(allIds);
    console.log("Those are ids");
    console.log(allIds);
    let idInput = $("#id").val();
    let ageInput = $("#age").val();
    let nameInput = $("#name").val();
    let salaryInput = $("#salary").val();
    if (isNaN(Number(idInput)) || allIds.includes(Number(idInput))) {
      console.log("Error in the ID Field");
      return 0;
    } else if (
      isNaN(Number(ageInput)) ||
      Number(ageInput) < 20 ||
      Number(ageInput) > 60
    ) {
      console.log("Error in the Age Field");
      return 0;
    } else if (/^[A-Za-z\s]*$/.test(nameInput) != true) {
      console.log("Error in the Name Field");
      return 0;
    } else if (isNaN(Number(salaryInput)) || Number(salaryInput) < 0) {
      console.log("Error in the Salary Field");
      return 0;
    } else {
      console.log("Everything is OK ");
      return 1;
    }
  }

  $("#loadData").on("click", function () {
    $("#tableContent").empty() ; 
    $.ajax({
      type: "get",
      url: "http://localhost:3000/Users",
      success: function (response) {
        let allData = response;
        for (const eachObject of allData) {
          $("#tableContent").append(`<tr>
          <td>${eachObject.id}</td>
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
    let result = validateFourFileds();
    console.log("THE RESULT")
    console.log(result) ; 
    if (result === 0) {
      console.log("Error in the Validation");
    } else {
      $.ajax({
        url: "http://localhost:3000/Users",
        type: "post",
        data: {
          id: $("#id").val(),
          Name: $("#age").val(),
          Age: $("#name").val(),
          Salary: $("#salary").val(),
        },
        success: function (res) {
          console.log("Done");
          console.log(res);
          $("#tableContent").append(`<tr>
          <td>${$("#id").val()}</td>
          <td>${ $("#age").val()}</td>
          <td>${ $("#name").val()}</td>
          <td>${ $("#salary").val()}</td>
          <td>
            *<a href="#">Edit</a>|<a href="#">Delete</a>*
          </td>
        </tr>`);
        },
      });
    }
  }); // Adding New Record
}); // End Of Loading Function
