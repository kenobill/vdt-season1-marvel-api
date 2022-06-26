

describe('POST /characters', function(){

    before(function(){
        cy.back2ThePast()
        cy.setToken()

    })

    it('deve cadastrar personagem', function(){

        const character = {
            name: "PedroPdddaasdrkesx",
            alias: "Miraasddddnha x",
            team: ["Virgadores", "Liga da Justica"],
            active: true
        }

        cy.postCharacter(character)
            .then(function(response){
                expect(response.status).to.eql(201)
                cy.log(response.body.character_id)
                expect(response.body.character_id.length).to.eql(24)

            })
    })

    context('quando o personagem já existe', function(){
        const character = {
            
            name: "Wandaddff",
            alias: "Feiticeira vedffsdarmelha",
            team: ["Virgadores", "Liga da Justica"],
            active: true
        }

    before(function(){
        cy.postCharacter(character).then(function(response){
            expect(response.status).to.eql(201)
        })
    })

    it('nao deve cadastrar duplicado', function(){
        cy.postCharacter(character).then(function(response){
            expect(response.status).to.eql(400)
            expect(response.body.error).to.eql('Duplicate character')
        })
        
    })
})
})

