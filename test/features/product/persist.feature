Feature: Persist Product
  In order to create product
  As an user
  I need to be able to persist Product

  Scenario: Create Product
    Given I make a request to graphql
    """
    mutation{
      productPersist(
        id: "464120be-58e3-5723-abfe-6b9ac2ce98bf"
        name: "Name"
        code: ""
        description: "Description"
        createAt: ""
        price: ""
        category: ""
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
        "id": "464120be-58e3-5723-abfe-6b9ac2ce98bf",
        "name": "Name",
        "code": "",
        "description": "Description",
        "createAt": "",
        "price": "",
        "category": ""
      }
    ]
    """

  Scenario: Create Product show entity
    Given I make a request to graphql
    """
    mutation{
      productPersist(
        id: "464120be-58e3-5723-abfe-6b9ac2ce98bf"
        name: "Name"
        code: ""
        description: "Description"
        createAt: ""
        price: ""
        category: ""
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
           "id": "464120be-58e3-5723-abfe-6b9ac2ce98bf",
           "name": "Name",
           "code": "",
           "description": "Description",
           "createAt": "",
           "price": "",
           "category": ""
         }
       }
    }
    """
    Then response should have a status 200
    And I validate the following data exists on collection "products"
    """
    [
      {
        "id": "464120be-58e3-5723-abfe-6b9ac2ce98bf",
        "name": "Name",
        "code": "",
        "description": "Description",
        "createAt": "",
        "price": "",
        "category": ""
      }
    ]
    """

  Scenario: Update Product
    Given I have the following data on collection "products"
    """
    [
      {
        "id": "464120be-58e3-5723-abfe-6b9ac2ce98bf",
        "name": "Name",
        "code": "",
        "description": "Description",
        "createAt": "",
        "price": "",
        "category": ""
      }
    ]
    """
    And I make a request to graphql
    """
    mutation{
      productPersist(
        id: "464120be-58e3-5723-abfe-6b9ac2ce98bf"
        name: "NameUpdate"
        code: ""
        description: "DescriptionUpdate"
        createAt: ""
        price: ""
        category: ""
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
        "id": "464120be-58e3-5723-abfe-6b9ac2ce98bf",
        "name": "NameUpdate",
        "code": "",
        "description": "DescriptionUpdate",
        "createAt": "",
        "price": "",
        "category": ""
      }
    ]
    """