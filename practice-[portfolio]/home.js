$(document).ready(function() {
    const githubUsername = "HenleyKaranja";

    // Fetch projects from GitHub
    $.get(`https://api.github.com/users/${githubUsername}/repos`, function(repos) {
        repos.forEach(repo => {
            if (!repo.fork) {
                $('#projects').append(`
                    <div class="col-md-4 project-card">
                        <h5>${repo.name}</h5>
                        <p>${repo.description || "No description available."}</p>
                        <a href="${repo.html_url}" target="_blank" class="btn btn-primary">View Project</a>
                    </div>
                `);
            }
        });
    });

    // Fetch profile image
    $.get(`https://api.github.com/users/${githubUsername}`, function(user) {
        $('#profile-image').attr("src", user.avatar_url);
    });
});
$(document).ready(function() {
    const githubUsername = "HenleyKaranja";

    // Fetch projects from GitHub
    $.get(`https://api.github.com/users/${githubUsername}/repos`, function(repos) {
        repos.forEach((repo, index) => {
            if (!repo.fork) {
                $('#projects').append(`
                    <div class="project-card" data-index="${index}">
                        <h5>${repo.name}</h5>
                        <p>${repo.description || "No description available."}</p>
                        <a href="${repo.html_url}" target="_blank" class="btn btn-primary">View Project</a>
                    </div>
                `);
            }
        });
        // Set first project as active
        $('#projects .project-card').first().addClass('active');
    });

    // Fetch profile image
    $.get(`https://api.github.com/users/${githubUsername}`, function(user) {
        $('#profile-image').attr("src", user.avatar_url);
    });

    // Skills flipping logic
    let currentSkillIndex = 0;
    const skills = $('.skill-card');

    skills.eq(currentSkillIndex).addClass('active').css('opacity', 1);
    
    $('#flip-button').click(function() {
        skills.eq(currentSkillIndex).removeClass('active').css('opacity', 0);
        currentSkillIndex = (currentSkillIndex + 1) % skills.length; // Loop back to first skill
        skills.eq(currentSkillIndex).addClass('active').css('opacity', 1);
    });

    // Projects sliding logic
    let currentProjectIndex = 0;
    const projectCards = $('.project-card');

    projectCards.eq(currentProjectIndex).addClass('active');

    function updateProjects() {
        projectCards.removeClass('active'); // Remove active class from all
        projectCards.each(function(index) {
            if (index === currentProjectIndex) {
                $(this).addClass('active'); // Add active class to the current project
            } else {
                $(this).css('left', index < currentProjectIndex ? '-50%' : '50%'); // Position cards
            }
        });
    }

    setInterval(() => {
        currentProjectIndex = (currentProjectIndex + 1) % projectCards.length; // Loop back to first project
        updateProjects();
    }, 3000); // Change project every 3 seconds
});