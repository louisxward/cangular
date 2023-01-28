migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dga6vn3eqs23mdb")

  // update
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
      "mimeTypes": [
        "image/jpg",
        "image/jpeg",
        "image/png",
        "image/svg+xml",
        "image/gif"
      ],
      "thumbs": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dga6vn3eqs23mdb")

  // update
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

  return dao.saveCollection(collection)
})
