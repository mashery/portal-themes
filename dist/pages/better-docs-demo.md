<div class="better-docs-nav better-docs-nav-sticky"></div>

Welcome to the Kittn API! You can use our API to access Kittn API endpoints, which can get information on various cats, kittens, and breeds in our database.

We have language bindings in Shell, Ruby, and Python! You can view code examples in the dark area to the right, and you can switch the programming language of the examples with the tabs in the top right.

This example API documentation page was created with Slate. Feel free to edit it and use it as a base for your own API's documentation.

## Authentication

> To authorize, use this code:

```bash
# With shell, you can just pass the correct header with each request
curl "api_endpoint_here"
  -H "Authorization: meowmeowmeow"
```

```ruby
require 'kittn'

api = Kittn::APIClient.authorize!('meowmeowmeow')
Make sure to replace meowmeowmeow with your API key.
```

```python
import kittn

api = kittn.authorize('meowmeowmeow')
```

```js
const kittn = require('kittn');

let api = kittn.authorize('meowmeowmeow');
```

>Make sure to replace meowmeowmeow with your API key.

Kittn uses API keys to allow access to the API. You can register a new Kittn API key at our developer portal.

Kittn expects for the API key to be included in all API requests to the server in a header that looks like the following:

`Authorization: meowmeowmeow`

## Kittens

```bash
curl "http://example.com/api/kittens"
  -H "Authorization: meowmeowmeow"
```

```ruby
require 'kittn'

api = Kittn::APIClient.authorize!('meowmeowmeow')
api.kittens.get
```

```python
import kittn

api = kittn.authorize('meowmeowmeow')
api.kittens.get()
```

```javascript
const kittn = require('kittn');

let api = kittn.authorize('meowmeowmeow');
let kittens = api.kittens.get();
```

> The above command returns JSON structured like this:

```json
[
  {
    "id": 1,
    "name": "Fluffums",
    "breed": "calico",
    "fluffiness": 6,
    "cuteness": 7
  },
  {
    "id": 2,
    "name": "Max",
    "breed": "unknown",
    "fluffiness": 5,
    "cuteness": 10
  }
]
```

### Get All Kittens

This endpoint retrieves all kittens.

#### HTTP Request

`GET http://example.com/api/kittens`

#### Query Parameters

| Parameter | Default | Description |
| --------- | ------- | ----------- |
|`include_cats` | `false` | If set to true, the result will also include cats. |
| `available` | `true` | If set to false, the result will include kittens that have already been adopted. |