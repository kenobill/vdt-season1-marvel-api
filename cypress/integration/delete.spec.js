

describe('DELETE /characteres/id', function () {

    before(function(){

        cy.back2ThePast()
        cy.setToken()
    })

    const tochaHumana = {
        name: "Johnny Storm",
        alias: "Tocha Humana",
        team: ["Quarto Fantardigo", "Ursinhos Carinhosos"],
        active: true
    }

    context('quando tem um personagem cadastrado', function() {

        before(function() {
            cy.populateCharacters(tochaHumana).then(function(response){
                Cypress.env('characterId', response.body.character_id)
            })

        })

        it('deve remover o personagem pelo id', function () {

            const id = Cypress.env('characterId')
            cy.deleteCharacterById(id).then(function(response){
                expect(reponse.status).to.eql(204)

            })
        })
    })

    it('deve retornar 404 ao remover por id nao cadastrado', function(){

        const id = '62b8a2ab15e35cd77d0d0e25'
            cy.getCharacterById(id).then(function(response){
                expect(response.status).to.eql(404)

            })
    })
})