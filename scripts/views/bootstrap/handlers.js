( () => {
    window.application = {
        ...window.application,
        handlers : {

            
        }
    }

    $(document).ready(function(){
       // $('.add-new').click(function() {
       //     alert('add new')
       // })


       application.controller.run()
    })
})()