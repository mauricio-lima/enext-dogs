( () => {
    function urlParametersParser() {
        window.location.parameters = {};
        window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, 
            (m, key, value) => window.location.parameters[key] = value);
    }

    function parameters(name)
    {
        return window.location.parameters[name]
    }


    async function requestContent(url)
    {
        return new Promise( (resolve, reject) =>{
            const http = new XMLHttpRequest()
            http.addEventListener('readystatechange', () => {
                if (http.readyState == 4)
                {
                    if (http.status != 200) reject( new Error(http.status) )

                    const response = {
                        type : http.getResponseHeader('Content-type'),
                        data : http.responseText
                    }
                    if ( response.type.includes('application/json') )
                    {
                        response.data = JSON.parse(response.data)
                    }
                
                    resolve(response)
                }            
            })

            http.open("GET", url, true)
            http.send()
        })
    }

    /*
    async function importLibraryOld(url)
    {
        await new Promise( (resolve, reject) => {
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
            
                        if ( !http.getResponseHeader('Content-type').includes('text/javascript') )
                        {
                            return
                        }
        
                        if ( http.responseText.includes('/* No polyfills found for current settings '))
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
            //http.open("GET", "scripts/fetch.js", true)
            http.open("GET", url, true)
            http.send()
        })
    }
    */


    async function importScript(url)
    {
        return new Promise( (resolve, reject ) => {
            let head

            head = document.getElementsByTagName('head')[0]
            if (!head)
            {
                head = document.createElement('head')
                document.getElementsByTagName('html')[0].appendChild(head)
            }
    
            const script = document.createElement('script')
            script.src    = url
            script.type   = 'text/javascript'
            script.onload = () =>  {
                resolve()
            }
    
            head.appendChild(script)
        })
    }


    async function importLibrary(url)
    {
        try
        {
            const content = await requestContent(url)
            await eval('(async () => {' + content.data + '})()') 
        }
        catch
        {
            alert('Import Libray Error')
        }
    }


    async function configurationLoad(script, name, errorHandler = true)
    {
        if (!script)
        {
            if (!errorHandler)
            {
                return
            }
            
            throw new Error(`Missing ${name} configuration`)
        } 
            
        await importScript('scripts/' + script)
    }


    async function setup()
    {
        console.log('Load time :', (new Date()).toLocaleTimeString())

        EventTarget = null
        await importScript('https://unpkg.com/event-target@1.2.3/min.js')
        //await importLibrary('https://unpkg.com/event-target@1.2.3/min.js')
        //await new Promise( (resolve) => setTimeout(resolve,3000) )
        //alert (!!EventTarget)
        //debugger

        urlParametersParser()
        configurationFile = parameters('config') || parameters('configuration') || 'config.json'

        if (!configurationFile)
            return

        try
        {
            configuration = await requestContent(configurationFile)

            await configurationLoad(configuration.data.controller, 'controller')
            await configurationLoad(configuration.data.model,      'model', false)
            await configurationLoad(configuration.data.view,       'view',  false)

            const view  = (typeof View  === 'function') ? ( new View  ) : null
            const model = (typeof Model === 'function') ? ( new Model ) : null

            window.application = {
                controller : new Controller(view, model)
            } 

            //application.controller.run()
        }
        catch (error)
        {
            console.error(error.message)
            //alert('error : ' + error.message)
        }
    }

    setup()
})()