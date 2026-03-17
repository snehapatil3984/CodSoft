// ─── STATE ────────────────────────────────────
let currentInput = '';
let justCalculated = false;

// ─── DISPLAY HELPERS ──────────────────────────
function updateDisplay(value) {
  document.getElementById('display').textContent = value || '0';
}

function updateExpression(value) {
  document.getElementById('expression').textContent = value;
}

// Make expression readable (replace symbols)
function makeReadable(input) {
  return input
    .replace(/\*/g, ' × ')
    .replace(/\//g, ' ÷ ')
    .replace(/\+/g, ' + ')
    .replace(/-/g, ' − ')
    .replace(/%/g, '%');
}

// ─── APPEND VALUE ─────────────────────────────
function appendToDisplay(value) {

  // If last action was = and user types a number, start fresh
  if (justCalculated && !isNaN(value) && value !== '.') {
    currentInput = '';
    updateExpression('');
  }
  justCalculated = false;

  const operators = ['+', '-', '*', '/', '%'];
  const lastChar = currentInput.slice(-1);

  // Prevent two operators in a row
  if (operators.includes(value) && operators.includes(lastChar)) {
    currentInput = currentInput.slice(0, -1);
  }

  // Prevent multiple decimals in the same number
  if (value === '.') {
    const parts = currentInput.split(/[\+\-\*\/]/);
    const lastPart = parts[parts.length - 1];
    if (lastPart.includes('.')) return;
    if (lastPart === '') currentInput += '0'; // e.g. "5+." → "5+0."
  }

  currentInput += value;
  updateDisplay(makeReadable(currentInput));
}

// ─── CLEAR ────────────────────────────────────
function clearDisplay() {
  currentInput = '';
  updateDisplay('0');
  updateExpression('');
}

// ─── DELETE LAST CHARACTER ────────────────────
function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay(makeReadable(currentInput) || '0');
}

// ─── CALCULATE ────────────────────────────────
function calculate() {
  if (!currentInput) return;

  try {
    // Replace % with /100 for eval
    let expression = currentInput.replace(/%/g, '/100');
    let result = eval(expression);

    // Handle division by zero or invalid result
    if (!isFinite(result)) {
      updateExpression('');
      updateDisplay('Error');
      currentInput = '';
      return;
    }

    // Round to avoid floating point issues like 0.1+0.2 = 0.30000000001
    result = parseFloat(result.toFixed(10));

    // Show expression on top line, result on main display
    updateExpression(makeReadable(currentInput) + ' =');
    currentInput = String(result);
    updateDisplay(currentInput);
    justCalculated = true;

  } catch (e) {
    updateDisplay('Error');
    updateExpression('');
    currentInput = '';
  }
}

// ─── KEYBOARD SUPPORT ─────────────────────────
document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') appendToDisplay(e.key);
  else if (e.key === '+')       appendToDisplay('+');
  else if (e.key === '-')       appendToDisplay('-');
  else if (e.key === '*')       appendToDisplay('*');
  else if (e.key === '/') { e.preventDefault(); appendToDisplay('/'); }
  else if (e.key === '%')       appendToDisplay('%');
  else if (e.key === '.')       appendToDisplay('.');
  else if (e.key === 'Enter' || e.key === '=') calculate();
  else if (e.key === 'Backspace') deleteLast();
  else if (e.key === 'Escape')  clearDisplay();
});
