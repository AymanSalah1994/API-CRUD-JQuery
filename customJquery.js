$(function () {
  console.log("Page is Loaded");

  $("#loadData").on("click", function () {
    $.ajax({
      type: "get",
      url: "http://localhost:3000/Users",
      success: function (response) {
        console.log("Done");
        console.log(response);
        let allData = response;
        // allData is an array
        console.log(allData[0]);
        $("#tableContent").append(`<tr>
        <td>1551</td>
        <td>28</td>
        <td>Ayman</td>
        <td>999999</td>
        <td>
          *<a href="#">Edit</a>|<a href="#">Delete</a>*
        </td>
      </tr>`);
      },
    });
  }); // Loading all JSON data , READ



}); // End Of Loading Function
