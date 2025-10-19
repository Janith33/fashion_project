// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the login form
    const loginForm = document.querySelector('.Login');
    
    // Form submission handler
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form from submitting normally
        
        // Get form values
        const username = this.querySelector('input[name="name"]').value.trim();
        const password = this.querySelector('input.password').value.trim();
        
        // Validate inputs
        if (validateLogin(username, password)) {
            // If validation passes, process login
            processLogin(username, password);
        }
    });
    
    // Forgot password link handler
    const forgotPasswordLink = document.querySelector('a[href="#"]');
    forgotPasswordLink.addEventListener('click', function(event) {
        event.preventDefault();
        handleForgotPassword();
    });
});

// Validation function
function validateLogin(username, password) {
    // Clear previous error messages
    clearErrors();
    
    let isValid = true;
    
    // Validate username/email
    if (username === '') {
        showError('username', 'Username or email is required');
        isValid = false;
    } else if (!isValidEmail(username) && !isValidUsername(username)) {
        showError('username', 'Please enter a valid email or username');
        isValid = false;
    }
    
    // Validate password
    if (password === '') {
        showError('password', 'Password is required');
        isValid = false;
    } else if (password.length < 6) {
        showError('password', 'Password must be at least 6 characters long');
        isValid = false;
    }
    
    return isValid;
}

// Check if input is a valid email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Check if input is a valid username (alphanumeric, 3-20 chars)
function isValidUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

// Show error message
function showError(field, message) {
    const inputField = document.querySelector(`input[name="${field}"]`) || 
                      document.querySelector(`input.${field}`);
    
    // Create error element if it doesn't exist
    let errorElement = inputField.parentNode.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        inputField.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    errorElement.style.color = 'red';
    errorElement.style.fontSize = '12px';
    errorElement.style.marginTop = '5px';
    
    // Add red border to input
    inputField.style.borderColor = 'red';
}

// Clear all error messages
function clearErrors() {
    // Remove error messages
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());
    
    // Reset input borders
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.style.borderColor = '';
    });
}

// Process login (simulate API call)
function processLogin(username, password) {
    // Show loading state
    const submitButton = document.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Logging in...';
    submitButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Here you would typically send data to your server
        console.log('Login attempt:', { username, password });
        
        // Simulate successful login
        const success = Math.random() > 0.3; // 70% success rate for demo
        
        if (success) {
            showSuccess('Login successful! Redirecting...');
            // Redirect to dashboard after successful login
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        } else {
            showError('form', 'Invalid username or password');
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    }, 1500);
}

// Show success message
function showSuccess(message) {
    // Remove any existing success messages
    const existingSuccess = document.querySelector('.success-message');
    if (existingSuccess) {
        existingSuccess.remove();
    }
    
    const successElement = document.createElement('div');
    successElement.className = 'success-message';
    successElement.textContent = message;
    successElement.style.color = 'green';
    successElement.style.fontSize = '14px';
    successElement.style.marginBottom = '15px';
    successElement.style.textAlign = 'center';
    
    const form = document.querySelector('.Login');
    form.insertBefore(successElement, form.firstChild);
}

// Handle forgot password
function handleForgotPassword() {
    const username = prompt('Please enter your email address:');
    
    if (username && username.trim() !== '') {
        if (isValidEmail(username.trim())) {
            // Simulate sending reset email
            alert(`Password reset instructions have been sent to ${username}`);
            console.log('Password reset requested for:', username);
        } else {
            alert('Please enter a valid email address');
        }
    }
}

// Real-time validation as user types
document.addEventListener('DOMContentLoaded', function() {
    const usernameInput = document.querySelector('input[name="name"]');
    const passwordInput = document.querySelector('input.password');
    
    usernameInput.addEventListener('blur', function() {
        const username = this.value.trim();
        if (username !== '' && !isValidEmail(username) && !isValidUsername(username)) {
            showError('name', 'Please enter a valid email or username');
        } else {
            clearFieldError('name');
        }
    });
    
    passwordInput.addEventListener('blur', function() {
        const password = this.value.trim();
        if (password !== '' && password.length < 6) {
            showError('password', 'Password must be at least 6 characters');
        } else {
            clearFieldError('password');
        }
    });
});

// Clear error for specific field
function clearFieldError(fieldName) {
    const inputField = document.querySelector(`input[name="${fieldName}"]`) || 
                      document.querySelector(`input.${fieldName}`);
    const errorElement = inputField.parentNode.querySelector('.error-message');
    
    if (errorElement) {
        errorElement.remove();
    }
    
    inputField.style.borderColor = '';
}