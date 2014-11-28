/*
 * Copyright (c) 2014. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * Morbi non lorem porttitor neque feugiat blandit. Ut vitae ipsum eget quam lacinia accumsan.
 * Etiam sed turpis ac ipsum condimentum fringilla. Maecenas magna.
 * Proin dapibus sapien vel ante. Aliquam erat volutpat. Pellentesque sagittis ligula eget metus.
 * Vestibulum commodo. Ut rhoncus gravida arcu.
 */

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

function apply()
{
    var addins = Array.prototype.slice.call(arguments, 0)
      , basic = addins.shift()
      , add
      ;

    for( var i = 0, ii = addins.length; i < ii; ++ i )
    {
        add = addins[i];
        for( var k in add )
        {
            if ( Object.hasOwnProperty.call( add, k ) )
            {
                basic[k] = add[k];
            }
        }
    }

    return basic;
}

function applyIf()
{
    var addins = Array.prototype.slice.call(arguments, 0)
      , basic = addins.shift()
      , add
      ;

    for( var i = 0, ii = addins.length; i < ii; ++ i )
    {
        add = addins[i];
        for( var k in add )
        {
            if ( !Object.hasOwnProperty.call( basic, k ) && Object.hasOwnProperty.call( add, k ) )
            {
                basic[k] = add[k];
            }
        }
    }

    return basic;
}

function abstact()
{
    throw "Abstract method has to be implemented in subclass";
}

/**
 * @param {Function} [base] class to apply from
 * @param {Object} child definition of class methods and properties
 * @return {Function} the created class
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
      ;

    apply( cp, $super );
    apply( cp, child );

    return cls;
}

module.exports = {
    frandom01: frandom01
  , scalarRandomWalk: scalarRandomWalk
  , interpolate: interpolate
  , map: map
  , nop: nop
  , apply: apply
  , applyIf: applyIf
  , clazz: clazz
  , abstract: abstact
};
