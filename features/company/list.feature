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


  Scenario: List Company whitout filter
    Given I make a request to graphql
    """
    query{
      companyList{
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
        "companyList": [
          {
            "id": "daf673b7-b1ba-415e-ac5e-04848e5e2e5f",
            "name": "Company A",
            "address": {
              "street": "Av. Lima",
              "number": 385
            }
          }
        ]
      }
    }
    """
    Then response should have a status 200

  Scenario: List Company all filter
    Given I make a request to graphql
    """
    query{
      companyList(id:"daf673b7-b1ba-415e-ac5e-04848e5e2e5f",paginator:{page:1, perPage:1},order:{field:"id", direction:"desc"}){
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
        "companyList": [
          {
            "id": "daf673b7-b1ba-415e-ac5e-04848e5e2e5f",
            "name": "Company A",
            "address": {
              "street": "Av. Lima",
              "number": 385
            }
          }
        ]
      }
    }
    """
    Then response should have a status 200