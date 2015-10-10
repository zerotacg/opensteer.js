var sqrt = Math.sqrt;

export default class Vector {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.set.apply(this, arguments);
    }

    /**
     * @param {Vector|number} x
     * @param {number} [y]
     * @param {number} [z]
     * @return {Vector} this
     */
    set( x, y, z ) {
        if ( x && y && z ) {
            this.setXYZ(x, y, z);
        }
        else if ( x ) {
            this.setObject(x);
        }

        return this;
    }

    setXYZ( x, y, z ) {
        this.x = x;
        this.y = y;
        this.z = z;

        return this;
    }

    setObject( o ) {
        if ( o.x !== null ) {
            this.x = o.x;
        }
        if ( o.y !== null ) {
            this.y = o.y;
        }
        if ( o.z !== null ) {
            this.z = o.z;
        }

        return this;
    }

    setX( x ) {
        this.x = x;
    }

    setY( y ) {
        this.y = y;
    }

    setZ( z ) {
        this.z = z;
    }

    add( v ) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;

        return this;
    }

    sub( v ) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
    }

    scale( f ) {
        this.x *= f;
        this.y *= f;
        this.z *= f;

        return this;
    }

    copy() {
        return new Vector(this.x, this.y, this.z);
    }

    all( f, args, scope ) {
        args = args || [];
        scope = scope || this;

        this.x = f.apply(scope, [ this.x ].concat(args));
        this.y = f.apply(scope, [ this.y ].concat(args));
        this.z = f.apply(scope, [ this.z ].concat(args));

        return this;
    }

    dot( v ) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    cross( a, b ) {
        this.setX((a.y * b.z) - (a.z * b.y));
        this.setY((a.z * b.x) - (a.x * b.z));
        this.setZ((a.x * b.y) - (a.y * b.x));

        return this;
    }

    squaredLength() {
        return this.dot(this);
    }

    length() {
        return sqrt(this.squaredLength());
    }

    maxLength( max ) {
        var len = this.length();
        if ( len > max ) {
            this.scale(max / len);
        }

        return this;
    }

    normalize() {
        var len = this.length();
        if ( len !== 0 ) {
            this.scale(1 / len);
        }

        return this;
    }

    equals( v ) {
        return this.x === v.x && this.y === v.y && this.z === v.z;
    }

    toArray() {
        return [ this.x, this.y, this.z ];
    }

    toString() {
        return '{ x: ' + this.x + ', y: ' + this.y + ', z: ' + this.z + '}';
    }
};

export var ZERO = new Vector(0, 0, 0);
export var UX = new Vector(1, 0, 0);
export var UY = new Vector(0, 1, 0);
export var UZ = new Vector(0, 0, 1);
