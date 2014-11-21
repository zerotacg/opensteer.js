export var frandom01 = Math.random;

/**
 * @param {Number} initial
 * @param {Number} walkspeed
 * @param {Number} min
 * @param {Number} max
 */
export function scalarRandomWalk( initial, walkspeed, min, max)
{
    var next = initial + (((frandom01() * 2) - 1) * walkspeed);
    if (next < min) return min;
    if (next > max) return max;
    return next;
}

export function interpolate( alpha, x0, x1 )
{
    return x0 + (( x1 - x0 ) * alpha);
}

export function map( x, in0, in1, out0, out1 )
{
    var relative = (x - in0) / (in1 - in0);

    return interpolate( relative, out0, out1 );
}
