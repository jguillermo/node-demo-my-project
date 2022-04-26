Feature: Persist Product
  In order to create product
  As an product
  I need to be able to persist Product

  Scenario: Create Product
    Given I make a request to graphql
    """
    mutation{
      productPersist(
        id: "c96a8ea2-aba7-45a5-a93b-c2f666aa09c9"
        name: "Product A"
        code: "c96a8ea2-aba7-45a5-a93b-c2f666aa09c8"
        description: "description A"
        createAt: "2018-05-06"
        price: 12
        category: "books"
      ){
        ...on Status{
          status
        }
        ...on Product{
          id
          name
        }
      }
    }
    """
    And I validate the response is
    """
    {
      "data": {
        "productPersist": {
            "status": "ok"
         }
       }
    }
    """
    Then response should have a status 200
    And I validate the following data exists on collection "products"
    """
    [
      {
        "id": "c96a8ea2-aba7-45a5-a93b-c2f666aa09c9",
        "name": "Product A",
        "code": "c96a8ea2-aba7-45a5-a93b-c2f666aa09c8",
        "description": "description A",
        "createAt": {
          "_nanoseconds": 0,
          "_seconds": 1525564800
        },
        "price": 12,
        "category": "books"
      }
    ]
    """

  Scenario: Create Product show entity
    Given I make a request to graphql
    """
    mutation{
      productPersist(
        id: "c96a8ea2-aba7-45a5-a93b-c2f666aa09c9"
        name: "Product A"
        code: "c96a8ea2-aba7-45a5-a93b-c2f666aa09c8"
        description: "description A"
        createAt: "2018-05-06"
        price: 12
        category: "books"
        showEntity: true
      ){
        ...on Status{
          status
        }
        ...on Product{
          id
          name
          code
          description
          createAt
          price
          category
        }
      }
    }
    """
    And I validate the response is
    """
    {
      "data": {
        "productPersist": {
          "id": "c96a8ea2-aba7-45a5-a93b-c2f666aa09c9",
          "name": "Product A",
          "code": "c96a8ea2-aba7-45a5-a93b-c2f666aa09c8",
          "description": "description A",
          "createAt": "2018-05-06T00:00:00.000Z",
          "price": 12,
          "category": "books"
         }
       }
    }
    """
    Then response should have a status 200
    And I validate the following data exists on collection "products"
    """
    [
      {
        "id": "c96a8ea2-aba7-45a5-a93b-c2f666aa09c9",
        "name": "Product A",
        "code": "c96a8ea2-aba7-45a5-a93b-c2f666aa09c8",
        "description": "description A",
        "createAt": {
          "_nanoseconds": 0,
          "_seconds": 1525564800
        },
        "price": 12,
        "category": "books"
      }
    ]
    """

  Scenario: Update Product
    Given I have the following data on collection "products"
    """
    [
      {
        "id": "c96a8ea2-aba7-45a5-a93b-c2f666aa09c9",
        "name": "Product A",
        "code": "c96a8ea2-aba7-45a5-a93b-c2f666aa09c8",
        "description": "description A",
        "createAt": "Date(2018-05-07)",
        "price": 12,
        "category": "books"
      }
    ]
    """
    And I make a request to graphql
    """
    mutation{
      productPersist(
        id: "c96a8ea2-aba7-45a5-a93b-c2f666aa09c9"
        name: "Product B"
        code: "c96a8ea2-aba7-45a5-a93b-c2f666aa09c9",
        description: "description B",
        createAt: "2018-05-07",
        price: 120,
        category: "books"
      ){
        ...on Status{
          status
        }
        ...on Product{
          id
          name
        }
      }
    }
    """
    And I validate the response is
    """
    {
      "data": {
        "productPersist": {
            "status": "ok"
         }
       }
    }
    """
    Then response should have a status 200
    And I validate the following data exists on collection "products"
    """
    [
       {
          "id": "c96a8ea2-aba7-45a5-a93b-c2f666aa09c9",
          "name": "Product B",
          "code": "c96a8ea2-aba7-45a5-a93b-c2f666aa09c9",
          "description": "description B",
           "createAt": {
             "_nanoseconds": 0,
             "_seconds": 1525651200
           },
          "price": 120,
          "category": "books"
      }
    ]
    """