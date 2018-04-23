'use strict';

$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

$(function () {
    $('#modal').modal('toggle');
});

$('#modal').modal('hide');



//==-------------------------       dots





window.requestAnimFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000 / 60)
    };

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


///--------------======================    VECTOR IS the brains for this opperation

class Vector {
    constructor (x, y) {
        this.x = isNaN(x) ? 0 : x;
        this.y = isNaN(y) ? 0 : y;
    };

    add (v) {
        this.x += isNaN(v) ? v.x : v;
        this.y += isNaN(v) ? v.y : v;
        return this
    };

    sub (v) {
        this.x -= isNaN(v) ? v.x : v;
        this.y -= isNaN(v) ? v.y : v;
        return this
    };

    mul (v) {
        this.x *= isNaN(v) ? v.x : v;
        this.y *= isNaN(v) ? v.y : v;
        return this
    };

    div (v) {
        this.x /= isNaN(v) ? v.x : v;
        this.y /= isNaN(v) ? v.y : v;
        return this
    };

    clone () {
        return new Vector(this.x, this.y)
    }

    dist (v) {
        var dx = this.x - v.x;
        var dy = this.y - v.y;
        return Math.sqrt(dx * dx + dy * dy)
    }

    clamp (min, max) {
        this.x = Math.min(Math.max(this.x, min), max);
        this.y = Math.min(Math.max(this.y, min), max);
        return this
    }

    normalise () {
        let mag = Math.sqrt(this.x * this.x + this.y * this.y);
        this.x = mag === 0 ? 0 : this.x / mag;
        this.y = mag === 0 ? 0 : this.y / mag;
        return this
    }
}

//-------------===============   HOW THE  LIL GUYS MOVE
class Creature {
    constructor (x, y, tx, ty) {
        this.position = new Vector(x, y);
        this.velocity = new Vector();
        this.steering = new Vector();
        this.target = new Vector(tx, ty);

        this.size = 5;

        this.maxVelocity = 2000;
        this.maxSteer = 2.9;
        this.maxSpeed = 20.5;
    }

    update () {
        let vel = this.target.clone().sub(this.position).normalise().mul(this.maxVelocity)
        this.steering = vel.sub(this.velocity).clamp(-this.maxSteer, this.maxSteer)
        this.velocity.add(this.steering).clamp(-this.maxSpeed, this.maxSpeed)
        this.position.add(this.velocity)

        if (Math.abs(this.position.dist(this.target)) < 10) {
            this.target.x = Math.random() * canvas.width
            this.target.y = Math.random() * canvas.height
        }
    }

    render (ctx) {
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = '#36c6ba'
        ctx.fill()

        ctx.beginPath()
        ctx.arc(this.target.x, this.target.y, this.size / 2, 0, Math.PI * 2)
        ctx.fillStyle = '#f0f'
        ctx.fill()
        //
        // ctx.beginPath()
        // ctx.arc(this.target.x, this.target.y, this.size / 2, 0, Math.PI * 2)
        // ctx.fillStyle = '#342cff'
        // ctx.fill('background-color', 'black')
    }
}

var creatures = [];

for (let i = 0; i < 20; i++) {
    creatures.push(
        new Creature(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            Math.random() * canvas.width,
            Math.random() * canvas.height
        )
    )
};

(function loop (timestamp) {
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    creatures.forEach((creature) => {
        creature.update()
    creature.render(ctx)
});

    window.requestAnimFrame(loop);
    return timestamp
})(0)
