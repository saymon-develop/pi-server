class CarService {
    constructor(opts) {
        this.right = opts.right
        this.left = opts.left

        this.stop.bind(this)
        this.forward.bind(this)
        this.backward.bind(this)
        this.turnRight.bind(this)
        this.turnLeft.bind(this)
    }

    async stop() {
        this.right.stop(0)
        this.left.stop(0)
        console.log('Car: Stop')
    }

    /**
     * Go forward
     */
     async forward(speed = 255) {        
        console.log('Car: Run forward', speed)
        this.right.stop(0)
        this.left.stop(0)

        this.right.fwd(speed)
        this.left.fwd(speed)
    }

    /**
     * Go back
     */
    async backward(speed = 255) {
        console.log('Car: Run backward', speed)
        this.right.stop(0)
        this.left.stop(0)

        this.right.rev(speed)
        this.left.rev(speed)
    }

    /**
    * Turn car right
     */
    async turnRight() {
        console.log('Car: Turn right')
        this.right.stop(0)
        this.left.stop(0)

        this.right.rev(255)
        this.left.fwd(255)
    }

    /**
     * Turn car left
     */
    async turnLeft() {
        console.log('Car: Turn left')
        this.right.stop(0)
        this.left.stop(0)

        this.left.rev(255)
        this.right.fwd(255)
    }
}

module.exports = CarService