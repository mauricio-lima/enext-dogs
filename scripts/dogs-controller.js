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

            viewBreedImages : async (event) => {
                    try
                    {
                        const url = 'https://dog.ceo/api/breed/' + event.detail.breed + '/images'

                        const response = await fetch(url)
                        const urls     = await response.json()
                        if ( (!urls.status) || (urls.status != 'success') )
                            throw new Error(urls.message)

                        this.view.setBreedImageList(urls.message)
                    }
                    catch (e)
                    {
                        console.log(e.message)
                    }
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
        this.addEventListener('view-breed-images', _private.viewBreedImages )
    }


    async run()
    {
        this.model.dogsList()

        try
        {
            await new Promise( (resolve, reject) => {
                fetch = null
                if (fetch)
                {
                    resolve()
                    return
                }

                const http = new XMLHttpRequest
                http.addEventListener('readystatechange', () => {
                    if (http.readyState == 4)
                    {
                        alert("No fetch treating")
                        debugger
                        if (http.status != 200)
                        {
                            reject(new Error('Unexpected Status code'))
                            return
                        } 
            
                        /*
                        if ( !http.getResponseHeader('Content-type').includes('text/javascript') )
                        {
                            return
                        }
                        */
        
                        if ( http.responseText.includes('/* No polyfills found for current settings */'))
                        {
                            alert('No polyfill for fecth')
                            reject()
                            return
                        }
        
                        eval(http.responseText)
                        resolve()
                    }
                })
                //http.open("GET", "https://polyfill.io/v3/polyfill.js?features=fetch", true)
                //http.open("GET", "https://github.com/github/fetch/raw/master/fetch.js", true)
                http.open("GET", "scripts/fetch.js", true)
                http.send()
            })    

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
