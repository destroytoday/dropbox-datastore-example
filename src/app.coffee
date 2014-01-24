class App extends Spine.Controller
  el: $('#app')

  constructor: ->
    @client = new Dropbox.Client(key: APP_KEY)

    @client.authenticate(interactive: false, (error) =>
      if error
        alert("authentication error: #{error}")
    )

    if @client.isAuthenticated()
      console.log 'authenticated!'
      @openDatastore()
    else
      @client.authenticate()

  openDatastore: ->
    @datastoreManager = @client.getDatastoreManager();
    @datastoreManager.openDefaultDatastore((error, datastore) ->
      if !error
        console.log 'opened datastore'
      else
        console.log "error opening default datastore: #{error}"
    )

$ ->
  new App
