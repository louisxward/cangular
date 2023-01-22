migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dga6vn3eqs23mdb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "19wagkj2",
    "name": "avatar",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "o9rimuxu",
    "name": "lastLoggedIn",
    "type": "date",
    "required": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dga6vn3eqs23mdb")

  // remove
  collection.schema.removeField("19wagkj2")

  // remove
  collection.schema.removeField("o9rimuxu")

  return dao.saveCollection(collection)
})
