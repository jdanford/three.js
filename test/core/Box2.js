/**
 * @author bhouston / http://exocortex.com
 */

module( "Box2" );

test( "constructor", function() {
	var a = new THREE.Box2();
	ok( a.min.equals( posInf2 ), "Passed!" );
	ok( a.max.equals( negInf2 ), "Passed!" );

	a = new THREE.Box2( zero2 );
	ok( a.min.equals( zero2 ), "Passed!" );
	ok( a.max.equals( zero2 ), "Passed!" );

	a = new THREE.Box2( zero2, one2 );
	ok( a.min.equals( zero2 ), "Passed!" );
	ok( a.max.equals( one2 ), "Passed!" );
});

test( "copy", function() {
	var a = new THREE.Box2( zero2, one2 );
	var b = new THREE.Box2().copy( a );
	ok( b.min.equals( zero2 ), "Passed!" );
	ok( b.max.equals( one2 ), "Passed!" );

	// ensure that it is a true copy
	a.min = zero2;
	a.max = one2;
	ok( b.min.equals( zero2 ), "Passed!" );
	ok( b.max.equals( one2 ), "Passed!" );
});

test( "set", function() {
	var a = new THREE.Box2();

	a.set( zero2, one2 )
	ok( a.min.equals( zero2 ), "Passed!" );
	ok( a.max.equals( one2 ), "Passed!" );
});

test( "empty/makeEmpty", function() {
	var a = new THREE.Box2();

	ok( a.empty(), "Passed!" );

	var a = new THREE.Box2( zero2, one2 );
	ok( ! a.empty(), "Passed!" );

	a.makeEmpty();
	ok( a.empty(), "Passed!" );
});

test( "center", function() {
	var a = new THREE.Box2( zero2 );

	ok( a.center().equals( zero2 ), "Passed!" );

	a = new THREE.Box2( zero2, one2 );
	var midpoint = one2.clone().multiplyScalar( 0.5 );
	ok( a.center().equals( midpoint ), "Passed!" );
});

test( "size", function() {
	var a = new THREE.Box2( zero2 );

	ok( a.size().equals( zero2 ), "Passed!" );

	a = new THREE.Box2( zero2, one2 );
	ok( a.size().equals( one2 ), "Passed!" );
});

test( "expandByPoint", function() {
	var a = new THREE.Box2( zero2 );

	a.expandByPoint( zero2 );
	ok( a.size().equals( zero2 ), "Passed!" );

	a.expandByPoint( one2 );
	ok( a.size().equals( one2 ), "Passed!" );

	a.expandByPoint( one2.clone().negate() );
	ok( a.size().equals( one2.clone().multiplyScalar( 2 ) ), "Passed!" );
	ok( a.center().equals( zero2 ), "Passed!" );
});

test( "expandByVector", function() {
	var a = new THREE.Box2( zero2 );

	a.expandByVector( zero2 );
	ok( a.size().equals( zero2 ), "Passed!" );

	a.expandByVector( one2 );
	ok( a.size().equals( one2.clone().multiplyScalar( 2 ) ), "Passed!" );
	ok( a.center().equals( zero2 ), "Passed!" );
});

test( "expandByScalar", function() {
	var a = new THREE.Box2( zero2 );

	a.expandByScalar( 0 );
	ok( a.size().equals( zero2 ), "Passed!" );

	a.expandByScalar( 1 );
	ok( a.size().equals( one2.clone().multiplyScalar( 2 ) ), "Passed!" );
	ok( a.center().equals( zero2 ), "Passed!" );
});

test( "containsPoint", function() {
	var a = new THREE.Box2( zero2 );

	ok( a.containsPoint( zero2 ), "Passed!" );
	ok( ! a.containsPoint( one2 ), "Passed!" );

	a.expandByScalar( 1 );
	ok( a.containsPoint( zero2 ), "Passed!" );
	ok( a.containsPoint( one2 ), "Passed!" );
	ok( a.containsPoint( one2.clone().negate() ), "Passed!" );
});

test( "containsBox", function() {
	var a = new THREE.Box2( zero2 );
	var b = new THREE.Box2( zero2, one2 );
	var c = new THREE.Box2( one2.clone().negate(), one2 );

	ok( a.containsBox( a ), "Passed!" );
	ok( ! a.containsBox( b ), "Passed!" );
	ok( ! a.containsBox( c ), "Passed!" );

	ok( b.containsBox( a ), "Passed!" );
	ok( c.containsBox( a ), "Passed!" );
	ok( ! b.containsBox( c ), "Passed!" );
});

