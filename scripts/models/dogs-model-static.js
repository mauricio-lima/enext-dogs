class Model
{
    constructor()
    {
        this.list = [
            {
                id       :  1,
                name     : 'Toto',
                breed    : 'american terrier',
                subtitle : {
                    color   : 'red',
                    font    : {
                        name    : 'Arial',
                        size    : '10px'
                    } 
                }
            },
            {
                id       :  2,
                name     : 'Digby',
                breed    : 'american terrier',
                subtitle : {
                    color   : 'blue',
                    font    : {
                        name    : 'Times new Roman',
                        size    : '12px'
                    } 
                }
            }
        ]

        this.nextID = 3
    }


    dogsList()
    {
        application.controller.dispatchEvent(new CustomEvent('model-dogs-update', { 
            bubbles : false, 
            detail : {
                updates : this.list
            }
        }))
    }


    dogsClear()
    {
        alert('Model Dogs Clear')
        this.list = []
        application.controller.dispatchEvent(new CustomEvent('model-dogs-update', {
            bubbles : false, 
            detail : {
                updates : []
            }
        }))
    }


    dogsRetrieve(keys)
    {
        return this.list.filter( (item) => keys.includes(item.id) )
    }


    dogsDelete(keys)
    {
        this.list = this.list.filter( (item) => !keys.includes(item.id) )
        this.dogsList()
    }


    dogInsert(adog)
    {
        alert('model dog insert')


        this.list.push({
            id : this.nextID,
            ...adog
        })
        this.nextID++

        application.controller.dispatchEvent(new CustomEvent('model-dogs-update', { bubbles : false, detail : {
            updates : this.list
        }}))
    }
}