if ( typeof define !== 'function' ) {
    /*jshint latedef:false */
    var define = require( 'amdefine' )( module );
}

define( function ( require ) {
    'use strict';

    return {
        Seek: require( './behavior/Seek' )
    };
});
