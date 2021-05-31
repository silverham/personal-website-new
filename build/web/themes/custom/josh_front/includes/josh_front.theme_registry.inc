<?php

/**
 * @file
 * Theme registry hooks.
 */

/**
 * Implements hook_theme_registry_alter().
 */
function josh_front_theme_registry_alter(&$theme_registry) {
  __josh_front_theme_registry_alter__minisite_link($theme_registry);
}