test( "getParameter", function() {
	var a = new THREE.Box2( zero2, one2 );
	var b = new THREE.Box2( one2.clone().negate(), one2 );

	ok( a.getParameter( new THREE.Vector2( 0, 0 ) ).equals( new THREE.Vector2( 0, 0 ) ), "Passed!" );
	ok( a.getParameter( new THREE.Vector2( 1, 1 ) ).equals( new THREE.Vector2( 1, 1 ) ), "Passed!" );

	ok( b.getParameter( new THREE.Vector2( -1, -1 ) ).equals( new THREE.Vector2( 0, 0 ) ), "Passed!" );
	ok( b.getParameter( new THREE.Vector2( 0, 0 ) ).equals( new THREE.Vector2( 0.5, 0.5 ) ), "Passed!" );
	ok( b.getParameter( new THREE.Vector2( 1, 1 ) ).equals( new THREE.Vector2( 1, 1 ) ), "Passed!" );
});

test( "clampPoint", function() {
	var a = new THREE.Box2( zero2, zero2 );
	var b = new THREE.Box2( one2.clone().negate(), one2 );

	ok( a.clampPoint( new THREE.Vector2( 0, 0 ) ).equals( new THREE.Vector2( 0, 0 ) ), "Passed!" );
	ok( a.clampPoint( new THREE.Vector2( 1, 1 ) ).equals( new THREE.Vector2( 0, 0 ) ), "Passed!" );
	ok( a.clampPoint( new THREE.Vector2( -1, -1 ) ).equals( new THREE.Vector2( 0, 0 ) ), "Passed!" );

	ok( b.clampPoint( new THREE.Vector2( 2, 2 ) ).equals( new THREE.Vector2( 1, 1 ) ), "Passed!" );
	ok( b.clampPoint( new THREE.Vector2( 1, 1 ) ).equals( new THREE.Vector2( 1, 1 ) ), "Passed!" );
	ok( b.clampPoint( new THREE.Vector2( 0, 0 ) ).equals( new THREE.Vector2( 0, 0 ) ), "Passed!" );
	ok( b.clampPoint( new THREE.Vector2( -1, -1 ) ).equals( new THREE.Vector2( -1, -1 ) ), "Passed!" );
	ok( b.clampPoint( new THREE.Vector2( -2, -2 ) ).equals( new THREE.Vector2( -1, -1 ) ), "Passed!" );
});

test( "distanceToPoint", function() {
	var a = new THREE.Box2( zero2, zero2 );
	var b = new THREE.Box2( one2.clone().negate(), one2 );

	ok( a.distanceToPoint( new THREE.Vector2( 0, 0 ) ) == 0, "Passed!" );
	ok( a.distanceToPoint( new THREE.Vector2( 1, 1 ) ) == Math.sqrt( 2 ), "Passed!" );
	ok( a.distanceToPoint( new THREE.Vector2( -1, -1 ) ) == Math.sqrt( 2 ), "Passed!" );

	ok( b.distanceToPoint( new THREE.Vector2( 2, 2 ) ) == Math.sqrt( 2 ), "Passed!" );
	ok( b.distanceToPoint( new THREE.Vector2( 1, 1 ) ) == 0, "Passed!" );
	ok( b.distanceToPoint( new THREE.Vector2( 0, 0 ) ) == 0, "Passed!" );
	ok( b.distanceToPoint( new THREE.Vector2( -1, -1 ) ) == 0, "Passed!" );
	ok( b.distanceToPoint( new THREE.Vector2( -2, -2 ) ) == Math.sqrt( 2 ), "Passed!" );
});

