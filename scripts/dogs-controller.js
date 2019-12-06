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


    run()
    {
        this.model.dogsList()
    }
}
