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
      alert("Error in the ID Field");
      return 0;
    } else if (
      isNaN(Number(ageInput)) ||
      Number(ageInput) < 20 ||
      Number(ageInput) > 60
    ) {
      alert("Error in the Age Field");
      return 0;
    } else if (/^[A-Za-z\s]*$/.test(nameInput) != true) {
      alert("Error in the Name Field");
      return 0;
    } else if (isNaN(Number(salaryInput)) || Number(salaryInput) < 0) {
      alert("Error in the Salary Field");
      return 0;
    } else {
      return 1;
    }
  }

  $("#loadData").on("click", function () {
    $("#tableContent").empty();
    $.ajax({
      type: "get",
      url: "http://localhost:3000/Users",
      success: function (response) {
        let allData = response;
        let userURL = "http://localhost:3000/Users/";
        for (const eachObject of allData) {
          $("#tableContent").append(`<tr>
          <td>${eachObject.id}</td>
          <td>${eachObject.Age}</td>
          <td>${eachObject.Name}</td>
          <td>${eachObject.Salary}</td>
          <td>
            *<a href="editUser.html?id=${eachObject.id}">Edit</a>|<button href="${
              userURL + eachObject.id
            }" id="Remove">Delete</button>*
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
    console.log("THE RESULT");
    console.log(result);
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
          $("#loadData").trigger("click");
        },
        error: function (Error) {
         alert("Cant Add Duplicate IDs");
        }
      });
      
    }
  }); // Adding New Record

  $("#tableContent").on("mouseover", "button#Remove", function () {
    $(this).on("click", function () {
      // NOTE: $this is for the Button
      if (confirm("Are you Sure you want to Delete ?")) {
        console.log("Accept");
        console.log($(this).attr("href"));
        $.ajax({
          url: $(this).attr("href"),
          type: "DELETE",
          success: function (re) {
            console.log(re);
            $("#loadData").trigger("click");
          },
          catch: function (Error) {
            console.log(Error);
          },
        });
      } else {
        console.log("Refused");
        $("#loadData").trigger("click");
      }
    });
  }); // Deleting a Record

  
}); // End Of Loading Function
