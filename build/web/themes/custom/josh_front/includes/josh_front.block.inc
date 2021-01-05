<?php

/**
 * @file
 * Blook hooks.
 */

/**
 * Implements hook_preprocess_block().
 */
function josh_front_preprocess_block(&$variables) {
  // Fix quickedit JS errors on some blocks rendered by Context module
  if (isset($variables['elements']['content']['#attributes']['data-quickedit-entity-id'])) {
    $variables['attributes']['data-quickedit-entity-id'] = $variables['elements']['content']['#attributes']['data-quickedit-entity-id'];
  }
}
