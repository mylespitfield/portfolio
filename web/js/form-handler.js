const form = document.querySelector('#contactForm');
const result = document.querySelector('#contactFormResult');
const inputLines = form?.querySelectorAll('.form-input-line');
const loader = document.querySelector('#contactFormLoader');

function clearResult() {
    result.innerHTML = '';
}

function addCodeLine(text, className = 'message') {
    const line = document.createElement('div');
    line.className = `code-line ${className}`.trim();
    line.textContent = text;
    result.appendChild(line);
}

function hideFormInputs() {
    inputLines.forEach((line) => {
        line.classList.add('hidden');
    });
}

function showFormInputs() {
    inputLines.forEach((line) => {
        line.classList.remove('hidden');
    });
}

function showLoader() {
    loader.classList.remove('hidden');
}

function hideLoader() {
    loader.classList.add('hidden');
}

function restoreForm() {
    hideLoader();
    clearResult();
    showFormInputs();
}

function showSuccessState(message) {
    hideLoader();
    clearResult();

    addCodeLine('> MESSAGE_SENT', 'success');
    addCodeLine(message || 'Thanks — I\'ll get back to you soon.', 'success');

    form.reset();

    setTimeout(() => {
        restoreForm();
    }, 3000);
}

function showErrorState(message) {
    hideLoader();
    clearResult();

    addCodeLine('> ERROR', 'error');
    addCodeLine(message || 'Something went wrong. Please try again.', 'error');

    setTimeout(() => {
        restoreForm();
    }, 3000);
}

form?.addEventListener('submit', async function(e) {
    e.preventDefault();

    hideFormInputs();
    clearResult();
    showLoader();

    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        });

        const data = await response.json();

        if (response.ok && data.success) {
            showSuccessState(data.message);
        } else {
            showErrorState(data.message);
        }

    } catch (error) {
        console.error(error);
        showErrorState('Unable to send your message. Please try again.');
    }
});