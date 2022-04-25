Feature: List Company
  In order to list company
  As an user
  I need to be able to list Company

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


  Scenario: get one company
    Given I have the following payload
    """
    query{
      company(id: "daf673b7-b1ba-415e-ac5e-04848e5e2e5f"){
        id
        name
        address{
          street
          number
        }
      }
    }
    """
    When I make a request to graphql
    And I validate the response is
    """
    {
      "data": {
        "company": {
            "id": "daf673b7-b1ba-415e-ac5e-04848e5e2e5f",
            "name": "Company A",
            "address": {
              "street": "Av. Lima",
              "number": 385
            }
         }
      }
    }
    """
    Then response should have a status 200


  Scenario: get company not exist
    Given I have the following payload
    """
    query{
      company(id: "daf673b7-b1ba-415e-ac5e-04848e5e2e6f"){
        id
        name
        address{
          street
          number
        }
      }
    }
    """
    When I make a request to graphql
    And I validate the response is
    """
    {
      "data": {
        "company": null
      }
    }
    """
    Then response should have a status 200
