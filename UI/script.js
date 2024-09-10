var request = new XMLHttpRequest()
var catRequest = new XMLHttpRequest()

// const logo = document.createElement('img')
// logo.src = 'blog.png'

const categoryMap = new Map();
categoryMap.set("Misc", 1);
categoryMap.set("Testing", 2);
categoryMap.set("Cool Stuff", 3);

document.addEventListener('DOMContentLoaded', function () {
    const createPostBtn = 
        document.getElementById('createPostBtn');
    const createPostModal = 
        document.getElementById('createPostModal');
    const closeModal = 
        document.getElementById('closeModal');
    const postForm = 
        document.getElementById('postForm');
    const editPostModal =
        document.getElementById('editPostModal');
    const editForm = 
        document.getElementById('editForm');
    const closeEditModal = 
        document.getElementById('closeEditModal');
    const postSubmitBtn = 
        document.getElementById('postSubmitBtn');
    const editSubmitBtn = 
        document.getElementById('editSubmitBtn');
    const postContainer = 
        document.querySelector('.post-container');
    const postDetailModal = 
        document.getElementById('postDetailModal');
    const closeDetailModal = 
        document.getElementById('closeDetailModal');
    const detailTitle = 
        document.getElementById('detailTitle');
    const detailDate = 
        document.getElementById('detailDate');
    const detailDescription = 
        document.getElementById('detailDescription');
    const detailCategory =
        document.getElementById('detailCategory');
    const editPostBtn =
        document.getElementById('editPostBtn');

    // Create post button! Loads the create post modal window
    createPostBtn.addEventListener('click', function () {
        createPostModal.style.display = 'flex';
    });

    // closes the post modal window specifically
    closeModal.addEventListener('click', function () {
        // Add fadeOut class
        createPostModal.classList.add('fadeOut');
        setTimeout(() => {
            createPostModal.style.display = 'none';
            // Remove fadeOut class
            createPostModal.classList.remove('fadeOut');
        }, 500);
    });

    // Closes the edit modal window specifically
    closeEditModal.addEventListener('click', function () {
        // Add fadeOut class
        editPostModal.classList.add('fadeOut');
        setTimeout(() => {
            editPostModal.style.display = 'none';
            // Remove fadeOut class
            editPostModal.classList.remove('fadeOut');
        }, 500);
    });

    // Create Post Logic
    postForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Validation
        const postCategory = 
            document.getElementById('postCategory').value;
        const postTitle = 
            document.getElementById('postTitle').value;
        const postDescription = 
            document.getElementById('postDescription').value;

        if (postCategory.trim() === '' ||
         postTitle.trim() === '' || 
         postDescription.trim() === '') {
            alert('Please fill out all fields.');
            return;
        }

        // Get the current date
        const currentDate = new Date();
        const day = (currentDate.getDate() < 10 ? '0' : '') + currentDate.getDate();
        const month = ((currentDate.getMonth() + 1) < 10 ? '0' : '') + (currentDate.getMonth() + 1);
        const year = currentDate.getFullYear();
        const formattedDate = year + '-' + month + '-' + day;

        // Send POST Request to API
        const postRequest = new XMLHttpRequest();
        postRequest.open('POST', 'http://52.71.159.161:8081/posts', true);
        postRequest.setRequestHeader("Content-Type", "application/json");
        const postBody = JSON.stringify({
            title: postTitle,
            author: {
                "user_id" : 1,
                "displayName" : "kelsey"
            },
            category: {
                "category_id": categoryMap.get(postCategory),
                "category_name": postCategory
            },
            body: postDescription,
            date: formattedDate
        });

        postRequest.onload = function () {
            var data = JSON.parse(postRequest.response);
            if (postRequest.status >= 200 && postRequest.status < 400) {
                var postId = data.post_id;
                // Create a new post element
                const newPost = document.createElement('div');
                newPost.className = 'post-box';
                newPost.innerHTML = `
                    <h1 class="post-title" data-title="${postTitle}"
                    data-date="${formattedDate}"
                    data-description="${postDescription}"
                    data-id="${postId}">
                    ${postTitle}</h1><br>
                
                    <h2 class="category">${postCategory}</h2><br>
                    <span class="post-date">${formattedDate}</span>
                    <p class="post-description">
                    ${postDescription.substring(0, 100)}...</p>
                    <button class="delete-post" data-title="${postTitle}">
                    Delete</button>
                    <span class="load-more" data-title="${postTitle}" 
                    data-date="${formattedDate}" 
                    data-description="${postDescription}"
                    data-id="${postId}"
                    category="${postCategory}">
                    Load more</span>
                `;
    
                // Append the new post to the post container
                postContainer.insertBefore(newPost, 
                    postContainer.firstChild);
    
                const postCreatedMessage = 
                    document.getElementById('postCreatedMessage');
                postCreatedMessage.style.display = 'block';
    
                // Close the modal
                createPostModal.style.display = 'none';
    
                // Reset the form
                postForm.reset();
    
                setTimeout(() => {
                    postCreatedMessage.style.display = 'none';
                }, 3000);
            } else {
                var errorMessage = document.getElementById('errorPostMessageGeneric');

                errorMessage.style.display = 'block';
    
                // Close the modal
                createPostModal.style.display = 'none';
    
                // Reset the form
                postForm.reset();
    
                setTimeout(() => {
                    errorMessage.style.display = 'none';
                }, 5000);
            }
        };
        
        postRequest.send(postBody);
        
    });

    // load more and delete events from the posts on the main page 
    postContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('load-more') ||
         event.target.classList.contains('post-title')) {
            const title = event.target.getAttribute('data-title');
            const date = event.target.getAttribute('data-date');
            const description = 
                event.target.getAttribute('data-description');
            const category = event.target.getAttribute('category');
            const postId = event.target.getAttribute('data-id');
            const catId = event.target.getAttribute('category-id');
            // Set content in detail modal
            detailTitle.textContent = title;
            detailCategory.textContent = category;
            detailDate.textContent = date;
            detailDescription.textContent = description;
            postDetailModal.setAttribute("post_id", postId);
            postDetailModal.setAttribute("category_id", catId);

            // Display the detail modal
            postDetailModal.style.display = 'flex';
        }

        if (event.target.classList.contains('delete-post')) {
            const postId = event.target.getAttribute('data-id');

            //Delete via API
            const delRequest = new XMLHttpRequest();
            delRequest.open('DELETE', 'http://52.71.159.161:8081/posts/id/'+ encodeURIComponent(postId), true);
            delRequest.setRequestHeader("Content-Type", "application/json");

            delRequest.onload = function () {
                if (delRequest.status >= 200 && delRequest.status < 400) {
                    const postToDelete = 
                    document.querySelector(`.post-title[data-id="${postId}"]`).closest('.post-box');

                    // Add fadeOut class to initiate the animation
                    postToDelete.classList.add('fadeOut');

                    // Remove the post after the animation completes
                    setTimeout(() => {
                        postContainer.removeChild(postToDelete);
                    }, 500);
                } else {
                    const errorMessage = document.getElementById('errorDelete');
                    errorMessage.style.display = 'block';
                    setTimeout(() => {
                        errorMessage.style.display = 'none';
                    }, 5000);
                }
            }
            delRequest.send();
        }
    });

    // Closes detail modal window specificially
    closeDetailModal.addEventListener('click', function () {
    
        // Add fadeOut class
        postDetailModal.classList.add('fadeOut'); 
        setTimeout(() => {
           postDetailModal.style.display = 'none';
           
           // Remove fadeOut class
          postDetailModal.classList.remove('fadeOut'); 
        }, 500);
    });

    // triggers edit post screen, closes detail screen
    editPostBtn.addEventListener('click', function() {

        //get post id
        const postID = postDetailModal.getAttribute("post_id");
        //get category id
        const catId = postDetailModal.getAttribute("category_id");

        // Add fadeOut class
        postDetailModal.classList.add('fadeOut'); 
        setTimeout(() => {
           postDetailModal.style.display = 'none';
           
           // Remove fadeOut class
          postDetailModal.classList.remove('fadeOut'); 
        }, 500);

        editTitle.value = detailTitle.textContent;
        editCategory.value = detailCategory.textContent;
        editDescription.value = detailDescription.textContent;

        editPostModal.setAttribute("post_id", postID);
        editPostModal.setAttribute("category_id", catId);
        editPostModal.style.display = 'flex';
    });

    // Submiting edit form!
    editForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Validation
        const postCategory = 
            document.getElementById('editCategory').value;
        const postTitle = 
            document.getElementById('editTitle').value;
        const postDescription = 
            document.getElementById('editDescription').value;

        if (postCategory.trim() === '' ||
         postTitle.trim() === '' || 
         postDescription.trim() === '') {
            alert('Please fill out all fields.');
            return;
        }

        // Get the current date
        const currentDate = new Date();
        const day = (currentDate.getDate() < 10 ? '0' : '') + currentDate.getDate();
        const month = ((currentDate.getMonth() + 1) < 10 ? '0' : '') + (currentDate.getMonth() + 1);
        const year = currentDate.getFullYear();
        const formattedDate = year + '-' + month + '-' + day;

        const postID = editPostModal.getAttribute("post_id");
        const catId = categoryMap.get(postCategory);

        // Send PUT request to API to update post
        const postRequest = new XMLHttpRequest();
        postRequest.open('PUT', 'http://52.71.159.161:8081/posts', true);
        postRequest.setRequestHeader("Content-Type", "application/json");
        const postBody = JSON.stringify({
            post_id: postID,
            title: postTitle,
            author: {
                "user_id" : 1,
                "displayName" : "kelsey"
            },
            category: {
                "category_id": catId,
                "category_name": postCategory
            },
            body: postDescription,
            date: formattedDate
        });

        postRequest.onload = function () {
            var data = JSON.parse(postRequest.response);
            if (postRequest.status >= 200 && postRequest.status < 400) {
                const postToEdit = 
                    document.querySelector(`.post-title[data-id="${postID}"]`).closest('.post-box');

                postToEdit.innerHTML = `
                    <h1 class="post-title" data-title="${postTitle}"
                    data-date="${formattedDate}"
                    data-description="${postDescription}"
                    data-id="${postID}">
                    ${postTitle}</h1><br>
            
                    <h2 class="category">${postCategory}</h2><br>
                    <span class="post-date">${formattedDate}</span>
                    <p class="post-description">
                    ${postDescription.substring(0, 100)}...</p>
                    <button class="delete-post" data-title="${postTitle}" data-id="${postID}">
                    Delete</button>
                    <span class="load-more" data-title="${postTitle}" 
                    data-date="${formattedDate}" 
                    data-description="${postDescription}"
                    category="${postCategory}"
                    data-id="${postID}"
                    category-id="${catId}">
                    Load more</span>
                `;

                const postEditedMessage = 
                    document.getElementById('postEditedMessage');
                postEditedMessage.style.display = 'block';

                // Close the modal
                editPostModal.style.display = 'none';

                // Reset the form
                editForm.reset();

                setTimeout(() => {
                    postEditedMessage.style.display = 'none';
                }, 3000);

            } else {
                var errorMessage = document.getElementById('errorEditMessageGeneric');
                errorMessage.style.display = 'block';

                // Close the modal
                editPostModal.style.display = 'none';
        
                // Reset the form
                editForm.reset();

                setTimeout(() => {
                    errorMessage.style.display = 'none';
                }, 5000);

            }
        }

        postRequest.send(postBody)
        
    });

