// help and referenced from https://www.youtube.com/watch?v=-gb18FGIN0M and stackoverflow

// reel array
const reelItems = [
  "<img src='img/aven.png'>",
  "<img src='img/furs.png'>",
  "<img src='img/hydes.png'>",
  "<img src='img/psychics.png'>",
  "<img src='img/pyro.png'>",
  "<img src='img/scales.png'>",
  "<img src='img/shapeshifters.png'>",
  "<img src='img/sparks.png'>",
  "<img src='img/stoners.png'>",
  "<img src='img/vanishers.png'>",
  "<img src='img/zombies.png'>"
];

// dom elements. some help from youtube on how to start
const reels = [
  document.getElementById("reel1"),
  document.getElementById("reel2"),
  document.getElementById("reel3")
];
const spinMe = document.getElementById("spinMe");
const stopMe = document.getElementById("stopMe");
const result = document.querySelector(".result");
const creditLeft = document.getElementById("creditLeft");

let intervals = [null, null, null];
let spinning = false;
let credits = 15;

// get a random symbol based on position of array. mathfloor rounds down nearest whole number. mathrandom gives rand number between 0-1 and multiply by reel length to get number between 0-10. returns the reel in the index position so 1 would be furs

function randomReelItem() {
  const index = Math.floor(Math.random() * reelItems.length);
  return reelItems[index];
}

// Update credits on screen
function updateCredits(change) {
  credits += change;
  if (credits < 0) credits = 0;
  creditLeft.textContent = credits;
}

// Start spinning reels
function spinReels() {
  if (spinning || credits <= 0) return;

  spinning = true;
  result.textContent = "Spinning... 🦇";
  updateCredits(-1);

// I looked this up. Loop through 3 reels using for loop and intervals. for i<3 repeats code 3 times
for (let i = 0; i < 3; i++) {
// Save each interval so we can stop it later if needed with clearInterval in stopAll. set interval runs code every few milisecs. 
  intervals[i] = setInterval(function() {
// Change the reel’s content to a random item. updates the reel with a new random item
    reels[i].innerHTML = randomReelItem();
  }, 100 + i * 50);
}

  spinMe.disabled = true;
  stopMe.disabled = false;
}

// also looked this up. stops all reels with use of intervals then checks to see if you win
function stopAll() {
  for (let i = 0; i < 3; i++) {
// loops through 3 times (for reels 0, 1, and 2)
    if (intervals[i]) {
//checks if there is an interval running at this position.
      clearInterval(intervals[i]);
//stops the spinning reel. Each reel is spinning because of setInterval. clearInterval tells it to stop repeating.
      intervals[i] = null;
//erases the saved interval to start fresh in system after stopping
      reels[i].innerHTML = randomReelItem();
//sets my reel’s content one last time with a random item
    }
  }

  spinning = false;
  spinMe.disabled = false;
  stopMe.disabled = true;

  checkWin();
}

// check if i got one a kind two a kind three a kind and update total credits
function checkWin() {
  const results = reels.map(reel => reel.innerHTML);
  const [a, b, c] = results;

  if (a === b && b === c) {
    result.textContent = "👹 Jackpot! +15 credits";
    updateCredits(15);
  } else if (a === b || b === c || a === c) {
    result.textContent = "🕯️ Two of a Kind! +5 credits";
    updateCredits(5);
  } else {
    result.textContent = "💀 No Luck! Sorry Normie!";
  }

  if (credits <= 0) {
    result.textContent = "🧛🏻‍♀️ Out of credits! Reload to try again.";
    spinMe.disabled = true;
    stopMe.disabled = true;
  }
}

// spin and stop button events. Trigger fuctions spinning and stop with click
spinMe.addEventListener("click", spinReels);
stopMe.addEventListener("click", stopAll);
