// Initialize Animations
AOS.init({ duration: 1000, once: false });

// 1. Fetch GitHub Projects
const fetchGitHub = async () => {
    try {
        const response = await fetch("https://api.github.com/users/HenleyKaranja/repos");
        const repos = await response.json();
        const container = document.getElementById("github-cards");

        repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
             .slice(0, 6) // Top 6 repos
             .forEach(repo => {
                const card = document.createElement("div");
                card.className = "project-card";
                card.setAttribute("data-aos", "zoom-in-up");
                card.innerHTML = `
                    <h3>${repo.name}</h3>
                    <p>${repo.description || "System engineering project."}</p>
                    <span style="color: #00d2ff">${repo.language || "C++"}</span><br><br>
                    <a href="${repo.html_url}" target="_blank" class="btn">View Source</a>
                `;
                container.appendChild(card);
             });
    } catch (err) {
        console.error("Failed to fetch repos", err);
    }
};

// 2. Setup EmailJS
(function() {
    // Replace with your actual Public Key from EmailJS Dashboard
    emailjs.init("YOUR_PUBLIC_KEY"); 
})();

document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const btn = event.target.querySelector("button");
    btn.innerText = "Sending...";

    // Replace with your Service ID and Template ID
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
        .then(() => {
            document.getElementById("status-msg").innerText = "Message Sent Successfully!";
            btn.innerText = "Send Message";
            this.reset();
        }, (error) => {
            document.getElementById("status-msg").innerText = "Error. Try again.";
            btn.innerText = "Send Message";
        });
});

fetchGitHub();