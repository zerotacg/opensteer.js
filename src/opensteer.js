if ( typeof define !== 'function' ) {
    /*jshint latedef:false */
    var define = require( 'amdefine' )( module );
}

define( function ( require ) {
    'use strict';

    function awesome() {
        return 'awesome';
    }

    return {
        awesome: awesome
      , behavior: require( './opensteer/behavior' )
    };

} );
