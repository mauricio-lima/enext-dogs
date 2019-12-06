class Controller extends EventTarget
{
    constructor(view, model)
    {
        super()
        
        this.view  = view
        this.model = model

        this.private = {

            viewDogsInsert  : event => {
                    alert('dog named ' + event.detail.name + ' inserted')
                    model.dogInsert(event.detail)
                },

            viewDogEdit     : event => {
                    const result = model.dogsRetrieve(event.detail).pop()
                    if (result)
                    {
                        view.dogEdit(result)
                    }
                },

            viewDogsDelete : event => {
                    model.dogsDelete(event.detail)
                },

            viewDogsClear   : event => {
                    model.dogsClear();
                },

            modelDogsUpdate : event => {
                    view.dogsUpdate(event.detail.updates)
                }
        }

        const _private = this.private
        this.addEventListener('view-dogs-insert',  _private.viewDogsInsert  )
        this.addEventListener('view-dogs-delete',  _private.viewDogsDelete  )
        this.addEventListener('view-dog-edit',     _private.viewDogEdit     )
        this.addEventListener('model-dogs-update', _private.modelDogsUpdate )
        this.addEventListener('view-dogs-clear',   _private.viewDogsClear   )
    }


    async run()
    {
        this.model.dogsList()

        try
        {
            const response = await fetch('https://dog.ceo/api/breeds/list/all')
            const breeds   = await response.json()
            if ( (!breeds.status) || (breeds.status != 'success') )
                throw new Error('Unexpected status')

            const plainBreeds = []
            for(let family in breeds.message)
            {
                if (breeds.message[family].length == 0)
                {
                    plainBreeds.push(family)
                    continue
                }
                
                for(let subbreed of breeds.message[family])
                {
                    plainBreeds.push(subbreed + ' ' + family)
                }
            }

            this.view.setBreeds(plainBreeds) 
        }
        catch (e)
        {
            console.log('Error :', e.message, )
        }
    }
}