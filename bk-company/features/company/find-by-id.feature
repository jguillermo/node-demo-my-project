Feature: find Company by id
  In order to find company by id
  As an user
  I need to be able to find one Company

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


  Scenario: find one company
    Given I make a request to graphql
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


  Scenario: find company not exist
    Given I make a request to graphql
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
    And I validate the response is
    """
    {
      "data": {
        "company": null
      }
    }
    """
    Then response should have a status 200
