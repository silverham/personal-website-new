<?php

/**
 * @file
 * Class HideBodyField.
 */

namespace Drupal\josh_front\feature;

class HideBodyField {

  /**
   * Called by hook_preprocess_node().
   */
  public static function preprocessNode(&$variables) {
    $view_mode = $variables['elements']['#view_mode'];
    $node = $variables['node'];
    if (in_array($view_mode, ['full'])) {
      // Value can be:
      // - null for no value.
      // - '0' for unchecked.
      // - '1' for checked.
      if ($node->hasField('field_hide_body') && $node->field_hide_body->value) {
        $variables['content']['body']['#access'] = FALSE;
        $variables['content']['body']['#josh_body_hidden'] = TRUE;
      }
    }
  }

}
