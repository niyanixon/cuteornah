// const heart = document.getElementsByClassName("fa-heart");
const trash = document.getElementsByClassName("fa-trash-o");
const newPic = document.getElementsByClassName("generate-cat");

Array.from(newPic).forEach(function (element) {
  element.addEventListener("click", function () {
    const url = document.querySelector("img").src;
    fetch("cuteCats", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: url,
      }),
    })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((data) => {
        console.log(data);
        window.location.reload(true);
      });
  });
});

document.querySelectorAll(".fa-heart").forEach((button) => {
  button.addEventListener("click", (e) => {
    const url = document.querySelector("img").src;
    fetch("favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: url }),
    }).then((response) => {
      if (response.ok) {
        e.target.closest("li").add;
        console.log("Saved to favorites!");
        window.location.reload(true);
      }
    });
    
  });
});

document.querySelectorAll(".fa-trash-o").forEach((button) => {
  button.addEventListener("click", (e) => {
    const url = e.target.closest("li").querySelector("img").src;
    fetch("/deleteFav", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: url }), // Send the specific image URL to the server
    })
      .then((response) => {
        if (response.ok) {
          console.log("Picture Deleted!");
          e.target.closest("li").remove();
        } else {
          console.error("Failed to delete the picture.");
        }
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  });
});
