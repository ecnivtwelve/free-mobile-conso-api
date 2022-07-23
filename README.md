![image](https://user-images.githubusercontent.com/32978709/180616181-925c8e35-945e-4616-971a-f5745a1588b5.png)
Pupeeter based Node.js API to get usage and other data from french carrier "Free Mobile"

## Usage
A web version is available here : https://free-mobile-conso-api.herokuapp.com/

### Get current consommation
Use this url : `https://free-mobile-conso-api.herokuapp.com/conso?user=**login**&pass=**password**`
###### replace `**login**` and `**password**` with your Free Mobile dashboard credentials

### Response example
```json
[
  {
    "first_name": "Pierre",
    "phone_number": "06 07 08 09 10",
    "conso": [
      {
        "data": [
          {
            "usedMo": 354.21,
            "totalMo": 50,
            "hors_forfaitEUR": 12.96
          }
        ],
        "voix": [
          {
            "used": [
              {
                "france": "31m 55s",
                "international": "0s"
              }
            ],
            "hors_forfaitEUR": 0
          }
        ],
        "sms": [
          {
            "sent": 213,
            "hors_forfaitEUR": 0
          }
        ],
        "mms": [
          {
            "sent": 8,
            "hors_forfaitEUR": 0
          }
        ]
      }
    ]
  }
]
```
