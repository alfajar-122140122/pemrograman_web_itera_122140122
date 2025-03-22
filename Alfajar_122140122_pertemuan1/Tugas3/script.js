document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const successMessage = document.getElementById('successMessage');
    
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isNameValid && isEmailValid && isPasswordValid) {
            form.style.display = 'none';
            successMessage.style.display = 'block';
            
            console.log('Form submitted successfully with:', {
                name: nameInput.value,
                email: emailInput.value,
                password: passwordInput.value
            });
        }
    });
    
    function validateName() {
        const value = nameInput.value.trim();
        const isValid = value.length > 3;
        
        if (!isValid) {
            nameInput.classList.add('error');
            nameError.style.display = 'block';
        } else {
            nameInput.classList.remove('error');
            nameError.style.display = 'none';
        }
        
        return isValid;
    }
    
    function validateEmail() {
        const value = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(value);
        
        if (!isValid) {
            emailInput.classList.add('error');
            emailError.style.display = 'block';
        } else {
            emailInput.classList.remove('error');
            emailError.style.display = 'none';
        }
        
        return isValid;
    }
    
    function validatePassword() {
        const value = passwordInput.value;
        const isValid = value.length >= 8;
        
        if (!isValid) {
            passwordInput.classList.add('error');
            passwordError.style.display = 'block';
        } else {
            passwordInput.classList.remove('error');
            passwordError.style.display = 'none';
        }
        
        return isValid;
    }
});