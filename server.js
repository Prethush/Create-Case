const express = require("express");
const app = express();
const axios = require("axios");

app.get("/", (req, res) => {
    for (let i = 0; i < 100; i++) {
        axios
          .post(
            "case/create",
            {
              case: {
                case_data: {
                  case: {
                    policy_number: 123,
                    source: "EPOS",
                    idpCheck: false,
                    isDedupRequired: false,
                  },
                },
                wf_data: {
                  policy_number: 123,
                  source: "EPOS",
                  idpCheck: false,
                  isDedupRequired: false,
                },
                case_type: "NB",
              },
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization:
                  "Bearer 8XRFPIrvbwJjvzdJ-qFjen8HCaUVhvLXxXwhRljElGT",
                Tenant: "neutrinos",
              },
            }
          )
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });

    }
});

app.listen(4000, () => console.log("Server is listening on port 4000"))