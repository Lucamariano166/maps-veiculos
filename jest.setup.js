// jest.setup.js
global.window.google = {
    maps: {
        Map: jest.fn(),
        Marker: jest.fn(),
        InfoWindow: jest.fn(),
        Size: jest.fn(),
    },
};