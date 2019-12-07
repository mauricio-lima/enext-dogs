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


    async function scriptImport(url)
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
            
        await scriptImport('scripts/' + script)
    }


    async function setup()
    {
        console.log('Load time :', (new Date()).toLocaleTimeString())

        //window.EventTarget = EventTarget || Element

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

            application.controller.run()
        }
        catch (error)
        {
            console.error(error.message)
            alert('error : ' + error.message)
        }
    }

    alert('setup')
    setup()
})()