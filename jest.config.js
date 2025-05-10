module.exports = {
    transform: {
        '^.+\\.[t|j]sx?$': 'babel-jest',
        '^.+\\.(js|jsx|mjs)$': 'babel-jest',  // Para transformar arquivos .js, .jsx e .mjs
    },
    transformIgnorePatterns: [
        '/node_modules/(?!axios)/',  // Certifique-se de que `axios` será transformado pelo Babel
    ],
    setupFiles: ['./jest.setup.js'],  // Configuração para simular o Google Maps
};
