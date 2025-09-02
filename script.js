
// Job scoring
const jobTypes = {
    'government': { score: 5, name: 'Government' },
    'private': { score: 2, name: 'Private' }
};

// Car options (increasing price)
const cars = [
    "Splendor",
    "WagonR",
    "Desire",
    "Creta",
    "Innova Crysta",
    "Fortuner",
    "Fortuner Top Model"
];

// Car thresholds (dahej ranges)
const carThresholds = [1000000, 1500000, 2500000, 3000000, 3500000, 4000000];

function calculatePrediction() {
    // Safely get elements
    const overlay = document.getElementById('loadingOverlay');
    const resultsEl = document.getElementById('results');

    if (overlay) overlay.style.display = 'block';
    if (resultsEl) resultsEl.style.display = 'none';

    // Parse input values
    const salary = parseInt(document.getElementById('salary')?.value) || 0;
    const jobInput = document.getElementById('job')?.value.trim().toLowerCase();
    const property = parseInt(document.getElementById('property')?.value) || 0;
    const pet = parseInt(document.getElementById('pet')?.value) || 0;

    // Determine job type
    let job;
    if (jobInput === "government" || jobInput === "1") job = 1;
    else if (jobInput === "private" || jobInput === "0") job = 0;
    else job = null;

    // Simulate loading
    setTimeout(() => {
        if (overlay) overlay.style.display = 'none';

        // Validation
        if (job === null) {
            showResult("-", "-", "Enter your job type (government(1) or private(0)).");
            return;
        }

        if (property === 0) {
            showResult("-10,000,000", cars[0], "You don't deserve dahej!");
            return;
        }

        let sum = -5000000;
        let dahej = salary * 12 + 50000 * property + pet * 10000;

        // Private job adjustment
        if (job === 0) {
            dahej = Math.floor((sum + dahej) / 10);
            showResult(dahej, cars[0], "You owe them dahej.");
            return;
        }

        // Government job: select car dynamically
        let carIdx = carThresholds.findIndex(threshold => dahej <= threshold);
        if (carIdx === -1) carIdx = cars.length - 1; // highest car for dahej above all thresholds

        showResult(dahej, cars[carIdx]);

    }, 500);
}

function showResult(dahej, car, description) {
    // Create modal overlay if it doesn't exist
    if (!document.querySelector('.modal-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        document.body.appendChild(overlay);
    }

    // Create close button if it doesn't exist
    if (!document.querySelector('.close-results')) {
        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-results';
        closeBtn.innerHTML = '×';
        closeBtn.onclick = hideResults;
        document.querySelector('.results').appendChild(closeBtn);
    }

    // Show results and overlay
    document.querySelector('.modal-overlay').style.display = 'block';
    document.getElementById('results').style.display = 'block';
    document.getElementById('predictedSalary').textContent = dahej;
    document.getElementById('carName').textContent = car;
    document.getElementById('carDescription').textContent = description;
}

function hideResults() {
    document.querySelector('.modal-overlay').style.display = 'none';
    document.getElementById('results').style.display = 'none';
}

// Close modal when clicking overlay
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.modal-overlay')?.addEventListener('click', hideResults);
});

// Add fadeIn animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);


