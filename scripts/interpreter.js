import Memory from "./memory.js"

class Interpreter {
    constructor(program, input) {
        this.fps = 10
        this.running = false

        this.memory = new Memory()

        this.program = program || ''
        this.point = 0

        this.input = input || ''

        this.output = ''

        this.setup()
    }

    current() {
        return this.program.charAt(this.point)
    }

    popInput() {
        let firstChar = this.input.charAt(0)
        this.input = this.input.slice(1)
        return firstChar
    }

    runOnce() {
        if (this.point >= this.program.length) {
            this.stop()
            return false
        }

        let c = this.current()

        if (c == '<') {
            this.memory.right()
            this.point += 1
        } else if (c == '>') {
            this.memory.left()
            this.point += 1
        } else if (c == '+') {
            this.memory.increase()
            this.point += 1
        } else if (c == '-') {
            this.memory.decrease()
            this.point += 1
        } else if (c == '.') {
            this.output += this.memory.out()
            this.onOutputChange(this.output)
            this.point += 1
        } else if (c == ',') {
            this.memory.inp(this.popInput())
            this.point += 1
        } else if (c == '[') {
            if (this.memory.current() == 0) {
                let jump = 0
                while (true) {
                    let cur = this.current()
                    if (cur == '[') {
                        jump += 1
                    } else if (cur == ']') {
                        jump -= 1
                    }

                    if (jump == 0) {
                        break
                    }

                    this.point += 1
                }
            }
            this.point += 1
        } else if (c == ']') {
            let jump = 0
            while (true) {
                let cur = this.current()
                if (cur == ']') {
                    jump += 1
                } else if (cur == '[') {
                    jump -= 1
                }

                if (jump == 0) {
                    break
                }

                this.point -= 1
            }
        }

        return true
    }

    run() {
        while (runOnce()) {}
    }

    onOutputChange(o) {
        console.log(o)
    }

    setup() {
        this.draw()
    }

    update() {
        this.runOnce()
    }

    draw() {
        this.memory.draw()

        let ul = document.querySelector(".grid.prog")
        ul.innerHTML = '';
        for (let i = 0; i < this.program.length; i++) {
            let li = document.createElement('li')
            li.textContent = this.program.charAt(i)

            if (i == this.point) {
                li.className = 'current'
            }

            ul.appendChild(li)
        }
    }

    start() {
        if (!this.running) {
            this.running = true
            this.setup()
            this.loop()
        }
    }

    loop() {
        if (!this.running) {
            return
        }

        setTimeout(() => {
            try {
                this.update()
                this.draw()
                this.loop()  // Schedule the next iteration
            } catch (e) {
                console.error(e)
                this.stop()
            }
        }, 1000 / this.fps)
    }

    stop() {
        this.running = false
    }

    // start() {
    //     if (!this.running) {
    //         this.running = true
    //         this.setup()

    //         this.interval = setInterval(() => {
    //             try {
    //                 this.update()
    //                 this.draw()
    //             } catch(e) {
    //                 console.error(e)
    //                 this.stop()
    //             }
    //         }, 1000/this.fps)

    //     }
    // }

    // stop() {
    //     if (this.running) {
    //         this.running = false
    //         if (this.interval) {
    //             clearInterval(this.interval)
    //         }
    //     }
    // }
}

export default Interpreter
