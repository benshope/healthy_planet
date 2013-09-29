<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'wordpress_db');

/** MySQL database username */
define('DB_USER', 'wp_user');

/** MySQL database password */
define('DB_PASSWORD', 'wp_password');

/** MySQL hostname */
if(isset($_SERVER['SERVER_SOFTWARE']) && strpos($_SERVER['SERVER_SOFTWARE'],'Google App Engine') !== false) {
  define('DB_HOST', ':/cloudsql/healthy-planet-compute:healthy-planet-cloud-sql');
}else{
  define('DB_HOST', 'localhost');
}

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'vl5}Csp([3`/(e:|SO>|k3Qg@)!m@hDR9aA{(NFx$YF+sTm}/:^uL>K_m+I1oaTX');
define('SECURE_AUTH_KEY',  'j|F0i-al|h;% S&nmEZZb~J:-.1<Ar?ZK-$w|/pZdom+&~ 2_xr2<xgqha.W+,ZO');
define('LOGGED_IN_KEY',    'M&kH#qHd%Cz]J@aHm[GFYEUbJNRV;I$c=o83l^r{]: mtO0))?tj2DtdH90-OX!4');
define('NONCE_KEY',        'JU4Ig6|yz#r}O&l>Injr_i`aNS4lA|`Z*+@`FAJq|AGqE.^_Z9P%2C<|,epclB:9');
define('AUTH_SALT',        'm]y]x2YmlG=!8qL.#v?v(lj+mF4%kMn-A<Q~Uae~aqO} =3.d,ee ^`U|wvd<*4?');
define('SECURE_AUTH_SALT', 'FCc82m@V,Uv,1rj%t9+sC5?;GYWbx9aQ8`}5 :$MspuAp}Y,D+sb=#rC?DWNo4Pf');
define('LOGGED_IN_SALT',   '+y6tOKN95_6*~D1=h51WR$qG^:Y*sT^w:6|@tw:cY:qxJQ?Ay2G C~Y<S?uNc%gN');
define('NONCE_SALT',       'FLe$NyHq||uU2(.JSDGeJB,f4ouQS}(K[MBu-dN-<fMw>-K&Kd;AD=[0*qP5o9!1');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');