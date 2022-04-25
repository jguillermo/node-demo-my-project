Feature: Create Company
  In order to create company
  As an user
  I need to be able to Create Company

  Scenario: Create Company
    Given I have the following payload
    """
    mutation{
      companyPersist(
        id: "daf673b7-b1ba-415e-ac5e-04848e5e2e5f"
        name: "Company A"
        address: {
          street: "Av. Lima"
          number: 385
        }
      ){
        ...on Status{
          status
        }
        ...on Company{
          id
          name
          address{
            street
            number
          }
        }
      }
    }
    """
    When I make a request to graphql
    And I validate the response is
    """
    {
      "data": {
        "companyPersist": {
            "status": "ok"
         }
       }
    }
    """
    Then response should have a status 200
    And I validate the following data exists on collection Company
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