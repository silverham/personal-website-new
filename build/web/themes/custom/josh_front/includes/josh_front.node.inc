<?php

/**
 * @file
 * Node hooks.
 */

use Drupal\josh_front\feature\HideBodyField;

function josh_front_preprocess_node(&$variables) {
  HideBodyField::preprocessNode($variables);
}
