<?php

namespace DrupalProject\custom;

use Composer\Script\Event;
use DrupalFinder\DrupalFinder;
use Symfony\Component\Filesystem\Filesystem;

/**
 * ScriptHandler class.
 */
class ScriptHandler {

  /**
   * Called by composer, creates custom files.
   *
   * Recreates the drush.bat file required for drush 8
   * to work with site local drush 9 on windows.
   *
   * @param Composer\Script\Event $event
   *   The event.
   */
  public static function createRequiredFiles(Event $event) {
    $fs = new Filesystem();
    $drupalFinder = new DrupalFinder();
    $drupalFinder->locateRoot(getcwd());
    $composerRoot = $drupalFinder->getComposerRoot();

    $pathToDrush = $composerRoot . '/vendor/drush/drush';
    $pathToVendorBin = $composerRoot . '/vendor/bin';
    $pathTocustomAssets = $composerRoot . '/scripts/custom/assets';

    $assetsToCopy = [
      // Copy drush.bat from assets to vender/drush/drush.
      [
        'src' => $pathTocustomAssets . '/drush.bat',
        'src_filename' => 'drush.bat',
        'dest' => $pathToDrush . '/drush.bat',
        'dest_filename' => 'drush.bat',
      ],
      // Copy drush.bat vendor/drush/drush
      // and make a drush.php.bat in same folder.
      [
        'src' => $pathToVendorBin . '/drush.bat',
        'src_filename' => 'drush.bat',
        'dest' => $pathToVendorBin . '/drush.php.bat',
        'dest_filename' => 'drush.php.bat',
      ],
    ];

    // If drush exists.
    if ($fs->exists($pathToDrush)) {
      foreach ($assetsToCopy as $asset) {
        // If destination script not already there.
        if (!$fs->exists($asset['dest'])) {
          // If source asset file exists.
          if ($fs->exists($asset['src'])) {
            // Copy from script assets to vendor.
            $fs->copy($asset['src'], $asset['dest']);
            $event->getIO()->write("custom: {$asset['dest_filename']} file recreated at {$asset['dest']}!");
          }
          else {
            $event->getIO()->write("custom Warning: {$asset['src_filename']} asset not found! It should be at {$asset['src']}");
          }
        }
      }
    }
  }

}
