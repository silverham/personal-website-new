<?php

/**
 * @file
 * Minisite hooks.
 */

/**
 * Implements hook_theme_registry_alter().
 */
function __josh_front_theme_registry_alter__minisite_link(&$theme_registry) {
  $target_theme_hook = 'minisite_link';
  $target_theme_hooks = [];
  foreach (array_keys($theme_registry) as $theme_hook) {
    // Is target theme hook.
    if ($target_theme_hook === $theme_hook) {
      $target_theme_hooks[] = $theme_hook;
      continue;
    }
    // Is more specific version of the target theme hook.
    if (strpos($theme_hook, "{$target_theme_hook}__") === 0) {
      $target_theme_hooks[] = $theme_hook;
      continue;
    }
  }
  // Add $field_java_entry_filename as a variable to the 'minisite_link'
  // theme hook(s) we collected eailer. Set its default value to be an
  // empty string.
  foreach ($target_theme_hooks as $target_theme_hook) {
    $theme_registry[$target_theme_hook]['variables']['java_entry_filename'] = '';
  }
}

/**
 * Implements hook_preprocess_field().
 */
function josh_front_preprocess_field__field_media_java_minisite(&$variables) {
  $entity = $variables['element']['#object'];
  $field_java_entry_filename = !$entity->get('field_java_entry_filename')->isEmpty() ? $entity->field_java_entry_filename->value : '';
  foreach ($variables['items'] as $key => $item) {
    $variables['items'][$key]['content']['#theme'] = "minisite_link__{$variables['entity_type']}__{$variables['field_name']}__{$variables['element']['#view_mode']}";
    // @see __josh_front_theme_registry_alter__minisite_link().
    $variables['items'][$key]['content']['#java_entry_filename'] = $field_java_entry_filename;
  }
}
