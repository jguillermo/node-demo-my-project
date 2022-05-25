Feature: List Product
  In order to list product
  As an user
  I need to be able to list Product

  Background:
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


  Scenario: List Product whitout filter
    Given I make a request to graphql
    """
    query{
      productList{
        id
        name
        code
        description
        createAt
        price
        category
      }
    }
    """
    And I validate the response is
    """
    {
      "data": {
        "productList": [
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
      }
    }
    """
    Then response should have a status 200

  Scenario: List Product all filter
    Given I make a request to graphql
    """
    query{
      productList(id:"464120be-58e3-5723-abfe-6b9ac2ce98bf",paginator:{page:1, perPage:1},order:{field:"id", direction:"desc"}){
        id
        name
        code
        description
        createAt
        price
        category
      }
    }
    """
    And I validate the response is
    """
    {
      "data": {
        "productList": [
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
      }
    }
    """
    Then response should have a status 200