// npx jest--watch
module.exports = {
    roots: ["<rootDir>/src"],

    moduleNameMapper: {
        // "\\.(css|scss)$": "<rootDir>/__tests__/styleMock.js"
        "^.+\\.(css|less|scss)$": "babel-jest"
    },
    testMatch: [
        "**/__tests__/**/*.+(ts|tsx|js)",
        // "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    transform: {
        // "^.+\\.(ts|tsx)$": "ts-jest",
        // "^.+\\.jsx?$": "babel-jest",
        "^.+\\.(ts|tsx)$": "<rootDir>/node_modules/babel-jest",
        ".+\\.(css|styl|less|sass|scss)$": "jest-transform-css"
    },
    setupFilesAfterEnv: [
        // "@testing-library/react/cleanup-after-each",
        // "@testing-library/jest-dom/extend-expect"
        // "<rootDir>/jest.setup.js"
    ],
    // testRegex: "((\\.|/)(test|spec))\\.tsx?$",
    // moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
};