test( "distanceToPoint", function() {
	var a = new THREE.Box2( zero2, zero2 );
	var b = new THREE.Box2( one2.clone().negate(), one2 );

	ok( a.distanceToPoint( new THREE.Vector2( 0, 0 ) ) == 0, "Passed!" );
	ok( a.distanceToPoint( new THREE.Vector2( 1, 1 ) ) == Math.sqrt( 2 ), "Passed!" );
	ok( a.distanceToPoint( new THREE.Vector2( -1, -1 ) ) == Math.sqrt( 2 ), "Passed!" );

	ok( b.distanceToPoint( new THREE.Vector2( 2, 2 ) ) == Math.sqrt( 2 ), "Passed!" );
	ok( b.distanceToPoint( new THREE.Vector2( 1, 1 ) ) == 0, "Passed!" );
	ok( b.distanceToPoint( new THREE.Vector2( 0, 0 ) ) == 0, "Passed!" );
	ok( b.distanceToPoint( new THREE.Vector2( -1, -1 ) ) == 0, "Passed!" );
	ok( b.distanceToPoint( new THREE.Vector2( -2, -2 ) ) == Math.sqrt( 2 ), "Passed!" );
});

test( "isIntersection", function() {
	var a = new THREE.Box2( zero2 );
	var b = new THREE.Box2( zero2, one2 );
	var c = new THREE.Box2( one2.clone().negate(), one2 );

	ok( a.isIntersection( a ), "Passed!" );
	ok( a.isIntersection( b ), "Passed!" );
	ok( a.isIntersection( c ), "Passed!" );

	ok( b.isIntersection( a ), "Passed!" );
	ok( c.isIntersection( a ), "Passed!" );
	ok( b.isIntersection( c ), "Passed!" );

	b.translate( new THREE.Vector2( 2, 2 ) );
	ok( ! a.isIntersection( b ), "Passed!" );
	ok( ! b.isIntersection( a ), "Passed!" );
	ok( ! b.isIntersection( c ), "Passed!" );
});

test( "intersect", function() {
	var a = new THREE.Box2( zero2 );
	var b = new THREE.Box2( zero2, one2 );
	var c = new THREE.Box2( one2.clone().negate(), one2 );

	ok( a.clone().intersect( a ).equals( a ), "Passed!" );
	ok( a.clone().intersect( b ).equals( a ), "Passed!" );
	ok( b.clone().intersect( b ).equals( b ), "Passed!" );
	ok( a.clone().intersect( c ).equals( a ), "Passed!" );
	ok( b.clone().intersect( c ).equals( b ), "Passed!" );
	ok( c.clone().intersect( c ).equals( c ), "Passed!" );
});

test( "union", function() {
	var a = new THREE.Box2( zero2 );
	var b = new THREE.Box2( zero2, one2 );
	var c = new THREE.Box2( one2.clone().negate(), one2 );

	ok( a.clone().union( a ).equals( a ), "Passed!" );
	ok( a.clone().union( b ).equals( b ), "Passed!" );
	ok( a.clone().union( c ).equals( c ), "Passed!" );
	ok( b.clone().union( c ).equals( c ), "Passed!" );
});

test( "translate", function() {
	var a = new THREE.Box2( zero2 );
	var b = new THREE.Box2( zero2, one2 );
	var c = new THREE.Box2( one2.clone().negate(), one2 );
	var d = new THREE.Box2( one2.clone().negate(), zero2 );

	ok( a.clone().translate( one2 ).equals( new THREE.Box2( one2, one2 ) ), "Passed!" );
	ok( a.clone().translate( one2 ).translate( one2.clone().negate() ).equals( a ), "Passed!" );
	ok( d.clone().translate( one2 ).equals( b ), "Passed!" );
	ok( b.clone().translate( one2.clone().negate() ).equals( d ), "Passed!" );
});

test( "scale", function() {
	var a = new THREE.Box2( zero2 );
	var b = new THREE.Box2( zero2, one2 );
	var c = new THREE.Box2( one2.clone().negate(), one2 );
	var d = new THREE.Box2( one2.clone().negate(), zero2 );

	ok( a.clone().scale( 0 ).equals( a ), "Passed!" );
	ok( c.clone().scale( 0 ).equals( a ), "Passed!" );
	ok( b.clone().scale( 3 ).equals( new THREE.Box2( new THREE.Vector2( -1, -1, -1 ), new THREE.Vector2( 2, 2, 2 ) ) ), "Passed!" );
	ok( d.clone().scale( 3 ).equals( new THREE.Box2( new THREE.Vector2( 2, 2, 2 ).negate(), new THREE.Vector2( 1, 1, 1 ) ) ), "Passed!" );
});
