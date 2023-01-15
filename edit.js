$(function () {
  let userDataUrl = window.location.href.split("?");
  console.log(userDataUrl);
  let userID = userDataUrl[1].split("=")[1];
  console.log(userID);
  let userAPI = `http://localhost:3000/Users/${userID}`;

  function getUserData() {
    let userData;
    $.ajax({
      type: "get",
      url: userAPI,
      success: function (response) {
        userData = response;
        console.log("The Data");
        console.log(userData);
        console.log(userData.id);
        // $("body").append(`
        // <div class="addRecord adaptive">
        //     <input type="text" id="age" placeholder="Age" value="${userData.Age}">
        //     <input type="text" id="name" placeholder="Name" value="${userData.Name}">
        //     <input type="text" id="salary" placeholder="Salary" value="${userData.Salary}">
        // </div>
        // `);
         $("#age").val(userData.Age);
        $("#name").val(userData.Name);
        $("#salary").val(userData.Salary);
      },
    });
  }

  getUserData();
  function validateFourFileds() {
    let ageInput = $("#age").val();
    let nameInput = $("#name").val();
    let salaryInput = $("#salary").val();
    if (
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
  $("#updateData").on("click", function () {
    console.log("Data Saved");
    let result = validateFourFileds();
    console.log("THE RESULT");
    console.log(result);
    if (result === 0) {
      console.log("Error in the Validation");
    } else {
      $.ajax({
        url: userAPI,
        type: "put",
        data: {
          id: userID ,
          Age: $("#age").val(),
          Name: $("#name").val(),
          Salary: $("#salary").val(),
        },
        success: function (res) {
          alert("Done");
          $("#myForm").submit() ; 
          console.log(res);
        },
        error: function (Error) {
         alert("Cant Add Duplicate IDs");
        }
      });
    }
  });
});




