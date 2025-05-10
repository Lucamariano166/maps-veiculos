module.exports = {
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Transforma arquivos JS/TS com Babel
    },
    transformIgnorePatterns: [
        '/node_modules/(?!axios|@tanstack|react-query)/', // Permite transformar 'axios' e outros módulos, como 'react-query'
    ],
    extensionsToTreatAsEsm: ['.ts', '.tsx'], // Se estiver usando TypeScript, adicione esta linha
};
