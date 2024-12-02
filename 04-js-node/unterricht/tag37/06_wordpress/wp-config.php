<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wordpress' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', 'root' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '@,uBGs*;_N/dnm _~wDj/B~Z3zJv1~.?l_J2_wMb%UhLo;|G_J6bL&Xd#yRC@O;F' );
define( 'SECURE_AUTH_KEY',  '<#HoqE[3|nz^3~W803)Gadgh&Cnqr^p3gb}hy%w>dT~Yu1BFl1{6B>LX1x[#!v1X' );
define( 'LOGGED_IN_KEY',    'bv.+J$pyfS{6[K6*!qys,[o<^oTa4V[0r*!qsks*`Tq4/y*9{@&%fve(jq$sZXo~' );
define( 'NONCE_KEY',        'J1|>p:1%/^?a&q{Dz!i^{H>[k+f(b?Qn{p5r0>)9ILL_i<.[[F0324+zp`*q_Fk2' );
define( 'AUTH_SALT',        '8kaO^VJ{d3E+<5M&jKl?^3b<an`2FHR?|Pnp$aF:~*Pw8@RNhXH5eOup{qGIy4R@' );
define( 'SECURE_AUTH_SALT', ',3c%#nPpHNB|#Dm#%ZSC@ot18]0mx_u$wM8cBL6{B]DW?T7RHz.^WM^D$<5JnxWA' );
define( 'LOGGED_IN_SALT',   'LmA(S-(1>)`E_GGjqL}waISj.-b/UOFrdIEPd4o*-bmrD8% WUy4fcPN$im2 xMJ' );
define( 'NONCE_SALT',       'ny989[`hoCP;eNu>dU9M,1uuvu*uBt?AKpf^7XH+U/gLYOVpzxdJ|&``,L_W rNI' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