//on load
request.open('GET', 'http://52.71.159.161:8081/posts', true)
request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)
  if (request.status >= 200 && request.status < 400) {
    data.forEach((post) => {
        // Load existing blog posts
        const newPost = document.createElement('div');
        newPost.className = 'post-box';
        newPost.innerHTML = `
            <h1 class="post-title" data-title="${post.title}"
         data-date="${post.date}"
          data-description="${post.body}"
          data-id="${post.post_id}"
          category="${post.category.category_name}"
          category-id="${post.category.category_id}">
            ${post.title}</h1><br>
            
        <h2 class="category">${post.category.category_name}</h2><br>
        <span class="post-date">${post.date}</span>
        <p class="post-description">
        ${post.body.substring(0, 100)}...</p>
        <button class="delete-post" data-title="${post.title}"
        data-id="${post.post_id}">
        Delete</button>
        <span class="load-more" data-title="${post.title}" 
        data-date="${post.date}" 
        data-description="${post.body}"
        data-id="${post.post_id}"
        category="${post.category.category_name}"
        category-id="${post.category.category_id}">
        Load more</span>
        `;

         // Add post to the post container
         postContainer.insertBefore(newPost, 
            postContainer.firstChild);

    })
  } else {
    const errorMessage = document.createElement('marquee')
    errorMessage.textContent = `Gah, it's not working!`
    postContainer.appendChild(errorMessage)
  }
}

request.send();
});




