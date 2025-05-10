describe('App Mapa de Veículos', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000'); 
    });

    it('deve exibir o título do mapa', () => {
        cy.contains('Mapa rastreador').should('be.visible');
    });

    it('deve buscar e exibir veículos na tabela após pesquisa', () => {
        cy.get('input[placeholder="Pesquisar placa"]').type('ABC1234'); 
        cy.get('button').contains('Pesquisar').click();

  
        cy.get('.vehicle-table').should('have.length.greaterThan', 0);
    });

    it('deve exibir veículos no mapa com base nos dados recebidos', () => {
        cy.get('.google-map') 
            .should('exist');
    });

    it('deve verificar o comportamento do intervalo de 2 minutos', () => {
        cy.clock(); 
        cy.visit('http://localhost:3000');

        cy.tick(120000);
    });
});
