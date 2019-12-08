( () => {
    function DOMLoaded()
    {
        alert('DOM Loaded')
    }

    window.application = {
        ...window.application,
        handlers : {

            
        }
    }

    //document.addEventListener('DOMContentLoaded', DOMLoaded)

    application.controller.run()
})()