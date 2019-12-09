class View
{
    constructor()
    {
        let tag

        this.DIALOG_IMAGE_HEIGHT = 200
        this.TABLE_IMAGE_HEIGHT  = 300

        const head = document.getElementsByTagName('head')[0];

        tag = document.createElement('link')
        tag.rel  = 'stylesheet'
        tag.href = 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
        head.appendChild(tag)

        tag = document.createElement('link')
        tag.rel  = 'stylesheet'
        tag.href = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'
        head.appendChild(tag)

        tag = document.createElement('link')
        tag.rel  = 'stylesheet'
        tag.href = 'https://fonts.googleapis.com/icon?family=Material+Icons'
        head.appendChild(tag)

        const fonts = document.createElement('link')
        fonts.rel  = 'stylesheet'
        fonts.href = 'https://fonts.googleapis.com/css?family=Caveat|Lemon|Lilita+One|Monoton|Rock+Salt|Lobster|Limelight|Pacifico&display=swap'
        head.appendChild(fonts)

        tag = document.createElement('script')
        tag.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js'
        head.appendChild(tag)

        tag = document.createElement('script')
        tag.src = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js'
        head.appendChild(tag)

        tag = document.createElement('script')
        tag.src = 'scripts/views/bootstrap/handlers.js'
        head.appendChild(tag)

        const styles = document.createElement('style')
        styles.type = 'text/css'
        styles.appendChild(document.createTextNode(`
            .hidden {
                display : none;
            }
            
            body {
                color: #404E67;
                background: #F5F7FA;
                font-family: 'Open Sans', sans-serif;
            }
            .table-wrapper {
                width: 700px;
                margin: 30px auto;
                background: #fff;
                padding: 20px;	
                box-shadow: 0 1px 1px rgba(0,0,0,.05);
            }

            `
            ))
        head.appendChild(styles)

        const container = document.getElementById('container')

        const insertDog = document.createElement('div')
        insertDog.innerHTML = `
            <div class="modal fade" id="myModal" >
                <div class="modal-dialog modal-dialog-slideout modal-md"  role="dialog">
                <section class="modal-content">
                    <header class="modal-heading">
                        <button type="button" class="close" data-dismiss="modal">
                            &times;
                        </button>
                        <h2 class="modal-title">
                            Add or edit a dog
                        </h2>
                    </header>
		            <div class="modal-body">
                        <form id="demo-form" class="form-horizontal mb-sm" novalidate="novalidate">
                                <input id="id"  type="hidden">
                                <input id="url" type="hidden">
				                <div class="form-group mt-sm">
					                <label class="col-sm-2 control-label">Name</label>
					                <div class="col-sm-9">
						                <input  id="name" type="text"  class="form-control" placeholder="Type the dog name..." required/>
					                </div>
				                </div>
				                <div class="form-group">
                                    <label class="col-sm-2 control-label">
                                        Breed
                                    </label>
					                <div class="col-sm-9">
						                <select id="breed"  data-plugin-selectTwo class="form-control populate js-example-responsive" style="width: 50%;">
						                </select>
					                </div>
                                </div>
                                <div class="form-group">
					                <label class="col-sm-2 control-label">Font</label>
					                <div class="col-sm-6">
						                <select id="font" data-plugin-selectTwo class="form-control populate js-example-responsive" style="width: 100%;">
                                            <option value="Caveat">Caveat</option>
                                            <option value="Lemon"      > Lemon      </option>
                                            <option value="Lilita One" > Lilita One </option>
                                            <option value="Monoton"    > Monoton    </option>
                                            <option value="Lobster"    > Lobster    </option>
                                            <option value="Limelight"  > Limelight  </option>
                                            <option value="Pacifico"   > Pacifico   </option>
                                        </select>
                                    </div>
                                    <label class="col-sm-1 control-label">Size</label>
					                <div class="col-sm-2">
						                <input id="size" type="number" name="size" class="form-control" placeholder="Type the dog name..." required/>
					                </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-1 control-label">
                                        Color
                                    </label>
                                    <div class="col-sm-9">
                                        <select id="breed"  data-plugin-selectTwo class="form-control populate js-example-responsive" style="width: 50%;">
                                            <option value="#ffffff">White   </option>
                                            <option value="#ff0000">Red     </option>
                                            <option value="#ffff00">Yellow  </option>
                                            <option value="#00ff00">Verde   </option>
                                            <option value="#00ffff">Ciano   </option>
                                            <option value="#0000ff">Blue    </option>
                                            <option value="#000000">Black   </option> 
                                        </select>
                                    </div>
                                </div>
                        </form>
                        <div id="breed-image-section"  class="hidden">
                            <div style="text-align : center">
                                <button id="breed-image-previous"> 
                                    Previous
                                </button>
                                <canvas id="breed-image"  width="200"  height="200"></canvas>
                                <button id="breed-image-next">
                                    Next
                                </button>
                                <div>
                                    sequencia da imagem
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer class="panel-footer">
			                <div class="row">
				                <div class="col-md-12 text-right">
                                    <button class="btn btn-primary modal-confirm"  data-dismiss="modal">
                                        OK
                                    </button>
                                    <button class="btn btn-default modal-dismiss"  data-dismiss="modal">
                                        Cancel
                                    </button>
				                </div>
			                </div>
		            </footer>
                </section>
                </div>
                <!--  div class="modal-dialog modal-sm">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">
                                &times;
                            </button>
                            <h4 class="modal-title">Modal Header</h4>
                        </div>
                        <div class="modal-body">
                            <p>This is a small modal.</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">
                                Close
                            </button>
                        </div>
                    </div>
                </div -->
            </div>



                <div id="edit" class="hidden">
                    <input id="id"   type="hidden">
                    <input id="url"  type="hidden">
                    <label for="name">Name :</label>
                    <input id="name" type="text">
                    <br>
                    <label for="breed">Breed :</label>
                    <select id="breed"></select>
                    <br>
                    <label for="font">Font :</label>
                    <select id="font">
                        <option value="Times New Roman">Times New Roman </option>
                        <option value="Arial"          >Arial           </option>
                    </select>
                    <br>
                    <label for="size">Size :</label>
                    <input id="size"  type="number" value="40"  min="7"  max="40">
                    <br>
                    <label for="color">Color :</label>
                    <div id="breed-image-section"  class="hidden">
                        <br>
                        <br>
                        <canvas id="xbreed-image"></canvas>
                        <div>
                            <button id="breed-image-previous">
                                previous
                            </button>
                            <button id="breed-image-next">
                                next
                            </button>
                        </div>
                    </div>
                    <br>
                    <br>
                    <button id="edit-ok"     >
                        OK
                    </button>
                    <button id="edit-cancel" >
                        Cancel
                    </button>
                    <span id="edit-error-name-empty" class="hidden">The name could not be empty</span>
                </div>
                <div id="main">
                    <div class="table-wrapper">
                        <div class="table-title">
                            <div class="row">
                                <div class="col-sm-8">
                                    <h2>
                                        <b>Dogs</b> Database
                                    </h2>
                                </div>
                                <div class="col-sm-4">
                                    <button id="dogsInsert" type="button" class="btn btn-info add-new"   data-toggle="modal"  data-target="#myModal">
                                        <i class="fa fa-plus"></i> 
                                        Add Dog
                                    </button>
                                    <button id="dogsClear" type="button" class="btn btn-info add-new" >
                                        <i class="fa fa-plus"></i> 
                                        <span>
                                            Clear All
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <table id="dogs" class="table table-bordered">
                            <thead>
                                <tr>
                                    <th class=""> 
                                        id  
                                    </th>
                                    <th>
                                        Name
                                    </th>
                                    <th>Breed</th>
                                    <th>
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="dog hidden">
                                    <td class=""> 
                                        1
                                    </td>
                                    <td> Digby            </td>
                                    <td> American bulldog </td>
                                    <td>
                                        <a class="edit" title="Edit" data-toggle="tooltip">
                                            <i class="material-icons">&#xE254;</i>
                                        </a>
                                        <a class="delete" title="Delete" data-toggle="tooltip">
                                            <i class="material-icons">&#xE872;</i>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div id="picture-container"  style="text-align : center">
                            <canvas id="picture">
                            </canvas>
                        </div>
                    </div>
                </div>
                        `

        container.appendChild(insertDog)


        return
        /*
        $('.add-new').click(() => {
            alert('Add New')
        })
        */

        insertDog.querySelector('#dogInsert').addEventListener('click', () => {
            this.dogEdit()
        })

        insertDog.querySelector('#edit-ok').addEventListener('click', () => {
            const value = document.getElementById('name').value
            if (value == '')
            {
                alert(document.getElementById("edit-error-name-empty").innerText)
                return
            }

            document.getElementById('edit').classList.add('hidden')
            document.getElementById('main').classList.remove('hidden')

            //this.dogsInsert(breed, name, font, color, [10,10], this.breedImages.images[this.breedImages.selected - 1].url)
            if (this.breedImages.selected)
            {
                document.getElementById('url'  ).value = this.breedImages.images[this.breedImages.selected - 1].url
            }

            let adog = {
                breed    : document.getElementById('breed').value,
                name     : document.getElementById('name' ).value,
                picture  : document.getElementById('url'  ).value,
                //picture  : this.breedImages.images[this.breedImages.selected - 1],
                subtitle : {
                    color : document.getElementById('color').value,
                    font  : {
                        name : document.getElementById('font').value,
                        size : parseInt(document.getElementById('size').value) / this.DIALOG_IMAGE_HEIGHT
                    }
                }
            }
            
            const id = document.getElementById('id').value
            if (id)
            {
                adog = {
                    id : parseInt(id),
                    ...adog
                }
            }
            this.dogsInsert(adog)
        })
        
        insertDog.querySelector('#edit-cancel').addEventListener('click', () => {
            document.getElementById('edit').classList.add('hidden')
            document.getElementById('main').classList.remove('hidden')
        })

        insertDog.querySelector('#breed').addEventListener('change', (event) => {
            this.requestBreedImages(event.target.value)
        })

        insertDog.querySelector('#breed-image-previous').addEventListener('click', () => {
            this.breedImages.selected--
            this.breedImages.show()
        })

        insertDog.querySelector('#breed-image-next').addEventListener('click', () => {
            this.breedImages.selected++
            this.breedImages.show()
        })

        insertDog.querySelector('#name').addEventListener('keyup', () => {
            this.breedImages.show()
        })

        insertDog.querySelector('#font').addEventListener('change', () => {
            this.breedImages.show()
        })

        insertDog.querySelector('#size').addEventListener('keyup', () => {
            this.breedImages.show()
        })

        insertDog.querySelector('#color').addEventListener('change', () => {
            this.breedImages.show()
        })

        insertDog.querySelector('#dogsClear').addEventListener('click', () => {
            application.controller.dispatchEvent(new CustomEvent('view-dogs-clear'))
        })
    }


    async initialize()
    {
        $('#name').on('keyup', () => {
            this.breedImages.show()
        })

        $('#font').on('change', () => {
            this.breedImages.show()
        })

        $('#size').on('keyup', () => {
            this.breedImages.show()
        })

        $('#breed').on('change', (event) => {
             this.requestBreedImages(event.target.value)
         })

         $('#breed-image-previous').on('click', () => {
            this.breedImages.selected--
            this.breedImages.show()
        })

        $('#breed-image-next'     ).on('click', () => {
            this.breedImages.selected++
            this.breedImages.show()
        })

        $('#dogsClear').on('click', () => {
            application.controller.dispatchEvent(new CustomEvent('view-dogs-clear'))
        })

        $('#dogsInsert').on('click', () => {
            //alert('Insert')
        })
    }


    requestBreedImages(breed)
    {
        application.controller.dispatchEvent(new CustomEvent('view-breed-images', {
            bubbles : false, 
            detail  : { 
                breed : breed
            }
        }))
    }


    requestDogsData(keys, callback)
    {
        application.controller.dispatchEvent(new CustomEvent('retrieve-dogs-data', {
            bubbles : false, 
            detail  : {
                keys     : keys,
                callback : callback
            }
        }))
    }


    drawImage(canvas, information, height = this.DIALOG_IMAGE_HEIGHT)
    {
        canvas.height = height
        canvas.width  = canvas.height / information.picture.height * information.picture.width
        
        const context = canvas.getContext('2d')
        context.drawImage(information.picture, 0, 0, canvas.width, canvas.height)

        if (information.name == '')
            return

        context.font      = (information.font.size * height) + 'px ' + information.font.name
        context.fillStyle = information.color
        context.fillText(information.name, information.position.horizontal * height, information.position.vertical * height)
    }


    setBreeds(breeds)
    {
        const breedsSelector = document.getElementById('breed')
        while (breedsSelector.hasChildNodes()) 
        {
            breedsSelector.removeChild(breedsSelector.lastChild);
        }

        let breedOption = document.createElement('option')
        breedOption.disabled  = true
        breedOption.selected  = true
        breedOption.value     = ''
        breedOption.innerText = '-- select an option --'
        breedsSelector.appendChild(breedOption)

        for(let breed of breeds)
        {
            breedOption = document.createElement('option')
            breedOption.value = breed
            breedOption.innerText = breed
            breedsSelector.appendChild(breedOption)
        }
    }


    setBreedImageList(urls)
    {
        this.breedImages = {
            selected : null,
            images   : urls.map( (item) => {
                return {
                    url   : item,
                    image : null
                }
            }),

            show     : async () => {
                const self = this.breedImages

                const currentURL = document.getElementById('url').value
                if (currentURL)
                {
                    self.selected = self.images.findIndex( item => item.url == currentURL )
                    if ( !isNaN(self.selected ))
                    {
                        self.selected++
                    }
                }

                if (!self.selected)
                    self.selected = 1
                
                if (self.selected > self.images.length)
                    self.selected = self.images.length

                if (self.selected < 1)
                    self.selected = 1

                const selectedImage = self.images[self.selected - 1]
                if (!selectedImage.image)
                {
                    selectedImage.image  = new Image()
                    await new Promise ( (resolve) => {
                        selectedImage.image.onload = resolve
                        selectedImage.image.src = selectedImage.url    
                    })
                }

                const information = {
                    name    : document.getElementById('name').value,
                    color   : document.getElementById('color').value,
                    picture : selectedImage.image,
                    font    : {
                        name    : document.getElementById('font').value,
                        size    : document.getElementById('size').value / this.DIALOG_IMAGE_HEIGHT
                    },
                    position : {
                        horizontal : 40 / this.DIALOG_IMAGE_HEIGHT,
                        vertical   : 40 / this.DIALOG_IMAGE_HEIGHT
                    } 
                }
                this.drawImage(document.getElementById('breed-image'), information)
            }
        }

        if (this.breedImages.images.length == 0)
            return

        document.getElementById('breed-image-section').classList.remove('hidden')
        this.breedImages.show()
    }


    async dogEdit(dogs)
    {
        let id
        let name
        let breed
        let font
        let size
        let color
        let pictureURL

        document.getElementById('edit').classList.remove('hidden')
        document.getElementById('main').classList.add('hidden')

        id    = ''
        name  = ''
        breed = ''
        font  = ''
        size  =  47
        color = '#000000'
        pictureURL = ''

        const adog = !!dogs ? dogs.pop() : dogs
        if (adog)
        {
              id       = adog.id
            name       = adog.name
            breed      = adog.breed
            font       = adog.subtitle.font.name
            size       = adog.subtitle.font.size
            color      = adog.subtitle.color
            pictureURL = adog.picture
        }

        document.getElementById('id'  ).value = id
        document.getElementById('url' ).value = pictureURL
        document.getElementById('name').value = name

        const optionsBreed = document.querySelectorAll('#breed option[value=\'' + breed + '\']')
        if (optionsBreed.length > 0)
        {
            optionsBreed[0].selected = true
            this.requestBreedImages(breed)
        }

        const optionsFont = document.querySelectorAll('#font option[value=\'' + font + '\']')
        if (optionsFont.length > 0)
        {
            optionsFont[0].selected = true
        }
        document.getElementById('size').value = parseInt(size * this.DIALOG_IMAGE_HEIGHT) 

        const optionsColor = document.querySelectorAll('#color option[value=\'' + color + '\']')
        if (optionsColor.length > 0)
        {
            optionsColor[0].selected = true
        }

        if (!pictureURL)
        {
            document.getElementById('breed-image-section').classList.add('hidden')
            return
        }

        const selectedImage = new Image()
        await new Promise ( (resolve) => {
            selectedImage.onload = resolve
            selectedImage.src = pictureURL
        })
        this.drawImage(selectedImage, document.getElementById('breed-image'))
    }


    dogsInsert(adog)
    {
        application.controller.dispatchEvent(new CustomEvent('view-dogs-insert', { 
            bubbles : false, 
            detail  : adog
        }))
    }


    dogsDelete(key)
    {
        const dogsTable = document.querySelector('#dogs tbody')
        const dogRows = dogsTable.querySelectorAll('tr.dog')
    }


    dogsUpdate(list)
    { 
        try
        {
            //const dogsTable = $('#dogs tbody')
            const dogRows = $('#dogs tbody tr.dog')

            dogRows.each( (index, row) => {

                if (index == 0)
                    return

                const contents = []
                columns.forEach( (column) => {
                    contents.push(column.innerText)
                })

                const item = list.filter( (item) => {
                    return (contents[1] == item.name)
                }).pop()
    
                    if (!item)
                    {
                        dogsTable.removeChild(row)
                        return
                    }

                    //alert('other rows')
            })

            for(let item of list)
            {
                let row = dogRows.clone()
                row.find('td').text( (index) => {
                    switch (index)
                    {
                        case 0:
                            return item.id
                            break

                        case 1:
                            return item.name
                            break

                        case 2:
                            return item.breed
                            break
                    }
                })

                row.removeClass('hidden')
                row.appendTo('#dogs tbody')
                row.on('click', (event) => {
                    const row = $(event.target).parent()
                    if (!row.is('tr') )
                        return

                    this.requestDogsData( [ parseInt(row.find('td').first().text()) ], async (data) => {
                        const dog = data.pop()
                        if (!dog)
                            return

                        const image = new Image()
                        await new Promise ( (resolve) => {
                            image.onload = resolve
                            image.src    = dog.picture 
                        })
        
                        const information = {
                            name     : dog.name,
                            color    : dog.subtitle.color,
                            picture  : image,
                            font     : {
                                name : dog.subtitle.font.name,
                                size : dog.subtitle.font.size
                            },
                            position : {
                                horizontal : 40 / this.DIALOG_IMAGE_HEIGHT,
                                vertical   : 40 / this.DIALOG_IMAGE_HEIGHT
                            }
                        }
                        this.drawImage(document.getElementById('picture'), information, this.TABLE_IMAGE_HEIGHT)
        
                    }) 
                })
            }
        }
        catch (e)
        {
            alert(e.message)
        }

        return

        dogRows.forEach( (row, index) => {
            let status
            const updateColumn = (index, value) => {
                if (contents[index] != value)
                {
                    columns[index].innerText = value
                }
            }

            if (index == 0)
                return
                
            const columns = row.querySelectorAll('td')
            
            const contents = []
            columns.forEach( (column) => {
                contents.push(column.innerText)
            })
            if (contents.length > 1)
            {
                const item = list.filter( (item) => {
                    return (contents[1] == item.name)
                }).pop()

                if (!item)
                {
                    dogsTable.removeChild(row)
                    return
                }

                updateColumn(1, item.name)
                updateColumn(2, item.breed)
                updateColumn(3, item.subtitle.font.name)
                updateColumn(4, item.subtitle.font.size)
                updateColumn(5, item.subtitle.color)
                updateColumn(7, item.picture)

                list = list.filter( (item) => (contents[1] != item.name))
            }
            
        })

        for(let item of list)
        {
            dogsTable.appendChild(dogRows[0].cloneNode())

            const row = dogsTable.lastChild
            row.innerHTML = dogRows[0].innerHTML
            row.classList.remove('hidden')
            row.addEventListener('click', () => alert('row clicked'))

            columns = row.querySelectorAll('td')

            columns[0].innerText = item.id
            columns[1].innerText = item.name
            columns[2].innerText = item.breed
            columns[3].innerText = item.subtitle.font.name
            columns[4].innerText = item.subtitle.font.size
            columns[5].innerText = item.subtitle.color
            columns[7].innerText = item.picture

            const rowButtons = columns[6].querySelectorAll('button')
            rowButtons[1].addEventListener('click', (event) => { 
                event.stopPropagation() 

                const cell = ( event.target && event.target.parentElement.tagName == 'TD' ) ? event.target.parentElement : null
                const row  = ( cell && cell.parentElement ) && ( cell.parentElement.tagName == 'TR'    ) ? cell.parentElement : null
                const id = row.querySelector('td')
                if (!id)
                    return

                application.controller.dispatchEvent(new CustomEvent('view-dogs-delete', { 
                    bubbles : false, 
                    detail  : [ parseInt(id.innerText) ]
                }))
            })
            rowButtons[0].addEventListener('click', (event) => { 
                event.stopPropagation() 

                const cell = ( event.target && event.target.parentElement.tagName == 'TD' ) ? event.target.parentElement : null
                const row  = ( cell && cell.parentElement ) && ( cell.parentElement.tagName == 'TR'    ) ? cell.parentElement : null
                const id   = row.querySelector('td')
                if (!id)
                    return

                application.controller.dispatchEvent(new CustomEvent('view-dog-edit', { 
                    bubbles : false, 
                    detail  : [ parseInt(id.innerText) ]
                }))
            })
        }
    }
}