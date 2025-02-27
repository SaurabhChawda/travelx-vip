# React & React Native Monorepo with npm Workspaces

## 📁 Project Structure

```
travelx-vip/
│── package.json
│── package-lock.json
│── node_modules/
│── apps/
│   ├── web/         (React Web)
│   │   ├── package.json
│   │   ├── src/
│   │   ├── public/
│   │   ├── ...
│   ├── mobile/      (React Native)
│   │   ├── package.json
│   │   ├── src/
│   │   ├── android/
│   │   ├── ios/
│   │   ├── ...
│── packages/
│   │   ├── package.json
│   │   ├── src/
│   │   ├── ...

```

---

## Step 1: Initialize the Monorepo

```sh
mkdir travelx-vip && cd travelx-vip
npm init -y
```

Edit the **root `package.json`** to enable workspaces:

```json
{
  "private": true,
  "name": "travelx-vip",
  "workspaces": ["apps/*", "packages/*"]
}
```

## Step 2: Inside travelx-vip directory create apps directory

```sh
mkdir apps && cd apps
```

## Step 3: Set Up the React Web App

Inside the `apps/` directory:

```sh
npx create-react-app web
```

## Step 4: Set Up the React Native App

Inside the `apps/` directory:

```sh
npx @react-native-community/cli init mobile
```

## Step 5: Create a Shared Package

We’ll create a **shared** package to hold common business logic.

```sh
mkdir -p packages/src
cd packages
npm init -y
```

Modify `packages/package.json`:

```json
{
  "name": "@travelx/core",
  "version": "1.0.0",
  "main": "src/index.js",
  "private": true
}
```

Example shared logic (`packages/src/index.js`):

```js
export const greet = (name) => `Hello, ${name}!`;
```

## Step 6: Use the Shared Package in Apps

Now, install the shared package in both `web` and `mobile` apps.

From the root:

```sh
npm install @travelx/core -w web
npm install @travelx/core -w mobile
```

Now, in **React Web (`apps/web/src/App.js`)**:

```js
import React from "react";
import { greet } from "@travelx/core";

function App() {
  return <h1>{greet("Web User")}</h1>;
}

export default App;
```

And in **React Native (`apps/mobile/App.js`)**:

```js
import React from "react";
import { Text, View } from "react-native";
import { greet } from "@travelx/core";

const App = () => (
  <View>
    <Text>{greet("Mobile User")}</Text>
  </View>
);

export default App;
```

## Step 7: Running the Applications

From the root, run:

```sh
npm run pinstall
```

Then, to start each app:

- **React Web:**
  ```sh
  npm run web
  ```
- **React Native (Android):**

  ```sh
  npm run android
  ```

- **React Native (iOS - Requires Xcode):**
  ```sh
  npm run ios
  ```
