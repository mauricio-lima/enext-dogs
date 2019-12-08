class View
{
    constructor()
    {
        const head = document.getElementsByTagName('head')[0];

        const script = document.createElement('script')
        script.src = 'scripts/views/simple/handlers.js'
        head.appendChild(script)

        const styles = document.createElement('style')
        styles.type = 'text/css'
        styles.appendChild(document.createTextNode(`
            .hidden {
                display : none;
            }`
            ))
        head.appendChild(styles)

        const container = document.getElementById('container')

        const insertDog = document.createElement('div')
        insertDog.innerHTML = `
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
                    <select id="color">
                        <option value="#ffffff">White   </option>
                        <option value="#ff0000">Red     </option>
                        <option value="#ffff00">Amarelo </option>
                        <option value="#00ff00">Verde   </option>
                        <option value="#00ffff">Ciano   </option>
                        <option value="#0000ff">Blue    </option>
                        <option value="#000000">Black   </option>
                    </select>
                    <div id="breed-image-section"  class="hidden">
                        <br>
                        <br>
                        <canvas id="breed-image"></canvas>
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
                    <div>
                        <button id="dogInsert">
                            Insert Dog
                         </button>
                        <button id="dogsClear">
                            Clear All
                        </button>
                    </div>
                    <table id="dogs">
                        <thead>
                            <tr>
                                <th>id      </th>
                                <th>Name    </th>
                                <th>Breed   </th>
                                <th>Font    </th>
                                <th>Size    </th>
                                <th>Color   </th>
                                <th>        </th>
                                <th>Picture </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="dog hidden" >
                                <td> id      </td>
                                <td> name    </td>
                                <td> breed   </td>
                                <td> font    </td>
                                <td> size    </td>
                                <td> color   </td>
                                <td> 
                                    <button>
                                        edit
                                    </button>
                                    <button>
                                        delete
                                    </button>
                                </td>
                                <td> picture </td>
                            </tr>
                        </tbody>
                    </table>
                    <canvas id="picture">
                    </canvas>
                </div>
                    `

        container.appendChild(insertDog)

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
                        size : parseInt(document.getElementById('size').value)
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


    requestBreedImages(breed)
    {
        application.controller.dispatchEvent(new CustomEvent('view-breed-images', { 
            bubbles : false, 
            detail  : { 
                breed : breed
            }
        }))
    }


    drawImage(image)
    {
        const canvas = document.getElementById('breed-image')
        canvas.height = 200
        canvas.width  = canvas.height / image.height * image.width
        
        const context = canvas.getContext('2d')
        context.drawImage(image, 0, 0, canvas.width, canvas.height)

        const name = document.getElementById('name').value
        if (name == '')
            return

        context.font = document.getElementById('size').value + 'px ' + document.getElementById('font').value
        context.fillStyle = document.getElementById('color').value
        context.fillText(name, 40, 40)
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
                    self.selected = self.images.findIndex( item => self.images.url == currentURL )
                    if ( !isNaN(self.selected ))
                    {
                        self.selected++
                        return
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
                    //selectedImage.url = selectedImage.url  //.replace('https', 'http')
                    await new Promise ( (resolve) => {
                        selectedImage.image.onload = resolve
                        selectedImage.image.src = selectedImage.url    
                    })
                }

                this.drawImage(selectedImage.image)
            }
        }

        if (this.breedImages.images.length == 0)
            return

        document.getElementById('breed-image-section').classList.remove('hidden')
        this.breedImages.show()
    }


    async dogEdit(adog)
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

        document.getElementById('size').value = size 
        
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
        this.drawImage(selectedImage)
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
        let columns

        const dogsTable = document.querySelector('#dogs tbody')
        const dogRows = dogsTable.querySelectorAll('tr.dog')

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