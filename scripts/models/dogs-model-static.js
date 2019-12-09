class Model
{
    constructor()
    {
/*
        this.list = [
            {
                id       :  1,
                name     : 'Toto',
                breed    : 'american terrier',
                picture  : '',
                subtitle : {
                    color   : 'red',
                    font    : {
                        name    : 'Arial',
                        size    :  35
                    } 
                }
            },
            {
                id       :  2,
                name     : 'Digby',
                breed    : 'english bulldog',
                picture  : '',
                subtitle : {
                    color   : 'blue',
                    font    : {
                        name    : 'Times new Roman',
                        size    :  43
                    } 
                }
            }
        ]
*/
        this.list = JSON.parse(localStorage.getItem('database'))
/*
        this.list.push({
            id       :  3,
            name     : 'Ninja',
            breed    : 'akita',
            picture  : '',
            subtitle : {
                color   : 'blue',
                font    : {
                    name    : 'Arial',
                    size    :  43
                } 
            }
        })
*/

//        this.storageUpdate()
    }


    storageUpdate()
    {
        localStorage.setItem('database', JSON.stringify(this.list))
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
        debugger

        this.list = []
        application.controller.dispatchEvent(new CustomEvent('model-dogs-update', {
            bubbles : false, 
            detail : {
                updates : []
            }
        }))
        
        //this.storageUpdate()
    }


    dogsRetrieve(keys)
    {
        return this.list.filter( (item) => keys.includes(item.id) )
    }


    dogsDelete(keys)
    {
        this.list = this.list.filter( (item) => !keys.includes(item.id) )
        this.storageUpdate()
        this.dogsList()
    }


    dogsInsert(adog)
    {
        let dog
        let insert

        insert = true
        dog = {}
        if (adog.id)
        {
            dog = this.list.filter( item => item.id == adog.id ).pop()
            insert = !dog
        }

        dog = {
            ...dog,
            ...adog
        }

        if (insert)
        {
            let id = 1
            let found = false
            while ( this.list.filter( item => item.id == id ).pop() ) id++
            this.list.push({
                id : id,
                ...dog
            })
        }
        else
        {
            this.list[this.list.findIndex( item => item.id == dog.id )] = dog
        }

        application.controller.dispatchEvent(new CustomEvent('model-dogs-update', { bubbles : false, detail : {
            updates : this.list
        }}))

        //this.storageUpdate()
    }
}