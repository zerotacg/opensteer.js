var sqrt  = Math.sqrt
  , clazz = require('./utilities').clazz
  ;

var CVector = clazz({
    x: 0
  , y: 0
  , z: 0

  , constructor: function()
    {
        this.set.apply( this, arguments );
    }

  /**
   * @param {CVector|number} x
   * @param {number} [y]
   * @param {number} [z]
   * @return {CVector} this
   */
  , set: function( x, y, z )
    {
        if( x && y && z )
        {
            this.setXYZ( x, y, z );
        }
        else if( x )
        {
            this.setObject( x );
        }

        return this;
    }

  , setXYZ: function( x, y, z )
    {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }

    /**
     * @param {CVector} o
     * @return {CVector} this
     */
  , setObject: function( o )
    {
        if ( o.x !== null ) { this.x = o.x; }
        if ( o.y !== null ) { this.y = o.y; }
        if ( o.z !== null ) { this.z = o.z; }
        return this;
    }

  , setX: function( x )
    {
      this.x  = x;
    }

  , setY: function( y )
    {
      this.y = y;
    }

  , setZ: function( z )
    {
      this.z = z;
    }

  , add: function(v)
    {
      this.x += v.x;
      this.y += v.y;
      this.z += v.z;
      return this;
    }

  , sub: function(v)
    {
      this.x -= v.x;
      this.y -= v.y;
      this.z -= v.z;
      return this;
    }

  , scale: function(f)
    {
      this.x *= f;
      this.y *= f;
      this.z *= f;
      return this;
    }

  , copy: function()
    {
      return new CVector( this.x, this.y, this.z );
    }

  , all: function( f, args, scope )
    {
      args = args || [];
      scope = scope || this;

      this.x = f.apply(scope, [this.x].concat(args));
      this.y = f.apply(scope, [this.y].concat(args));
      this.z = f.apply(scope, [this.z].concat(args));
      return this;
    }

  , dot: function( v )
    {
      return this.x * v.x + this.y * v.y + this.z * v.z;
    }

  , cross: function( a, b )
    {
      this.setX( (a.y * b.z) - (a.z * b.y) );
      this.setY( (a.z * b.x) - (a.x * b.z) );
      this.setZ( (a.x * b.y) - (a.y * b.x) );
      return this;
    }

  , squaredLength: function()
    {
      return this.dot( this );
    }

  , length: function()
    {
      return sqrt( this.squaredLength() );
    }

  , maxLength: function( max )
    {
      var len = this.length();
      if( len > max )
      {
        this.scale( max / len );
      }
      return this;
    }

  , normalize: function()
    {
      var len = this.length();
      if ( len !== 0 )
      {
        this.scale( 1 / len );
      }
      return this;
    }

  , equals: function(v)
    {
      return this.x === v.x && this.y === v.y && this.z === v.z;
    }

  , toArray: function()
    {
      return [ this.x , this.y, this.z ];
    }

  , toString: function()
    {
      return '{ x: '+this.x + ', y: '+this.y + ', z: '+this.z + '}';
    }
});

CVector.ZERO = new CVector( 0, 0, 0 );
CVector.UX   = new CVector( 1, 0, 0 );
CVector.UY   = new CVector( 0, 1, 0 );
CVector.UZ   = new CVector( 0, 0, 1 );

CVector.temp = new CVector();

module.exports = CVector;
