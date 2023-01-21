migrate((db) => {
  const collection = new Collection({
    "id": "dga6vn3eqs23mdb",
    "created": "2023-01-21 14:21:05.391Z",
    "updated": "2023-01-21 14:21:05.391Z",
    "name": "users",
    "type": "auth",
    "system": false,
    "schema": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "allowEmailAuth": true,
      "allowOAuth2Auth": true,
      "allowUsernameAuth": true,
      "exceptEmailDomains": [],
      "manageRule": null,
      "minPasswordLength": 5,
      "onlyEmailDomains": [],
      "requireEmail": false
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("dga6vn3eqs23mdb");

  return dao.deleteCollection(collection);
})
