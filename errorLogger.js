export function initErrorLogger() {
    const originalConsoleError = console.error;
    const errorLog = [];

    console.error = function(...args) {
        errorLog.push(args.join(' '));
        updateErrorDisplay(errorLog);
        originalConsoleError.apply(console, args);
    };

    window.onerror = function(message, source, lineno, colno, error) {
        const errorMessage = `Error: ${message} at ${source}:${lineno}:${colno}`;
        errorLog.push(errorMessage);
        updateErrorDisplay(errorLog);
        return false;
    };

    function updateErrorDisplay(errorLog) {
        const errorDisplay = document.getElementById('error-display');
        if (errorDisplay) {
            errorDisplay.innerHTML = errorLog.join('<br>');
            errorDisplay.style.display = 'block';
        }
    }
}
