// Generate bubbles
function createBubbles() {
    const container = document.querySelector('.bubble-container');
    const bubbleCount = 20;
    
    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        
        const size = Math.random() * 100 + 50;
        const left = Math.random() * 100;
        const duration = Math.random() * 30 + 20;
        const delay = Math.random() * 20;
        
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${left}%`;
        bubble.style.animationDuration = `${duration}s`;
        bubble.style.animationDelay = `${delay}s`;
        
        container.appendChild(bubble);
    }
}

// Countdown timer
function startCountdown() {
    // Set the date we're counting down to (30 days from now)
    const countDownDate = new Date();
    countDownDate.setDate(countDownDate.getDate() + 30);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById("days").innerHTML = days.toString().padStart(2, '0');
        document.getElementById("hours").innerHTML = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerHTML = seconds.toString().padStart(2, '0');
        
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("days").innerHTML = "00";
            document.getElementById("hours").innerHTML = "00";
            document.getElementById("minutes").innerHTML = "00";
            document.getElementById("seconds").innerHTML = "00";
        }
    }
    
    // Update the countdown every 1 second
    updateCountdown();
    const x = setInterval(updateCountdown, 1000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    startCountdown();
    
    // Add ripple effect to feature items
    const featureItems = document.querySelectorAll('.feature-item');
    
    featureItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Create ripple element
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            // Position the ripple
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size/2}px`;
            ripple.style.top = `${e.clientY - rect.top - size/2}px`;
            
            // Remove ripple after animation completes
            ripple.addEventListener('animationend', function() {
                this.remove();
            });
        });
        
        // Add subtle 3D tilt effect
        item.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xc = rect.width / 2;
            const yc = rect.height / 2;
            
            const dx = (x - xc) / 10;
            const dy = (y - yc) / 10;
            
            this.style.transform = `translateY(-5px) rotateX(${-dy}deg) rotateY(${dx}deg)`;
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}); 
