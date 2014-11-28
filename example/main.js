requirejs.config({
    paths: {
        opensteer: '../src/opensteer'
    }
});

define( function ( require ) {
    'use strict';
    require( 'opensteer' );
});
