export function counterAnimation(
  target,
  onIncrement,
  { initial = 0, increment = 1, delay = 1, onFinish = () => {} }
) {
  let currentNumber = initial;

  const interval = setInterval(() => {
    currentNumber += increment;

    onIncrement(currentNumber, target);

    if (currentNumber >= target) {
      clearInterval(interval);
      onFinish();
    }
  }, delay);
}
