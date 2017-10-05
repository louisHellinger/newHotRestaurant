<script type="text/javascript">
    // Question: What does this code do?
    $("#add-btn").on("click", function(event) {
      event.preventDefault();
      var newReservation = {
        name: $("#name").val().trim(),
        role: $("#phone-number").val().trim(),
        age: $("#email").val().trim(),
        id: $("#id").val().trim()
        
      };

      // Question: What does this code do??
      $.post("/api/new", newReservation)
      .done(function(data) {
        console.log(data);
        alert("Adding your reservation...");
      });
    });
  </script>