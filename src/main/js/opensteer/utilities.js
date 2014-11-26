var frandom01 = Math.random;

/**
 * @param {Number} initial
 * @param {Number} walkspeed
 * @param {Number} min
 * @param {Number} max
 */
function scalarRandomWalk( initial, walkspeed, min, max)
{
    var next = initial + (((frandom01() * 2) - 1) * walkspeed);
    if (next < min) { return min; }
    if (next > max) { return max; }
    return next;
}

/**
 * @param {number} alpha
 * @param {number} x0
 * @param {number} x1
 * @returns {number}
 */
function interpolate( alpha, x0, x1 )
{
    return x0 + (( x1 - x0 ) * alpha);
}

/**
 * @param {number} x
 * @param {number} in0
 * @param {number} in1
 * @param {number} out0
 * @param {number} out1
 * @returns {number}
 */
function map( x, in0, in1, out0, out1 )
{
    var relative = (x - in0) / (in1 - in0);

    return interpolate( relative, out0, out1 );
}

function nop(){}

/**
 * @param
 * @return {Function}
 */
function clazz( base, child )
{
    if( !child )
    {
        child = base;
        base = nop;
    }

    if ( !Object.hasOwnProperty.call(child, "constructor" ) )
    {
        child.constructor = function()
        {
            base.apply(this, arguments);
        };
    }

    var cls = child.constructor
      , $super = base.prototype
      , cp = cls.prototype = Object.create( $super )
      , key
      ;

    for( key in $super )
    {
        if( $super.hasOwnProperty( key ) )
        {
            cp[key] = $super[key];
        }
    }

    for( key in child )
    {
        if( child.hasOwnProperty( key ) )
        {
            cp[key] = child[key];
        }
    }

    return cls;
}

module.exports = {
    frandom01: frandom01
  , scalarRandomWalk: scalarRandomWalk
  , interpolate: interpolate
  , map: map
  , nop: nop
  , clazz: clazz
};
