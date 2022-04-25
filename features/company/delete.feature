Feature: Delete Company
  In order to delete company
  As an user
  I need to be able to delete Company

  Background:
  Given I have the following data on collection "companies"
  """
    [
      {
        "id": "daf673b7-b1ba-415e-ac5e-04848e5e2e5f",
        "name": "Company A",
        "address": {
          "street": "Av. Lima",
          "number": 385
        }
      }
    ]
    """


  Scenario: delete one company
    Given I have the following payload
    """
    mutation{
      companyDelete(id:"daf673b7-b1ba-415e-ac5e-04848e5e2e5f"){
        status
      }
    }
    """
    When I make a request to graphql
    And I validate the response is
    """
    {
      "data": {
        "companyDelete": {
            "status": "ok"
         }
      }
    }
    """
    Then response should have a status 200


  Scenario: delete company not exist
    Given I have the following payload
    """
    mutation{
      companyDelete(id:"daf673b7-b1ba-415e-ac5e-04848e5e2e6f"){
        status
      }
    }
    """
    When I make a request to graphql
    And I validate the response is
    """
    {
      "data": {
        "companyDelete": {
            "status": "ok"
         }
      }
    }
    """
    Then response should have a status 200
