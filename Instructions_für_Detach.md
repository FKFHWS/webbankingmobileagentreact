## Manual standalone app update to Expo SDK 27

Make sure to update exp!

Add assetBundlePatterns to your manifest with paths to your assets folder or just the `**/*` wildcard:

```
"assetBundlePatterns": [
  "**/*"
],
```

### iOS

In xcode, go to your project settings, build phases and create a new run script phase called Bundle Expo Assets with this as the script:

```sh
set -eo pipefail

if [ "$CONFIGURATION" == "Debug" ]; then
  echo "Skipping asset bundling in debug mode."
  exit 0
fi

pushd ${SRCROOT}/..
value=$(cat ~/.expo/PATH)
dest=$CONFIGURATION_BUILD_DIR/$UNLOCALIZED_RESOURCES_FOLDER_PATH
PATH="$PATH:$value" exp bundle-assets --platform ios --dest "$dest"
popd
```

Make sure your manifest contains the following keys:

- ios.publishBundlePath: `"ios/<your_app_slug>/Supporting/shell-app.bundle"`
- ios.publishManifestPath: `"ios/<your_app_slug>/Supporting/shell-app-manifest.json"`

### Android

Copy the following files:

- `run-exp.bat` and `run-exp.sh` to the `android/detach-scripts` folder, you may also delete the other files in this directory.
- `expo.gradle` to the `android/app` folder.

You may need to grant execute permissions to `run-exp.sh` on unix systems (`chmod +x android/detach-scripts/run-exp.sh`).

In `android/app/build.gradle` remove the `exponentPrebuildStep` method and add `apply from: 'expo.gradle'`.

```
-task exponentPrebuildStep(type: Exec) {
-  workingDir '../'
-  if (System.getProperty('os.name').toLowerCase().contains('windows')) {
-    commandLine 'cmd', '/c', '.\\detach-scripts\\prepare-detached-build.bat'
-  } else {
-    commandLine './detach-scripts/prepare-detached-build.sh'
-  }
-}
-preBuild.dependsOn exponentPrebuildStep
+apply from: 'expo.gradle'
```


Add the following keys to your manifest:

- android.publishBundlePath: `"android/app/src/main/assets/shell-app.bundle"`
- android.publishManifestPath: `"android/app/src/main/assets/shell-app-manifest.json"`

Make sure to publish a new version first and then production builds will work offline!
