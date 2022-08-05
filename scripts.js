const timerContainer = document.querySelector('.timer-container')
const timerHTML = `
    <div>
        <span class="timer-part timer-part-hr">00</span>
        <span class="timer-part">:</span>
        <span class="timer-part timer-part-min">00</span>
        <span class="timer-part">:</span>
        <span class="timer-part timer-part-sec">00</span>
    </div>

    <!-- Play / Pause -->
    <button type="button" class="timer-btn timer-btn-control timer-btn-start">
        <span class="material-symbols-outlined">play_arrow</span>
    </button>

    <!-- Reset -->
    <button type="button" class="timer-btn timer-btn-reset">
        <span class="material-symbols-outlined">timer</span>
    </button>

    <div class="timer-set hidden">
        <input class="hour-set" type="number" placeholder="Hour" value="0">
        <input class="min-set" type="number" placeholder="Minute" value="0">
        <input class="sec-set" type="number" placeholder="Second" value="0">
        <button class="set-time-btn" type="button">Set Timer</button>
    </div>
`
timerContainer.innerHTML = timerHTML;

// Time
let hour = timerContainer.querySelector('.timer-part-hr')
let minutes = timerContainer.querySelector('.timer-part-min')
let seconds = timerContainer.querySelector('.timer-part-sec')
// Timer Btns
let control = timerContainer.querySelector('.timer-btn-control')
let reset = timerContainer.querySelector('.timer-btn-reset')
// Timer Remaining / Intervals
let interval = null;
let remainingSeconds = 0;
// Set Time
const timerSetContainer = document.querySelector('.timer-set')
const timerSetInputs = document.querySelectorAll('.timer-set input')
let hourSet = document.querySelector('.hour-set')
let minSet = document.querySelector('.min-set')
let secSet = document.querySelector('.sec-set')
const setTimeBtn = document.querySelector('.set-time-btn')

/* Event Listen
=================================================================================== */
control.addEventListener('click', e => {
    if(interval === null) {
        start();
    }
    else {
        stop();
    }
})

reset.addEventListener('click', () => {
    timerSetContainer.classList.toggle('hidden')
})

setTimeBtn.addEventListener('click', e => {
    e.preventDefault();
    timerSetContainer.classList.toggle('hidden')

    let hourValue = hourSet.value
    let minValue = minSet.value
    let secValue = secSet.value

    if(isNaN(hourValue)) { hourValue = 0}
    if(isNaN(minValue)) { minValue = 0}
    if(isNaN(secValue)) { secValue = 0}

    remainingSeconds = (parseInt(hourValue * 3600) + parseInt(minValue * 60) + parseInt(secValue));
    updateInterfaceTime();
})

/* Loop
=================================================================================== */
timerSetInputs.forEach(e => {
    e.addEventListener('input', () => {
        if(e.value < 0 || e.value === '') {
            e.value = 0;
        }
    })
})

/* Functions
=================================================================================== */
// Changes the text content of the min and sec to the remainingSeconds
function updateInterfaceTime() {
    let hr = Math.floor(remainingSeconds/3600);
    let min = Math.floor(remainingSeconds/60);
    let sec = remainingSeconds % 60;

    if(isNaN(hr)) { hr = 0}
    if(isNaN(min)) { min = 0}
    if(isNaN(sec)) { sec = 0}

    if (min >= 60) {
        min %= 60;
    }

    console.log(hr, min, sec)

    // padStart fills the empty with 0 so that the timer could be 01:00 instead of 1:00
    hour.textContent = hr.toString().padStart(2, '0')
    minutes.textContent = min.toString().padStart(2, '0')
    seconds.textContent = sec.toString().padStart(2, '0')
}

// Updates the Play/Pause btn depending on the interval, if it is running or not
function updateInterfaceControls() {
    // Update into the play btn
    if (interval === null) {
        control.innerHTML = `<span class="material-symbols-outlined">play_arrow</span>`;
        control.classList.add('timer-btn-start');
        control.classList.remove('timer-btn-stop');
    }
    // Update into the stop btn
    else {
        control.innerHTML = `<span class="material-symbols-outlined">pause</span>`;
        control.classList.add('timer-btn-stop');
        control.classList.remove('timer-btn-start');
    }
}

// Start the countdown
function start() {
    // Dose nothing when there are no remaining Seconds
    if (remainingSeconds === 0) return;

    // count 1 sec every sec until 0
    interval = setInterval(() => {
        remainingSeconds--;
        // Updates the timer number
        updateInterfaceTime();

        if(remainingSeconds === 0) {
            stop();
        }
    }, 1000)

    // Updates the Play/Stop btn
    updateInterfaceControls();
}

// Stop the countdown
function stop() {
    // Clears the interval
    clearInterval(interval)

    // Sets the interval to null for conditions
    interval = null;

    // Updates the Play/Stop btn
    updateInterfaceControls();
}