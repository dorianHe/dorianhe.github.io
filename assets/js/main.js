// Function to filter posts by category
function filterSelection(category) {
    let posts, i;

    // Get all the post elements
    posts = document.getElementsByClassName("post");

    // If 'all' is selected, show all posts
    if (category === "all") {
        category = "";
    }

    // Loop through the posts and display or hide based on the category
    for (i = 0; i < posts.length; i++) {
        let postCategory = posts[i].getElementsByClassName("post-category")[0];

        if (postCategory && postCategory.textContent.includes(category)) {
            posts[i].style.display = "block";  // Show matching posts
        } else {
            posts[i].style.display = "none";  // Hide non-matching posts
        }
    }

    // Remove "active" class from all buttons and set it for the current one
    let btns = document.getElementsByClassName("btn");
    for (i = 0; i < btns.length; i++) {
        btns[i].classList.remove("active");
    }
    console.log(category)
    document.getElementById(category || "default").classList.add("active");
}
