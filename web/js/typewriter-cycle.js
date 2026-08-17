const typewriterCycles = document.querySelectorAll('.typewriter-cycle');

function generateTypewriterWord(targetWord, currentWord, backspace) {
    if (backspace) return currentWord.slice(0, -1);
    const nextLetter = targetWord[currentWord.length];
    return currentWord += nextLetter;
}

function deleteLetter(cycle, currentWord, targetWord, words, wordsIndex) {
    if (currentWord == '') {
        const nextWord = (wordsIndex == words.length - 1) ? words[0] : words[wordsIndex + 1];
        const newIndex = (wordsIndex == words.length - 1) ? 0 : wordsIndex + 1;
        typeLetter(cycle, '', nextWord, words, newIndex);
        return;
    };
    const newWord = generateTypewriterWord(targetWord, currentWord, true);
    cycle.innerText = newWord;
    setTimeout(() => {
        deleteLetter(cycle, newWord, targetWord, words, wordsIndex);
    }, 55)
}

function typeLetter(cycle, currentWord, targetWord, words, wordsIndex) {
    if (currentWord == targetWord) {
        setTimeout(() => {
            deleteLetter(cycle, currentWord, targetWord, words, wordsIndex);
        }, 1500);
        return;
    }
    const newWord = generateTypewriterWord(targetWord, currentWord, false);
    cycle.innerText = newWord;
    setTimeout(() => {
        typeLetter(cycle, newWord, targetWord, words, wordsIndex);
    }, 85)
}

typewriterCycles.forEach((cycle) => {
    const words = cycle.dataset.words.split(',').map(word => word.trim());
    if (prefersReducedMotion) {
        cycle.innerText = words[0] || '';
        return;
    }
    typeLetter(cycle, '', words[0], words, 0);
})