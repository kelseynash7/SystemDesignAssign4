var request = new XMLHttpRequest()

// const logo = document.createElement('img')
// logo.src = 'blog.png'

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

    createPostBtn.addEventListener('click', function () {
        createPostModal.style.display = 'flex';
    });

    closeModal.addEventListener('click', function () {
        // Add fadeOut class
        createPostModal.classList.add('fadeOut');
        setTimeout(() => {
            createPostModal.style.display = 'none';
            // Remove fadeOut class
            createPostModal.classList.remove('fadeOut');
        }, 500);
    });

    closeEditModal.addEventListener('click', function () {
        // Add fadeOut class
        editPostModal.classList.add('fadeOut');
        setTimeout(() => {
            editPostModal.style.display = 'none';
            // Remove fadeOut class
            editPostModal.classList.remove('fadeOut');
        }, 500);
    });

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

        // Create a new post element
        const newPost = document.createElement('div');
        newPost.className = 'post-box';
        newPost.innerHTML = `
            <h1 class="post-title" data-title="${postTitle}"
         data-date="${formattedDate}"
          data-description="${postDescription}">
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
        category="${postCategory}">
        Load more</span>
        `;

        // Append the new post to the post container
        postContainer.insertBefore(newPost, 
            postContainer.firstChild);

        const postCreatedMessage = document
        .getElementById('postCreatedMessage');
        postCreatedMessage.style.display = 'block';


        // Close the modal
        createPostModal.style.display = 'none';

        // Reset the form
        postForm.reset();

        // Send POST Request to API
        const postRequest = new XMLHttpRequest();
        postRequest.open('POST', 'http://localhost:8081/posts', true);
        postRequest.setRequestHeader("Content-Type", "application/json");
        const postBody = JSON.stringify({
            title: postTitle,
            author: {
                "user_id" : 1,
                "displayName" : "kelsey"
            },
            category: {
                "category_id": 1,
                "category_name": "Misc"
            },
            body: postDescription,
            date: formattedDate
        });

        postRequest.send(postBody)

        setTimeout(() => {
            postCreatedMessage.style.display = 'none';
        }, 3000);
    });

    postContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('load-more') ||
         event.target.classList.contains('post-title')) {
            const title = event.target.getAttribute('data-title');
            const date = event.target.getAttribute('data-date');
            const description = 
                event.target.getAttribute('data-description');
            const category = event.target.getAttribute('category');
            // Set content in detail modal
            detailTitle.textContent = title;
            detailCategory.textContent = category;
            detailDate.textContent = date;
            detailDescription.textContent = description;

            // Display the detail modal
            postDetailModal.style.display = 'flex';
        }

        if (event.target.classList.contains('delete-post')) {
            const titleToDelete = 
                event.target.getAttribute('data-title');
            const postToDelete = 
                document.querySelector(`
            .post-title[data-title=
                "${titleToDelete}"]`).closest('.post-box');

            // Add fadeOut class to initiate the animation
            postToDelete.classList.add('fadeOut');

            //Delete via API
            const delRequest = new XMLHttpRequest();
            delRequest.open('DELETE', 'http://localhost:8081/posts/title/'+ encodeURIComponent(titleToDelete), true);
            delRequest.setRequestHeader("Content-Type", "application/json");
            delRequest.send();

            // Remove the post after the animation completes
            setTimeout(() => {
                postContainer.removeChild(postToDelete);
            }, 500);

        }
    });

    closeDetailModal.addEventListener('click', function () {
    
        // Add fadeOut class
        postDetailModal.classList.add('fadeOut'); 
        setTimeout(() => {
           postDetailModal.style.display = 'none';
           
           // Remove fadeOut class
          postDetailModal.classList.remove('fadeOut'); 
        }, 500);
    });

    editPostBtn.addEventListener('click', function() {

        // Add fadeOut class
        postDetailModal.classList.add('fadeOut'); 
        setTimeout(() => {
           postDetailModal.style.display = 'none';
           
           // Remove fadeOut class
          postDetailModal.classList.remove('fadeOut'); 
        }, 500);

        //Post form!
        
        // postTitle = detailTitle;
        // postCategory = detailCategory;
        // postDescription = detailDescription;
        editTitle.value = detailTitle.textContent;
        editCategory.value = detailCategory.textContent;
        editDescription.value = detailDescription.textContent;
        // createPostModal.setAttribute("postTitle", detailTitle);
        // createPostModal.setAttribute("postCategory", detailCategory);
        // createPostModal.setAttribute("postDescription", detailDescription);

        editPostModal.style.display = 'flex';

    });

//on load

request.open('GET', 'http://localhost:8081/posts', true)
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
          data-description="${post.body}">
            ${post.title}</h1><br>
            
        <h2 class="category">${post.category.category_name}</h2><br>
        <span class="post-date">${post.date}</span>
        <p class="post-description">
        ${post.body.substring(0, 100)}...</p>
        <button class="delete-post" data-title="${post.title}">
        Delete</button>
        <span class="load-more" data-title="${post.title}" 
        data-date="${post.date}" 
        data-description="${post.body}"
        category="${post.category.category_name}">
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

request.send()
});

