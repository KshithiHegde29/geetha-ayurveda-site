// Main JavaScript file for Geetha Ayurveda site

document.addEventListener('DOMContentLoaded', function() {
    console.log('Geetha Ayurveda site loaded successfully!');
    
    // Add active class to current page nav link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.style.fontWeight = 'bold';
            link.style.textDecoration = 'underline';
        }
    });
});
