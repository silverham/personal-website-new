#!/bin/bash

# Help menu
print_help() {
cat <<-HELP
This script is used to fix permissions of a Drupal installation
you need to provide the following arguments:

  1) Path to your Drupal installation.
  2) Username of the user that you want to give files/directories ownership.
  3) HTTPD group name (defaults to www-data for Apache).

Usage: bash ${0##*/} --drupal_path=PATH --drupal_user=USER --httpd_group=GROUP
Example: bash ${0##*/} --drupal_path=/usr/local/apache2/htdocs --drupal_user=john --httpd_group=www-data
HELP
exit 0
}

drupal_path=${1%/}
drupal_user=${2}
httpd_group="${3:-www-data}"

# Parse Command Line Arguments
while [ "$#" -gt 0 ]; do
  case "$1" in
    --drupal_path=*)
        drupal_path="${1#*=}"
        ;;
    --drupal_user=*)
        drupal_user="${1#*=}"
        ;;
    --httpd_group=*)
        httpd_group="${1#*=}"
        ;;
    --help) print_help;;
    *)
      printf "************************************************************\n"
      printf "* Error: Invalid argument, run --help for valid arguments. *\n"
      printf "************************************************************\n"
      exit 1
  esac
  shift
done

if [ -z "${drupal_path}" ] || [ ! -d "${drupal_path}/sites" ] || [ ! -f "${drupal_path}/core/modules/system/system.module" ] && [ ! -f "${drupal_path}/modules/system/system.module" ]; then
  printf "**********************************************\n"
  printf "* Error: Please provide a valid Drupal path. *\n"
  printf "**********************************************\n"
  print_help
  exit 1
fi

if [ -z "${drupal_user}" ] || [[ $(id -un "${drupal_user}" 2> /dev/null) != "${drupal_user}" ]]; then
  printf "***************************************\n"
  printf "* Error: Please provide a valid user. *\n"
  printf "***************************************\n"
  print_help
  exit 1
fi

cd $drupal_path
printf "Changing ownership of all contents of \"${drupal_path}\":\n user => \"${drupal_user}\" \t group => \"${httpd_group}\"\n"
chown -R ${drupal_user}:${httpd_group} .

# @see https://forum.openlitespeed.org/threads/what-should-be-the-permission-for-the-wordpress-folder.3922/#post-7485
printf "Changing permissions of all directories inside \"${drupal_path}\" to 755...\n"
find . -type d -exec chmod 755 {} \;

printf "Changing permissions of all files inside \"${drupal_path}\" to 644...\n"
find . -type f -exec chmod 644 {} \;

echo "Done setting proper permissions on files and directories"