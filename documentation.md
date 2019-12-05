
# PROJECT NAME

---

Name: Shanaya Mullan

Date: 11/1/2019

Project Topic: Food 

URL: N/A

---


### 1. Data Format and Storage

Data point fields:
- `Field 1`:     Name       `Type: String`
- `Field 2`:    Cuisine     `Type: String`
- `Field 3`:    Course      `Type: String`
- `Field 4`:    Price       `Type: Number`
- `Field 5`:    Chef        `Type: String`
- `Field 6`:    Allergens    `Type: [String] `


Schema: 
```javascript
{
   name:String,
   cuisine: String,
   course: String,
   price: Number,
   chef: String,
   allergens: [String]
}
```

### 2. Add New Data

HTML form route: `/add-dish`

POST endpoint route: `/api/add-dish

Example Node.js POST request to endpoint: 
```javascript
var request = require("request");

var options = { 
    method: 'POST',
    url: 'http://localhost:3000/api/...',
    headers: { 
        'content-type': 'application/x-www-form-urlencoded' 
    },
    form: { 
      name: 'Grilled Cheese', 
      cuisine: 'American',
      course: 'Lunch',
      price: '4',
      chef: 'Bob Ross'
      allergens: ["gluten, dairy"] 
    } 
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. View Data

GET endpoint route: `/api/...`

### 4. Search Data

Search Field: name

### 5. Navigation Pages

Navigation Filters
1. cuisine -> ` /cuisine`
2. course -> ` /course  `
3. dinner -> ` /dinner`
4. lunch -> `  /lunch  `
5. breakfast -> `/breakfast `
6. price -> `/price `


