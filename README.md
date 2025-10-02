# Stopwatch App, ALTSCHOOL AFRICA Project Assignment

This project demonstrates my approach to building a stopwatch web application. It covers both the UI design and the underlying logic to create a fully functional stopwatch using HTML, TypeScript (compiled to JavaScript), and SCSS (compiled to CSS).

### Project Structure

```
index.html
README.md
assets/js/main.js
assets/css/styles.css
```

### Installation

To get started with this project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/jamesadewara/alt-project-assigment-stopwatch.git
   ```

2. Install the necessary dependencies:

   ```bash
   npm install -g typescript
   npm install -g sass
   ```

### Running the Project

1. Compile the TypeScript code to JavaScript:

   ```bash
   tsc assets/js/main.ts --module esnext --target esnext
   ```
   **Note: setting `--target esnext` allows padstart for strings to work and using `--module esnext` allows import of the theme.js file into my main.js**

2. Compile the SCSS to CSS:

   ```bash
   sass assets/css/globals.scss assets/css/globals.css
   ```

3. Open the `index.html` file in your preferred web browser.

Alternatively, you can view the live version of the project [here](https://jamesadewara.github.io/alt-project-assigment-stopwatch/).

---
*`inspired by react vite and bootsrap project setup and code writings`*