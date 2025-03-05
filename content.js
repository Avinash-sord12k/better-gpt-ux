function addScrollBehavior() {
  const h2Elements = [...document.getElementsByTagName('h2')];
  h2Elements.forEach(h2 => {
    h2.style.cursor = 'pointer';
    h2.addEventListener('click', () => {
      h2.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function runEvery10Seconds() {
  addScrollBehavior();
  setTimeout(runEvery10Seconds, 10000);
}

runEvery10Seconds();
