module.exports = {
    preset: 'jest-puppeteer',
    transform: {
        '.(ts|tsx)$': 'ts-jest',
    },
    setupFilesAfterEnv: ["<rootDir>/config/jest.setup.e2e.js"],
    testMatch: ['<rootDir>/__tests__/**/*.(spec|test).{js,jsx,ts,tsx}'],
}