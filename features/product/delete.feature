Feature: Delete Product
  In order to delete product
  As an user
  I need to be able to delete Product

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


  Scenario: delete one product
    Given I make a request to graphql
    """
    mutation{
      productDelete(id:"c96a8ea2-aba7-45a5-a93b-c2f666aa09c9"){
        status
      }
    }
    """
    And I validate the response is
    """
    {
      "data": {
        "productDelete": {
            "status": "ok"
         }
      }
    }
    """
    Then response should have a status 200


  Scenario: delete product not exist
    Given I make a request to graphql
    """
    mutation{
      productDelete(id:"daf673b7-b1ba-415e-ac5e-04848e5e2e6f"){
        status
      }
    }
    """
    And I validate the response is
    """
    {
      "data": {
        "productDelete": {
            "status": "ok"
         }
      }
    }
    """
    Then response should have a status 200
