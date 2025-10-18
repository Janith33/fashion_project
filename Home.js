let slideIndex = 1;
        showSlides(slideIndex);

        function plusSlides(n) {
            showSlides(slideIndex += n);
        }

        function currentSlide(n) {
            showSlides(slideIndex = n);
        }

        function showSlides(n) {
            let i;
            let slides = document.getElementsByClassName("slidefade");
            let dots = document.getElementsByClassName("dot");
            
            if (n > slides.length) { slideIndex = 1; }
            if (n < 1) { slideIndex = slides.length; }
            
            // Hide all slides
            for (i = 0; i < slides.length; i++) {
                slides[i].classList.remove("active");
            }
            
            // Remove active class from all dots
            for (i = 0; i < dots.length; i++) {
                dots[i].classList.remove("active");
            }
            
            // Show current slide and activate corresponding dot
            slides[slideIndex - 1].classList.add("active");
            dots[slideIndex - 1].classList.add("active");
        }

        // Auto slide every 5 seconds (optional)
        setInterval(() => {
            plusSlides(1);
        }, 5000);






       /* Add hover effects and animations for the
          Delevery information section, payment method 
          and about customer suppourt details*/

function addInteractivity() {
    const optionalElements = document.querySelectorAll('.optional');
    
    optionalElements.forEach(element => {
        // Hover effect
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
            this.style.boxShadow = '0px 8px 16px rgba(0, 0, 0, 0.3)';
        });

        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)';
        });

        // Click effect
        element.addEventListener('click', function() {
            this.style.backgroundColor = '#f8f9fa';
            setTimeout(() => {
                this.style.backgroundColor = 'white';
            }, 300);
        });
    });
}

// Call after DOM is loaded
document.addEventListener('DOMContentLoaded', addInteractivity);