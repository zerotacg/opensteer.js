let sqrt = Math.sqrt;
export default class Vector {
  var x = 0
    , y = 0
    , z = 0
    ;

    function constructor()
    {
      arguments.length && this.set.apply( this, arguments );
    }

    function set( v )
    {
      if( v instanceof Object )
      {
        this.setObject( v );
      }
      else
      {
        this.setXYZ.apply( this, arguments );
      }

      return this;
    }

    function setXYZ( x, y, z )
    {
      this.x  = x;
      this.y  = y;
      this.z  = z;
      return this;
    }

    function setObject( o )
    {
      if ( o.x != null ) { this.x = o.x; };
      if ( o.y != null ) { this.x = o.y; };
      if ( o.z != null ) { this.x = o.z; };
      return this;
    }

    function setX( x )
    {
      this.x  = x;
    }

    function setY( y )
    {
      this.y = y;
    }

    function setZ( z )
    {
      this.z = z;
    }

    function add(v)
    {
      this.x += v.x;
      this.y += v.y;
      this.z += v.z;
      return this;
    }

    function sub(v)
    {
      this.x -= v.x;
      this.y -= v.y;
      this.z -= v.z;
      return this;
    }

    function scale(f)
    {
      this.x *= f;
      this.y *= f;
      this.z *= f;
      return this;
    }

    function copy()
    {
      return new Vector( this.x, this.y, this.z );
    }

    function all( f, args, scope )
    {
      args = args || [];
      scope = scope || this;

      this.x = f.apply(scope, [this.x].concat(args));
      this.y = f.apply(scope, [this.y].concat(args));
      this.z = f.apply(scope, [this.z].concat(args));
      return this;
    }

    function dot( v )
    {
      return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    function cross( a, b )
    {
      this.set( (a.y * b.z) - (a.z * b.y)
          ,(a.z * b.x) - (a.x * b.z)
          ,(a.x * b.y) - (a.y * b.x));
      return this;
    }

    function squaredLength()
    {
      return this.dot( this );
    }

    function length()
    {
      return sqrt( this.squaredLength() );
    }

    function maxLength( max )
    {
      var len = this.length();
      if( len > max )
      {
        this.scale( max / len );
      }
      return this;
    }

    function normalize()
    {
      var len = this.length();
      if ( len !== 0 )
      {
        this.scale( 1 / len );
      }
      return this;
    }

    function equals(v)
    {
      return this.x == v.x && this.y == v.y && this.z == v.z;
    }

    function toArray()
    {
      return [ this.x , this.y, this.z ];
    }

    function toString()
    {
      return '{ x: '+this.x + ', y: '+this.y + ', z: '+this.z + '}';
    }
}
Vector.ZERO = new Vector( 0, 0, 0 );
Vector.UX   = new Vector( 1, 0, 0 );
Vector.UY   = new Vector( 0, 1, 0 );
Vector.UZ   = new Vector( 0, 0, 1 );

Vector.temp = new Vector();
