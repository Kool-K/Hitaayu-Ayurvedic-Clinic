document.addEventListener('DOMContentLoaded', function () {
    const calculateBtn = document.getElementById('calculate-btn');
    const genderBtns = document.querySelectorAll('.gender-btn');
    const unitBtns = document.querySelectorAll('.unit-btn');
    const resultsCard = document.getElementById('results-card');
    
    // New Elements
    const athleteCheckbox = document.getElementById('athlete-mode');
    const bodyFatGroup = document.getElementById('body-fat-group');

    let gender = 'male';
    let units = 'cm';

    // 1. Toggles Logic
    genderBtns.forEach(btn => btn.addEventListener('click', () => {
        genderBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        gender = btn.dataset.gender;
    }));

    unitBtns.forEach(btn => btn.addEventListener('click', () => {
        unitBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        units = btn.dataset.unit;
        document.getElementById('cm-input').style.display = units === 'cm' ? 'block' : 'none';
        document.getElementById('ft-input').style.display = units === 'ft' ? 'flex' : 'none';
    }));

    // Athlete Mode Toggle
    if(athleteCheckbox) {
        athleteCheckbox.addEventListener('change', function() {
            if(this.checked) {
                bodyFatGroup.style.display = 'block';
                // Auto-select 'Extra Active' if convenient, or leave to user
            } else {
                bodyFatGroup.style.display = 'none';
            }
        });
    }

    // 2. Calculation Logic
    calculateBtn.addEventListener('click', () => {
        const age = parseFloat(document.getElementById('age').value);
        const weight = parseFloat(document.getElementById('weight').value);
        const activity = document.getElementById('activity').value;
        const isAthlete = athleteCheckbox ? athleteCheckbox.checked : false;
        const bodyFat = parseFloat(document.getElementById('body-fat').value);

        let height;

        // Get height in CM
        if (units === 'cm') {
            height = parseFloat(document.getElementById('height-cm').value);
        } else {
            const ft = parseFloat(document.getElementById('height-ft').value) || 0;
            const inch = parseFloat(document.getElementById('height-in').value) || 0;
            height = (ft * 30.48) + (inch * 2.54);
        }

        if (!age || !weight || !height) return alert("Please fill in basic details (Age, Weight, Height).");
        if (isAthlete && isNaN(bodyFat)) return alert("Please enter Body Fat % for Athlete calculation.");

        // --- A. BMI Calculation ---
        // Formula: weight (kg) / [height (m)]^2
        const bmi = weight / ((height / 100) ** 2);
        document.getElementById('bmi-value').textContent = bmi.toFixed(1);
        
        const cat = document.getElementById('bmi-category');
        let bmiLabel = '', bmiColor = '';

        if(bmi < 18.5) { bmiLabel = "Underweight"; bmiColor = "#3498db"; } 
        else if(bmi < 25) { bmiLabel = "Healthy"; bmiColor = "#2ecc71"; } 
        else if(bmi < 30) { bmiLabel = "Overweight"; bmiColor = "#f1c40f"; } 
        else { bmiLabel = "Obese"; bmiColor = "#e74c3c"; }
        
        cat.textContent = bmiLabel;
        cat.style.backgroundColor = bmiColor;
        cat.style.color = "#ffffff";

        // --- B. Ideal Weight (Miller Formula) ---
        const inchesOver5ft = Math.max(0, (height / 2.54) - 60);
        const ideal = gender === 'male' ? 56.2 + (1.41 * inchesOver5ft) : 53.1 + (1.36 * inchesOver5ft);
        document.getElementById('ideal-weight').textContent = `${ideal.toFixed(1)} kg`;

        // --- C. Water Intake ---
        document.getElementById('water-intake').textContent = `${(weight * 0.033).toFixed(1)} L`;

        // --- D. BMR & RMR Calculation ---
        let bmr = 0;
        let methodText = "";

        if (isAthlete && bodyFat > 0) {
            // Cunningham Equation (Best for Athletes)
            // FFM (Fat Free Mass) = Weight * (1 - BodyFat%)
            const ffm = weight * (1 - (bodyFat / 100));
            bmr = 500 + (22 * ffm);
            methodText = "Calculated using Cunningham Equation (Athlete Standard)";
        } else {
            // Mifflin-St Jeor Equation (Standard)
            bmr = (10 * weight) + (6.25 * height) - (5 * age);
            bmr += (gender === 'male' ? 5 : -161);
            methodText = "Calculated using Mifflin-St Jeor Equation";
        }

        document.getElementById('bmr-value').textContent = bmr.toFixed(0);
        document.getElementById('bmr-method-text').textContent = methodText;

        // --- E. Daily Caloric Needs (TDEE) ---
        // PAL Multipliers
        const pal = { 
            sedentary: 1.2, 
            light: 1.375, 
            moderate: 1.55, 
            very: 1.725, 
            extra: 1.9 // Extra active / Athlete
        };
        
        const tdee = bmr * pal[activity];

        // --- F. Goals (Weight Loss/Gain Ranges) ---
        // Loss: Reduce by 10-20%
        const lossMin = (tdee * 0.8).toFixed(0);
        const lossMax = (tdee * 0.9).toFixed(0);
        
        // Gain: Increase by 10-20%
        const gainMin = (tdee * 1.1).toFixed(0);
        const gainMax = (tdee * 1.2).toFixed(0);

        document.getElementById('cal-maintain').textContent = `${tdee.toFixed(0)} kcal`;
        document.getElementById('cal-loss').textContent = `${lossMin}-${lossMax} kcal`;
        document.getElementById('cal-gain').textContent = `${gainMin}-${gainMax} kcal`;

        // --- G. Update Caricature ---
        const img = document.getElementById('lifestyle-image');
        const txt = document.getElementById('lifestyle-text');
        const data = {
            sedentary: { src: "assets/sedentary.png", t: "A sedentary lifestyle involves a lot of sitting. Let's move to balance Kapha!" },
            light: { src: "assets/lightly-active.png", t: "Light activity is a great start! Helps circulate Prana." },
            moderate: { src: "assets/moderately-active.png", t: "Moderate activity maintains excellent Agni (digestive fire)." },
            very: { src: "assets/very-active.png", t: "High activity! You have strong energy levels." },
            extra: { src: "assets/very-active.png", t: "Elite Athlete Level! Your Ojas (vitality) is high, but ensure proper rest." }
        };
        
        if(data[activity]) {
            img.src = data[activity].src;
            txt.textContent = data[activity].t;
        }

        // --- H. Ayurvedic Recommendations ---
        generateRecommendations(bmi);

        // --- I. Show & Scroll ---
        resultsCard.style.display = 'block';
        setTimeout(() => {
            const headerOffset = 140; 
            const elementPosition = resultsCard.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }, 100);
    });

    function generateRecommendations(bmi) {
        const list = document.getElementById('recommendation-list');
        list.innerHTML = ''; 
        let advice = [];

        if (bmi < 18.5) {
            advice = [
                "Focus on 'Brihmana' (nourishing) therapies.",
                "Include healthy fats like Ghee and nuts.",
                "Practice grounding Yoga poses to stabilize Vata."
            ];
        } else if (bmi < 25) {
            advice = [
                "Maintain balance with a seasonal Dinacharya.",
                "Practice Surya Namaskar to keep metabolism active.",
                "Consider seasonal detox (Panchakarma)."
            ];
        } else if (bmi < 30) {
            advice = [
                "Adopt a 'Langhana' (lightness) diet.",
                "Avoid sleeping during the day (Divaswapna).",
                "Drink warm water infused with ginger."
            ];
        } else {
            advice = [
                "Avoid sweet, sour, and salty foods.",
                "Udvartana (dry powder massage) is recommended.",
                "Start day with warm water and honey."
            ];
        }

        advice.forEach(text => {
            const li = document.createElement('li');
            li.innerHTML = `<i class="fas fa-check-circle"></i> ${text}`;
            list.appendChild(li);
        });
    }
});