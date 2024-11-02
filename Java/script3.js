let isModerator = false;

document.querySelector('.moderator').addEventListener('click', () => {
    const password = prompt("Veuillez entrer le mot de passe pour la modération :");
    if (password === "TestEki") {
        isModerator = true;
        alert("Vous êtes maintenant en mode modérateur.");
        document.querySelectorAll('.delete-btn').forEach(btn => btn.style.display = 'inline');
    } else {
        alert("Mot de passe incorrect.");
    }
});

function loadComments() {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    const currentTime = Date.now();
    comments.forEach((comment, index) => {

        if (currentTime - comment.timestamp < 7 * 24 * 60 * 60 * 1000) {
            displayComment(comment, index);
        } else {
            comments.splice(index, 1);
        }
    });
    localStorage.setItem('comments', JSON.stringify(comments));
}

function addComment() {
    const username = document.getElementById('username').value;
    const commentText = document.getElementById('comment').value;
    const rating = document.querySelector('input[name="rating"]:checked').value;

    if (username && commentText && rating) {
        const comment = {
            username: username,
            commentText: commentText,
            rating: rating,
            timestamp: Date.now()
        };
        
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.push(comment);
        localStorage.setItem('comments', JSON.stringify(comments));

        displayComment(comment, comments.length - 1);

        document.getElementById('username').value = '';
        document.getElementById('comment').value = '';
        document.querySelector('input[name="rating"]:checked').checked = false;
    } else {
        alert("Veuillez remplir tous les champs et noter le jeu.");
    }
}

function displayComment(comment, index) {
    const commentSection = document.getElementById('commentsSection');
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');
    
    const name = document.createElement('strong');
    name.textContent = comment.username;
    commentDiv.appendChild(name);
    
    const ratingText = document.createElement('p');
    ratingText.innerHTML = "Note : " + "★".repeat(Math.floor(comment.rating)) + (comment.rating % 1 ? "☆" : "") + " (" + comment.rating + "/5)";
    commentDiv.appendChild(ratingText);

    const commentContent = document.createElement('p');
    commentContent.textContent = comment.commentText;
    commentDiv.appendChild(commentContent);

    const deleteBtn = document.createElement('span');
    deleteBtn.textContent = "Supprimer";
    deleteBtn.classList.add('delete-btn');
    deleteBtn.onclick = () => {
        const comments = JSON.parse(localStorage.getItem('comments'));
        comments.splice(index, 1);
        localStorage.setItem('comments', JSON.stringify(comments));
        commentDiv.remove();
    };
    if (isModerator) deleteBtn.style.display = 'inline';
    commentDiv.appendChild(deleteBtn);

    commentSection.appendChild(commentDiv);
}

document.addEventListener('DOMContentLoaded', loadComments);