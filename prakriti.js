document.addEventListener('DOMContentLoaded', function () {

    // Data Structure representing the Chart
    const prakritiData = [
        { feature: "Body Build", v: "Thin & under developed", p: "Thin/ medium build, delicately shaped", k: "Robust or heavily built, well formed", weight: 2 },//weight 2
        { feature: "Veins & Tendons", v: "Prominent veins & tendons", p: "Less prominent", k: "Hidden / Covered" },
        { feature: "Chest", v: "Narrow chest", p: "Barrel shaped chest", k: "Square & well formed" },
        { feature: "Skin (Texture)", v: "Dry, cracked and thin, cold", p: "Warm, normal, or lightly oily, easily bruised, hypersensitive", k: "Cold, normal to oily, thick", weight: 3 },//weight 3
        { feature: "Skin (Color)", v: "Darker, brown, easily tanned, wheatish", p: "Lighter, fairer, yellowish, reddish", k: "Fair, golden yellow" },
        { feature: "Cold/Heat Tolerance", v: "Intolerant to cold, prefers warm climate", p: "Intolerant to heat, prefers cool climate", k: "Tolerant to cold & heat, prefers moderate climate" },
        { feature: "Hair", v: "Dry, rough, unruly, cracked", p: "Thin & hard, brown/reddish", k: "Thick, firm, oily, curly, black" },
        { feature: "Nails", v: "Thin, dry, brittle, irregular", p: "Thin, smooth, pinkish, shiny", k: "Thick, smooth, shiny, regular" },
        { feature: "Eyes", v: "Small, dry, unsteady, rolling, black", p: "Sharp focused, streaked, brown, green, blue", k: "Big, soft outlook, clean, moist, black" },
        { feature: "Teeth & Gums", v: "Dry, thin, irregular, cracked", p: "Yellowish, bleeding gums", k: "White, regular, healthy pink gums" },
        { feature: "Diet", v: "Irregular habits, likes warm/sour", p: "Irregular habits, likes sweet/cold", k: "Regular eating, likes dry, astringent, no eating tantrums, likes warm food" },
        { feature: "Appetite", v: "Irregular, sometimes hungry, sometimes not", p: "Strong, can't tolerate hunger, eats less but frequently", k: "Regular but can tolerate hunger. Eats good quantity but less frequent.", weight: 5 }, //weight 5
        { feature: "Digestion", v: "Poor or irregular", p: "Quick digestion", k: "Normal or slow digestion" },
        { feature: "Bowel Habits", v: "Irregular, hard stools, once a day", p: "Regular, 1-2 times, no discomfort", k: "Fairly regular, once a day", weight: 5 }, //weight 5
        { feature: "Sweat (Excretion)", v: "Less sweat & micturition", p: "Profuse sweating & micturition", k: "Moderate sweat" },
        { feature: "Voice & Speech", v: "Husky, low-toned, stammering", p: "High-pitched, sharp, talkative", k: "Deep, pleasant, sweet, melodious" },
        { feature: "Activities", v: "Hyperactive, talkative, can't stay still", p: "Moderately active, easily fatigued, less stress tolerance", k: "Steady, tolerates effort but naturally less active" },
        { feature: "Strength", v: "Poor / Low endurance", p: "Moderate endurance", k: "Strong / High endurance" },
        { feature: "Sleep", v: "Poor or irregular, teeth grinding, light", p: "Moderate, easily disturbed sleep", k: "Sound, heavy, deep sleep", weight: 2 },//weight 2
        { feature: "Sleep Hours", v: "4 to 6 hours", p: "5 to 6 hours", k: "6 to 8 hours or more" },
        { feature: "Dreams", v: "Active, flying, fear, wind", p: "Bright, fire, anger, violence", k: "Water, birds, flowers, calm" },
        { feature: "Emotional Qualities", v: "Unstable thoughts, unsteady mind, less focused", p: "Sharp, focused but easily disturbed, gets angry quickly but cools down quickly", k: "Steady mind, calm, can control emotions" },
        { feature: "Memory", v: "Quick to learn, forgetful", p: "Sharp, quick learner, good memory", k: "Slow to learn, good long-term memory" }
        
    ];

    const container = document.getElementById('quiz-container');

    // 1. Generate the Table/Form
    const headerHTML = `
        <div class="quiz-header">
            <div>Feature</div>
            <div>Vata (Vathic)</div>
            <div>Pitta (Paittik)</div>
            <div>Kapha (Shleishmic)</div>
        </div>
    `;
    container.innerHTML = headerHTML;

    prakritiData.forEach((row, index) => {
        const weight = row.weight || 1;

        const rowHTML = `
    <div class="quiz-row">
        <div class="feature-cell">
            ${row.feature} 
        </div>
        <div class="option-cell">
            <input type="radio" name="q${index}" value="vata" class="option-input" data-weight="${weight}">
            <label class="option-label" data-dosha="Vata">${row.v}</label>
        </div>
        <div class="option-cell">
            <input type="radio" name="q${index}" value="pitta" class="option-input" data-weight="${weight}">
            <label class="option-label" data-dosha="Pitta">${row.p}</label>
        </div>
        <div class="option-cell">
            <input type="radio" name="q${index}" value="kapha" class="option-input" data-weight="${weight}">
            <label class="option-label" data-dosha="Kapha">${row.k}</label>
        </div>
    </div>
`;
        container.innerHTML += rowHTML;
    });

    // 2. Click Handling for Radio Buttons
    const optionCells = document.querySelectorAll('.option-cell');
    optionCells.forEach(cell => {
        cell.addEventListener('click', function (e) {
            if (e.target.tagName !== 'INPUT') {
                const input = this.querySelector('input');
                input.checked = true;
            }
            // Remove error state if present
            this.closest('.quiz-row').classList.remove('error');
        });
    });

    // 3. Calculation Logic
    const calculateBtn = document.getElementById('calculate-prakriti');
    const resultModal = document.getElementById('prakriti-result');
    const closeBtn = document.querySelector('.close-result');

    calculateBtn.addEventListener('click', function () {
        let vataScore = 0;
        let pittaScore = 0;
        let kaphaScore = 0;
        let isComplete = true;
        let firstUnanswered = null;

        // Reset previous error styles
        document.querySelectorAll('.quiz-row').forEach(row => row.classList.remove('error'));

        // Validation Loop
        prakritiData.forEach((row, index) => {
            const selected = document.querySelector(`input[name="q${index}"]:checked`);
            const rowElement = document.querySelectorAll('.quiz-row')[index];
            const weight = row.weight || 1;

            if (!selected) {
                isComplete = false;
                rowElement.classList.add('error');
                if (!firstUnanswered) firstUnanswered = rowElement;
            } else {
                if (selected.value === 'vata') vataScore += weight;
                if (selected.value === 'pitta') pittaScore += weight;
                if (selected.value === 'kapha') kaphaScore += weight;
            }
        });

        if (!isComplete) {
            firstUnanswered.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Small vibration effect on mobile if supported
            if (navigator.vibrate) navigator.vibrate(200);
            return;
        }

        // --- Valid Calculation ---
        const maxScore = vataScore + pittaScore + kaphaScore;
        const vataPercent = (vataScore / maxScore) * 100;
        const pittaPercent = (pittaScore / maxScore) * 100;
        const kaphaPercent = (kaphaScore / maxScore) * 100;

        // Determine Verdict
        let verdict = "";
        const scores = [
            { type: 'Vata', val: vataScore },
            { type: 'Pitta', val: pittaScore },
            { type: 'Kapha', val: kaphaScore }
        ];

        scores.sort((a, b) => b.val - a.val);

        const diff1 = scores[0].val - scores[1].val;

        if (diff1 < (maxScore * 0.1)) {
            verdict = `${scores[0].type}-${scores[1].type} Prakriti`;
        } else {
            verdict = `${scores[0].type} Prakriti`;
        }

        // --- Update UI ---
        document.getElementById('final-verdict').textContent = verdict;

        // Update Legend Percentages
        document.getElementById('vata-percent').textContent = Math.round(vataPercent) + '%';
        document.getElementById('pitta-percent').textContent = Math.round(pittaPercent) + '%';
        document.getElementById('kapha-percent').textContent = Math.round(kaphaPercent) + '%';

        // --- DRAW PIE CHART ---
        // Using Conic Gradient
        const chart = document.getElementById('dosha-pie-chart');

        // Colors corresponding to CSS variables or hardcoded matches
        const cVata = '#a29bfe';
        const cPitta = '#ff7675';
        const cKapha = '#55efc4';

        // Calculate degrees
        const degVata = (vataPercent / 100) * 360;
        const degPitta = (pittaPercent / 100) * 360;
        // Kapha takes the rest

        // Set the background gradient
        // Vata starts at 0, ends at degVata
        // Pitta starts at degVata, ends at degVata + degPitta
        // Kapha starts at degVata + degPitta, ends at 360
        chart.style.background = `conic-gradient(
            ${cVata} 0deg ${degVata}deg,
            ${cPitta} ${degVata}deg ${degVata + degPitta}deg,
            ${cKapha} ${degVata + degPitta}deg 360deg
        )`;

        resultModal.style.display = 'flex';
    });

    closeBtn.addEventListener('click', () => {
        resultModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === resultModal) {
            resultModal.style.display = 'none';
        }
    });
});

