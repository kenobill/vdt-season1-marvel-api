

describe('GET /characters', function () {

    const characters = [
        {
            name: "Professor Xavier",
            alias: "Professor X",
            team: ["Xmen", "Liga da Justica"],
            active: true
        },
        {
            name: "Pedro Parque",
            alias: "Miranha da Massa x",
            team: ["Virgadores", "Liga da Suicide Squeid"],
            active: true
        },
        {
            name: "Bruce Ueine",
            alias: "Bátima x",
            team: ["Jovem Aprendiz", "Liga da Calcinha Preta"],
            active: true
        }
    ]


    before(function () {
        cy.back2ThePast()
        cy.setToken()
        cy.populateCharacters(characters)

    })

    it('deve retornar lista de personagens', function () {

        cy.getCharacter().then(function (response) {
            expect(response.status).to.eql(200)
            expect(response.body).to.be.a('array')
            expect(response.body.length).greaterThan(0)
        })
    })

    it('deve buscar personagem por nome', function () {

        cy.searchCharacters('Logan')
            .then(function (response) {
                expect(response.status).to.eql(200)
                expect(response.body.length).to.eql(2)
                expect(response.body[0].alias).to.eql('Volverino')
                expect(response.body[0].active).to.eql(true)
            })
    })
})

describe('GET /characters/id', function () {

    before(function(){

        cy.back2ThePast()
        cy.setToken()
    })

    const tonyStark = {
        name: "Antonio Esparque",
        alias: "Homi de Fero",
        team: ["Virgadores", "Ursinhos Carinhosos"],
        active: true
    }

    context('quando tem um personagem cadastrado', function() {

        before(function() {
            cy.populateCharacters(tonyStark).then(function(response){
                Cypress.env('characterId', response.body.character_id)
            })

        })

        it('deve buscar o personagem pelo id', function () {

            const id = Cypress.env('characterId')
            cy.getCharacterById(id).then(function(response){
                expect(reponse.status).to.eql(200)

            })
        })
    })

    it('deve retornar 404 ao buscar por id nao cadastrado', function(){

        const id = '62b8a2ab15e35cd77d0d0e25'
            cy.getCharacterById(id).then(function(response){
                expect(reponse.status).to.eql(404)

            })
    })
})