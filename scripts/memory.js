class Memory {
    constructor() {
        this.grids = [0]
        this.index = 0
    }

    current() {
        return this.grids[this.index]
    }

    right() {
        this.index -= 1
    }

    left() {
        this.index += 1
        if (this.index >= this.grids.length) {
            this.grids.push(0)
        }
    }

    increase() {
        this.grids[this.index] += 1
    }

    decrease() {
        this.grids[this.index] -= 1
    }

    out() {
        let o = String.fromCharCode(this.grids[this.index])
        console.log(o)
        return o
    }

    inp(x) {
        this.grids[this.index] = x ? x.charCodeAt(0) : 0
    }


    draw() {
        let ul = document.querySelector(".grid.mem")
        ul.innerHTML = '';

        for (let i = 0; i < this.grids.length; i++) {
            let li = document.createElement('li')
            li.textContent = this.grids[i]

            if (i == this.index) {
                li.className = 'current'
            }

            ul.appendChild(li)
        }
    }
}

export default Memory
