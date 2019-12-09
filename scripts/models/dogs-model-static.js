class Model
{
    constructor()
    {
        this.list = JSON.parse(localStorage.getItem('database'))

        if (this.list != null)
            return

        this.list = []
        this.list.push({
            "id"        :  1,
            "breed"     : "akita",
            "name"      : "Ninja",
            "picture"   : "https://images.dog.ceo/breeds/akita/512px-Akita_inu.jpeg",
            "subtitle"  : {
                "color" : "#00ffff",
                "font"  : {
                    "name" : "Caveat",
                    "size" :  0.2
                }
            }
        })
    
        this.list.push({
            "id":2,
            "breed":"cairn",
            "name":"folgado",
            "picture":"https://images.dog.ceo/breeds/cairn/n02096177_11012.jpg",
            "subtitle":{"color":"#ffff00","font":{"name":"Caveat","size":0.22}}
        })
        
        this.list.push({
            "id":3,
            "breed":"groenendael",
            "name":"Lassie",
            "picture":"https://images.dog.ceo/breeds/groenendael/n02105056_1061.jpg",
            "subtitle":{"color":"#0000ff","font":{"name":"Limelight","size":0.135}}
        })

        this.storageUpdate()
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
        
        this.storageUpdate()
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

        this.storageUpdate()
    }
}
