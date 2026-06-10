<script>
    // dynamic particles 
    function createParticles() {
        const particlesDiv = document.getElementById('particles');
        for(let i=0;i<50;i++) {
            let particle = document.createElement('div');
            particle.classList.add('particle');
            let size = Math.random() * 40 + 10;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDuration = Math.random() * 10 + 5 + 's';
            particle.style.animationDelay = Math.random() * 5 + 's';
            particle.style.opacity = Math.random() * 0.5 + 0.2;
            particle.style.background = `radial-gradient(circle, rgba(${Math.random()*255},${Math.random()*150},255,0.6), rgba(255,100,150,0.3))`;
            particlesDiv.appendChild(particle);
        }
    }
    createParticles();

    // DOM elements
    const fullname = document.getElementById('fullname');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const password = document.getElementById('password');
    const confirmPass = document.getElementById('confirmPass');
    const genderRadios = document.querySelectorAll('input[name="gender"]');
    const countrySelect = document.getElementById('country');
    const educationSelect = document.getElementById('education');
    const comments = document.getElementById('comments');
    const checkboxes = document.querySelectorAll('.checkbox-group input');
    const progressFill = document.getElementById('progressFill');
    const percentDisplay = document.getElementById('percentDisplay');
    const charCountSpan = document.getElementById('charCount');
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Update completion & char count
    function updateProgress() {
        let totalFields = 9;
        let filled = 0;
        if(fullname.value.trim()) filled++;
        if(email.value.trim() && /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/.test(email.value.trim())) filled++;
        if(phone.value.trim()) filled++;
        if(password.value.trim() && confirmPass.value.trim() && password.value === confirmPass.value) filled++;
        let genderSelected = false;
        genderRadios.forEach(r => { if(r.checked) genderSelected = true; });
        if(genderSelected) filled++;
        if(countrySelect.value) filled++;
        if(educationSelect.value) filled++;
        if(comments.value.trim().length >= 2) filled++;
        let percent = Math.min(100, Math.round((filled / totalFields) * 100));
        percentDisplay.innerText = percent + "%";
        progressFill.style.width = percent + "%";
    }
    function updateCharCount() { charCountSpan.innerText = comments.value.length; if(comments.value.length > 250) comments.value = comments.value.slice(0,250); updateProgress(); }
    comments.addEventListener('input', updateCharCount);
    
    password.addEventListener('input', updateProgress);
    confirmPass.addEventListener('input', updateProgress);
    [fullname, email, phone, countrySelect, educationSelect].forEach(el => el.addEventListener('input', updateProgress));
    genderRadios.forEach(r => r.addEventListener('change', updateProgress));
    checkboxes.forEach(cb => cb.addEventListener('change', updateProgress));
    
    // toggle password eyes
    document.querySelectorAll('.toggle-password').forEach(icon => {
        icon.addEventListener('click', function() {
            let targetId = this.getAttribute('data-target');
            let input = document.getElementById(targetId);
            if(input.type === 'password') { input.type = 'text'; this.classList.replace('fa-eye', 'fa-eye-slash'); }
            else { input.type = 'password'; this.classList.replace('fa-eye-slash', 'fa-eye'); }
        });
    });
    
    // Validation function (without password strength)
    function validateForm() {
        let valid = true;
        if(!fullname.value.trim()) { document.getElementById('nameError').innerText = "✨ Full name required!"; valid=false; } else document.getElementById('nameError').innerText = "";
        const emailVal = email.value.trim();
        if(!emailVal) { document.getElementById('emailError').innerText = "🌈 Email address required"; valid=false; } 
        else if(!/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/.test(emailVal)) { document.getElementById('emailError').innerText = "💥 Invalid email format"; valid=false; } else document.getElementById('emailError').innerText = "";
        if(!phone.value.trim()) { document.getElementById('phoneError').innerText = "📞 Phone number required"; valid=false; } else document.getElementById('phoneError').innerText = "";
        if(!password.value) { document.getElementById('passError').innerText = "🔒 Password required"; valid=false; } else if(password.value.length<6) { document.getElementById('passError').innerText = "Password must be at least 6 characters"; valid=false; } else document.getElementById('passError').innerText = "";
        if(password.value !== confirmPass.value) { document.getElementById('confirmError').innerText = "❌ Passwords do not match"; valid=false; } else document.getElementById('confirmError').innerText = "";
        let genderFlag = false; genderRadios.forEach(r=>{if(r.checked) genderFlag=true;});
        if(!genderFlag) { document.getElementById('genderError').innerText = "Select your gender"; valid=false; } else document.getElementById('genderError').innerText = "";
        if(!countrySelect.value) { document.getElementById('countryError').innerText = "Please select a country"; valid=false; } else document.getElementById('countryError').innerText = "";
        if(!educationSelect.value) { document.getElementById('eduError').innerText = "Select education level"; valid=false; } else document.getElementById('eduError').innerText = "";
        if(comments.value.length > 250) { document.getElementById('commentsError').innerText = "Maximum 250 characters"; valid=false; } else document.getElementById('commentsError').innerText = "";
        return valid;
    }
    
    function showToast(msg) {
        const toast = document.getElementById('toastMsg');
        document.getElementById('toastText').innerText = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 4000);
    }
    
    document.getElementById('resetBtn').addEventListener('click', () => {
        document.getElementById('regForm').reset();
        genderRadios.forEach(r => r.checked = false);
        checkboxes.forEach(cb => cb.checked = false);
        document.querySelectorAll('.error-msg').forEach(e => e.innerText = "");
        charCountSpan.innerText = "0";
        updateProgress();
        showToast("🌀 Form has been reset! Ready for new data ✨");
    });
    
    const form = document.getElementById('regForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if(validateForm()) {
            showToast("🎉✨ Registration Successful! Welcome to the ChromaVerse ✨🌈");
            console.log("Form data submitted successfully");
        } else {
            showToast("⚠️ Please fix the highlighted errors above!");
            let firstError = document.querySelector('.error-msg:not(:empty)');
            if(firstError) firstError.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    });
    
    // Dark/Light mode toggle with icon change
    let isDark = false;
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark');
        isDark = body.classList.contains('dark');
        const icon = themeToggle.querySelector('i');
        if(isDark) {
            icon.classList.replace('fa-moon', 'fa-sun');
            showToast("🌙 Dark Mode Activated");
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            showToast("☀️ Light Mode Activated");
        }
        // Trigger background animation refresh
        body.style.animation = 'none';
        setTimeout(() => { body.style.animation = 'gradientFlow 12s ease infinite'; }, 10);
    });
    
    updateProgress();
    updateCharCount();
</script>
