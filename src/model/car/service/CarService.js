const five = require('johnny-five')

class CarService {
    constructor(opts) {
        this.car = new five.Board()
        this.speed = 0
        this.turnMoment = 0
        this.direction = undefined
        this.turn = undefined

        this.init.bind(this)
        this.start.bind(this)
        this.stop.bind(this)
        this.backward.bind(this)
        this.turnRight.bind(this)
        this.turnLeft.bind(this)
        this.cancelTurning.bind(this)
    }

    async init() {
        const context = this

        this.car.on("ready", function() {
            context.right = new five.Motor({pins: {pwm: 9, dir: 8}, invertPWM: true })
            context.left = new five.Motor({pins: {pwm: 6, dir: 7}, invertPWM: true })
            console.log('Car: Init')
        })
    }

    /**
     * 
     * @param {number} speed - [0 - 255]
     */
    async start(speed) {        
        if(speed > 0) {
            console.log('Car: Run forward')
            if(this.speed > 0 && this.speed !== speed && this.direction) { this.stop() }

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
        console.log('Car: Stop')
    }

    /**
     * 
     * @param {number} speed - [0 - 255]
     */
    async backward(speed) {
        if(speed > 0) {
            console.log('Car: Run backward')
            if(this.speed > 0 && this.speed !== speed && this.direction) { this.stop() }

            this.right.reverse(speed)
            this.left.reverse(speed)
            this.speed = speed
            this.direction = 'backward'
        }
    }

    /**
     * 
     * @param {number} moment - [0 - 50]
     */
    async turnRight(moment) {
        if(this.speed > 0 && moment > 0) {
            console.log('Car: Turn right')
            if(this.turnMoment > 0 && this.turnMoment !== moment && this.turn) { 
                this.cancelTurning()
                this.stop()
            }

            this.right.start(Math.abs(this.speed / moment) + 5)
            this.left.start(moment)
            this.turn = 'right'
        }
    }

    /**
     * 
     * @param {number} moment - [0 - 50]
     */
    async turnLeft(moment) {
        if(this.speed > 0 && moment > 0) {
            console.log('Car: Turn left')
            if(this.turnMoment > 0 && this.turnMoment !== moment && this.turn) { 
                this.cancelTurning()
                this.stop()
            }

            this.turnMoment = moment
            this.left.start(Math.abs(this.speed / moment) + 5)
            this.right.start(moment)
            this.turn = 'left'
        }
    }

    async cancelTurning() {
        this.turn = undefined
        this.turnMoment = 0
        console.log('Car: Cancel turning')

        if(this.direction === 'forward') {
            this.start(this.speed)
        } else if (this.direction === 'backward') {
            this.backward(this.speed)
        }
    }
}

module.exports = CarService