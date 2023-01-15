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
        $("body").append(`
        <div class="addRecord adaptive">
            <input type="text" id="age" placeholder="Age" value="${userData.Age}">
            <input type="text" id="name" placeholder="Name" value="${userData.Name}">
            <input type="text" id="salary" placeholder="Salary" value="${userData.Salary}">
        </div>
        `);
      },
    });
  }

  getUserData();

  $("#updateData").on("click", function () {
    console.log("Data Saved") ; 
  });
});
