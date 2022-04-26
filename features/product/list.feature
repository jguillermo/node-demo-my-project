Feature: List Product
  In order to list product
  As an product
  I need to be able to list Product

  Background:
  Given I have the following data on collection "products"
  """
  [
    {
      "id": "c96a8ea2-aba7-45a5-a93b-c2f666aa09c9",
      "name": "Product A",
      "code": "c96a8ea2-aba7-45a5-a93b-c2f666aa09c8",
      "description": "description A",
      "createAt": "Date(2018-05-06)",
      "price": 12,
      "category": "books"
    }
  ]
  """


  Scenario: List Product whitout filter
    Given I have the following payload
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
    When I make a request to graphql
    And I validate the response is
    """
    {
      "data": {
        "productList": [
          {
            "id": "c96a8ea2-aba7-45a5-a93b-c2f666aa09c9",
            "name": "Product A",
            "code": "c96a8ea2-aba7-45a5-a93b-c2f666aa09c8",
            "description": "description A",
            "createAt": "2018-05-06T00:00:00.000Z",
            "price": 12,
            "category": "books"
          }
        ]
      }
    }
    """
    Then response should have a status 200

  Scenario: List Product all filter
    Given I have the following payload
    """
    query{
      productList(id:"c96a8ea2-aba7-45a5-a93b-c2f666aa09c9",paginator:{page:1, perPage:1},order:{field:"id", direction:"desc"}){
        id
        name
      }
    }
    """
    When I make a request to graphql
    And I validate the response is
    """
    {
      "data": {
        "productList": [
          {
            "id": "c96a8ea2-aba7-45a5-a93b-c2f666aa09c9",
            "name": "Product A"
          }
        ]
      }
    }
    """
    Then response should have a status 200