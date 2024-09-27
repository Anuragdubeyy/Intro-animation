const percentageNumber = document.getElementById('percentage');
function displayPercentage() {
  percentageNumber.innerHTML = `
    <span id="text1" style="color: black; font-family: 'Raleway'; sans-serif; font-size: 80pt; text-align: center; display: inline-block; position: absolute; width: 100%; user-select: none;">
    </span>
    <span id="text2" style="color: black; font-family: 'Raleway'; sans-serif; font-size: 80pt; text-align: center; display: inline-block; position: absolute; width: 100%; user-select: none;">
    </span>
     <svg id="filters" style="display:none;">
        <defs>
            <filter id="threshold">
                <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 255 -140" />
            </filter>
        </defs>
    </svg>
    `;


    const elts = {
      text1: document.getElementById("text1"),
      text2: document.getElementById("text2")
  };
  
  const texts = [
      "Empower Your Strategy",
      "Unlock Insights",
      "Discover Trends",
      "Empower Your Strategy",
  ];
  
  const morphTime = 0.5;
  const cooldownTime = 0.3;
  
  let textIndex = 0; // Start from the first text
  let time = new Date();
  let morph = 0;
  let cooldown = cooldownTime;
  
  // Initialize text content
  elts.text1.textContent = texts[textIndex];
  elts.text2.textContent = texts[(textIndex + 1) % texts.length];
  
  function doMorph() {
      morph -= cooldown;
      cooldown = 0;
  
      let fraction = morph / morphTime;
  
      if (fraction > 1) {
          cooldown = cooldownTime;
          fraction = 1;
      }
  
      setMorph(fraction);
  }
  
  function setMorph(fraction) {
      elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
  
      fraction = 1 - fraction;
      elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
  
      elts.text1.textContent = texts[textIndex];
      elts.text2.textContent = texts[(textIndex + 1) % texts.length];
  }
  
  function doCooldown() {
      morph = 0;
  
      elts.text2.style.filter = "";
      elts.text2.style.opacity = "100%";
  
      elts.text1.style.filter = "";
      elts.text1.style.opacity = "0%";
  }
  
  function animate() {
      if (textIndex >= texts.length) return; // Stop animation if all texts are displayed
  
      requestAnimationFrame(animate);
  
      let newTime = new Date();
      let shouldIncrementIndex = cooldown > 0;
      let dt = (newTime - time) / 1000;
      time = newTime;
  
      cooldown -= dt;
  
      if (cooldown <= 0) {
          if (shouldIncrementIndex) {
              textIndex++;
          }
  
          if (textIndex >= texts.length) return; // Stop if we have used all texts
  
          doMorph();
      } else {
          doCooldown();
      }
  }
  
  animate();
  
}


function PageLoader() {
  const elements = document.querySelectorAll('.loader-column-inner');
  const loader = document.getElementById('loader');
  elements[0].classList.add('is-edge-animate');
  elements[1].classList.add('is-reversed-animate');
  elements[2].classList.add('is-centered-animate');
  elements[3].classList.add('is-reversed-animate');
  elements[4].classList.add('is-edge-animate');
  loader.classList.add('loader-scale');
}

let loadedPercentage = 50;

function updatePercentage() {
  if (loadedPercentage < 100) {
    loadedPercentage += 1;
    displayPercentage();
    setTimeout(updatePercentage,10);
  } else if (loadedPercentage === 100) {
    setTimeout(() => {
      percentageNumber.classList.add('slide-up');
    setTimeout(PageLoader, 500);
      
    }, 550);  
    
  }
  

}

window.addEventListener('load', updatePercentage);