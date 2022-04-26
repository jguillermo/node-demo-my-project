Feature: find Product by id
  In order to find product by id
  As an user
  I need to be able to find one Product

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


  Scenario: find one product
    Given I have the following payload
    """
    query{
      product(id: "c96a8ea2-aba7-45a5-a93b-c2f666aa09c9"){
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
        "product": {
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


  Scenario: find product not exist
    Given I have the following payload
    """
    query{
      product(id: "c96a8ea2-aba7-45a5-a93b-c2f666aa08c9"){
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
        "product": null
      }
    }
    """
    Then response should have a status 200
