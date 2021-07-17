const five = require('johnny-five')

class CarService {
    constructor(opts) {
        this.car = new five.Board()
        this.speed = 0
        this.direction = undefined

        bind(this)
    }

    async init() {
        this.car.on("ready", function() {
            this.right = new five.Motor({pins: {pwm: 9, dir: 8}, invertPWM });
            this.left = new five.Motor({pins: {pwm: 6, dir: 7}, invertPWM });

            this.car.repl.inject({ 
                right: this.right, 
                left: this.left 
            });
        })
    }

    /**
     * 
     * @param {number} speed - [0 - 255]
     */
    async start(speed) {
        if(speed === 0) {this.stop()}
        if(speed > 0) {
            this.right.start(speed)
            this.left.start(speed)
            this.speed = speed
            this.direction = 'forward'
        }
    }

    async stop() {
        this.right.stop()
        this.left.stop()
        this.speed = 0
        this.direction = undefined
    }

    /**
     * 
     * @param {number} speed - [0 - 255]
     */
    async backward(speed) {
        this.stop()
        if(speed > 0) {
            this.right.reverse(speed)
            this.left.reverse(speed)
            this.speed = 0
            this.direction = 'backward'
        }
    }

    /**
     * 
     * @param {number} moment - [0 - 50]
     */
    async turnRight(moment) {
        if(this.speed > 0 && moment > 0) {
            this.right.start(Math.abs(this.speed / moment) + 5)
            this.left.start(moment)
            this.direction = 'right'
        }
    }

    /**
     * 
     * @param {number} moment - [0 - 50]
     */
    async turnLeft(moment) {
        if(this.speed > 0 && moment > 0) {
            this.left.start(Math.abs(this.speed / moment) + 5)
            this.right.start(moment)
            this.direction = 'left'
        }
    }

    async cancelTurning() {
        this.start(this.speed)
    }
}

module.exports = CarService