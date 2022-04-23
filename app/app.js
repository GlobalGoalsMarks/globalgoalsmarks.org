// this should be a json file
const targets = [
    {
        "goal": "End poverty in all its forms everywhere",
        "color": "D13A43",
        "targets": [
            {
                "description": "Eradicate extreme poverty",
                "media_file": "MC_Target_1.1.png"
            },
            {
                "description": "Reduce poverty by at least 50%",
                "media_file": "MC_Target_1.2.png"
            }
        ]
    },
    {
        "goal": "End hunger, achieve food security and improved nutrition, and promote sustainable agriculture",
        "color": "D5A84F",
        "targets": [
            {
                "description": "Universal access to safe and nutritious food",
                "media_file": "MC_Target_2.1.png"
            },
            {
                "description": "End all forms of malnutrition",
                "media_file": "MC_Target_2.2.png"
            }
        ]
    }
];

function finish() {
    document.querySelector('h1').innerText = 'You did it!';
    document.querySelector('body').style.background = '#D13A43';
    document.querySelector('#question').remove();
    const parser = new DOMParser();
    var svg = parser.parseFromString(imageTemplate, 'image/svg+xml');
    console.log(svg);
    svg.querySelector('#targetp11p1').style.fill = '#407534';
    svg.querySelector('#targetp11p2').style.fill = '#F9B00B';
    svg.querySelector('#targetp11p3').style.fill = '#EB1A2D';
    svg.querySelector('#targetp11p4').style.fill = '#41B43C';
    const newImage = window.URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(svg.documentElement)], { type: 'image/svg' }));
    let downloadA = document.createElement('a');
    downloadA.href = newImage;
    downloadA.download = 'global-goals-marks.svg';
    downloadA.innerText = 'Download';
    document.querySelector('main').appendChild(downloadA);
}

// state

let goal = 0;
let target = 0;

function nextTarget() {
    for (const button of document.querySelectorAll('input')) {
        button.checked = false;
    }

    target += 1;
    if (!targets[goal].targets[target]) {
        target = 0;
        goal += 1;
    }

    if (!targets[goal]) {
        finish();
        return;
    }

    document.querySelector('h1').innerText = targets[goal].goal;
    document.querySelector('img').src = '/images/' + targets[goal].targets[target].media_file;
    document.querySelector('body').style.background = '#' + targets[goal].color;
    document.querySelector('img').alt = targets[goal].targets[target].description;
}

document.querySelector('form').addEventListener('change', () => {
    nextTarget();
});

document.querySelector('h1').innerText = targets[goal].goal;
document.querySelector('body').style.background = '#' + targets[goal].color;
document.querySelector('img').src = '/images/' + targets[goal].targets[target].media_file;
document.querySelector('img').alt = targets[goal].targets[target].description;

// https://keycode.info
document.addEventListener('keydown', (event) => {
    // The parameter event is of the type KeyboardEvent
    if (event.keyCode === 49) { // 1
        document.querySelector('#a').checked = true;
    } else if (event.keyCode === 50) { // 2
        document.querySelector('#b').checked = true;
    } else if (event.keyCode === 51) { // 3
        document.querySelector('#c').checked = true;
    } else if (event.keyCode === 52) { // 4
        document.querySelector('#d').checked = true;
    } else if (event.keyCode === 53) { // 5
        document.querySelector('#e').checked = true;
    }
    nextTarget();
});
