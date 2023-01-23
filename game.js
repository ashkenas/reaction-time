window.addEventListener('load', () => document.body.focus());

const State = {
    Prompt: Symbol('prompt'),
    Wait: Symbol('wait'),
    Action: Symbol('action')
};

let current = State.Prompt;
let timeout = null;
let start = 0;

const background = document.getElementsByTagName('div')[0];

const onDown = (e) => {
    if (current === State.Prompt) {
        e.preventDefault();
        current = State.Wait;
        background.className = 'wait';
        background.innerHTML = 'Wait';
        timeout = setTimeout(() => {
            current = State.Action;
            background.className = 'action';
            background.innerHTML = 'Release!';
            start = Date.now();
        }, (Math.random() * 3000) + 3000);
    }
};

const onUp = (e) => {
    if (current === State.Action) {
        current = State.Prompt;
        const time = (Date.now() - start) / 1000;
        background.className = 'score';
        background.innerHTML = `${time}s<p>Click to try again.</p>`;
    } else if (current === State.Wait) {
        current = State.Prompt;
        clearTimeout(timeout);
        background.className = 'early';
        background.innerHTML = 'Too early.<p>Click to try again.</p>';
    }
};

window.addEventListener('keydown', onDown);
window.addEventListener('keyup', onUp);
window.addEventListener('mousedown', onDown)
window.addEventListener('mouseup', onUp)
window.addEventListener('touchstart', onDown);
window.addEventListener('touchend', onUp);