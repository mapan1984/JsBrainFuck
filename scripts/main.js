import Interpreter from "./interpreter.js"

const load = document.getElementById('load')
const run = document.getElementById('run')
const code = document.getElementById('code')
const input = document.getElementById('input')
const output = document.getElementById('output')


let interpreter = new Interpreter()

run.disabled = true

load.addEventListener('click', (event) => {
    if (interpreter.running) {
        alert("运行中");
        return
    }

    // const codeValue = code.value.replace(/\s+/g, '')
    const codeValue = code.value.replace(/[^<>\[\],.\+\-]/g, '')
    const inputValue = input.value

    if (codeValue.length <= 0) {
        alert("请先输入代码");
        return
    }

    interpreter = new Interpreter(codeValue, inputValue)
    interpreter.onOutputChange = (o) => {
        output.value = o
    }

    load.innerText = 'Reload'
    run.disabled = false
    run.innerText = 'Run'
    output.value = ''
})

run.addEventListener('click', (event) => {
    if (!interpreter.running && run.innerText == 'Run') {
        // 开始运行
        interpreter.start()
        run.innerText = 'Pause';
        // load.style.display = 'none';
        load.disabled = true
    } else if (/*interpreter.running &&*/ run.innerText == 'Pause'){
        // 暂停
        interpreter.stop()
        run.innerText = 'Run';
        // load.style.display = 'block';
        load.disabled = false
    }
})

const examples = document.querySelector('#examples')
examples.addEventListener('click', (event) => {
    let target = event.target
    if (target.nodeName == 'A') {
        let program = target.dataset.program
        let inputValue = target.dataset.input
        code.value = program
        input.value = inputValue
        output.value = ''
    }
})


const fpsControl = document.getElementById('fps');
const fpsValue = document.getElementById('fps-value');

fpsControl.addEventListener('input', function() {
    fpsValue.textContent = this.value;
    interpreter.fps = this.value
});
