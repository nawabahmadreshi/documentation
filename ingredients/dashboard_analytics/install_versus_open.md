Branch will _automatically_ create events on your behalf whenever a user accesses your site or your app with the Branch SDK installed. We measure installs, opens and web page visits with separate events. Here is a list of the auto-created ones:

| **Event** | **Description**
| `install` | Triggered the first time a user launches your app
| `open` | Trigged when the user opens the app after the very first launch OR if a user reinstalls the app after uninstalling it
| `web session start` | Triggered when the user views a webpage using the Branch Web SDK.
| `referred session` | Triggered _in addition_ to install, open or web session start if a user comes from a Branch link
