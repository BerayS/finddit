import reddit from './redditapi'

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');


// Form event listener
searchForm.addEventListener('submit', e => {
    // Get search term
    const searchTerm = searchInput.value;
    // Get sort
    const sortBy = document.querySelector('input[name="sortby"]:checked').value;
    // Get limit
    const searchLimit = document.getElementById('limit').value;
    // console.log(searchLimit);

    // Check input 
    if(searchTerm == "") {
        // Show message
        showMessage('Please add a search term', 'alert-danger');
    }

    // Clear Input
    searchInput.value = '';
    
    // Search Reddit
    reddit.search(searchTerm,searchLimit,sortBy).then(results => {
        let output = '<div class="card-columns">';
        console.log(results);

        results.forEach(post => {
            // Check for image
        let image = post.preview ? post.preview.images[0].source.url : 'https://www.sharethis.com/wp-content/uploads/2017/05/Reddit.png';
        let link = post.url;
        output += `<div class="card"> 

            <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${post.title}</h5>
              <p class="card-text">${truncateText(post.selftext,100)}</p>
              <a href="${link}" class="btn btn-primary">Read More</a>
              <hr>
              <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
              <span class="badge badge-dark">Score: ${post.score}</span>
            </div>
          </div>
            `
        });

        output += '</div>';
        document.getElementById('results').innerHTML = output;
    });
    
    e.preventDefault();
})

// Show Message
function showMessage(message,className) {
    // Create div
    const div = document.createElement('div');
    div.className = ` alert ${className}`;
    // Add Text
    div.appendChild(document.createTextNode(message));
    // Get the parent container
    const searchContainer = document.getElementById('search-container');
    // Get search 
    const search = document.getElementById('search');

    // Insert Message 
    searchContainer.insertBefore(div,search);

    // Timeout alert
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
}

// Funcate Text
function truncateText(text,limit) {
    const shortened = text.indexOf(" ",limit);
    if (shortened == -1) return text;
    return text.substring(0, shortened);
}